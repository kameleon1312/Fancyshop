import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '@/types';

interface WishlistStore {
  items: Product[];
  toggle: (product: Product) => void;
  has: (id: string) => boolean;
  clear: () => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (product) =>
        set((state) => ({
          items: state.items.some((i) => i.id === product.id)
            ? state.items.filter((i) => i.id !== product.id)
            : [...state.items, product],
        })),

      has: (id) => get().items.some((i) => i.id === id),

      clear: () => set({ items: [] }),
    }),
    {
      name: 'fancyshop-wishlist',
      version: 1,
      migrate: (_state, _version) => ({ items: [] }),
    }
  )
);
