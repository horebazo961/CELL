/**
 * Lectura segura del inventario CELL desde Google Sheets.
 * Solo se ejecuta en el servidor (Server Components / Route Handlers).
 * Nunca expone credenciales al cliente ni imei/precio_compra.
 */

import { google } from "googleapis";

const SPREADSHEET_ID =
  process.env.GOOGLE_SHEETS_ID ||
  "1gJpMqcK_xzokwBxYUsF5Fyg_Yuh-N8uU3xVzOjaqjUc";

export type Celular = {
  sku: string;
  marca: string;
  modelo: string;
  variante: string;
  condicion: string;
  precio: number;
  moneda: string;
  cantidad: number;
  estado: string;
  garantia: string;
  notas_condicion: string;
  publicado: boolean;
  fotos_urls: string;
  fecha_ingreso: string;
};

export type Accesorio = {
  id: string;
  titulo: string;
  subtitulo: string;
  precio: number;
  moneda: string;
  categoria: string;
  descripcion: string;
  publicado: boolean;
  icono: string;
  pos_hub: number;
};

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!email || !privateKey) {
    throw new Error(
      "Faltan GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_PRIVATE_KEY. Configúralos como Secrets en Vercel."
    );
  }

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

function parseNumber(val: unknown): number {
  if (typeof val === "number") return val;
  if (typeof val === "string") {
    const cleaned = val.replace(/[^\d.-]/g, "").replace(",", ".");
    return Number(cleaned) || 0;
  }
  return 0;
}

function parseBool(val: unknown): boolean {
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return val.toUpperCase() === "TRUE";
  return false;
}

export async function getCelulares(): Promise<Celular[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Celulares!A:N",
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0].map((h) => String(h).toLowerCase().trim());
  const data: Celular[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row[0]) continue;

    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] != null ? String(row[idx]) : "";
    });

    const publicado = parseBool(obj.publicado);
    const cantidad = parseNumber(obj.cantidad);
    const estado = (obj.estado || "").toLowerCase();

    if (!publicado || cantidad < 1 || estado !== "disponible") continue;

    data.push({
      sku: obj.sku || "",
      marca: obj.marca || "",
      modelo: obj.modelo || "",
      variante: obj.variante || "",
      condicion: obj.condicion || "",
      precio: parseNumber(obj.precio),
      moneda: obj.moneda || "USD",
      cantidad,
      estado,
      garantia: obj.garantia || "",
      notas_condicion: obj.notas_condicion || "",
      publicado: true,
      fotos_urls: obj.fotos_urls || "",
      fecha_ingreso: obj.fecha_ingreso || "",
    });
  }

  return data;
}

export async function getAccesorios(): Promise<Accesorio[]> {
  const auth = getAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: "Accesorios!A:J",
  });

  const rows = res.data.values;
  if (!rows || rows.length < 2) return [];

  const headers = rows[0].map((h) => String(h).toLowerCase().trim());
  const data: Accesorio[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    if (!row || !row[0]) continue;

    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = row[idx] != null ? String(row[idx]) : "";
    });

    if (!parseBool(obj.publicado)) continue;

    data.push({
      id: obj.id || "",
      titulo: obj.titulo || "",
      subtitulo: obj.subtitulo || "",
      precio: parseNumber(obj.precio),
      moneda: obj.moneda || "USD",
      categoria: obj.categoria || "",
      descripcion: obj.descripcion || "",
      publicado: true,
      icono: obj.icono || "",
      pos_hub: parseNumber(obj.pos_hub),
    });
  }

  return data;
}
