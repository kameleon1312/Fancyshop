import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Hero } from '@/components/sections/Hero';
import { Categories } from '@/components/sections/Categories';
import { ProductCard } from '@/components/product/ProductCard';
import { ProductCardSkeleton } from '@/components/ui/Skeleton';
import { useProducts } from '@/hooks/useProducts';
import '@/styles/pages/home.scss';

export function Home() {
  const { data: products, isLoading } = useProducts();
  const featured = products?.slice(0, 6) ?? [];

  return (
    <>
      <Hero />

      <section className="home-categories">
        <div className="home-categories__inner">
          <div className="home-categories__header">
            <p className="eyebrow">Przeglądaj</p>
            <h2 className="section-title" style={{ marginBottom: 4 }}>
              Kategorie
            </h2>
          </div>
          <Categories />
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
              <h2 className="section-title">Wybrane produkty</h2>
            </div>
            <Link to="/catalog" className="btn-ghost">
              Cały katalog →
            </Link>
          </motion.div>

          <div className="home-featured__grid">
            {isLoading
              ? Array.from({ length: 6 }, (_, i) => <ProductCardSkeleton key={i} />)
              : featured.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))
            }
          </div>
        </div>
      </section>
    </>
  );
}
