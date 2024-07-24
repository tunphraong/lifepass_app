// const crypto = require("crypto");
import { createHmac } from "crypto";
import { randomBytes } from "crypto";

const ZALOPAY_APP_ID = parseInt(process.env.ZALOPAY_APP_ID);
const ZALOPAY_KEY1 = process.env.ZALOPAY_KEY1;
const ZALOPAY_CREATE_ORDER_ENDPOINT = "https://sb-openapi.zalopay.vn/v2/create";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "../../../utils/supabase/server";
import dayjs from "dayjs";
const HOST_URL = "https://dae3-45-80-184-21.ngrok-free.app";

function generateUniqueCode(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters[randomIndex];
  }

  return code;
}

function generateMac(appid, reqtime, key1, hmac_algorithm = "sha256") {
  const dataToHash = `${appid}|${reqtime}`;
  const hmac = createHmac(hmac_algorithm, key1);
  hmac.update(dataToHash);
  return hmac.digest("hex");
}

const generateOrderId = (unique_code) => {
  const now = new Date();
  const YY = String(now.getFullYear()).slice(-2);
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  // const randomStr = randomBytes(4).toString("hex");
  // const uniquePart = `${now.getTime()}${userId.toString()}${randomStr}}`;
  // const maxLength = 40;
  // const uniquePart = generateUniqueCode(7);

  return `${YY}${MM}${DD}_${unique_code}`;

  // return `${YY}${MM}${DD}_${uniquePart}`.slice(0, maxLength);
};

function generateMacOrder(
  appid,
  reqtime,
  key1,
  hmac_algorithm = "sha256",
  app_trans_id,
  app_user,
  amount,
  embed_data,
  item
) {
  try {
    const hmac = createHmac(hmac_algorithm, key1);
    const data = `${appid}|${app_trans_id}|${app_user}|${amount}|${reqtime}|${embed_data}|${item}`;
    console.log(data);
    hmac.update(data);
    return { status: "success", hmac: hmac.digest("hex") };
  } catch (error) {
    return {
      status: "error",
      message: `Error generating HMAC: ${error}`,
    };
  }
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { user_id, schedule_id, amount } = await req.json();
  console.log("user id", user_id);

  // Check if the class is in the past
  const isInPast = await isClassInPast(schedule_id);
  if (isInPast) {
    return NextResponse.json(
      { error: "Cannot book a class in the past" },
      { status: 400 }
    );
  }

  // let amount = 20000;

  // console.log(amount, user_id, schedule_id);
  const reqtime = Date.now();

  const bank_code = "";
  const embed_data = {
    preferred_payment_method: [],
    redirecturl: `${HOST_URL}/app/payment-result`,
  };

  const unique_code = generateUniqueCode(7);
  const app_trans_id = generateOrderId(unique_code);
  const description = `LifePass_${app_trans_id}`;
  const item = [
    {
      itemid: "knb",
      itename: "kim nguyen bao",
      itemprice: 198400,
      itemquantity: 1,
    },
  ];

  const result = generateMacOrder(
    ZALOPAY_APP_ID,
    reqtime,
    ZALOPAY_KEY1,
    "sha256",
    app_trans_id,
    user_id,
    amount,
    JSON.stringify(embed_data),
    JSON.stringify(item)
  );

  let mac: string;

  if (result.status === "success") {
    console.log("HMAC:", result.hmac);
    mac = result.hmac;
  } else if (result.status === "error") {
    console.error("Error:", result.message);
    return NextResponse.json(
      { error: "Failed to create payment order. Please contact us" },
      { status: 500 }
    );
  }

  const order = {
    app_id: ZALOPAY_APP_ID,
    app_user: user_id,
    app_time: reqtime,
    app_trans_id: app_trans_id,
    callback_url: `${HOST_URL}/api/callback/zalopay`,
    amount: amount,
    bank_code: "",
    description: description,
    embed_data: JSON.stringify(embed_data),
    item: JSON.stringify(item),
    mac: mac,
  };

  console.log(order);

  try {
    const response = await fetch(ZALOPAY_CREATE_ORDER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });

    const result = await response.json();
    if (result.return_code === 1) {
      console.log(result);

      // Insert payment order into Supabase after successful order creation
      const { data, error } = await supabase
        .from("zalo_payment_transactions")
        .insert([
          {
            user_id: user_id,
            schedule_id: schedule_id,
            transaction_id: app_trans_id,
            amount: amount,
            status: "pending",
            zalo_transaction_token: result.zp_trans_token,
            payment_code: unique_code,
          },
        ]);

      if (error) {
        console.error("Error inserting payment order:", error);
        return NextResponse.json(
          { error: "Failed to create payment order in database" },
          { status: 500 }
        );
      }

      return NextResponse.json(result, { status: 200 });
    } else {
      console.log(result);
      return NextResponse.json({ error: result }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function isClassInPast(scheduleId: string): Promise<boolean> {
  const supabase = createClient();
  const { data: schedule, error } = await supabase
    .from("schedules")
    .select("start_time")
    .eq("id", scheduleId)
    .single();

  if (error) {
    throw new Error("Failed to fetch schedule data");
  }

  const startTime = dayjs(schedule.start_time);
  return startTime.isBefore(dayjs());
}
export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
