# CELL — Catálogo premium (Quito)

Next.js 15 + Google Sheets (Service Account de **solo lectura**) + Vercel.

**Fuente de verdad:** Google Sheet Restricted  
**WhatsApp comercial:** +593 98 2424 244

---

## 1. Seguridad (LOPDP + Ciberseguridad)

- El Sheet está en **Restricted** (solo cuentas necesarias).
- Next.js lee el inventario con una **Service Account de solo lectura**.
- Las credenciales viven **solo** como Secrets en Vercel (nunca en el frontend ni en Git).
- El endpoint `/api/inventory` y las Server Components nunca exponen `imei_interno` ni `precio_compra_interno`.
- Política de Privacidad y textos de “cierre humano” incluidos.

---

## 2. Configurar la Service Account (una sola vez)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/) → crea o elige un proyecto.
2. Habilita **Google Sheets API**.
3. Crea una **Service Account**.
4. Genera una clave JSON y descárgala (guárdala en lugar seguro).
5. Abre el Google Sheet de inventario → **Compartir** → pega el email de la Service Account → rol **Viewer** (solo lectura).
6. Copia de la clave JSON:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

---

## 3. Variables de entorno en Vercel (Secrets)

En el proyecto de Vercel → **Settings → Environment Variables**:

| Nombre                         | Tipo    | Valor                                      |
|--------------------------------|---------|--------------------------------------------|
| `GOOGLE_SHEETS_ID`             | Config  | `1gJpMqcK_xzokwBxYUsF5Fyg_Yuh-N8uU3xVzOjaqjUc` |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | **Secret** | email de la Service Account             |
| `GOOGLE_PRIVATE_KEY`           | **Secret** | contenido de `private_key` (con `\n`)   |

- Marca **Secret** (no Config) para email y private_key.
- Aplica a **Production** (y Preview si quieres).
- Después de guardar → **Redeploy**.

---

## 4. Conectar este repositorio a Vercel (paso a paso)

1. Entra a [vercel.com](https://vercel.com) e inicia sesión (preferible con GitHub).
2. **Add New… → Project**.
3. Importa el repositorio **`horebazo961/CELL`**.
4. Framework Preset: **Next.js** (debe detectarse solo).
5. Root Directory: dejar vacío (o `.`).
6. **Environment Variables**: añade las 3 variables de la tabla anterior **antes** del primer deploy.
7. Haz clic en **Deploy**.
8. Cuando termine tendrás una URL pública tipo `https://cell-xxxx.vercel.app`.

### Verificación post-deploy

- Abre la URL → debe cargar el catálogo (o el mensaje de error claro si faltan Secrets).
- Prueba un CTA de WhatsApp en el móvil.
- Confirma que `/privacidad` muestra la política.

---

## 5. Desarrollo local

```bash
cp .env.example .env.local
# Completa GOOGLE_SERVICE_ACCOUNT_EMAIL y GOOGLE_PRIVATE_KEY

npm install
npm run dev
```

Abre http://localhost:3000

---

## 6. Estructura principal

```
src/
  app/
    page.tsx              → Catálogo (Server Component)
    privacidad/page.tsx   → Política de Privacidad
    api/inventory/route.ts→ Endpoint de inventario (solo servidor)
  lib/
    sheets.ts             → Lectura segura del Google Sheet
```

---

## 7. Próximos pasos (Fase 1 restante)

- [ ] Completar nombre/RUC en la Política de Privacidad
- [ ] Migrar el Integration Hub completo del `index.html` original (opcional)
- [ ] Añadir fotos reales desde `fotos_urls`
- [ ] Dominio personalizado en Vercel

---

**Principio rector:**  
Primero fuente de verdad (Sheet Restricted) → luego sitio que solo lee → después automatización.
