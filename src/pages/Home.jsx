import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import ProductCard from "../components/ProductCard";
import "../styles/home.scss";

const Home = ({ products, onAddToCart }) => {
  const featured = products.slice(0, 3);

  return (
    <>
      <Hero />
      <Categories />
      <section className="home-featured">
        <header className="home-featured__header">
          <h2>Polecane narzędzia</h2>
          <p>Szybki przegląd wybranych produktów z katalogu.</p>
        </header>
        <div className="home-featured__grid">
          {featured.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;