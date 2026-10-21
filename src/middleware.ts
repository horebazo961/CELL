import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Sirve el catálogo SPA en la raíz sin cambiar la URL del navegador a /cell.html.
 * /api/* y /privacidad siguen en Next.js.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/" || pathname === "") {
    return NextResponse.rewrite(new URL("/cell.html", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
