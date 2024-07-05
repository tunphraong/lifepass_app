// const crypto = require("crypto");
import { createHmac } from "crypto";

const ZALOPAY_APP_ID = process.env.ZALOPAY_APP_ID;
const ZALOPAY_KEY1 = process.env.ZALOPAY_KEY1;
const ZALOPAY_CREATE_ORDER_ENDPOINT = "https://sb-openapi.zalopay.vn/v2/create";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

function generateMac(appid, reqtime, key1, hmac_algorithm = "sha256") {
  const dataToHash = `${appid}|${reqtime}`;
  const hmac = createHmac(hmac_algorithm, key1);
  hmac.update(dataToHash);
  return hmac.digest("hex");
}

const generateOrderId = (userId, scheduleId) => {
  const now = new Date();
  const YY = String(now.getFullYear()).slice(-2);
  const MM = String(now.getMonth() + 1).padStart(2, "0");
  const DD = String(now.getDate()).padStart(2, "0");
  const uniquePart = `${userId}${scheduleId}${now.getTime()}`;

  return `${YY}${MM}${DD}${uniquePart}`;
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
  const { amount, user_id, schedule_id } = await req.json();

  console.log(amount, user_id, schedule_id);
  const reqtime = Date.now();

  const bank_code = "";
  const description = "Test";
  const embed_data = {
    preferred_payment_method: ["vietqr"],
  };

  const app_trans_id = generateOrderId(user_id, schedule_id);
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
    embed_data,
    item
  );
  console.log("Generated MAC:", mac);

  const request = {
    appid: ZALOPAY_APP_ID,
    reqtime: reqtime,
    mac: mac,
  };

  //   const GET_BANK_LIST_URL =
  //     "https://sbgateway.zalopay.vn/api/getlistmerchantbanks";

  //     try {
  //       const response = await fetch(GET_BANK_LIST_URL, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(request),
  //       });

  //       const result = await response.json();
  //       if (result.return_code === 1) {
  //         console.log(result);
  //         return NextResponse.json(result, { status: 200 });
  //       } else {
  //         console.log('get here', result);
  //         return NextResponse.json({ error: result }, { status: 400 });
  //       }
  //     } catch (error) {
  //       return NextResponse.json(
  //         { error: "Internal server error" },
  //         { status: 500 }
  //       );
  //     }

  const order = {
    app_id: ZALOPAY_APP_ID,
    app_user: user_id,
    app_time: reqtime,
    app_trans_id: generateOrderId(user_id, schedule_id),
    amount: amount,
    bank_code: "",
    description: "Test",
    embed_data: {
      preferred_payment_method: ["vietqr"],
    },
    item: [
      {
        itemid: "knb",
        itename: "kim nguyen bao",
        itemprice: 198400,
        itemquantity: 1,
      },
    ],
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

  return NextResponse.json("success", { status: 200 });
}

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
