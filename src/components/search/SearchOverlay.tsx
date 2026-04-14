import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useUiStore } from '@/store/uiStore';
import { useProducts } from '@/hooks/useProducts';
import { useDebounce } from '@/hooks/useDebounce';
import { formatPrice } from '@/utils/format';
import '@/styles/ui/search-overlay.scss';

function SearchPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 220);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data: products = [] } = useProducts();

  const results = debouncedQuery.length > 1
    ? products.filter((p) =>
        p.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(debouncedQuery.toLowerCase())
      ).slice(0, 7)
    : [];

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <motion.div
      className="search-overlay__panel"
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="search-overlay__input-wrap">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          className="search-overlay__input"
          placeholder="Szukaj produktów..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="search-overlay__kbd">Esc</span>
      </div>

      <div className="search-overlay__results">
        {debouncedQuery.length > 1 && results.length === 0 && (
          <p className="search-overlay__empty">
            Brak wyników dla &ldquo;{debouncedQuery}&rdquo;
          </p>
        )}
        {debouncedQuery.length <= 1 && (
          <p className="search-overlay__empty">Zacznij pisać, aby wyszukać...</p>
        )}
        {results.map((p) => (
          <Link
            key={p.id}
            to={`/product/${p.id}`}
            className="search-overlay__item"
            onClick={onClose}
          >
            <img src={p.image} alt={p.name} className="search-overlay__item-img" />
            <div className="search-overlay__item-info">
              <p className="search-overlay__item-name">{p.name}</p>
              <p className="search-overlay__item-category">{p.category}</p>
            </div>
            <span className="search-overlay__item-price">{formatPrice(p.price)}</span>
          </Link>
        ))}
      </div>

      <div className="search-overlay__footer">
        <span><kbd>↑↓</kbd> nawiguj</span>
        <span><kbd>↵</kbd> otwórz</span>
        <span><kbd>Esc</kbd> zamknij</span>
      </div>
    </motion.div>
  );
}

export function SearchOverlay() {
  const { searchOpen, closeSearch } = useUiStore();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (!searchOpen) useUiStore.getState().openSearch();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [searchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          className="search-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div className="search-overlay__backdrop" onClick={closeSearch} />
          <SearchPanel key="panel" onClose={closeSearch} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
