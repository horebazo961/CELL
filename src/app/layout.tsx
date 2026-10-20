import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CELL · Tecnología premium | Quito · Ecuador",
  description:
    "Equipos verificados, accesorios y personalización. Consulta disponibilidad y precio final por WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=IBM+Plex+Sans:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <header>
          <div
            className="wrap"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a className="brand" href="/">
              <i />
              CELL
            </a>
            <nav style={{ display: "flex", gap: 24 }}>
              <a
                href="/#catalogo"
                style={{ color: "var(--inkmut)", textDecoration: "none" }}
              >
                Catálogo
              </a>
              <a
                href="/privacidad"
                style={{ color: "var(--inkmut)", textDecoration: "none" }}
              >
                Privacidad
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer>
          <div className="wrap">
            <p>
              <strong style={{ color: "var(--inktx)" }}>CELL</strong> ·
              Tecnología premium verificada · Quito, Ecuador
            </p>
            <p>
              WhatsApp comercial:{" "}
              <a
                href="https://wa.me/593982424244"
                target="_blank"
                rel="noopener noreferrer"
              >
                +593 98 2424 244
              </a>
            </p>
            <p style={{ marginTop: 12 }}>
              <a href="/privacidad">Política de Privacidad</a> · Abrir WhatsApp
              no completa una compra ni una reserva. Un asesor confirma
              disponibilidad, condición, garantía y precio final.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
