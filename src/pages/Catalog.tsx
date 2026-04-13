import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { capitalize } from '@/utils/format';
import type { SortOption } from '@/types';
import '@/styles/pages/catalog.scss';

export function Catalog() {
  const { categoryName } = useParams<{ categoryName?: string }>();
  const [activeCategory, setActiveCategory] = useState<string | null>(
    categoryName ? decodeURIComponent(categoryName) : null
  );
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const { data: products = [], isLoading } = useProducts();
  const { data: categories = [] } = useCategories();

  const filtered = useMemo(() => {
    let list = activeCategory
      ? products.filter((p) => p.category.toLowerCase() === activeCategory.toLowerCase())
      : [...products];

    switch (sortBy) {
      case 'price-asc':  list = list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = list.sort((a, b) => b.price - a.price); break;
      case 'rating':     list = list.sort((a, b) => b.rating.rate - a.rating.rate); break;
      case 'name':       list = list.sort((a, b) => a.name.localeCompare(b.name)); break;
    }

    return list;
  }, [products, activeCategory, sortBy]);

  const pageTitle = activeCategory
    ? capitalize(activeCategory)
    : 'Cały katalog';

  return (
    <div className="catalog">
      <div className="catalog__inner">
        <motion.div
          className="catalog__header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="eyebrow">Sklep</p>
          <h1>{pageTitle}</h1>
          {activeCategory && (
            <p>Produkty z kategorii &ldquo;{activeCategory}&rdquo;</p>
          )}
        </motion.div>

        <div className="catalog__controls">
          <div className="catalog__filters">
            <button
              className={`catalog__filter-btn${!activeCategory ? ' catalog__filter-btn--active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              Wszystkie
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`catalog__filter-btn${activeCategory === cat ? ' catalog__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {capitalize(cat)}
              </button>
            ))}
          </div>

          <div className="catalog__sort">
            <label htmlFor="sort-select">Sortuj:</label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              <option value="default">Domyślnie</option>
              <option value="price-asc">Cena: rosnąco</option>
              <option value="price-desc">Cena: malejąco</option>
              <option value="rating">Ocena</option>
              <option value="name">Nazwa A-Z</option>
            </select>
          </div>

          {!isLoading && (
            <span className="catalog__count">{filtered.length} produktów</span>
          )}
        </div>

        <div className="catalog__grid">
          {isLoading
            ? Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)
            : filtered.length === 0
            ? (
              <div className="catalog__empty">
                <p>Brak produktów w tej kategorii.</p>
                <button
                  className="btn-ghost"
                  onClick={() => setActiveCategory(null)}
                >
                  Pokaż wszystkie
                </button>
              </div>
            )
            : filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))
          }
        </div>
      </div>
    </div>
  );
}
