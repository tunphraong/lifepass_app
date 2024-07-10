import { NextResponse } from "next/server";
// import { createClient } from "../../../utils/supabase/client";
import { createClient } from "../../../../utils/supabase/server";
import { createHmac } from "crypto";
import { NextRequest } from "next/server";

const ZALOPAY_KEY2 = process.env.ZALOPAY_CALLBACK_KEY;

function verifyMacOrder(key2, data) {
  console.log(data);
  const hmac = createHmac("sha256", key2);
  hmac.update(data);
  return hmac.digest("hex");
}

export async function POST(req) {
  const body = await req.json();

  const { data, mac, type } = body;

  const parsedData = JSON.parse(data); // Parse the JSON string
  const { app_trans_id } = parsedData; // Destructure the app_trans_id property
  const generatedMac = verifyMacOrder(ZALOPAY_KEY2, data);

  if (mac !== generatedMac) {
    // console.log('mac difference')
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    const { data: paymentTransaction, error: paymentError } = await supabase
      .from("zalo_payment_transactions")
      .select("*")
      .eq("transaction_id", app_trans_id)
      .single();

    if (paymentError || !paymentTransaction) {
      return NextResponse.json(
        { error: "Payment order not found" },
        { status: 404 }
      );
    }

    const { schedule_id, user_id } = paymentTransaction;

    const { error: bookingError } = await supabase.from("bookings").insert({
      user_id: user_id,
      schedule_id: schedule_id,
      status: "confirmed",
      updated_at: new Date(),
    });

    if (bookingError) {
      return NextResponse.json(
        { error: bookingError.message },
        { status: 500 }
      );
    }

    const { data: updateOrder, error: updateError } = await supabase.rpc(
      "update_payment_status",
      {
        apptransid: app_trans_id,
        updatedstatus: "success",
      }
    );

    if (updateError) {
      console.error("Error updating payment status:", updateError);
    } else {
      console.log("Payment status updated successfully:", updateOrder);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error creating booking or updating payment status:", error);
    return NextResponse.json(
      { error: "An error occurred while processing the booking" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  console.log(typeof req);
  console.log(req);

  // console.log('query' , req.query);
  // console.log(data);
  // const { apptransid, zptransid, status, amount, mac } = data;

  // const generatedMac = verifyMacOrder(
  //   ZALOPAY_KEY2,
  //   `${apptransid}|${zptransid}|${amount}|${status}`
  // );

  // //   if (mac !== generatedMac) {
  // //     return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  // //   }

  // const supabase = createClient();
  // const { data: paymentOrder, error } = await supabase
  //   .from("PaymentOrder")
  //   .select("*")
  //   .eq("zalopay_order_id", apptransid)
  //   .single();

  // if (error || !paymentOrder) {
  //   return NextResponse.json(
  //     { error: "Payment order not found" },
  //     { status: 404 }
  //   );
  // }

  // const updatedStatus = status === 1 ? "successful" : "failed";

  // const { data: updatedOrder, error: updateError } = await supabase
  //   .from("PaymentOrder")
  //   .update({ status: updatedStatus })
  //   .eq("zalopay_order_id", apptransid);

  // if (updateError) {
  //   return NextResponse.json(
  //     { error: "Failed to update payment order" },
  //     { status: 500 }
  //   );
  // }

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
