import React from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/product-details.scss";

const ProductDetails = ({ products, onAddToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <section className="product-details-shell">
        <p>Nie znaleziono produktu.</p>
        <Link to="/catalog" className="btn-primary">
          Wróć do katalogu
        </Link>
      </section>
    );
  }

  return (
    <section className="product-details-shell">
      <div className="product-details__image-wrap">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details__info">
        <p className="product-details__category">{product.category}</p>
        <h1>{product.name}</h1>
        <p className="product-details__description">{product.description}</p>
        <p className="product-details__price">{product.price} zł</p>
        <div className="product-details__actions">
          <button
            className="btn-primary"
            onClick={() => onAddToCart(product)}
          >
            Dodaj do koszyka
          </button>
          <Link to="/catalog" className="btn-ghost">
            Wróć do sklepu
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;