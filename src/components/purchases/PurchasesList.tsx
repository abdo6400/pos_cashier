import { useState } from 'react';
import { Search, Plus, Filter, Download, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { mockPurchases } from '../../lib/mockData';

export function PurchasesList() {
  const [purchases] = useState(mockPurchases);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPurchases = purchases.filter(purchase =>
    purchase.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    purchase.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPurchases = purchases.reduce((sum, purchase) => sum + purchase.total, 0);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Purchases</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage purchase orders and supplier transactions
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Purchase
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Purchases</p>
            <h3 className="mt-2">${totalPurchases.toLocaleString()}</h3>
            <p className="text-sm text-blue-600 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Purchase Orders</p>
            <h3 className="mt-2">{purchases.length}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Completed</p>
            <h3 className="mt-2">{purchases.filter(p => p.status === 'completed').length}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by invoice number or supplier..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Purchases Table */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase History ({filteredPurchases.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Subtotal</TableHead>
                  <TableHead>Tax</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPurchases.map((purchase) => (
                  <TableRow key={purchase.id}>
                    <TableCell>
                      <p>{purchase.invoiceNumber}</p>
                    </TableCell>
                    <TableCell>
                      {new Date(purchase.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{purchase.supplier}</TableCell>
                    <TableCell>{purchase.items.length} items</TableCell>
                    <TableCell>${purchase.subtotal.toLocaleString()}</TableCell>
                    <TableCell>${purchase.tax.toLocaleString()}</TableCell>
                    <TableCell>
                      <p>${purchase.total.toLocaleString()}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant={purchase.status === 'completed' ? 'default' : 'secondary'}>
                        {purchase.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}