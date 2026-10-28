"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  sku: string;
  brand: string;
  model: string;
  variant?: string;
  price: number;
  cond?: string;
  warranty?: string;
  storage?: number;
  img?: string;
  notes?: string;
};

const phones = [
  { label: "Principal", number: "593993017483", display: "+593 99 301 7483" },
  { label: "Alterno", number: "593995792922", display: "+593 99 579 2922" },
];
const whatsapp = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
const money = (value: number) =>
  new Intl.NumberFormat("es-EC", { style: "currency", currency: "USD" }).format(
    value
  );

export function CatalogPlatform() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/catalog?tipo=celulares")
      .then((r) => r.text())
      .then((csv) => setProducts(parseCsv(csv)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  const brands = useMemo(
    () => [...new Set(products.map((p) => p.brand))].sort(),
    [products]
  );
  const filtered = useMemo(
    () =>
      products.filter((p) => {
        const text = `${p.brand} ${p.model} ${p.variant ?? ""}`.toLocaleLowerCase(
          "es"
        );
        return (
          (!query || text.includes(query.toLocaleLowerCase("es"))) &&
          (!brand || p.brand === brand)
        );
      }),
    [products, query, brand]
  );

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="brand" href="#inicio">
            <i aria-hidden="true" />
            DyTech
          </a>
          <nav aria-label="Navegación principal">
            <a href="#catalogo">Catálogo</a>
            <a href="#showroom">Showroom</a>
            <a href="#contacto">Contacto</a>
          </nav>
        </div>
      </header>
      <main>
        <section id="inicio" className="hero">
          <div className="wrap hero-grid">
            <div>
              <p className="eyebrow">TECNOLOGÍA DE CALIDAD</p>
              <h1>
                Equipos que se adaptan a <em>tu ritmo.</em>
              </h1>
              <p className="hero-copy">
                Encuentra celulares seleccionados, con condición, garantía y
                precio claro. Revisa nuestro catálogo y habla con un asesor
                cuando estés listo.
              </p>
              <div className="actions">
                <a className="btn" href="#catalogo">
                  Explorar catálogo
                </a>
                <a className="btn sec" href="#contacto">
                  Conocer DyTech
                </a>
              </div>
            </div>
            <div className="hero-card">
              <span>Catálogo actualizado</span>
              <strong>{loading ? "—" : products.length || "0"}</strong>
              <small>equipos disponibles</small>
            </div>
          </div>
        </section>
        <section id="catalogo" className="section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">SELECCIÓN DYTECH</p>
                <h2>Celulares disponibles</h2>
                <p>
                  Filtra el catálogo y consulta por WhatsApp para confirmar
                  stock, condición y precio final.
                </p>
              </div>
              <span className="count">{filtered.length} equipos</span>
            </div>
            <div className="filters">
              <label>
                Buscar
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Marca o modelo"
                />
              </label>
              <label>
                Marca
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option value="">Todas las marcas</option>
                  {brands.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="product-grid">
              {filtered.map((p) => (
                <ProductCard key={p.sku} product={p} />
              ))}
            </div>
            {!loading && !filtered.length && (
              <div className="empty">
                No encontramos equipos con esos criterios.
              </div>
            )}
          </div>
        </section>
        <section id="showroom" className="section section-tint">
          <div className="wrap split">
            <div>
              <p className="eyebrow">EXPERIENCIA DYTECH</p>
              <h2>Más que un equipo.</h2>
              <p>
                Te acompañamos a elegir tecnología que realmente encaje contigo,
                con atención cercana y respuestas claras.
              </p>
            </div>
            <div className="feature-list">
              <p>
                <b>01</b> Curaduría de equipos
              </p>
              <p>
                <b>02</b> Información transparente
              </p>
              <p>
                <b>03</b> Atención personalizada
              </p>
            </div>
          </div>
        </section>
        <section id="contacto" className="section contact">
          <div className="wrap contact-card">
            <div>
              <p className="eyebrow">HABLEMOS</p>
              <h2>¿Tienes un equipo en mente?</h2>
              <p>
                Escríbenos para confirmar disponibilidad, condición, garantía y
                precio final antes de tu compra.
              </p>
            </div>
            <div className="contact-numbers">
              {phones.map((phone) => (
                <a
                  className="contact-number"
                  key={phone.number}
                  href={whatsapp(
                    phone.number,
                    "Hola DyTech, quiero información sobre un celular."
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{phone.label}</span>
                  <strong>{phone.display}</strong>
                  <small>Consultar por WhatsApp ↗</small>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer>
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} DyTech</span>
          <a href="#inicio">Volver arriba</a>
        </div>
      </footer>
    </>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        {p.img ? (
          <img src={p.img} alt={`${p.brand} ${p.model}`} />
        ) : (
          <div className="phone-mark" aria-hidden="true" />
        )}
      </div>
      <div className="product-body">
        <span className="product-brand">{p.brand}</span>
        <h3>{p.model}</h3>
        <p className="muted">{p.variant || "Variante por confirmar"}</p>
        <div className="tags">
          <span>{p.cond || "Disponible"}</span>
          {p.storage ? <span>{p.storage} GB</span> : null}
          {p.warranty ? <span>{p.warranty}</span> : null}
        </div>
        <strong className="price">{money(p.price)}</strong>
        <small className="muted">USD · confirmar precio final</small>
        {p.notes ? <small className="muted">{p.notes}</small> : null}
        <a
          className="btn"
          href={whatsapp(
            phones[0].number,
            `Hola DyTech, me interesa ${p.brand} ${p.model}${p.variant ? ` ${p.variant}` : ""}. ¿Pueden confirmar disponibilidad y precio final?`
          )}
          target="_blank"
          rel="noreferrer"
        >
          Consultar equipo ↗
        </a>
      </div>
    </article>
  );
}

/** Parseo CSV compatible con campos entre comillas (precios 1,499.00). */
function parseCsvRows(input: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    const next = input[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(field);
      field = "";
    } else if (ch === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (ch === "\r") {
      // ignore CR (CRLF)
    } else {
      field += ch;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function parsePrice(raw: string | undefined): number {
  if (!raw) return NaN;
  const cleaned = raw.replace(/[^\d.-]/g, "").replace(",", ".");
  return Number(cleaned);
}

function parseCsv(input: string): Product[] {
  const rows = parseCsvRows(input).filter((r) => r.some((c) => c.trim()));
  if (rows.length < 2) return [];

  const headers = rows[0].map((h) => h.trim().toLowerCase());
  const ix = (key: string) => headers.indexOf(key);

  const products: Product[] = [];

  for (const r of rows.slice(1)) {
    const sku = (r[ix("sku")] || "").trim();
    if (!sku || sku.toUpperCase().startsWith("NOTA")) continue;

    const publicado = (r[ix("publicado")] || "").trim().toUpperCase();
    const estado = (r[ix("estado")] || "").trim().toLowerCase();
    if (publicado && publicado !== "TRUE") continue;
    if (estado && estado !== "disponible") continue;

    const brand = (r[ix("marca")] || "").trim();
    const model = (r[ix("modelo")] || "").trim();
    const price = parsePrice(r[ix("precio")]);
    if (!brand || !model || !Number.isFinite(price) || price <= 0) continue;

    const variant = (r[ix("variante")] || "").trim();
    const fotos =
      (r[ix("fotos_urls")] || r[ix("imagen_url")] || "").trim().split("|")[0] ||
      undefined;

    products.push({
      sku,
      brand,
      model,
      variant: variant || undefined,
      price,
      cond: (r[ix("condicion")] || "").trim() || undefined,
      warranty: (r[ix("garantia")] || "").trim() || undefined,
      storage: Number((variant || "").match(/\d+/)?.[0]) || undefined,
      img: fotos,
      notes: (r[ix("notas_condicion")] || "").trim() || undefined,
    });
  }

  return products;
}
