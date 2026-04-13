import type { Product } from '@/types';

const API = 'https://fakestoreapi.com';

interface RawProduct {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: { rate: number; count: number };
}

function normalizeProduct(raw: RawProduct): Product {
  return {
    id: String(raw.id),
    name: raw.title,
    price: raw.price,
    category: raw.category,
    image: raw.image,
    description: raw.description,
    rating: raw.rating,
  };
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(`${API}/products`);
  if (!res.ok) throw new Error('Nie udało się pobrać produktów');
  const data: RawProduct[] = await res.json();
  return data.map(normalizeProduct);
}

export async function fetchProduct(id: string): Promise<Product> {
  const res = await fetch(`${API}/products/${id}`);
  if (!res.ok) throw new Error('Produkt nie istnieje');
  const data: RawProduct = await res.json();
  return normalizeProduct(data);
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API}/products/categories`);
  if (!res.ok) throw new Error('Nie udało się pobrać kategorii');
  return res.json();
}
