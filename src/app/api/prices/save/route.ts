import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { PricesContent } from "@/types/prices";

export async function POST(request: NextRequest) {
  try {
    const data: PricesContent = await request.json();
    
    // Validate data
    if (!data || !data.hero || !data.factors || !data.form) {
      return NextResponse.json(
        { error: "Invalid data format" },
        { status: 400 }
      );
    }
    
    const filePath = path.join(process.cwd(), "src/data/prices.json");
    await writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error saving prices data:", error);
    return NextResponse.json(
      { error: "Failed to save prices data" },
      { status: 500 }
    );
  }
} 