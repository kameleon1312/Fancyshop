export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating' | 'name';

export interface FilterState {
  category: string | null;
  priceRange: [number, number];
  sortBy: SortOption;
}

export type ToastType = 'success' | 'error' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  type: ToastType;
}
