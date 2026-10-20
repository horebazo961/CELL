import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CELL · Tecnología premium | Quito · Ecuador",
  description:
    "Equipos verificados, accesorios y personalización. Consulta por WhatsApp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
