import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ToastMessage, ToastType } from '@/types';

interface UiStore {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  toasts: ToastMessage[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

export const useUiStore = create<UiStore>()(
  persist(
    (set) => ({
      theme: 'light',
      searchOpen: false,
      toasts: [],

      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),

      openSearch:  () => set({ searchOpen: true }),
      closeSearch: () => set({ searchOpen: false }),

      addToast: (message, type = 'success') => {
        const id = Math.random().toString(36).slice(2);
        set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
        setTimeout(() => {
          set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
        }, 3500);
      },

      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
    }),
    {
      name: 'fancyshop-ui-v2',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
