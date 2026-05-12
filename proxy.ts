// Arquivo renomeado para: proxy.ts (na raiz do projeto)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) { 
  const logged = request.cookies.get('logged')?.value;

  // Se NÃO estiver logado e tentar entrar no dashboard
  if (!logged && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Se JÁ estiver logado e tentar ir para a tela de login (/)
  if (logged && request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/'], // Monitora estas rotas
};