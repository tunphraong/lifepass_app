import { NextResponse } from "next/server";
import { createClient } from "../../../../utils/supabase/server";
import { NextRequest } from "next/server";

export async function GET(request, { params }) {
  // const { searchParams } = new URL(req.url);
  // const apptransid = searchParams.get("apptransid");
  const { apptransid } = params;
  console.log("get here", apptransid);

  const supabase = createClient();
  const { data: paymentOrder, error } = await supabase
    .from("zalo_payment_transactions")
    .select("*")
    .eq("transaction_id", apptransid)
    .single();

  if (error || !paymentOrder) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Payment order not found" },
      { status: 404 }
    );
  }


  return NextResponse.json(paymentOrder, { status: 200 });
}
