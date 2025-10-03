import { useState } from 'react';
import { AppLayout } from './components/layout/AppLayout';
import { Dashboard } from './components/dashboard/Dashboard';
import { ProductList } from './components/products/ProductList';
import { CategoriesManagement } from './components/categories/CategoriesManagement';
import { POSScreen } from './components/pos/POSScreen';
import { SalesList } from './components/sales/SalesList';
import { PurchasesList } from './components/purchases/PurchasesList';
import { CustomerList } from './components/customers/CustomerList';
import { SupplierList } from './components/suppliers/SupplierList';
import { InvoiceManagement } from './components/invoices/InvoiceManagement';
import { ExpensesList } from './components/expenses/ExpensesList';
import { WarehouseManagement } from './components/warehouse/WarehouseManagement';
import { Reports } from './components/reports/Reports';
import { UserManagement } from './components/users/UserManagement';
import { Settings } from './components/settings/Settings';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      case 'products':
        return <ProductList />;
      case 'categories':
        return <CategoriesManagement />;
      case 'pos':
        return <POSScreen />;
      case 'sales':
        return <SalesList />;
      case 'purchases':
        return <PurchasesList />;
      case 'customers':
        return <CustomerList />;
      case 'suppliers':
        return <SupplierList />;
      case 'invoices':
        return <InvoiceManagement />;
      case 'expenses':
        return <ExpensesList />;
      case 'warehouse':
        return <WarehouseManagement />;
      case 'reports':
        return <Reports />;
      case 'users':
        return <UserManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <>
      <AppLayout currentPage={currentPage} onNavigate={setCurrentPage}>
        {renderPage()}
      </AppLayout>
      <Toaster />
    </>
  );
}