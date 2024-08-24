import { PaymentStatusConstant } from "@/constants/paymentStatusConstant";
import { getServerTime } from "@/repositories/supabase";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function updateTable(tableName) {
  const now = await getServerTime();
  // const now = new Date("2024-08-25T00:37:52Z");

  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq("status", PaymentStatusConstant.notPaid)
    .lt("updated_at", new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString());

  if (error) {
    console.error(`Error fetching data from ${tableName}:`, error.message);
    return;
  }

  const updates = data.map(async (item) => {
    const timeDifference = now.getTime() - new Date(item.updated_at).getTime();
    const twentyFourHours = 24 * 60 * 60 * 1000;

    if (item.status === PaymentStatusConstant.notPaid && timeDifference >= twentyFourHours) {
      await supabase.from(tableName).update({ status: null }).eq("id", item.id);
    }
  });

  await Promise.all(updates);
}

export async function GET(request) {
  try {
    await updateTable("competition");
    await updateTable("workshop");

    return NextResponse.json({ message: "Statuses checked and updated in both tables" });
  } catch (error) {
    console.error("Error updating statuses:", error);
    return NextResponse.json({ message: "Failed to update statuses" }, { status: 500 });
  }
}
