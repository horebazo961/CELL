# DyTech (CELL) — Catálogo premium (Quito)

**URL pública canónica (usar esta desde el teléfono):**  
**https://cell-2dfk.vercel.app**

> No usar rutas antiguas tipo `/cell.html`. La app vive en la raíz (`/`).

Next.js 15 + Google Sheets (CSV público / proxy) + Vercel.

| | |
|---|---|
| **Producción** | https://cell-2dfk.vercel.app |
| **Repo** | https://github.com/horebazo961/CELL |
| **Marca** | DyTech |
| **WhatsApp** | Tigo +593 99 579 2922 · Claro +593 99 301 7483 |
| **Fuente de verdad** | Google Sheet (CSV publicado → `/api/catalog`) |

---

## 1. Seguridad (LOPDP + Ciberseguridad)

- El Sheet de inventario interno puede permanecer Restricted.
- El catálogo público se sirve vía CSV publicado + proxy Next.js `/api/catalog` (sin secretos en el frontend).
- `/api/inventory` (Service Account) es opcional y solo servidor; nunca expone `imei_interno` ni `precio_compra_interno`.
- Política de Privacidad en `/privacidad`.

---

## 2. Configurar la Service Account (opcional, solo si usas `/api/inventory`)

1. Ve a [Google Cloud Console](https://console.cloud.google.com/) → crea o elige un proyecto.
2. Habilita **Google Sheets API**.
3. Crea una **Service Account**.
4. Genera una clave JSON y descárgala (guárdala en lugar seguro).
5. Abre el Google Sheet de inventario → **Compartir** → pega el email de la Service Account → rol **Viewer** (solo lectura).
6. Copia de la clave JSON:
   - `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
   - `private_key` → `GOOGLE_PRIVATE_KEY`

---

## 3. Variables de entorno en Vercel

En el proyecto de Vercel → **Settings → Environment Variables** (solo si usas Service Account):

| Nombre                         | Tipo    | Valor                                      |
|--------------------------------|---------|--------------------------------------------|
| `GOOGLE_SHEETS_ID`             | Config  | ID del Sheet                               |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | **Secret** | email de la Service Account             |
| `GOOGLE_PRIVATE_KEY`           | **Secret** | contenido de `private_key` (con `\n`)   |

Para el modo CSV público actual **no hace falta** Service Account: el catálogo lee el CSV publicado.

---

## 4. Conectar este repositorio a Vercel

1. Entra a [vercel.com](https://vercel.com) e inicia sesión (preferible con GitHub).
2. **Add New… → Project**.
3. Importa el repositorio **`horebazo961/CELL`**.
4. Framework Preset: **Next.js**.
5. **Deploy**.
6. URL de producción aceptada: **https://cell-2dfk.vercel.app**

### Verificación post-deploy

- Abre https://cell-2dfk.vercel.app → catálogo DyTech.
- Prueba un CTA de WhatsApp en el móvil.
- Confirma que `/privacidad` muestra la política.

---

## 5. Desarrollo local

```bash
cp .env.example .env.local
npm install
npm run dev
```

Abre http://localhost:3000

---

## 6. Estructura principal

```
src/
  app/
    page.tsx                 → Catálogo (CatalogPlatform)
    privacidad/page.tsx      → Política de Privacidad
    api/catalog/route.ts     → Proxy CSV público
    api/inventory/route.ts   → Endpoint opcional Service Account
  components/
    catalog-platform.tsx     → UI catálogo + contacto
  lib/
    sheets.ts                → Lectura Sheet (servidor)
    logo.ts                  → Logo DyTech
public/
  dytech-logo.webp           → Logo estático
```

---

## 7. Próximos pasos

- [ ] Completar nombre/RUC en la Política de Privacidad
- [ ] Añadir fotos reales desde `fotos_urls`
- [ ] Foto hero real (`public/hero-phone.webp`)
- [ ] Dominio personalizado en Vercel (opcional)

---

**Principio rector:**  
Primero fuente de verdad → luego sitio que solo lee → después automatización.

**URL canónica de producción:** https://cell-2dfk.vercel.app
