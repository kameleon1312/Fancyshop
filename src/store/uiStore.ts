import { create } from 'zustand';
import type { ToastMessage, ToastType } from '@/types';

interface UiStore {
  searchOpen: boolean;
  openSearch:  () => void;
  closeSearch: () => void;
  toasts: ToastMessage[];
  addToast:    (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiStore>()((set) => ({
  searchOpen: false,
  toasts: [],

  openSearch:  () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),

  addToast: (message, type = 'success') => {
    const id = Math.random().toString(36).slice(2);
    set((s) => ({ toasts: [...s.toasts, { id, message, type }] }));
    setTimeout(
      () => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
      3500,
    );
  },

  removeToast: (id) =>
    set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}));
