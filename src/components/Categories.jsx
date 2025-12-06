import React from "react";
import "../styles/components/categories.scss";

const categories = [
  { id: 1, label: "Wiertarki", icon: "🌀" },
  { id: 2, label: "Szlifierki", icon: "⚙️" },
  { id: 3, label: "Piły", icon: "🪚" },
  { id: 4, label: "Pomiar", icon: "📏" },
  { id: 5, label: "Akcesoria", icon: "🧰" },
  { id: 6, label: "Warsztat", icon: "🏗️" },
];

const Categories = () => {
  return (
    <section className="categories-shell">
      <header className="categories-header">
        <h2>Kategorie Toolshop</h2>
        <p>Przykładowe sekcje, które możesz później podpiąć pod API.</p>
      </header>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div className="category-card" key={cat.id}>
            <div className="category-icon">{cat.icon}</div>
            <p>{cat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;