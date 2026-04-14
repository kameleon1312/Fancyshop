import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useProducts } from '@/hooks/useProducts';
import '@/styles/pages/home.scss';

const CATEGORY_LABELS: Record<string, string> = {
  electronics: 'Elektronika',
  jewelery: 'Biżuteria',
  "men's clothing": 'Odzież męska',
  "women's clothing": 'Odzież damska',
};

export function Home() {
  const { data: products, isLoading } = useProducts();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const displayed = useMemo(() => {
    const all = products ?? [];
    if (!activeCategory) return all.slice(0, 8);
    return all.filter((p) => p.category === activeCategory);
  }, [products, activeCategory]);

  const sectionTitle = activeCategory
    ? (CATEGORY_LABELS[activeCategory] ?? activeCategory)
    : 'Wybrane produkty';

  return (
    <>
      <Hero />

      <section className="home-categories">
        <div className="home-categories__inner">
          <div className="home-categories__header">
            <div>
              <p className="eyebrow">Przeglądaj</p>
              <h2 className="section-title">Kategorie</h2>
            </div>
            {activeCategory && (
              <motion.button
                className="home-categories__clear"
                onClick={() => setActiveCategory(null)}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                × Wszystkie
              </motion.button>
            )}
          </div>
          <Categories selected={activeCategory} onSelect={setActiveCategory} />
        </div>
      </section>

      <section className="home-featured">
        <div className="home-featured__inner">
          <motion.div
            className="home-featured__header"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <p className="eyebrow">Polecane</p>
              <AnimatePresence mode="wait">
                <motion.h2
                  key={sectionTitle}
                  className="section-title"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  {sectionTitle}
                </motion.h2>
              </AnimatePresence>
            </div>
            {!activeCategory && (
              <Link to="/catalog" className="btn-ghost">
                Cały katalog →
              </Link>
            )}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory ?? 'all'}
              className="home-featured__grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading
                ? Array.from({ length: 8 }, (_, i) => <ProductCardSkeleton key={i} />)
                : displayed.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))
              }
              {!isLoading && displayed.length === 0 && (
                <p style={{ gridColumn: '1/-1', color: 'var(--color-text-3)', fontSize: '0.9rem', padding: '40px 0' }}>
                  Brak produktów w tej kategorii.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
}
