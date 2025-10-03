import { supabase } from './supabase/client';

// Helper functions for KV store operations

export const db = {
  // Products
  async getProducts() {
    const result = await fetch(`/api/products`);
    if (!result.ok) return [];
    return result.json();
  },

  async saveProduct(product: any) {
    const products = await this.getProducts();
    const newProduct = {
      ...product,
      id: product.id || Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = product.id 
      ? products.map((p: any) => p.id === product.id ? newProduct : p)
      : [...products, newProduct];
    
    await this.setData('products', updated);
    return newProduct;
  },

  async deleteProduct(id: number) {
    const products = await this.getProducts();
    const filtered = products.filter((p: any) => p.id !== id);
    await this.setData('products', filtered);
  },

  // Customers
  async getCustomers() {
    return this.getData('customers') || [];
  },

  async saveCustomer(customer: any) {
    const customers = await this.getCustomers();
    const newCustomer = {
      ...customer,
      id: customer.id || Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = customer.id 
      ? customers.map((c: any) => c.id === customer.id ? newCustomer : c)
      : [...customers, newCustomer];
    
    await this.setData('customers', updated);
    return newCustomer;
  },

  // Suppliers
  async getSuppliers() {
    return this.getData('suppliers') || [];
  },

  async saveSupplier(supplier: any) {
    const suppliers = await this.getSuppliers();
    const newSupplier = {
      ...supplier,
      id: supplier.id || Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = supplier.id 
      ? suppliers.map((s: any) => s.id === supplier.id ? newSupplier : s)
      : [...suppliers, newSupplier];
    
    await this.setData('suppliers', updated);
    return newSupplier;
  },

  // Invoices
  async getInvoices() {
    return this.getData('invoices') || [];
  },

  async saveInvoice(invoice: any) {
    const invoices = await this.getInvoices();
    const newInvoice = {
      ...invoice,
      id: invoice.id || `INV-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const updated = invoice.id && invoices.find((i: any) => i.id === invoice.id)
      ? invoices.map((i: any) => i.id === invoice.id ? newInvoice : i)
      : [...invoices, newInvoice];
    
    await this.setData('invoices', updated);
    return newInvoice;
  },

  // Payments
  async getPayments() {
    return this.getData('payments') || [];
  },

  async savePayment(payment: any) {
    const payments = await this.getPayments();
    const newPayment = {
      ...payment,
      id: payment.id || Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = [...payments, newPayment];
    await this.setData('payments', updated);
    return newPayment;
  },

  // Expenses
  async getExpenses() {
    return this.getData('expenses') || [];
  },

  async saveExpense(expense: any) {
    const expenses = await this.getExpenses();
    const newExpense = {
      ...expense,
      id: expense.id || Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = [...expenses, newExpense];
    await this.setData('expenses', updated);
    return newExpense;
  },

  // Marketers
  async getMarketers() {
    return this.getData('marketers') || [];
  },

  async saveMarketer(marketer: any) {
    const marketers = await this.getMarketers();
    const newMarketer = {
      ...marketer,
      id: marketer.id || Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = marketer.id 
      ? marketers.map((m: any) => m.id === marketer.id ? newMarketer : m)
      : [...marketers, newMarketer];
    
    await this.setData('marketers', updated);
    return newMarketer;
  },

  // Shipments
  async getShipments() {
    return this.getData('shipments') || [];
  },

  async saveShipment(shipment: any) {
    const shipments = await this.getShipments();
    const newShipment = {
      ...shipment,
      id: shipment.id || Date.now(),
      waybillNumber: shipment.waybillNumber || `WB-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    const updated = [...shipments, newShipment];
    await this.setData('shipments', updated);
    return newShipment;
  },

  // Users
  async getUsers() {
    return this.getData('users') || [];
  },

  async saveUser(user: any) {
    const users = await this.getUsers();
    const newUser = {
      ...user,
      id: user.id || Date.now(),
      createdAt: new Date().toISOString(),
    };
    
    const updated = user.id 
      ? users.map((u: any) => u.id === user.id ? newUser : u)
      : [...users, newUser];
    
    await this.setData('users', updated);
    return newUser;
  },

  // Settings
  async getSettings() {
    return this.getData('settings') || {};
  },

  async saveSettings(settings: any) {
    await this.setData('settings', settings);
    return settings;
  },

  // Generic KV operations
  async getData(key: string) {
    try {
      const { data, error } = await supabase
        .from('kv_store_6ffc6762')
        .select('value')
        .eq('key', key)
        .single();

      if (error) {
        console.log(`No data found for key: ${key}`);
        return null;
      }

      return data?.value;
    } catch (error) {
      console.error(`Error getting data for key ${key}:`, error);
      return null;
    }
  },

  async setData(key: string, value: any) {
    try {
      const { error } = await supabase
        .from('kv_store_6ffc6762')
        .upsert({
          key,
          value,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error(`Error setting data for key ${key}:`, error);
        throw error;
      }

      return true;
    } catch (error) {
      console.error(`Error setting data for key ${key}:`, error);
      throw error;
    }
  },

  // Backup operations
  async createBackup() {
    const backup = {
      timestamp: new Date().toISOString(),
      data: {
        products: await this.getProducts(),
        customers: await this.getCustomers(),
        suppliers: await this.getSuppliers(),
        invoices: await this.getInvoices(),
        payments: await this.getPayments(),
        expenses: await this.getExpenses(),
        marketers: await this.getMarketers(),
        shipments: await this.getShipments(),
        users: await this.getUsers(),
        settings: await this.getSettings(),
      },
    };

    // Save backup with timestamp
    await this.setData(`backup_${Date.now()}`, backup);
    
    return backup;
  },

  async restoreBackup(backupData: any) {
    const { data } = backupData;
    
    await this.setData('products', data.products);
    await this.setData('customers', data.customers);
    await this.setData('suppliers', data.suppliers);
    await this.setData('invoices', data.invoices);
    await this.setData('payments', data.payments);
    await this.setData('expenses', data.expenses);
    await this.setData('marketers', data.marketers);
    await this.setData('shipments', data.shipments);
    await this.setData('users', data.users);
    await this.setData('settings', data.settings);

    return true;
  },
};