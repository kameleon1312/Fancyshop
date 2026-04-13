import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import '@/styles/components/hero.scss';

const MARQUEE_ITEMS = [
  'Elektronika', 'Biżuteria', 'Odzież damska', 'Odzież męska',
  'Bezpłatna dostawa', 'Zwrot 30 dni', 'Bezpieczne płatności',
  'Elektronika', 'Biżuteria', 'Odzież damska', 'Odzież męska',
  'Bezpłatna dostawa', 'Zwrot 30 dni', 'Bezpieczne płatności',
];

const STATS = [
  { value: '200+', label: 'produktów' },
  { value: '4', label: 'kategorie' },
  { value: '30', label: 'dni na zwrot' },
];

const lineIn: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  show: { scaleX: 1, transition: { duration: 0.9, ease: 'easeInOut', delay: 0.6 } },
};

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.opacity = '1';
  }, []);

  return (
    <section className="hero">

      <div className="hero__corner hero__corner--tl">
        <span className="hero__label">FancyShop</span>
        <span className="hero__label hero__label--muted">est. 2025</span>
      </div>

      <div className="hero__corner hero__corner--tr">
        <span className="hero__label hero__label--muted">№ 001</span>
      </div>

      <div className="hero__center">
        <motion.h1
          ref={titleRef}
          className="hero__title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01 }}
        >
          <motion.span
            className="hero__title-line hero__title-line--serif"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            Fine
          </motion.span>
          <motion.span
            className="hero__title-line hero__title-line--sans"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.0, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            Goods.
          </motion.span>
        </motion.h1>

        <motion.div
          className="hero__rule"
          variants={lineIn}
          initial="hidden"
          animate="show"
        />
      </div>

      <div className="hero__bottom">
        <motion.div
          className="hero__bottom-left"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
        >
          <p className="hero__desc">
            Starannie dobrana kolekcja elektroniki, biżuterii
            i&nbsp;odzieży — dla tych, którzy wiedzą czego chcą.
          </p>
          <div className="hero__actions">
            <Link to="/catalog" className="btn-primary">
              Odkryj kolekcję
            </Link>
            <Link to="/catalog?category=electronics" className="btn-ghost">
              Elektronika
            </Link>
          </div>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="hero__stat">
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="hero__side-text" aria-hidden="true">
        <span>scroll</span>
        <span className="hero__scroll-line" />
      </div>

      <div className="hero__marquee">
        <div className="hero__marquee-track">
          {MARQUEE_ITEMS.map((text, i) => (
            <span key={i} className="hero__marquee-item">
              {text}
            </span>
          ))}
        </div>
      </div>

    </section>
  );
}
