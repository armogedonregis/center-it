import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/home.json')
    const fileData = await fs.readFile(filePath, 'utf8')
    const data = JSON.parse(fileData)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading home data:', error)
    return NextResponse.json(
      { error: 'Failed to fetch home data' },
      { status: 500 }
    )
  }
} 