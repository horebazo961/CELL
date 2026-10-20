import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CSV_CELULARES =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRu-3dyDh5xRn7UOp14h3iQG9NwXiVjh4eeyOryAoNMh8T6cU8BMOaSk6vT9Cmxe3FFHgE9HuRbxjBb/pub?gid=348736088&single=true&output=csv";

const CSV_ACCESORIOS =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRu-3dyDh5xRn7UOp14h3iQG9NwXiVjh4eeyOryAoNMh8T6cU8BMOaSk6vT9Cmxe3FFHgE9HuRbxjBb/pub?gid=1739504398&single=true&output=csv";

/**
 * Proxy server-side del CSV público de Google Sheets.
 * Evita TypeError: Failed to fetch por CORS/redirect en el navegador.
 * Query: ?tipo=celulares | ?tipo=accesorios
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tipo = (searchParams.get("tipo") || "celulares").toLowerCase();
  const url = tipo === "accesorios" ? CSV_ACCESORIOS : CSV_CELULARES;

  try {
    const res = await fetch(url, {
      cache: "no-store",
      redirect: "follow",
      headers: {
        Accept: "text/csv,text/plain,*/*",
        "User-Agent": "CELL-Catalog-Proxy/1.0",
      },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Google CSV HTTP ${res.status}` },
        { status: 502 }
      );
    }

    const text = await res.text();
    return new NextResponse(text, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Error al leer CSV";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
