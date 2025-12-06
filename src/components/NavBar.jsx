import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../styles/components/navbar.scss";

const Navbar = ({ cartCount }) => {
  return (
    <header className="nav-shell">
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="nav-logo__icon">🛠️</span>
          <span className="nav-logo__text">Toolshop</span>
        </Link>

        <div className="nav-search">
          <input
            type="text"
            placeholder="Szukaj narzędzi, kategorii, marek..."
          />
        </div>

        <nav className="nav-links">
          <NavLink to="/" end className="nav-link">
            Start
          </NavLink>
          <NavLink to="/catalog" className="nav-link">
            Sklep
          </NavLink>
        </nav>

        <div className="nav-actions">
          <Link to="/cart" className="nav-cart">
            <span className="nav-cart__icon">🛒</span>
            {cartCount > 0 && (
              <span className="nav-cart__badge">{cartCount}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;