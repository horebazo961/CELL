import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DyTech | Tecnología de calidad a tu alcance",
  description:
    "Catálogo de celulares DyTech con información clara, atención personalizada y consulta directa por WhatsApp.",
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
