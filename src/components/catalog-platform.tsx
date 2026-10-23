"use client";

import { useEffect, useMemo, useState } from "react";

type Product = {
  sku: string;
  brand: string;
  model: string;
  variant?: string;
  price: number;
  cond?: string;
  storage?: number;
  img?: string;
};

type PhoneContact = {
  label: string;
  number: string;
  display: string;
};

const phones: PhoneContact[] = [
  { label: "Principal", number: "593993017483", display: "+593 99 301 7483" },
  { label: "Alterno", number: "593995792922", display: "+593 99 579 2922" },
];

const whatsapp = (number: string, text: string) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

const money = (value: number) =>
  new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
  }).format(value);

export function CatalogPlatform() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/catalog?tipo=celulares")
      .then((response) => response.text())
      .then((csv) => {
        if (active) setProducts(parseCsv(csv));
      })
      .catch(() => {
        if (active) setProducts([]);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const brands = useMemo(
    () => [...new Set(products.map((product) => product.brand))].sort(),
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase("es");

    return products.filter((product) => {
      const searchableText = `${product.brand} ${product.model} ${product.variant ?? ""}`.toLocaleLowerCase("es");
      return (
        (!normalizedQuery || searchableText.includes(normalizedQuery)) &&
        (!brand || product.brand === brand)
      );
    });
  }, [products, query, brand]);

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
                Encuentra celulares seleccionados, con condición, garantía y precio claro.
                Revisa nuestro catálogo y habla con un asesor cuando estés listo.
              </p>
              <div className="actions">
                <a className="btn" href="#catalogo">Explorar catálogo</a>
                <a className="btn sec" href="#contacto">Conocer DyTech</a>
              </div>
            </div>
            <div className="hero-card">
              <span>Catálogo actualizado</span>
              <strong>{loading ? "—" : products.length}</strong>
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
                <p>Filtra el catálogo y consulta por WhatsApp para confirmar stock, condición y precio final.</p>
              </div>
              <span className="count">{filteredProducts.length} equipos</span>
            </div>

            <div className="filters">
              <label>
                Buscar
                <input
                  className="bg-[#12181b] border border-gray-700 text-white placeholder-gray-400"
                  aria-label="Buscar Marca o modelo"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Marca o modelo"
                />
              </label>
              <label>
                Marca
                <select value={brand} onChange={(event) => setBrand(event.target.value)}>
                  <option value="">Todas las marcas</option>
                  {brands.map((item) => <option key={item} value={item}>{item}</option>)}
                </select>
              </label>
            </div>

            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>

            {!loading && filteredProducts.length === 0 && (
              <div className="empty">No encontramos equipos con esos criterios.</div>
            )}
          </div>
        </section>

        <section id="contacto" className="section contact">
          <div className="wrap contact-card">
            <div>
              <p className="eyebrow">HABLEMOS</p>
              <h2>¿Tienes un equipo en mente?</h2>
              <p>Escríbenos para confirmar disponibilidad, condición, garantía y precio final antes de tu compra.</p>
            </div>
            <div className="contact-numbers">
              {phones.map((phone) => (
                <a
                  className="contact-number"
                  key={phone.number}
                  href={whatsapp(phone.number, "Hola DyTech, quiero información sobre un celular.")}
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

function ProductCard({ product }: { product: Product }) {
  const image = product.img ? (
    <img src={product.img} alt={`${product.brand} ${product.model}`} />
  ) : (
    <div className="phone-mark" aria-hidden="true" />
  );

  return (
    <article className="product-card">
      <div className="product-image">{image}</div>
      <div className="product-body">
        <span className="product-brand">{product.brand}</span>
        <h3>{product.model}</h3>
        <p className="muted">{product.variant || "Variante por confirmar"}</p>
        <div className="tags">
          <span>{product.cond || "Disponible"}</span>
          {product.storage && <span>{product.storage} GB</span>}
        </div>
        <strong className="price">{money(product.price)}</strong>
        <small className="muted">USD · confirmar precio final</small>
        <a
          className="btn"
          href={whatsapp(phones[0].number, `Hola DyTech, me interesa ${product.brand} ${product.model}. ¿Pueden confirmar disponibilidad y precio final?`)}
          target="_blank"
          rel="noreferrer"
        >
          Consultar equipo ↗
        </a>
      </div>
    </article>
  );
}

function parseCsv(input: string): Product[] {
  const rows = input
    .split(/\r?\n/)
    .map((row) => row.split(","))
    .filter((row) => row.length > 1);

  if (rows.length === 0) return [];

  const headers = rows[0].map((header) => header.trim().toLowerCase());
  const indexOf = (key: string) => headers.indexOf(key);

  return rows
    .slice(1)
    .map((row) => {
      const variant = row[indexOf("variante")]?.trim();
      const price = Number(row[indexOf("precio")]?.replace(/[^\d.]/g, ""));

      return {
        sku: row[indexOf("sku")]?.trim() ?? "",
        brand: row[indexOf("marca")]?.trim() ?? "",
        model: row[indexOf("modelo")]?.trim() ?? "",
        variant,
        price,
        cond: row[indexOf("condicion")]?.trim(),
        storage: Number(variant?.match(/\d+/)?.[0]) || undefined,
        img: row[indexOf("imagen_url")]?.trim(),
      };
    })
    .filter((product) => product.sku && product.brand && product.model && Number.isFinite(product.price));
}
