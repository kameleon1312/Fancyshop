import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import '@/styles/components/categories.scss';

const CATEGORY_META: Record<string, { label: string; icon: string }> = {
  electronics:        { label: 'Elektronika',   icon: '📱' },
  jewelery:           { label: 'Biżuteria',     icon: '💍' },
  "men's clothing":   { label: 'Odzież męska',  icon: '👔' },
  "women's clothing": { label: 'Odzież damska', icon: '👗' },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

const cardAnim: Variants = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

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
    <motion.div
      className="categories__grid"
      variants={stagger}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-40px' }}
    >
      {(categories ?? []).map((cat) => {
        const meta   = CATEGORY_META[cat];
        const thumbs = thumbsByCategory[cat] ?? [];
        const count  = countByCategory[cat] ?? 0;

        return (
          <motion.div key={cat} variants={cardAnim}>
            <Link
              to={`/category/${encodeURIComponent(cat)}`}
              className="category-card"
              aria-label={`${meta?.label ?? cat} — ${count} produktów`}
            >
              <div className="category-card__image" aria-hidden="true">
                {thumbs.length > 0
                  ? (
                    <div className="category-card__thumbs">
                      {thumbs.map((src, i) => (
                        <div key={i} className="category-card__thumb">
                          <img src={src} alt="" loading="lazy" />
                        </div>
                      ))}
                    </div>
                  )
                  : <div className="category-card__thumb-empty" />
                }
                <span className="category-card__overlay" aria-hidden="true">
                  <span>Przeglądaj →</span>
                </span>
              </div>

              <div className="category-card__info">
                <p className="category-card__category">
                  {meta?.icon ?? '🛍️'} &nbsp; Kategoria
                </p>
                <h3 className="category-card__name">
                  {meta?.label ?? cat}
                </h3>
                <div className="category-card__footer">
                  <span className="category-card__price">{count} produktów</span>
                </div>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
