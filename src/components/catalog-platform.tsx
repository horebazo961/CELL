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

/** Números de contacto sin jerarquía. Orden: Tigo, Claro. */
const phones = [
  { label: "Tigo", number: "593995792922", display: "+593 99 579 2922" },
  { label: "Claro", number: "593993017483", display: "+593 99 301 7483" },
];

/**
 * Foto de prueba (Unsplash) hasta foto real en public/hero-phone.webp
 */
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&q=85";

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
  const [heroImgOk, setHeroImgOk] = useState(true);

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

  const stockCount = loading ? null : products.length;
  const featured = products[0];

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
            <a href="#beneficios">Por qué DyTech</a>
            <a href="#contacto">Consultar</a>
          </nav>
        </div>
      </header>

      <main>
        {/* 1. Título atractivo + 3. Imagen + CTA primario */}
        <section id="inicio" className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy-block">
              <p className="eyebrow">CELULARES VERIFICADOS EN QUITO</p>
              <h1>
                Elige tu equipo.{" "}
                <em>Confirma stock y precio por WhatsApp.</em>
              </h1>
              <p className="hero-trust">
                Stock real · condición verificada · garantía incluida
              </p>
              {/* 2. Contenido directo: reglas de la oferta en una línea */}
              <p className="hero-copy">
                Revisa el catálogo, elige el modelo y escribe a un vendedor
                especializado. Te confirmamos disponibilidad, condición y precio
                final antes de cualquier pago.
              </p>
              <div className="actions">
                <a className="btn" href="#catalogo">
                  Ver equipos disponibles
                </a>
                <a className="btn sec" href="#contacto">
                  Escribir al vendedor
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-visual-glow" aria-hidden="true" />
              <div className="hero-stock-badge">
                <span>Disponibles ahora</span>
                <strong>{stockCount === null ? "—" : stockCount}</strong>
                <small>equipos en catálogo</small>
              </div>
              <div className="hero-product">
                {heroImgOk ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="hero-product-img"
                    src={HERO_IMAGE}
                    alt={
                      featured
                        ? `${featured.brand} ${featured.model}`
                        : "Celular premium — foto de prueba DyTech"
                    }
                    width={420}
                    height={520}
                    decoding="async"
                    fetchPriority="high"
                    onError={() => setHeroImgOk(false)}
                  />
                ) : (
                  <div className="hero-phone-fallback" aria-hidden="true">
                    <div className="hero-phone-bezel">
                      <div className="hero-phone-screen">
                        <span className="hero-phone-brand">DyTech</span>
                        <span className="hero-phone-model">
                          {featured
                            ? `${featured.brand} ${featured.model}`
                            : "Flagship verificado"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <p className="hero-visual-caption">
                {featured
                  ? `${featured.brand} ${featured.model} · ${featured.cond || "disponible"}`
                  : "Selección curada · Open Box y usados verificados"}
                <span className="hero-visual-note"> · foto de prueba</span>
              </p>
            </div>
          </div>
        </section>

        {/* 2. Contenido directo ampliado: beneficios de la oferta */}
        <section className="value-strip" aria-label="Beneficios de la oferta">
          <div className="wrap value-strip-grid">
            <div className="value-item">
              <strong>1. Elige</strong>
              <span>Revisa modelos, condición y precio en el catálogo.</span>
            </div>
            <div className="value-item">
              <strong>2. Consulta</strong>
              <span>Escribe por WhatsApp al vendedor especializado.</span>
            </div>
            <div className="value-item">
              <strong>3. Confirma</strong>
              <span>Stock, garantía y precio final antes de comprar.</span>
            </div>
          </div>
        </section>

        <section id="catalogo" className="section">
          <div className="wrap">
            <div className="section-heading">
              <div>
                <p className="eyebrow">OFERTA ACTUAL</p>
                <h2>Celulares disponibles</h2>
                <p>
                  Catálogo en tiempo real. Al encontrar un equipo, usa el botón
                  de consulta para hablar con el vendedor y cerrar detalles.
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

        {/* Banda de conversión (CTA repetido, principio landing) */}
        <section className="convert-band" aria-label="Llamado a la acción">
          <div className="wrap convert-band-inner">
            <div>
              <p className="eyebrow">SIGUIENTE PASO</p>
              <h2 className="convert-title">¿Ya viste un equipo que te interesa?</h2>
              <p>
                No dejes la consulta para después. Un vendedor DyTech te responde
                por WhatsApp con stock y precio final.
              </p>
            </div>
            <a className="btn btn-lg" href="#contacto">
              Consultar ahora
            </a>
          </div>
        </section>

        <section id="beneficios" className="section section-tint">
          <div className="wrap split">
            <div>
              <p className="eyebrow">POR QUÉ DYTECH</p>
              <h2>Compra con información clara.</h2>
              <p>
                Sin menús confusos ni promesas vacías: ves el equipo, la
                condición y escribes directo al vendedor.
              </p>
            </div>
            <div className="feature-list">
              <p>
                <b>01</b> Stock real publicado en catálogo
              </p>
              <p>
                <b>02</b> Condición y garantía visibles
              </p>
              <p>
                <b>03</b> Consulta directa por WhatsApp
              </p>
            </div>
          </div>
        </section>

        {/* 4+5. Captación mínima + CTA (WhatsApp = formulario de 1 paso) */}
        <section id="contacto" className="section contact">
          <div className="wrap contact-card">
            <div>
              <p className="eyebrow">CONSULTA EN UN PASO</p>
              <h2>Escribe al vendedor especializado</h2>
              <p>
                Elige la línea (Tigo o Claro). Es el único dato que necesitas:
                abres WhatsApp y consultas disponibilidad, condición, garantía y
                precio final.
              </p>
            </div>
            <div className="contact-numbers">
              {phones.map((phone) => (
                <a
                  className="contact-number"
                  key={phone.number}
                  href={whatsapp(
                    phone.number,
                    "Hola DyTech, vi el catálogo y quiero confirmar un equipo. ¿Me ayudan con stock y precio final?"
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{phone.label}</span>
                  <strong>{phone.display}</strong>
                  <em className="contact-cta-label">Abrir WhatsApp</em>
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

      {/* CTA fijo móvil — refuerzo de conversión */}
      <div className="sticky-cta" role="complementary" aria-label="Consulta rápida">
        <a className="btn" href="#contacto">
          Consultar por WhatsApp
        </a>
      </div>
    </>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        {p.img ? (
          // eslint-disable-next-line @next/next/no-img-element
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
        <a className="btn" href="#contacto">
          Consultar
        </a>
      </div>
    </article>
  );
}

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
