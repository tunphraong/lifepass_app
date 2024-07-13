// const crypto = require("crypto");
import { createHmac } from "crypto";
import { randomBytes } from "crypto";

const ZALOPAY_APP_ID = parseInt(process.env.ZALOPAY_APP_ID);
const ZALOPAY_KEY1 = process.env.ZALOPAY_KEY1;
const ZALOPAY_CREATE_ORDER_ENDPOINT = "https://sb-openapi.zalopay.vn/v2/create";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { createClient } from "../../../utils/supabase/server";

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
  const hmac = createHmac(hmac_algorithm, key1);
  //   hmac_input: app_id +”|”+ app_trans_id +”|”+ app_user +”|”+ amount +"|"+ app_time +”|”+ embed_data +"|"+ item
  const data = `${ZALOPAY_APP_ID}|${app_trans_id}|${app_user}|${amount}|${reqtime}|${embed_data}|${item}`;
  console.log(data);
  hmac.update(data);
  return hmac.digest("hex");
}

export async function POST(req: NextRequest) {
  const { user_id, schedule_id } = await req.json();
  console.log("user id", user_id);
  let amount = 20000;

  // console.log(amount, user_id, schedule_id);
  const reqtime = Date.now();

  const bank_code = "";
  const embed_data = {
    preferred_payment_method: [],
    redirecturl: "https://439f-45-80-186-12.ngrok-free.app/app/payment-result",
  };

  // redirecturl: "https://8217-45-80-187-41.ngrok-free.app/app/payment-result",
  const unique_code = generateUniqueCode(7);
  const app_trans_id = generateOrderId(unique_code);
  const description = `LifePass_${app_trans_id}`
  const item = [
    {
      itemid: "knb",
      itename: "kim nguyen bao",
      itemprice: 198400,
      itemquantity: 1,
    },
  ];

  const mac = generateMacOrder(
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
  console.log("Generated MAC:", mac);

  const request = {
    appid: ZALOPAY_APP_ID,
    reqtime: reqtime,
    mac: mac,
  };

  // callback_url: "https://8217-45-80-187-41.ngrok-free.app/api/callback/zalopay",
  const order = {
    app_id: ZALOPAY_APP_ID,
    app_user: user_id,
    app_time: reqtime,
    app_trans_id: app_trans_id,
    callback_url:
      "https://439f-45-80-186-12.ngrok-free.app/api/callback/zalopay",
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
      const supabase = createClient();

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

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
