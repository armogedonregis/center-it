import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import { revalidatePath } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const filePath = path.join(process.cwd(), 'src/data/home.json')
    
    // Сохраняем данные в файл с отступами для лучшей читаемости
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
    
    // Перевалидируем главную страницу
    revalidatePath('/')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving home data:', error)
    return NextResponse.json(
      { error: 'Failed to save home data' },
      { status: 500 }
    )
  }
} 