import { AnimatePresence, motion } from 'framer-motion';
import { useUiStore } from '@/store/uiStore';
import type { ToastMessage } from '@/types';
import '@/styles/ui/toast.scss';

function ToastItem({ toast }: { toast: ToastMessage }) {
  const removeToast = useUiStore((s) => s.removeToast);

  const icons: Record<ToastMessage['type'], string> = {
    success: '✓',
    error: '✕',
    info: 'i',
  };

  return (
    <motion.div
      layout
      className={`toast toast--${toast.type}`}
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => removeToast(toast.id)}
    >
      <div className="toast__icon">{icons[toast.type]}</div>
      <p className="toast__text">{toast.message}</p>
      <button className="toast__close" aria-label="Zamknij powiadomienie">
        ×
      </button>
    </motion.div>
  );
}

export function ToastContainer() {
  const toasts = useUiStore((s) => s.toasts);

  return (
    <div className="toast-container" aria-live="polite">
      <AnimatePresence mode="popLayout">
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} />
        ))}
      </AnimatePresence>
    </div>
  );
}
