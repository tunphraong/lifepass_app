// app/api/bookings/route.ts
"use server";

import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { describe } from "node:test";
import { timeStamp } from "console";
const ZALOPAY_KEY1 = process.env.ZALOPAY_KEY1;
const ZALOPAY_APP_ID = parseInt(process.env.ZALOPAY_APP_ID);
const ZALOPAY_REFUND_ORDER_ENDPOINT = "https://sb-openapi.zalopay.vn/v2/refund";
import dayjs from "dayjs";

// ... (import your Studio and Class interfaces from app/types.ts)
const supabase = createClient();

interface ZaloPayRefundResponse {
  success: boolean;
  error?: string; // Optional error message if refund fails
  // ... other properties you expect from ZaloPay's refund response ...
}

const generateRefundId = (unique_code) => {
  const now = new Date();
  const YY = String(now.getFullYear()).slice(-2);
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  // const randomStr = randomBytes(4).toString("hex");
  // const uniquePart = `${now.getTime()}${userId.toString()}${randomStr}}`;
  // const maxLength = 40;
  // const uniquePart = generateUniqueCode(7);

  return `${YY}${MM}${DD}_${ZALOPAY_APP_ID}_${unique_code}`;

  // return `${YY}${MM}${DD}_${uniquePart}`.slice(0, maxLength);
};

export async function PUT(request: NextRequest, { params }) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();

  const bookingId = body.paymentDetails?.bookingId;
  const schedule_id = body.paymentDetails?.scheduleId;

  try {
    // 1. Fetch the payment
    const { data: payment, error: paymentError } = await supabase
      .from("payments")
      .select("*")
      .eq("booking_id", bookingId)
      .single();

    if (!payment || paymentError) {
      console.log(paymentError);
      return NextResponse.json(
        { error: paymentError?.message || "Booking not found" },
        { status: 404 }
      );
    }

    // console.log(payment);

    const { data: transaction, error: transactionError } = await supabase
      .from("zalo_payment_transactions")
      .select()
      .eq("payment_id", payment.id)
      .single();

    if (transactionError || !transaction) {
      console.log(transactionError);
      return NextResponse.json(
        { error: transactionError?.message || "Transaction not found" },
        { status: 404 }
      );
    }

    // 2. Check if the booking is eligible for a refund (e.g., within cancellation window)
    const { data: scheduleStartTime, error: scheduleStartTimeError } =
      await supabase
        .from("schedules")
        .select("start_time")
        .eq("id", schedule_id)
        .single();

    if (scheduleStartTimeError || !scheduleStartTime) {
      console.error(scheduleStartTimeError);
      return NextResponse.json(
        { error: scheduleStartTimeError?.message || "schedule not found" },
        { status: 404 }
      );
    }

    const isRefundable =
      dayjs(scheduleStartTime?.start_time).diff(dayjs(), "hour") > 12;

    if (!isRefundable) {
      return NextResponse.json(
        { error: "Booking is not eligible for refund" },
        { status: 400 }
      );
    }

    // 3. Initiate refund with ZaloPay (replace with your actual implementation)
    const refundResult = await initiateZaloPayRefund(transaction); // Placeholder function, you need to implement this

    if (!refundResult.success) {
      return NextResponse.json({ error: refundResult.error }, { status: 500 }); // Refund failed
    }

    // update refund payment table
    const { data: updatePaymentRefundData, error: errorPaymentRefundData } =
      await supabase.rpc("update_payments_table_status", {
        updatedstatus: "refunded",
        paymentid: payment.id,
      });

    if (errorPaymentRefundData) {
      // console.log(
      //   "error updating booking refund 123",
      //   errorPaymentRefundData,
      //   bookingId
      // );
      return NextResponse.json(
        { error: errorPaymentRefundData },
        { status: 500 }
      );
    }

    // 4. Update booking status to 'cancelled'
    const { data: updateBookingData, error: updateBookingError } =
      await supabase.rpc("update_booking_status", {
        updatedstatus: "cancelled",
        bookingid: bookingId,
      });

    if (updateBookingError) {
      console.error(
        "error updating booking refund",
        updateBookingError,
        bookingId
      );
      return NextResponse.json({ error: updateBookingError }, { status: 500 });
    }

    // 5. Update the enrolled count
    const { data: decreaseEnrolledData, error: decreaseEnrolledError } =
      await supabase.rpc("decrement_enrolled", {
        schedule_id: transaction.schedule_id,
      });

    if (decreaseEnrolledError) {
      return NextResponse.json(
        { error: decreaseEnrolledError.message },
        { status: 500 }
      );
    }

    // revalidatePath("/app/upcoming");
    return NextResponse.json({ message: "Refund processed successfully" });
  } catch (error) {
    console.error("Error processing refund:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

async function initiateZaloPayRefund(
  transaction
): Promise<ZaloPayRefundResponse> {
  // ... your ZaloPay refund logic here ...
  const { amount, zp_trans_id, transaction_id, id } = transaction;
  const reqtime = Date.now();
  const zp_trans_id_string: string = zp_trans_id.toString();
  const description = "LifePass refund " + transaction_id;
  //   const zp_trans_id = "240712000002028";
  const mac = generateMacOrder(
    reqtime,
    "sha256",
    description,
    zp_trans_id_string,
    amount
  );

  const unique_code = generateUniqueCode(7);
  const m_refund_id = generateRefundId(unique_code);
  const order = {
    // m_refund_id: "12312312312",
    m_refund_id: m_refund_id,
    app_id: ZALOPAY_APP_ID,
    zp_trans_id: zp_trans_id_string,
    amount: amount,
    timestamp: reqtime,
    mac: mac,
    description: description,
  };

  console.log(JSON.stringify(order));

  const response = await fetch(ZALOPAY_REFUND_ORDER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  const result = await response.json();
  console.log(result);

  // update zalopay table with m_refund_id and refund_id
  if (result.return_code != 2) {
    const { data: refundData, error: refundError } = await supabase.rpc(
      "update_zalopay_refund",
      {
        apptransid: transaction_id,
        updatedstatus: "refunded",
        mrefundid: m_refund_id,
        refundid: result.refund_id,
      }
    );

    if (refundError) {
      console.log("refund error", refundError);
    }

    console.log(refundData);

    return { success: true };
  } else {
    return { success: false, error: "Refund failed. Please try again." }; // Example error message
  }

  // update zalo payment table
}

function generateMacOrder(
  reqtime: number,
  hmac_algorithm = "sha256",
  description: string,
  zp_trans_id: string,
  amount: number
) {
  const hmac = createHmac(hmac_algorithm, ZALOPAY_KEY1);
  const data = `${ZALOPAY_APP_ID}|${zp_trans_id}|${amount}|${description}|${reqtime}`;
  console.log("data", data);
  hmac.update(data);
  return hmac.digest("hex");
}

function generateUniqueCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}
