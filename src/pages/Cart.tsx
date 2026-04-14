import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, selectTotal } from '@/store/cartStore';
import { formatPrice } from '@/utils/format';
import { PageWrapper } from '@/components/ui/PageWrapper';
import '@/styles/pages/cart.scss';

export function Cart() {
  const { items, removeItem, updateQuantity, clearCart } = useCartStore();
  const total = useCartStore(selectTotal);

  if (items.length === 0) {
    return (
      <PageWrapper>
      <div className="cart-page">
        <div className="cart-page__inner">
          <div className="cart-page__empty">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <h2>Koszyk jest pusty</h2>
            <p>Nie masz jeszcze żadnych produktów — czas to zmienić.</p>
            <Link to="/catalog" className="btn-primary">Przejdź do sklepu</Link>
          </div>
        </div>
      </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
    <div className="cart-page">
      <div className="cart-page__inner">
        <motion.div
          className="cart-page__header"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <h1>Twój koszyk</h1>
          <p>{items.reduce((s, i) => s + i.quantity, 0)} produktów</p>
        </motion.div>

        <div className="cart-page__layout">
          <div className="cart-page__items">
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  className="cart-page__item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0, padding: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-page__item-img"
                  />
                  <div className="cart-page__item-details">
                    <p className="cart-page__item-category">{item.category}</p>
                    <p className="cart-page__item-name">{item.name}</p>
                    <p className="cart-page__item-unit">
                      {formatPrice(item.price)} / szt.
                    </p>
                  </div>

                  <div className="cart-page__item-right">
                    <p className="cart-page__item-total">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className="cart-page__qty">
                        <button onClick={() => updateQuantity(item.id, -1)}>−</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                      </div>
                      <button
                        className="cart-page__remove"
                        onClick={() => removeItem(item.id)}
                        aria-label="Usuń z koszyka"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <motion.aside
            className="cart-page__summary"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.15 }}
          >
            <h3>Podsumowanie</h3>
            <div className="cart-page__summary-row">
              <span>Produkty ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>{formatPrice(total)}</span>
            </div>
            <div className="cart-page__summary-row cart-page__summary-row--free">
              <span>Dostawa</span>
              <span>Gratis</span>
            </div>
            <div className="cart-page__summary-row cart-page__summary-row--total">
              <span>Razem</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link to="/checkout" className="btn-primary">
              Przejdź do kasy
            </Link>
            <button className="btn-ghost" onClick={clearCart}>
              Wyczyść koszyk
            </button>
          </motion.aside>
        </div>
      </div>
    </div>
    </PageWrapper>
  );
}
