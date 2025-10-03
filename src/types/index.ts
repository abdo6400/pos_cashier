// Core type definitions for the Warehouse Management System

export interface Product {
  id: string;
  name: string;
  barcode: string;
  sku: string;
  category: string;
  brand: string;
  unit: string;
  costPrice: number;
  sellingPrice: number;
  stock: number;
  minStock: number;
  supplier: string;
  expiryDate?: string;
  image?: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
}

export interface Brand {
  id: string;
  name: string;
  description: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  creditBalance: number;
  loyaltyPoints: number;
  totalPurchases: number;
}

export interface Supplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  balance: number;
  totalPurchases: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  date: string;
  customer: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  status: 'completed' | 'pending' | 'returned';
}

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  total: number;
}

export interface Purchase {
  id: string;
  invoiceNumber: string;
  date: string;
  supplier: string;
  items: PurchaseItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'completed' | 'pending';
}

export interface PurchaseItem {
  productId: string;
  productName: string;
  quantity: number;
  cost: number;
  total: number;
}

export interface Expense {
  id: string;
  date: string;
  category: string;
  amount: number;
  description: string;
  paymentMethod: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'cashier' | 'storekeeper';
  phone: string;
  status: 'active' | 'inactive';
}

export interface DashboardStats {
  totalSales: number;
  totalPurchases: number;
  totalProfit: number;
  totalExpenses: number;
  stockValue: number;
  lowStockItems: number;
  expiredProducts: number;
  unpaidInvoices: number;
}