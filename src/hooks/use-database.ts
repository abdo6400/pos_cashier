import { useState, useEffect } from 'react';
import { kvService } from '../lib/db-service';

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await kvService.getProducts();
      setProducts(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = async (product: any) => {
    try {
      const saved = await kvService.saveProduct(product);
      setProducts(prev => [...prev, saved]);
      return saved;
    } catch (err: any) {
      console.error('Error adding product:', err);
      throw err;
    }
  };

  const updateProduct = async (product: any) => {
    try {
      const updated = await kvService.saveProduct(product);
      setProducts(prev => prev.map(p => p.id === product.id ? updated : p));
      return updated;
    } catch (err: any) {
      console.error('Error updating product:', err);
      throw err;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await kvService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      console.error('Error deleting product:', err);
      throw err;
    }
  };

  return { products, loading, error, addProduct, updateProduct, deleteProduct, reload: loadProducts };
}

export function useCustomers() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const data = await kvService.getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error('Error loading customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const addCustomer = async (customer: any) => {
    try {
      const saved = await kvService.saveCustomer(customer);
      setCustomers(prev => [...prev, saved]);
      return saved;
    } catch (err) {
      console.error('Error adding customer:', err);
      throw err;
    }
  };

  return { customers, loading, addCustomer, reload: loadCustomers };
}

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      const data = await kvService.getSuppliers();
      setSuppliers(data);
    } catch (err) {
      console.error('Error loading suppliers:', err);
    } finally {
      setLoading(false);
    }
  };

  const addSupplier = async (supplier: any) => {
    try {
      const saved = await kvService.saveSupplier(supplier);
      setSuppliers(prev => [...prev, saved]);
      return saved;
    } catch (err) {
      console.error('Error adding supplier:', err);
      throw err;
    }
  };

  return { suppliers, loading, addSupplier, reload: loadSuppliers };
}

export function useInvoices() {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      const data = await kvService.getInvoices();
      setInvoices(data);
    } catch (err) {
      console.error('Error loading invoices:', err);
    } finally {
      setLoading(false);
    }
  };

  const addInvoice = async (invoice: any) => {
    try {
      const saved = await kvService.saveInvoice(invoice);
      setInvoices(prev => [...prev, saved]);
      return saved;
    } catch (err) {
      console.error('Error adding invoice:', err);
      throw err;
    }
  };

  return { invoices, loading, addInvoice, reload: loadInvoices };
}

export function usePayments() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      setLoading(true);
      const data = await kvService.getPayments();
      setPayments(data);
    } catch (err) {
      console.error('Error loading payments:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPayment = async (payment: any) => {
    try {
      const saved = await kvService.savePayment(payment);
      setPayments(prev => [...prev, saved]);
      return saved;
    } catch (err) {
      console.error('Error adding payment:', err);
      throw err;
    }
  };

  return { payments, loading, addPayment, reload: loadPayments };
}

export function useSettings() {
  const [settings, setSettings] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      const data = await kvService.getSettings();
      setSettings(data);
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (newSettings: any) => {
    try {
      const saved = await kvService.saveSettings({ ...settings, ...newSettings });
      setSettings(saved);
      return saved;
    } catch (err) {
      console.error('Error updating settings:', err);
      throw err;
    }
  };

  return { settings, loading, updateSettings, reload: loadSettings };
}
