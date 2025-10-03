// Mock data for demonstration purposes
import { Product, Category, Customer, Supplier, Sale, Purchase, Expense, User, DashboardStats } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Samsung Galaxy S23',
    barcode: '8801643890234',
    sku: 'SAM-S23-128',
    category: 'Electronics',
    brand: 'Samsung',
    unit: 'Piece',
    costPrice: 750,
    sellingPrice: 999,
    stock: 45,
    minStock: 10,
    supplier: 'Tech Distributors Inc',
  },
  {
    id: '2',
    name: 'Apple iPhone 15 Pro',
    barcode: '0194253826774',
    sku: 'APL-IP15P-256',
    category: 'Electronics',
    brand: 'Apple',
    unit: 'Piece',
    costPrice: 950,
    sellingPrice: 1299,
    stock: 28,
    minStock: 10,
    supplier: 'Apple Wholesale',
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    barcode: '4548736136847',
    sku: 'SNY-WH1000-BLK',
    category: 'Electronics',
    brand: 'Sony',
    unit: 'Piece',
    costPrice: 280,
    sellingPrice: 399,
    stock: 62,
    minStock: 15,
    supplier: 'Audio Tech Ltd',
  },
  {
    id: '4',
    name: 'Dell XPS 15 Laptop',
    barcode: '884116387534',
    sku: 'DEL-XPS15-I7',
    category: 'Electronics',
    brand: 'Dell',
    unit: 'Piece',
    costPrice: 1400,
    sellingPrice: 1899,
    stock: 15,
    minStock: 5,
    supplier: 'Tech Distributors Inc',
  },
  {
    id: '5',
    name: 'Logitech MX Master 3S',
    barcode: '097855170194',
    sku: 'LOG-MXM3S-BLK',
    category: 'Electronics',
    brand: 'Logitech',
    unit: 'Piece',
    costPrice: 75,
    sellingPrice: 99,
    stock: 8,
    minStock: 20,
    supplier: 'Accessories Hub',
  },
  {
    id: '6',
    name: 'Canon EOS R6 Camera',
    barcode: '4549292175042',
    sku: 'CAN-R6-BODY',
    category: 'Electronics',
    brand: 'Canon',
    unit: 'Piece',
    costPrice: 1900,
    sellingPrice: 2499,
    stock: 7,
    minStock: 5,
    supplier: 'Camera World',
  },
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Electronics', description: 'Electronic devices and accessories', productCount: 156 },
  { id: '2', name: 'Clothing', description: 'Apparel and fashion items', productCount: 89 },
  { id: '3', name: 'Food & Beverages', description: 'Grocery and consumables', productCount: 234 },
  { id: '4', name: 'Furniture', description: 'Home and office furniture', productCount: 45 },
  { id: '5', name: 'Books', description: 'Books and publications', productCount: 67 },
];

export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 555-0123',
    address: '123 Main St, City, State 12345',
    creditBalance: 250.00,
    loyaltyPoints: 1250,
    totalPurchases: 5420.50,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+1 555-0124',
    address: '456 Oak Ave, City, State 12346',
    creditBalance: 0,
    loyaltyPoints: 890,
    totalPurchases: 3890.00,
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mbrown@email.com',
    phone: '+1 555-0125',
    address: '789 Pine Rd, City, State 12347',
    creditBalance: 150.00,
    loyaltyPoints: 2340,
    totalPurchases: 8920.75,
  },
];

export const mockSuppliers: Supplier[] = [
  {
    id: '1',
    name: 'Tech Distributors Inc',
    email: 'sales@techdist.com',
    phone: '+1 555-1000',
    address: '100 Business Park, Industrial Zone',
    balance: 5430.00,
    totalPurchases: 45600.00,
  },
  {
    id: '2',
    name: 'Apple Wholesale',
    email: 'orders@applewholesale.com',
    phone: '+1 555-1001',
    address: '200 Technology Blvd, Tech City',
    balance: 0,
    totalPurchases: 67800.00,
  },
  {
    id: '3',
    name: 'Audio Tech Ltd',
    email: 'contact@audiotech.com',
    phone: '+1 555-1002',
    address: '300 Sound Ave, Audio District',
    balance: 2100.00,
    totalPurchases: 23400.00,
  },
];

export const mockSales: Sale[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-0001',
    date: '2025-10-03',
    customer: 'John Smith',
    items: [
      { productId: '1', productName: 'Samsung Galaxy S23', quantity: 1, price: 999, total: 999 },
      { productId: '3', productName: 'Sony WH-1000XM5 Headphones', quantity: 1, price: 399, total: 399 },
    ],
    subtotal: 1398,
    discount: 50,
    tax: 134.80,
    total: 1482.80,
    paymentMethod: 'Card',
    status: 'completed',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-0002',
    date: '2025-10-03',
    customer: 'Sarah Johnson',
    items: [
      { productId: '5', productName: 'Logitech MX Master 3S', quantity: 2, price: 99, total: 198 },
    ],
    subtotal: 198,
    discount: 0,
    tax: 19.80,
    total: 217.80,
    paymentMethod: 'Cash',
    status: 'completed',
  },
];

export const mockPurchases: Purchase[] = [
  {
    id: '1',
    invoiceNumber: 'PUR-2025-0001',
    date: '2025-10-01',
    supplier: 'Tech Distributors Inc',
    items: [
      { productId: '1', productName: 'Samsung Galaxy S23', quantity: 50, cost: 750, total: 37500 },
      { productId: '4', productName: 'Dell XPS 15 Laptop', quantity: 20, cost: 1400, total: 28000 },
    ],
    subtotal: 65500,
    tax: 6550,
    total: 72050,
    status: 'completed',
  },
];

export const mockExpenses: Expense[] = [
  {
    id: '1',
    date: '2025-10-01',
    category: 'Rent',
    amount: 3500,
    description: 'Monthly shop rent - October',
    paymentMethod: 'Bank Transfer',
  },
  {
    id: '2',
    date: '2025-10-01',
    category: 'Utilities',
    amount: 450,
    description: 'Electricity bill',
    paymentMethod: 'Cash',
  },
  {
    id: '3',
    date: '2025-10-02',
    category: 'Salaries',
    amount: 8500,
    description: 'Staff salaries - October',
    paymentMethod: 'Bank Transfer',
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@warehouse.com',
    role: 'admin',
    phone: '+1 555-9000',
    status: 'active',
  },
  {
    id: '2',
    name: 'Jane Manager',
    email: 'jane.m@warehouse.com',
    role: 'manager',
    phone: '+1 555-9001',
    status: 'active',
  },
  {
    id: '3',
    name: 'Bob Cashier',
    email: 'bob.c@warehouse.com',
    role: 'cashier',
    phone: '+1 555-9002',
    status: 'active',
  },
];

export const mockDashboardStats: DashboardStats = {
  totalSales: 45680.50,
  totalPurchases: 72050.00,
  totalProfit: 15320.75,
  totalExpenses: 12450.00,
  stockValue: 123450.00,
  lowStockItems: 3,
  expiredProducts: 2,
  unpaidInvoices: 5,
};

export const salesChartData = [
  { name: 'Mon', sales: 4200, purchases: 3100 },
  { name: 'Tue', sales: 5100, purchases: 2800 },
  { name: 'Wed', sales: 4800, purchases: 4200 },
  { name: 'Thu', sales: 6200, purchases: 3600 },
  { name: 'Fri', sales: 7500, purchases: 5100 },
  { name: 'Sat', sales: 8900, purchases: 4800 },
  { name: 'Sun', sales: 8980, purchases: 3200 },
];

export const topProducts = [
  { name: 'Samsung Galaxy S23', sales: 125, revenue: 124875 },
  { name: 'Apple iPhone 15 Pro', sales: 98, revenue: 127302 },
  { name: 'Dell XPS 15 Laptop', sales: 67, revenue: 127233 },
  { name: 'Sony Headphones', sales: 156, revenue: 62244 },
  { name: 'Canon EOS R6', sales: 34, revenue: 84966 },
];