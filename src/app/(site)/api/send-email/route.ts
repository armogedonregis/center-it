import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { headers } from "next/headers";

// Хранилище для rate limiting
const rateLimit = new Map<string, { count: number; timestamp: number }>();

// Настройки rate limiting
const WINDOW_SIZE = 360000; // 10 минут в миллисекундах
const MAX_REQUESTS = 5; // максимум 5 запросов в час

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: Request) {
  try {
    // Получаем IP
    const headersList = await headers();
    const ip =
      headersList.get("x-forwarded-for") ||
      headersList.get("x-real-ip") ||
      "anonymous";

    // Проверяем rate limit
    const now = Date.now();
    const userRateLimit = rateLimit.get(ip);

    if (userRateLimit) {
      // Очищаем старые записи
      if (now - userRateLimit.timestamp > WINDOW_SIZE) {
        rateLimit.set(ip, { count: 1, timestamp: now });
      } else if (userRateLimit.count >= MAX_REQUESTS) {
        // Вычисляем оставшееся время
        const timeLeft = Math.ceil(
          (WINDOW_SIZE - (now - userRateLimit.timestamp)) / 1000
        );

        return NextResponse.json(
          {
            error: `Превышен лимит отправки форм. Попробуйте через ${timeLeft} секунд`,
          },
          { status: 429 }
        );
      } else {
        // Увеличиваем счетчик
        rateLimit.set(ip, {
          count: userRateLimit.count + 1,
          timestamp: userRateLimit.timestamp,
        });
      }
    } else {
      // Первый запрос от этого IP
      rateLimit.set(ip, { count: 1, timestamp: now });
    }

    const { name, phone, email, description } = await request.json();

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Необходимо заполнить обязательные поля" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "Новая заявка с сайта",
      html: `
        <h2>Новая заявка с сайта</h2>
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Телефон:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Описание:</strong> ${description || "Не указано"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    // Возвращаем информацию о оставшихся попытках
    const currentLimit = rateLimit.get(ip);
    const remainingRequests = MAX_REQUESTS - (currentLimit?.count || 0);

    return NextResponse.json({
      success: true,
      remaining: remainingRequests,
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Ошибка при отправке формы" },
      { status: 500 }
    );
  }
}
