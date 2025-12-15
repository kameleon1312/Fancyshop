import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import "../styles/catalog.scss";

const Catalog = ({ products, onAddToCart }) => {
  const { categoryName } = useParams();

  // --- filtrowanie produktów po kategorii ---
  const filteredProducts = categoryName
    ? products.filter(
        (p) =>
          p.category.toLowerCase() === decodeURIComponent(categoryName).toLowerCase()
      )
    : products;

  return (
    <section className="catalog-shell">
      <header className="catalog-header">
        <h2>Katalog Toolshop</h2>
        {categoryName && (
          <p>
            Pokazuję produkty w kategorii:{" "}
            <strong>{decodeURIComponent(categoryName)}</strong>
          </p>
        )}
        {!categoryName && (
          <p>Przykładowa siatka produktów z danymi z pliku JS.</p>
        )}
      </header>

      <div className="catalog-grid">
        {filteredProducts.map((p) => (
          <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

export default Catalog;
