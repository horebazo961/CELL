import { getCelulares, getAccesorios } from "@/lib/sheets";

export const dynamic = "force-dynamic";

const WA = "593982424244";

function money(precio: number, moneda = "USD") {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(precio);
}

function waLink(sku: string, marca: string, modelo: string) {
  const text = encodeURIComponent(
    `Hola CELL, me interesa el equipo ${marca} ${modelo} (SKU: ${sku}). ¿Sigue disponible y cuál es el precio final?`
  );
  return `https://wa.me/${WA}?text=${text}`;
}

export default async function HomePage() {
  let celulares: Awaited<ReturnType<typeof getCelulares>> = [];
  let accesorios: Awaited<ReturnType<typeof getAccesorios>> = [];
  let error: string | null = null;

  try {
    [celulares, accesorios] = await Promise.all([
      getCelulares(),
      getAccesorios(),
    ]);
  } catch (e) {
    error =
      e instanceof Error
        ? e.message
        : "No se pudo cargar el inventario. Revisa Secrets en Vercel.";
  }

  return (
    <div>
      <section style={{ padding: "48px 0 32px", background: "var(--surf)" }}>
        <div className="wrap">
          <h1
            style={{
              font: "800 42px/1.15 var(--fd)",
              margin: "0 0 12px",
              letterSpacing: "-0.02em",
            }}
          >
            Tecnología premium verificada
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "var(--mut)",
              maxWidth: "52ch",
              margin: "0 0 24px",
            }}
          >
            Celulares y accesorios con stock real. Consulta disponibilidad y
            precio final directamente por WhatsApp con un asesor.
          </p>
          <a
            className="btn"
            href={`https://wa.me/${WA}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Escribir por WhatsApp
          </a>
          <p className="note" style={{ marginTop: 20 }}>
            Abrir WhatsApp no completa una compra ni una reserva. Un asesor
            confirma disponibilidad, condición, garantía y precio final.
          </p>
        </div>
      </section>

      <section id="catalogo" style={{ padding: "40px 0" }}>
        <div className="wrap">
          <h2 style={{ font: "700 28px var(--fd)", margin: "0 0 8px" }}>
            Catálogo de equipos
          </h2>
          <p style={{ color: "var(--mut)", margin: "0 0 24px" }}>
            {error
              ? "Error al cargar inventario"
              : `${celulares.length} equipo${celulares.length === 1 ? "" : "s"} disponible${celulares.length === 1 ? "" : "s"}`}
          </p>

          {error && (
            <div className="note" style={{ marginBottom: 24 }}>
              {error}
              <br />
              <small>
                Configura GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_PRIVATE_KEY como
                Secrets en Vercel y comparte el Sheet con la Service Account
                (Viewer).
              </small>
            </div>
          )}

          {!error && celulares.length === 0 && (
            <div className="note">
              No hay equipos publicados en este momento. Vuelve a consultar
              pronto o escribe por WhatsApp.
            </div>
          )}

          <ul className="grid">
            {celulares.map((o) => (
              <li key={o.sku} className="card">
                <span className="badge">{o.condicion}</span>
                <h3>
                  {o.marca} {o.modelo}
                </h3>
                <div className="meta">{o.variante}</div>
                <div className="price">{money(o.precio, o.moneda)}</div>
                <div className="meta">
                  SKU {o.sku} · Garantía {o.garantia || "consultar"}
                </div>
                {o.notas_condicion && (
                  <div className="meta" style={{ marginTop: 4 }}>
                    {o.notas_condicion}
                  </div>
                )}
                <a
                  className="btn"
                  style={{ marginTop: "auto", alignSelf: "flex-start" }}
                  href={waLink(o.sku, o.marca, o.modelo)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {accesorios.length > 0 && (
        <section style={{ padding: "20px 0 48px" }}>
          <div className="wrap">
            <h2 style={{ font: "700 28px var(--fd)", margin: "0 0 20px" }}>
              Accesorios
            </h2>
            <ul className="grid">
              {accesorios.map((a) => (
                <li key={a.id} className="card">
                  <span style={{ fontSize: 28 }}>{a.icono}</span>
                  <h3>{a.titulo}</h3>
                  <div className="meta">{a.subtitulo}</div>
                  <div className="price">{money(a.precio, a.moneda)}</div>
                  <p
                    style={{
                      fontSize: 14,
                      color: "var(--mut)",
                      margin: "4px 0 12px",
                    }}
                  >
                    {a.descripcion}
                  </p>
                  <a
                    className="btn sec"
                    href={`https://wa.me/${WA}?text=${encodeURIComponent(
                      `Hola CELL, me interesa el accesorio: ${a.titulo}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Consultar
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
