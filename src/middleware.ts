import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJWT } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  const isAdminPage = path.startsWith('/admin');
  const isLoginPage = path === '/login';
  
  const authToken = request.cookies.get('auth_token')?.value || '';
  const isAuthenticated = authToken && await verifyJWT(authToken).catch(() => false);

  if (isAdminPage && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}; 