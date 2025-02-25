import { jwtVerify } from 'jose'

export type JWTPayload = {
  username: string
  role: string
  iat: number
  exp: number
}

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key_change_in_production'

export async function verifyJWT(token: string): Promise<JWTPayload> {
  try {
    const secretKey = new TextEncoder().encode(JWT_SECRET)
    
    const { payload } = await jwtVerify(token, secretKey)
    return payload as JWTPayload
  } catch (error) {
    console.error('Ошибка верификации JWT:', error)
    throw new Error('Недействительный токен')
  }
} 