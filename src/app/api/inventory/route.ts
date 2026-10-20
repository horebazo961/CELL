import { NextResponse } from "next/server";
import { getCelulares, getAccesorios } from "@/lib/sheets";

/**
 * Endpoint de solo lectura del inventario.
 * Se ejecuta exclusivamente en el servidor.
 * No expone IMEI ni precios de compra.
 */
export async function GET() {
  try {
    const [celulares, accesorios] = await Promise.all([
      getCelulares(),
      getAccesorios(),
    ]);

    return NextResponse.json(
      {
        ok: true,
        updatedAt: new Date().toISOString(),
        celulares,
        accesorios,
      },
      {
        headers: {
          "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (err) {
    console.error(
      "[CELL inventory]",
      err instanceof Error ? err.message : err
    );
    return NextResponse.json(
      {
        ok: false,
        error:
          "No se pudo cargar el inventario. Revisa la configuración de Service Account.",
      },
      { status: 500 }
    );
  }
}
