import { Link } from 'react-router-dom';
import '@/styles/components/footer.scss';

const LINKS = {
  sklep: [
    { label: 'Katalog', to: '/catalog' },
    { label: 'Elektronika', to: '/category/electronics' },
    { label: 'Odzież damska', to: '/category/women%27s%20clothing' },
    { label: 'Biżuteria', to: '/category/jewelery' },
  ],
  info: [
    { label: 'O projekcie', to: '/#about' },
    { label: 'Ulubione', to: '/wishlist' },
    { label: 'Koszyk', to: '/cart' },
  ],
};

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__brand-logo">
            <div className="footer__brand-mark">FS</div>
            <span className="footer__brand-name">FancyShop</span>
          </Link>
          <p>
            Projekt portfolio demonstrujący nowoczesne podejście do budowania
            aplikacji e-commerce z React, TypeScript i naciskiem na UX.
          </p>
        </div>

        <div className="footer__col">
          <h4>Sklep</h4>
          <ul>
            {LINKS.sklep.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Informacje</h4>
          <ul>
            {LINKS.info.map((l) => (
              <li key={l.to}>
                <Link to={l.to}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__bottom-inner">
          <p>© {new Date().getFullYear()} FancyShop. Projekt portfolio.</p>
          <div className="footer__bottom-tech">
            <span>React 19</span>
            <span>TypeScript</span>
            <span>Framer Motion</span>
            <span>Zustand</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
