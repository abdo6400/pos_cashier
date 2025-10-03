import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { mockDashboardStats, salesChartData, topProducts, mockProducts } from '../../lib/mockData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ActivityLog } from '../activity/ActivityLog';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const stats = mockDashboardStats;

  const statCards = [
    {
      title: 'Total Sales',
      value: `$${stats.totalSales.toLocaleString()}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      title: 'Total Purchases',
      value: `$${stats.totalPurchases.toLocaleString()}`,
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      title: 'Total Profit',
      value: `$${stats.totalProfit.toLocaleString()}`,
      change: '+18.7%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      title: 'Total Expenses',
      value: `$${stats.totalExpenses.toLocaleString()}`,
      change: '-5.3%',
      trend: 'down',
      icon: TrendingDown,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ];

  const lowStockProducts = mockProducts.filter(p => p.stock <= p.minStock);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div>
        <h1>Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Welcome back! Here's what's happening with your warehouse today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <h3 className="mt-2">{stat.value}</h3>
                    <div className="flex items-center mt-2 gap-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-gray-500">vs last month</span>
                    </div>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Alerts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-900/10 dark:border-orange-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-orange-900 dark:text-orange-400">Low Stock Alert</p>
                <p className="text-sm text-orange-700 dark:text-orange-500">{stats.lowStockItems} products need restocking</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-200 bg-red-50/50 dark:bg-red-900/10 dark:border-red-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-red-100 dark:bg-red-900/30 p-2 rounded-lg">
                <Package className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-red-900 dark:text-red-400">Expired Products</p>
                <p className="text-sm text-red-700 dark:text-red-500">{stats.expiredProducts} products expired</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-blue-900 dark:text-blue-400">Unpaid Invoices</p>
                <p className="text-sm text-blue-700 dark:text-blue-500">{stats.unpaidInvoices} invoices pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales & Purchases Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesChartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                <XAxis dataKey="name" className="text-sm" />
                <YAxis className="text-sm" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} name="Sales" />
                <Line type="monotone" dataKey="purchases" stroke="#8b5cf6" strokeWidth={2} name="Purchases" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <div className="lg:col-span-1">
          <ActivityLog />
        </div>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Top Selling Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topProducts} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
              <XAxis type="number" className="text-sm" />
              <YAxis dataKey="name" type="category" width={150} className="text-sm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Low Stock Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Low Stock Products</CardTitle>
          <Button variant="outline" size="sm" onClick={() => onNavigate('products')}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                    <Package className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p>{product.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={product.stock <= 5 ? 'destructive' : 'secondary'}>
                    {product.stock} in stock
                  </Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Min: {product.minStock}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="h-24 flex-col gap-2" onClick={() => onNavigate('pos')}>
              <ShoppingCart className="w-6 h-6" />
              New Sale
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" onClick={() => onNavigate('products')}>
              <Package className="w-6 h-6" />
              Add Product
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" onClick={() => onNavigate('purchases')}>
              <ShoppingCart className="w-6 h-6" />
              New Purchase
            </Button>
            <Button className="h-24 flex-col gap-2" variant="outline" onClick={() => onNavigate('reports')}>
              <TrendingUp className="w-6 h-6" />
              View Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}