import { supabase } from '../utils/supabase/client';

// ============================================
// Key-Value Store Service
// ============================================

// Helper to check if Supabase is available
const isSupabaseAvailable = () => {
  try {
    // Check if supabase is not null and has the from method
    return supabase !== null && supabase !== undefined && typeof supabase?.from === 'function';
  } catch (error) {
    console.warn('Error checking Supabase availability:', error);
    return false;
  }
};

export const kvService = {
  // Products
  async getProducts() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'product:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async getProduct(id: string) {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('value')
      .eq('key', `product:${id}`)
      .single();
    
    if (error) throw error;
    return data ? JSON.parse(data.value) : null;
  },

  async saveProduct(product: any) {
    const id = product.id || `prod_${Date.now()}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `product:${id}`,
        value: JSON.stringify({ ...product, id })
      });
    
    if (error) throw error;
    return { ...product, id };
  },

  async deleteProduct(id: string) {
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .delete()
      .eq('key', `product:${id}`);
    
    if (error) throw error;
  },

  // Invoices
  async getInvoices() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'invoice:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async saveInvoice(invoice: any) {
    const id = invoice.id || `INV-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `invoice:${id}`,
        value: JSON.stringify({ ...invoice, id })
      });
    
    if (error) throw error;
    return { ...invoice, id };
  },

  // Customers
  async getCustomers() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'customer:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async saveCustomer(customer: any) {
    const id = customer.id || `cust_${Date.now()}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `customer:${id}`,
        value: JSON.stringify({ ...customer, id })
      });
    
    if (error) throw error;
    return { ...customer, id };
  },

  // Suppliers
  async getSuppliers() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'supplier:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async saveSupplier(supplier: any) {
    const id = supplier.id || `supp_${Date.now()}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `supplier:${id}`,
        value: JSON.stringify({ ...supplier, id })
      });
    
    if (error) throw error;
    return { ...supplier, id };
  },

  // Payments
  async getPayments() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'payment:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async savePayment(payment: any) {
    const id = payment.id || `pay_${Date.now()}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `payment:${id}`,
        value: JSON.stringify({ ...payment, id })
      });
    
    if (error) throw error;
    return { ...payment, id };
  },

  // Marketers
  async getMarketers() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'marketer:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async saveMarketer(marketer: any) {
    const id = marketer.id || `mark_${Date.now()}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `marketer:${id}`,
        value: JSON.stringify({ ...marketer, id })
      });
    
    if (error) throw error;
    return { ...marketer, id };
  },

  // Shipments
  async getShipments() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'shipment:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async saveShipment(shipment: any) {
    const id = shipment.id || `ship_${Date.now()}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `shipment:${id}`,
        value: JSON.stringify({ ...shipment, id })
      });
    
    if (error) throw error;
    return { ...shipment, id };
  },

  // Users
  async getUsers() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('*')
      .like('key', 'user:%');
    
    if (error) throw error;
    return data?.map(item => ({ id: item.key.split(':')[1], ...JSON.parse(item.value) })) || [];
  },

  async saveUser(user: any) {
    const id = user.id || `user_${Date.now()}`;
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: `user:${id}`,
        value: JSON.stringify({ ...user, id })
      });
    
    if (error) throw error;
    return { ...user, id };
  },

  // Settings
  async getSettings() {
    const { data, error } = await supabase
      .from('kv_store_6ffc6762')
      .select('value')
      .eq('key', 'settings')
      .single();
    
    if (error && error.code !== 'PGRST116') throw error;
    return data ? JSON.parse(data.value) : {};
  },

  async saveSettings(settings: any) {
    const { error } = await supabase
      .from('kv_store_6ffc6762')
      .upsert({
        key: 'settings',
        value: JSON.stringify(settings)
      });
    
    if (error) throw error;
    return settings;
  },

  // Initialize with sample data
  async initializeSampleData() {
    try {
      // Check if Supabase is available
      if (!isSupabaseAvailable()) {
        console.warn('⚠️ Supabase client not available. The POS system will work with mock data only.');
        console.warn('ℹ️ To use the database, please ensure Supabase is properly configured.');
        return;
      }

      // Test if the table exists by attempting a simple query
      const { error: testError } = await supabase
        .from('kv_store_6ffc6762')
        .select('key')
        .limit(1);
      
      // If table doesn't exist, skip initialization
      if (testError && testError.code === 'PGRST205') {
        console.warn('⚠️ Database table not found. The POS system will work with mock data only.');
        console.warn('ℹ️ To use the database, please set up the kv_store_6ffc6762 table in Supabase.');
        return;
      }
      
      if (testError) {
        console.error('Database connection error:', testError);
        return;
      }

      // Check if data already exists
      const products = await this.getProducts();
      if (products.length > 0) {
        console.log('✓ Sample data already exists in database');
        return;
      }

      console.log('📦 Initializing sample data...');

      // Add sample products
      const sampleProducts = [
        { name: "شاي أحمد 100 كيس", category: "مشروبات", price: 25.50, cost: 18.00, stock: 150, unit: "علبة", barcode: "123456789" },
        { name: "أرز بسمتي 5 كيلو", category: "مواد غذائية", price: 45.00, cost: 35.00, stock: 80, unit: "كيس", barcode: "987654321" },
        { name: "زيت زيتون 1 لتر", category: "زيوت", price: 35.00, cost: 28.00, stock: 25, unit: "زجاجة", barcode: "456789123" },
        { name: "سكر 2 كيلو", category: "مواد غذائية", price: 12.00, cost: 9.00, stock: 200, unit: "كيس", barcode: "789123456" },
        { name: "معكرونة 500 جرام", category: "مواد غذائية", price: 8.50, cost: 6.00, stock: 10, unit: "علبة", barcode: "321654987" },
      ];

      for (const product of sampleProducts) {
        await this.saveProduct(product);
      }

      // Add sample customers
      const sampleCustomers = [
        { name: "محمد أحمد", phone: "0501234567", email: "mohammed@example.com", balance: 450.00, type: "customer" },
        { name: "سارة علي", phone: "0557654321", email: "sara@example.com", balance: -120.00, type: "customer" },
        { name: "أحمد خالد", phone: "0509876543", email: "ahmed@example.com", balance: 0, type: "customer" },
      ];

      for (const customer of sampleCustomers) {
        await this.saveCustomer(customer);
      }

      // Add sample suppliers
      const sampleSuppliers = [
        { name: "شركة الإمدادات الغذائية", phone: "0112345678", email: "supply@company.com", balance: 5200.00, type: "supplier" },
        { name: "مؤسسة التوريدات الشاملة", phone: "0119876543", email: "wholesale@company.com", balance: 3400.00, type: "supplier" },
      ];

      for (const supplier of sampleSuppliers) {
        await this.saveSupplier(supplier);
      }

      console.log('✓ Sample data initialized successfully');
    } catch (error: any) {
      // Don't throw errors - just log them
      console.error('⚠️ Could not initialize sample data:', error?.message || error);
      console.log('ℹ️ The system will continue to work with mock data.');
    }
  }
};
