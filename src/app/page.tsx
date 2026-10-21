/**
 * La raíz `/` la reescribe middleware a `/cell.html` (URL limpia).
 * Este page solo existe para que el App Router no falle el build.
 * No debe hacer redirect: eso pondría cell.html en la barra de direcciones.
 */
export default function HomePage() {
  return null;
}
