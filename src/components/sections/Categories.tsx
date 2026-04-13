import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useCategories } from '@/hooks/useProducts';
import { Skeleton } from '@/components/ui/Skeleton';
import '@/styles/components/categories.scss';

const CATEGORY_ICONS: Record<string, string> = {
  electronics: '📱',
  jewelery: '💍',
  "men's clothing": '👔',
  "women's clothing": '👗',
};

const CATEGORY_LABELS: Record<string, string> = {
  electronics: 'Elektronika',
  jewelery: 'Biżuteria',
  "men's clothing": 'Odzież męska',
  "women's clothing": 'Odzież damska',
};

interface CategoriesProps {
  selected: string | null;
  onSelect: (cat: string | null) => void;
}

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardVariant: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export function Categories({ selected, onSelect }: CategoriesProps) {
  const { data: categories, isLoading } = useCategories();

  return (
    <div className="categories">
      <div className="categories__grid">
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <div key={i} style={{ borderRadius: 'var(--r-lg)', overflow: 'hidden' }}>
                <Skeleton height={110} />
              </div>
            ))
          : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-40px' }}
              style={{ display: 'contents' }}
            >
              {(categories ?? []).map((cat) => {
                const isActive = selected === cat;
                return (
                  <motion.div key={cat} variants={cardVariant}>
                    <button
                      className={`category-card${isActive ? ' category-card--active' : ''}`}
                      onClick={() => onSelect(isActive ? null : cat)}
                    >
                      <div className="category-card__icon">
                        {CATEGORY_ICONS[cat] ?? '🛍️'}
                      </div>
                      <p className="category-card__label">
                        {CATEGORY_LABELS[cat] ?? (cat.charAt(0).toUpperCase() + cat.slice(1))}
                      </p>
                      {isActive && (
                        <span className="category-card__active-dot" />
                      )}
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          )
        }
      </div>
    </div>
  );
}
