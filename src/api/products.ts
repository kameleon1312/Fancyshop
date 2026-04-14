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

function normalize(raw: RawProduct): Product {
  return {
    id:          String(raw.id),
    name:        String(raw.title),
    price:       Number(raw.price),
    category:    String(raw.category),
    image:       String(raw.image),
    description: String(raw.description),
    rating: {
      rate:  Number(raw.rating?.rate  ?? 0),
      count: Number(raw.rating?.count ?? 0),
    },
  };
}

export async function fetchProducts(signal?: AbortSignal): Promise<Product[]> {
  const res = await fetch(`${API}/products`, { credentials: 'omit', signal });
  if (!res.ok) throw new Error(`Błąd pobierania produktów: ${res.status}`);
  const data: unknown = await res.json();
  if (!Array.isArray(data)) throw new Error('Nieprawidłowa odpowiedź API');
  return (data as RawProduct[]).map(normalize);
}

export async function fetchProduct(id: string, signal?: AbortSignal): Promise<Product> {
  if (!/^\d+$/.test(id)) throw new Error('Nieprawidłowe ID produktu');
  const res = await fetch(`${API}/products/${id}`, { credentials: 'omit', signal });
  if (!res.ok) throw new Error(`Produkt nie istnieje: ${res.status}`);
  const data: RawProduct = await res.json();
  return normalize(data);
}

export async function fetchCategories(signal?: AbortSignal): Promise<string[]> {
  const res = await fetch(`${API}/products/categories`, { credentials: 'omit', signal });
  if (!res.ok) throw new Error(`Błąd pobierania kategorii: ${res.status}`);
  const data: unknown = await res.json();
  if (!Array.isArray(data)) return [];
  return data.filter((c): c is string => typeof c === 'string');
}
