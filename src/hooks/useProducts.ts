import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProduct, fetchCategories } from '@/api/products';

export function useProducts() {
  return useQuery({
    queryKey:  ['products'],
    queryFn:   ({ signal }) => fetchProducts(signal),
    staleTime: 5 * 60 * 1000,
  });
}

export function useProduct(id: string | undefined) {
  const valid = typeof id === 'string' && /^\d+$/.test(id);
  return useQuery({
    queryKey: ['product', id],
    queryFn:  ({ signal }) => fetchProduct(id!, signal),
    enabled:  valid,
    retry:    1,
  });
}

export function useCategories() {
  return useQuery({
    queryKey:  ['categories'],
    queryFn:   ({ signal }) => fetchCategories(signal),
    staleTime: Infinity,
  });
}
