# DyTech (CELL) — Catálogo premium (Quito)

**Producción canónica:** https://cell-2dfk.vercel.app

Next.js 15 · Google Sheets (CSV → `/api/catalog`) · Vercel · WhatsApp como cierre comercial.

| | |
|---|---|
| **URL** | https://cell-2dfk.vercel.app |
| **Repo** | https://github.com/horebazo961/CELL |
| **Marca** | DyTech |
| **WhatsApp** | Tigo +593 99 579 2922 · Claro +593 99 301 7483 |
| **Fuente de verdad** | Google Sheet → CSV publicado → proxy `/api/catalog` |

---

## Lógica del sistema

1. **Fuente de verdad** = Google Sheet (solo el dueño edita).
2. **Sitio** = solo lectura. Proxy `/api/catalog` sirve el CSV filtrado (`publicado=TRUE`, `estado=disponible`).
3. **Cierre** = WhatsApp (Tigo / Claro, sin jerarquía). No hay carrito ni pago en la web.
4. **Hero** = visual del equipo de mayor precio del catálogo (ancla de gama alta).
5. **CTA de producto** → sección Contacto (el usuario elige operadora).

---

## Seguridad

- Catálogo público vía CSV; sin secretos en el frontend.
- `/api/inventory` (Service Account) es opcional y solo servidor.
- Política de Privacidad: `/privacidad`.

---

## Desarrollo local

```bash
cp .env.example .env.local
npm install
npm run dev
```

---

## Estructura

```
src/app/page.tsx              → Catálogo
src/app/api/catalog/route.ts  → Proxy CSV
src/components/catalog-platform.tsx
src/lib/logo.ts
public/dytech-logo.webp
```

**Principio rector:** fuente de verdad → sitio que solo lee → automatización posterior.
