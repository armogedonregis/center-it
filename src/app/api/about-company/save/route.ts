import { writeFile } from 'fs/promises'
import { NextResponse } from 'next/server'
import path from 'path'
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
  try {
    const content = await request.json()
    const filePath = path.join(process.cwd(), 'src/data/about.json')
    
    await writeFile(filePath, JSON.stringify(content, null, 2))
    
    // Перевалидируем страницу "О компании" после обновления данных
    revalidatePath('/about-company')
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Ошибка сохранения данных о компании:', error)
    return NextResponse.json(
      { error: 'Ошибка сохранения' },
      { status: 500 }
    )
  }
} 