import { NextResponse } from 'next/server';

export async function POST() {
  // Создаем ответ
  const response = NextResponse.json({ message: 'Выход выполнен успешно' });
  
  // Удаляем куки авторизации в ответе
  response.cookies.delete('auth_token');
  
  return response;
} 