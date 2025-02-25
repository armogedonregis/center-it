import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { v4 as uuidv4 } from 'uuid';

// Данные админа берем из переменных окружения
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key_change_in_production';

export async function POST(request: Request) {
  try {
    // Получаем учетные данные из запроса
    const { username, password } = await request.json();

    // Проверяем учетные данные
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json({ 
        message: 'Неверное имя пользователя или пароль' 
      }, { status: 401 });
    }

    // Генерируем JWT токен
    const token = await new SignJWT({ username, role: 'admin' })
      .setProtectedHeader({ alg: 'HS256' })
      .setJti(uuidv4())
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(new TextEncoder().encode(JWT_SECRET));

    // Создаем ответ
    const response = NextResponse.json({
      message: 'Авторизация успешна',
      success: true
    });

    // Устанавливаем куки с токеном
    response.cookies.set({
      name: 'auth_token',
      value: token,
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 7, // 7 дней
      path: '/',
      secure: false,
      sameSite: 'strict'
    });

    return response;
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    return NextResponse.json({ 
      message: 'Внутренняя ошибка сервера' 
    }, { status: 500 });
  }
} 