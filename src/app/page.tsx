import { redirect } from "next/navigation";

/**
 * Redirige al catálogo estático (diseño premium + CSV público del Sheet).
 * Sin Google Cloud / Service Account.
 */
export default function HomePage() {
  redirect("/cell.html");
}
