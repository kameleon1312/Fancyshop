import { useEffect, useRef, useState } from 'react';
import '@/styles/ui/cursor.scss';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<'default' | 'hover' | 'click'>('default');

  useEffect(() => {
    let x = 0;
    let y = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setState(t.closest('a, button, [role="button"], input, label, select, textarea') ? 'hover' : 'default');
    };

    const onDown = () => setState('click');
    const onUp = () => setState((s) => (s === 'click' ? 'hover' : 'default'));

    const tick = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
      animId = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    animId = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <div className={`cursor cursor--${state}`} ref={cursorRef} />;
}
