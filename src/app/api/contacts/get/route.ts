import { readFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'src/data/contacts.json')
    const content = await readFile(filePath, 'utf-8')
    return NextResponse.json(JSON.parse(content))
  } catch (error) {
    return NextResponse.json(
      { error: 'Ошибка получения данных' },
      { status: 500 }
    )
  }
} 