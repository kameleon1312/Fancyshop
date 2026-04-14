import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore, selectItemCount, selectTotal } from '@/store/cartStore';
import { formatPrice } from '@/utils/format';
import '@/styles/ui/cart-drawer.scss';

export function CartDrawer() {
  const { isOpen, closeDrawer, items, removeItem, updateQuantity } = useCartStore();
  const itemCount = useCartStore(selectItemCount);
  const total     = useCartStore(selectTotal);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="cart-drawer__backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
          />

          <motion.div
            className="cart-drawer__panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="cart-drawer__head">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <h2>Koszyk</h2>
                {itemCount > 0 && (
                  <span className="cart-drawer__head-count">{itemCount}</span>
                )}
              </div>
              <button className="cart-drawer__close" onClick={closeDrawer} aria-label="Zamknij koszyk">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {items.length === 0 ? (
              <div className="cart-drawer__empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                <p>Twój koszyk jest pusty</p>
                <button className="btn-ghost" onClick={closeDrawer}>
                  Kontynuuj zakupy
                </button>
              </div>
            ) : (
              <>
                <div className="cart-drawer__items">
                  {items.map((item) => (
                    <div key={item.id} className="cart-drawer__item">
                      <img src={item.image} alt={item.name} className="cart-drawer__item-img" loading="lazy" />
                      <div className="cart-drawer__item-info">
                        <p className="cart-drawer__item-name">{item.name}</p>
                        <p className="cart-drawer__item-price">
                          {formatPrice(item.price * item.quantity)}
                          {item.quantity > 1 && (
                            <span className="cart-drawer__item-unit"> ({formatPrice(item.price)} × {item.quantity})</span>
                          )}
                        </p>
                        <div className="cart-drawer__item-controls">
                          <div className="cart-drawer__item-qty">
                            <button onClick={() => updateQuantity(item.id, -1)} aria-label="Zmniejsz ilość">−</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} aria-label="Zwiększ ilość">+</button>
                          </div>
                          <button
                            className="cart-drawer__item-remove"
                            onClick={() => removeItem(item.id)}
                            aria-label="Usuń produkt"
                          >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-drawer__footer">
                  <div className="cart-drawer__summary">
                    <div className="cart-drawer__summary-row">
                      <span>Produkty ({itemCount} szt.)</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                    <div className="cart-drawer__summary-row">
                      <span>Dostawa</span>
                      <span style={{ color: 'var(--color-ok)' }}>Gratis</span>
                    </div>
                    <div className="cart-drawer__summary-row cart-drawer__summary-row--total">
                      <span>Łącznie</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                  <div className="cart-drawer__actions">
                    <Link to="/checkout" className="btn-primary" onClick={closeDrawer}>
                      Przejdź do kasy
                    </Link>
                    <Link to="/cart" className="btn-ghost" onClick={closeDrawer}>
                      Podgląd koszyka
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
