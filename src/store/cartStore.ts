import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '@/types';

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items:  [],
      isOpen: false,

      openDrawer:  () => set({ isOpen: true }),
      closeDrawer: () => set({ isOpen: false }),

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...product, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, delta) =>
        set((state) => ({
          items: state.items
            .map((i) => i.id === id ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i)
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'fancyshop-cart',
      version: 1,
      partialize: (state) => ({ items: state.items }),
      migrate: () => ({ items: [], isOpen: false }),
    }
  )
);

// Selectors — computed outside store to avoid getter issues with persist
export const selectItemCount = (s: CartStore) =>
  s.items.reduce((sum, i) => sum + i.quantity, 0);

export const selectTotal = (s: CartStore) =>
  s.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
