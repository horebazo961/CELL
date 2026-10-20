export const metadata = {
  title: "Política de Privacidad · CELL",
};

export default function PrivacidadPage() {
  return (
    <div className="wrap" style={{ padding: "40px 0 60px", maxWidth: 720 }}>
      <h1 style={{ font: "800 32px var(--fd)", marginBottom: 8 }}>
        Política de Privacidad
      </h1>
      <p style={{ color: "var(--mut)", marginBottom: 32 }}>
        Última actualización: 20 de octubre de 2026 · Versión 1.0
      </p>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ font: "700 20px var(--fd)" }}>1. Responsable del tratamiento</h2>
        <p>
          <strong>CELL</strong> (nombre / razón social y RUC a completar por el
          titular del negocio). Domicilio en Quito, Ecuador.
          <br />
          Contacto para privacidad y derechos: WhatsApp{" "}
          <strong>+593 98 2424 244</strong> (asunto: “Derechos LOPDP / datos
          personales”).
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ font: "700 20px var(--fd)" }}>2. Datos que tratamos</h2>
        <ul>
          <li>
            Número de WhatsApp, nombre (si lo indicas) y contenido de los
            mensajes.
          </li>
          <li>
            Datos técnicos de navegación (IP, dispositivo, páginas visitadas) en
            la medida en que el hosting los registre.
          </li>
        </ul>
        <p>
          <strong>No solicitamos</strong> cédula, dirección completa ni datos
          sensibles a través del sitio web.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ font: "700 20px var(--fd)" }}>3. Finalidades y bases legales</h2>
        <ul>
          <li>
            Atender consultas sobre equipos y accesorios y gestionar la posible
            venta (interés legítimo / medidas precontractuales o ejecución de
            contrato).
          </li>
          <li>Mejorar el sitio y la seguridad (interés legítimo).</li>
          <li>Cumplir obligaciones legales cuando apliquen.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ font: "700 20px var(--fd)" }}>4. Conservación</h2>
        <p>
          El tiempo necesario para gestionar la consulta/venta y las
          obligaciones legales. Después se eliminan o anonimizan.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ font: "700 20px var(--fd)" }}>5. Encargados / terceros</h2>
        <p>
          Vercel (hosting), Google (hoja de inventario interno, sin datos de
          clientes), Meta Platforms (WhatsApp Business). No vendemos tus datos.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ font: "700 20px var(--fd)" }}>6. Derechos</h2>
        <p>
          Acceso, rectificación, eliminación, oposición y demás derechos
          reconocidos por la LOPDP. Ejerce escribiendo a +593 98 2424 244
          indicando “Derechos LOPDP”.
        </p>
        <p>
          Autoridad de control: Superintendencia de Protección de Datos
          Personales (SPDP), Ecuador.
        </p>
      </section>

      <section style={{ marginBottom: 28 }}>
        <h2 style={{ font: "700 20px var(--fd)" }}>7. Seguridad</h2>
        <p>
          Separación estricta entre catálogo público e inventario interno,
          acceso Restricted al Google Sheet, Service Account de solo lectura,
          Secrets en el entorno de despliegue, HTTPS y minimización de datos.
        </p>
      </section>

      <p className="note">
        Esta política puede actualizarse. La versión vigente se publica en este
        sitio.
      </p>
    </div>
  );
}
