import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { ToastContainer } from '@/components/ui/Toast';
import { CustomCursor } from '@/components/ui/CustomCursor';

import { Home } from '@/pages/Home';
import { Catalog } from '@/pages/Catalog';
import { ProductDetails } from '@/pages/ProductDetails';
import { Cart } from '@/pages/Cart';
import { Wishlist } from '@/pages/Wishlist';
import { Checkout } from '@/pages/Checkout';
import { NotFound } from '@/pages/NotFound';

import { useUiStore } from '@/store/uiStore';

export default function App() {
  const location = useLocation();
  const theme = useUiStore((s) => s.theme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <>
      <CustomCursor />

      <div className="app-shell">
        <Navbar />

        <main className="app-main">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/category/:categoryName" element={<Catalog />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </div>

      <CartDrawer />
      <SearchOverlay />
      <ToastContainer />
    </>
  );
}
