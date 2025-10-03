import { useState, useEffect } from 'react';
import { db } from '../utils/db';

export interface Customer {
  id?: number;
  name: string;
  phone: string;
  email: string;
  address?: string;
  balance: number;
  creditLimit?: number;
  type: 'customer' | 'supplier';
  createdAt?: string;
}

export function useCustomers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [suppliers, setSuppliers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [customersData, suppliersData] = await Promise.all([
        db.getData('customers'),
        db.getData('suppliers'),
      ]);
      
      setCustomers(customersData || []);
      setSuppliers(suppliersData || []);
      setError(null);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('فشل تحميل البيانات');
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customer: Customer) => {
    try {
      const newCustomer = await db.saveCustomer(customer);
      await loadData();
      return newCustomer;
    } catch (err) {
      console.error('Error adding customer:', err);
      throw new Error('فشل إضافة العميل');
    }
  };

  const addSupplier = async (supplier: Customer) => {
    try {
      const newSupplier = await db.saveSupplier(supplier);
      await loadData();
      return newSupplier;
    } catch (err) {
      console.error('Error adding supplier:', err);
      throw new Error('فشل إضافة المورد');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    customers,
    suppliers,
    loading,
    error,
    addCustomer,
    addSupplier,
    refresh: loadData,
  };
}