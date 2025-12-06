import React from "react";
import ProductCard from "../components/ProductCard";
import "../styles/catalog.scss";

const Catalog = ({ products, onAddToCart }) => {
  return (
    <section className="catalog-shell">
      <header className="catalog-header">
        <h2>Katalog Toolshop</h2>
        <p>Przykładowa siatka produktów z danymi z pliku JS.</p>
      </header>
      <div className="catalog-grid">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default Catalog;