import { memo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';
import { useWishlistStore } from '@/store/wishlistStore';
import { useUiStore } from '@/store/uiStore';
import { formatPrice } from '@/utils/format';
import type { Product } from '@/types';
import '@/styles/components/product-card.scss';

interface Props {
  product: Product;
  index?: number;
}

function ProductCardInner({ product, index = 0 }: Props) {
  const [added, setAdded] = useState(false);
  const { addItem, openDrawer } = useCartStore();
  const { toggle, has } = useWishlistStore();
  const addToast = useUiStore((s) => s.addToast);
  const inWishlist = has(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    addToast(`Dodano "${product.name.slice(0, 28)}…" do koszyka`);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      openDrawer();
    }, 600);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    toggle(product);
    addToast(
      inWishlist ? 'Usunięto z ulubionych' : 'Dodano do ulubionych',
      inWishlist ? 'info' : 'success',
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.05, 0.35),
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <article className="product-card">
        <Link to={`/product/${product.id}`} className="product-card__image" tabIndex={0}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            decoding="async"
            width={240}
            height={240}
          />
          <span className="product-card__overlay" aria-hidden="true">
            <span>Quick view</span>
          </span>
        </Link>

        <button
          className={`product-card__wishlist${inWishlist ? ' product-card__wishlist--active' : ''}`}
          onClick={handleWishlist}
          aria-label={inWishlist ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
        >
          <svg viewBox="0 0 24 24" strokeWidth="2" aria-hidden="true">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        <div className="product-card__info">
          <p className="product-card__category">{product.category}</p>
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <h3 className="product-card__name">{product.name}</h3>
          </Link>

          <div className="product-card__footer">
            <p className="product-card__price">{formatPrice(product.price)}</p>
            <motion.button
              className={`product-card__add-btn${added ? ' product-card__add-btn--added' : ''}`}
              onClick={handleAdd}
              whileTap={{ scale: 0.88 }}
              aria-label="Dodaj do koszyka"
            >
              {added ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </article>
    </motion.div>
  );
}

export const ProductCard = memo(ProductCardInner);
