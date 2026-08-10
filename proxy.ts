import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const protectedEntry = request.nextUrl.clone();
  protectedEntry.pathname = '/24game/play';
  protectedEntry.search = '';
  return NextResponse.redirect(protectedEntry);
}

export const config = {
  matcher: ['/games/24-point/:path*'],
};
