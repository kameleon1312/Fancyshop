import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlistStore } from '@/store/wishlistStore';
import { ProductCard } from '@/components/product/ProductCard';
import '@/styles/pages/wishlist.scss';

export function Wishlist() {
  const { items, clear } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="wishlist">
        <div className="wishlist__inner">
          <div className="wishlist__empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            <h2>Lista życzeń jest pusta</h2>
            <p>Kliknij serce przy produkcie, aby dodać go do ulubionych.</p>
            <Link to="/catalog" className="btn-primary">Przeglądaj produkty</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist__inner">
        <motion.div
          className="wishlist__header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1>Ulubione</h1>
          <button onClick={clear}>Wyczyść listę</button>
        </motion.div>

        <div className="wishlist__grid">
          {items.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
