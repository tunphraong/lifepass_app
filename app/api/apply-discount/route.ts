import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { createClient } from "../../../utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { discountCode, scheduleId, userId, originalPrice } = await req.json();

  console.log(discountCode);

  const { data: discount, error } = await supabase
    .from("discounts")
    .select("*")
    .eq("code", discountCode)
    .single();

  console.log(discount);
  if (error || !discount) {
    console.log(error);
    return NextResponse.json(
      { error: "Invalid discount code" },
      { status: 400 }
    );
  }

  // Check if the discount code is active and within its date range
  const currentDate = new Date();
  if (
    !discount.is_active ||
    (discount.start_date && new Date(discount.start_date) > currentDate) ||
    (discount.end_date && new Date(discount.end_date) < currentDate)
  ) {
    return NextResponse.json(
      { error: "Discount code is not active." },
      { status: 500 }
    );
  }

  // todo Check if the user has already used this discount

  // Calculate the discount amount
  let discountAmount = 0;

  if (discount.lifepass_percentage) {
    console.log('get here', discount.lifepass_percentage)
    console.log(originalPrice);
    discountAmount += (originalPrice * discount.lifepass_percentage) / 100;
    console.log(discountAmount)
  }

  if (discount.studio_percentage) {
    discountAmount += (originalPrice * discount.studio_percentage) / 100;
  }

  const finalPrice = originalPrice - discountAmount;

  console.log(discountAmount, finalPrice);

  return NextResponse.json({ discountAmount, finalPrice }, { status: 200 });
}

export async function GET(request: Request) {}

export async function HEAD(request: Request) {}

export async function PUT(request: Request) {}

export async function DELETE(request: Request) {}

export async function PATCH(request: Request) {}

// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and  set the appropriate Response `Allow` header depending on the other methods defined in the route handler.
export async function OPTIONS(request: Request) {}
