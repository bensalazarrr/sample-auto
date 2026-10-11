"use client";
import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X, PackageSearch } from "lucide-react";
import { categories, products } from "@/data/products";
import { ProductCard } from "./product-card";
export function Catalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All parts");
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(
    () =>
      products
        .filter(
          (p) =>
            (category === "All parts" || p.category === category) &&
            `${p.name} ${p.brand} ${p.id} ${p.description}`
              .toLowerCase()
              .includes(query.trim().toLowerCase()),
        )
        .sort((a, b) =>
          sort === "price-asc"
            ? a.price - b.price
            : sort === "price-desc"
              ? b.price - a.price
              : sort === "name"
                ? a.name.localeCompare(b.name)
                : 0,
        ),
    [query, category, sort],
  );
  const clear = () => {
    setQuery("");
    setCategory("All parts");
    setSort("featured");
  };
  return (
    <div className="container catalog">
      <div className="catalog-toolbar">
        <div className="search-field">
          <Search size={19} />
          <label className="sr-only" htmlFor="part-search">
            Search parts
          </label>
          <input
            id="part-search"
            placeholder="Search parts, brands, or part numbers…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="icon-button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X size={17} />
            </button>
          )}
        </div>
        <div className="sort-field">
          <SlidersHorizontal size={17} />
          <label htmlFor="sort" className="sr-only">
            Sort parts
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
            <option value="name">Name: A–Z</option>
          </select>
        </div>
      </div>
      <div
        className="category-filters"
        role="group"
        aria-label="Filter by category"
      >
        {["All parts", ...categories].map((c) => (
          <button
            key={c}
            className={category === c ? "selected" : ""}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="catalog-count">
        <p role="status" aria-live="polite">
          Showing <strong>{filtered.length}</strong> of {products.length} parts
        </p>
        {(query || category !== "All parts" || sort !== "featured") && (
          <button className="text-link" onClick={clear}>
            Clear filters <X size={14} />
          </button>
        )}
      </div>
      {filtered.length ? (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <PackageSearch size={44} />
          <h2>No parts found.</h2>
          <p>Try a different keyword or explore another category.</p>
          <button className="button" onClick={clear}>
            Clear filters
          </button>
        </div>
      )}
      <div className="catalog-help">
        <div>
          <h3>Not sure what fits?</h3>
          <p>
            Tell us about your vehicle. We’ll help you ask the right questions.
          </p>
        </div>
        <a href="/contact?tab=parts" className="button secondary">
          Ask about a part <span aria-hidden="true">↗</span>
        </a>
      </div>
      <p className="fine-print">
        All brands, products, inventory, and prices are fictional demonstration
        data. Illustrations are representative. Vehicle compatibility is not
        guaranteed.
      </p>
    </div>
  );
}
