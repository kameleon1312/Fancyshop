import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import '@/styles/components/categories.scss';

const CATEGORY_META: Record<string, { label: string; short: string }> = {
  electronics:        { label: 'Elektronika',   short: 'Gadżety & tech'   },
  jewelery:           { label: 'Biżuteria',     short: 'Złoto & srebro'   },
  "men's clothing":   { label: 'Odzież Męska',  short: 'Styl codzienny'   },
  "women's clothing": { label: 'Odzież Damska', short: 'Moda kobieca'     },
};

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function Categories() {
  const { data: categories, isLoading: catsLoading } = useCategories();
  const { data: products = [], isLoading: prodsLoading } = useProducts();

  const thumbsByCategory = useMemo<Record<string, string[]>>(() => {
    const map: Record<string, string[]> = {};
    for (const p of products) {
      if (!map[p.category]) map[p.category] = [];
      if (map[p.category].length < 3) map[p.category].push(p.image);
    }
    return map;
  }, [products]);

  const countByCategory = useMemo<Record<string, number>>(() => {
    const map: Record<string, number> = {};
    for (const p of products) map[p.category] = (map[p.category] ?? 0) + 1;
    return map;
  }, [products]);

  if (catsLoading || prodsLoading) {
    return (
      <div className="categories__grid">
        {Array.from({ length: 4 }, (_, i) => <ProductCardSkeleton key={i} />)}
      </div>
    );
  }

  return (
    <div className="categories__grid">
      {(categories ?? []).map((cat, i) => {
        const meta   = CATEGORY_META[cat];
        const thumbs = thumbsByCategory[cat] ?? [];
        const count  = countByCategory[cat] ?? 0;

        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: i * 0.08, ease: EASE }}
          >
            <Link
              to={`/category/${encodeURIComponent(cat)}`}
              className="category-card"
              aria-label={`${meta?.label ?? cat} — ${count} produktów`}
            >
              <div className="category-card__image" aria-hidden="true">
                {thumbs.length > 0 ? (
                  <div className="category-card__thumbs">
                    {thumbs.map((src, idx) => (
                      <div key={idx} className="category-card__thumb">
                        <img src={src} alt="" loading="lazy" decoding="async" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="category-card__thumb-empty" />
                )}
                <span className="category-card__overlay" aria-hidden="true">
                  <span>Przeglądaj</span>
                </span>
              </div>

              <div className="category-card__info">
                <div className="category-card__text">
                  <p className="category-card__category">{meta?.short ?? 'Kategoria'}</p>
                  <h3 className="category-card__name">{meta?.label ?? cat}</h3>
                </div>
                <div className="category-card__side">
                  <p className="category-card__count">{count} szt.</p>
                  <span className="category-card__arrow" aria-hidden="true">→</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
