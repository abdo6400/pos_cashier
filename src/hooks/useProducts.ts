import { useState, useEffect } from 'react';
import { db } from '../utils/db';

export interface Product {
  id?: number;
  name: string;
  category: string;
  price: number;
  cost: number;
  stock: number;
  unit: string;
  barcode: string;
  minStock?: number;
  createdAt?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await db.getData('products');
      setProducts(data || []);
      setError(null);
    } catch (err) {
      console.error('Error loading products:', err);
      setError('فشل تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Product) => {
    try {
      const newProduct = await db.saveProduct(product);
      await loadProducts();
      return newProduct;
    } catch (err) {
      console.error('Error adding product:', err);
      throw new Error('فشل إضافة المنتج');
    }
  };

  const updateProduct = async (product: Product) => {
    try {
      const updatedProduct = await db.saveProduct(product);
      await loadProducts();
      return updatedProduct;
    } catch (err) {
      console.error('Error updating product:', err);
      throw new Error('فشل تحديث المنتج');
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      await db.deleteProduct(id);
      await loadProducts();
    } catch (err) {
      console.error('Error deleting product:', err);
      throw new Error('فشل حذف المنتج');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    refresh: loadProducts,
  };
}