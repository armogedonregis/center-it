import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "src/data/prices.json");
    const fileContent = await readFile(filePath, "utf8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    console.error("Error reading prices file:", error);
    return NextResponse.json(
      { error: "Failed to fetch prices data" },
      { status: 500 }
    );
  }
} 