import { useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLenis } from '@/providers/LenisProvider';
import '@/styles/components/footer.scss';

const NAV_COLS: Record<string, { label: string; to: string }[]> = {
  Sklep: [
    { label: 'Katalog',       to: '/catalog' },
    { label: 'Elektronika',   to: '/category/electronics' },
    { label: 'Biżuteria',     to: '/category/jewelery' },
    { label: 'Odzież damska', to: "/category/women's%20clothing" },
    { label: 'Odzież męska',  to: "/category/men's%20clothing" },
  ],
  Konto: [
    { label: 'Ulubione', to: '/wishlist' },
    { label: 'Koszyk',   to: '/cart' },
  ],
};

export function Footer() {
  const { pathname } = useLocation();
  const lenis = useLenis();

  const handleLogoClick = useCallback((e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      if (lenis) { lenis.scrollTo(0, { duration: 1.2 }); }
      else { window.scrollTo({ top: 0, behavior: 'smooth' }); }
    }
  }, [pathname, lenis]);

  return (
    <footer className="footer">
      <div className="footer__inner">

        <div className="footer__brand">
          <Link to="/" className="footer__brand-logo" onClick={handleLogoClick}>
            <div className="footer__brand-mark" aria-hidden="true">FS</div>
            <span className="footer__brand-name">FancyShop</span>
          </Link>
          <p className="footer__brand-desc">
            Starannie dobrane produkty premium — elektronika, biżuteria i odzież dla wymagających.
          </p>
        </div>

        {Object.entries(NAV_COLS).map(([title, links]) => (
          <nav key={title} className="footer__col" aria-label={title}>
            <h4>{title}</h4>
            <ul>
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} FancyShop by Szymon Pochopień. Wszelkie prawa zastrzeżone.</p>
        </div>
      </div>
    </footer>
  );
}
