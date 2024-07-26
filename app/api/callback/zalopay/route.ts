import { NextResponse } from "next/server";
// import { createClient } from "../../../utils/supabase/client";
import { createClient } from "../../../../utils/supabase/server";
import { createHmac } from "crypto";
import { NextRequest } from "next/server";
import { sendConfirmationEmail } from "../../../app/lib/sendEmail";

const ZALOPAY_KEY2 = process.env.ZALOPAY_CALLBACK_KEY;

function verifyMacOrder(key2, data) {
  console.log(data);
  const hmac = createHmac("sha256", key2);
  hmac.update(data);
  return hmac.digest("hex");
}


let paymentTransaction = null;
export async function POST(req) {
  const body = await req.json();
  console.log("get here");

  const { data, mac, type } = body;

  const parsedData = JSON.parse(data); // Parse the JSON string
  const { app_trans_id, zp_trans_id, amount } = parsedData; // Destructure the app_trans_id property
  const generatedMac = verifyMacOrder(ZALOPAY_KEY2, data);

  // todo enable this
  if (mac !== generatedMac) {
    // console.log('mac difference')
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data: paymentTransactionData, error: paymentError } = await supabase
      .from("zalo_payment_transactions")
      .select("*")
      .eq("transaction_id", app_trans_id)
      .single();

    if (paymentError || !paymentTransactionData) {
      return NextResponse.json(
        { error: "Payment order not found" },
        { status: 404 }
      );
    }

    paymentTransaction = paymentTransactionData; // Assign value to paymentTransaction

    const { schedule_id, user_id } = paymentTransaction;

    const { data: bookingData, error: bookingError } = await supabase.rpc(
      "insert_booking",
      {
        p_user_id: user_id,
        p_schedule_id: schedule_id,
      }
    );

    if (bookingError) {
      console.log(bookingError);
      return NextResponse.json(
        { error: bookingError.message },
        { status: 500 }
      );
    }

    console.log("booking data", bookingData);

    const bookingId = bookingData.id;

    const { data: insertedPayment, error: insertPaymentError } =
      await supabase.rpc("insert_payment", {
        p_amount: amount,
        p_created_at: new Date().toISOString(),
        p_updated_at: new Date().toISOString(),
        p_status: "success",
        p_booking_id: bookingId,
        p_payment_method: "zalopay",
      });

    if (insertPaymentError) {
      console.error("Error inserting payment:", insertPaymentError);
      return null;
    }

    const insertedPaymentId = insertedPayment.id;

    console.log(insertedPayment);

    const { data: updateOrder, error: updateError } = await supabase.rpc(
      "update_payment_status",
      {
        apptransid: app_trans_id,
        updatedstatus: "success",
        zptransid: zp_trans_id,
        paymentid: insertedPaymentId,
      }
    );

    if (updateError) {
      console.error("Error updating payment status:", updateError);
    } else {
      console.log("Payment status updated successfully:", updateOrder);
    }

    const { data: increaseEnrolledData, error: increaseEnrolledError } =
      await supabase.rpc("increment_enrolled", {
        schedule_id: schedule_id,
      });

    if (increaseEnrolledError) {
      console.error(
        "Error updating enrolled count:",
        increaseEnrolledError.message
      );
      return NextResponse.json(
        { error: "Error updating enrolled count" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { return_code: 1, return_message: `thành công ${app_trans_id}` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating booking or updating payment status:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the booking" },
      { status: 500 }
    );
  } finally {
    try {
      console.log(paymentTransaction);
      if (paymentTransaction) {
        await sendConfirmationEmail(
          paymentTransaction.schedule_id,
          paymentTransaction.user_id
        );
      }
    } catch (err) {
      console.error("Failed to send email", err);
    }
  }
}

export async function GET(req: Request) {}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
