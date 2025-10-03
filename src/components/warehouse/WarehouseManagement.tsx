import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Building2, Package, ArrowRightLeft, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface Warehouse {
  id: string;
  name: string;
  code: string;
  location: string;
  manager: string;
  phone: string;
  status: 'active' | 'inactive';
  stockValue: number;
  productCount: number;
}

interface StockTransfer {
  id: string;
  transferNumber: string;
  date: string;
  from: string;
  to: string;
  product: string;
  quantity: number;
  status: 'pending' | 'completed' | 'cancelled';
}

const mockWarehouses: Warehouse[] = [
  {
    id: '1',
    name: 'Main Warehouse',
    code: 'WH-001',
    location: '123 Industrial Park, City Center',
    manager: 'John Manager',
    phone: '+1 555-0201',
    status: 'active',
    stockValue: 450000,
    productCount: 1250,
  },
  {
    id: '2',
    name: 'Downtown Store',
    code: 'ST-001',
    location: '456 Main Street, Downtown',
    manager: 'Sarah Store',
    phone: '+1 555-0202',
    status: 'active',
    stockValue: 180000,
    productCount: 650,
  },
  {
    id: '3',
    name: 'North Branch',
    code: 'BR-001',
    location: '789 North Avenue, North District',
    manager: 'Mike Branch',
    phone: '+1 555-0203',
    status: 'active',
    stockValue: 220000,
    productCount: 820,
  },
];

const mockTransfers: StockTransfer[] = [
  {
    id: '1',
    transferNumber: 'TRN-2025-0001',
    date: '2025-10-03',
    from: 'Main Warehouse',
    to: 'Downtown Store',
    product: 'Samsung Galaxy S23',
    quantity: 10,
    status: 'completed',
  },
  {
    id: '2',
    transferNumber: 'TRN-2025-0002',
    date: '2025-10-02',
    from: 'Main Warehouse',
    to: 'North Branch',
    product: 'Apple iPhone 15 Pro',
    quantity: 15,
    status: 'pending',
  },
];

export function WarehouseManagement() {
  const [warehouses] = useState(mockWarehouses);
  const [transfers] = useState(mockTransfers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddWarehouseOpen, setIsAddWarehouseOpen] = useState(false);
  const [isTransferDialogOpen, setIsTransferDialogOpen] = useState(false);

  const totalStockValue = warehouses.reduce((sum, wh) => sum + wh.stockValue, 0);
  const activeWarehouses = warehouses.filter(wh => wh.status === 'active').length;

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div>
        <h1>Multi-Warehouse Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Manage multiple warehouses and stock transfers
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <Building2 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Warehouses</p>
                <h3>{warehouses.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <Building2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
                <h3>{activeWarehouses}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Stock Value</p>
            <h3 className="mt-2">${totalStockValue.toLocaleString()}</h3>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <ArrowRightLeft className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pending Transfers</p>
                <h3>{transfers.filter(t => t.status === 'pending').length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="warehouses" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
          <TabsTrigger value="transfers">Stock Transfers</TabsTrigger>
        </TabsList>

        {/* Warehouses Tab */}
        <TabsContent value="warehouses" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search warehouses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setIsAddWarehouseOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Warehouse
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {warehouses.map((warehouse) => (
              <Card key={warehouse.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <Building2 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{warehouse.name}</CardTitle>
                        <Badge variant="outline" className="mt-1">{warehouse.code}</Badge>
                      </div>
                    </div>
                    <Badge variant={warehouse.status === 'active' ? 'default' : 'secondary'}>
                      {warehouse.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                    <span className="text-gray-600 dark:text-gray-400">{warehouse.location}</span>
                  </div>
                  <div className="space-y-2 pt-3 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Manager</span>
                      <span>{warehouse.manager}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Phone</span>
                      <span>{warehouse.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Products</span>
                      <span>{warehouse.productCount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Stock Value</span>
                      <span className="text-blue-600">${warehouse.stockValue.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Package className="w-3 h-3 mr-2" />
                      View Stock
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Transfers Tab */}
        <TabsContent value="transfers" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input placeholder="Search transfers..." className="pl-10" />
                </div>
                <Button onClick={() => setIsTransferDialogOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  New Transfer
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Stock Transfers ({transfers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer #</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transfers.map((transfer) => (
                      <TableRow key={transfer.id}>
                        <TableCell>{transfer.transferNumber}</TableCell>
                        <TableCell>{new Date(transfer.date).toLocaleDateString()}</TableCell>
                        <TableCell>{transfer.from}</TableCell>
                        <TableCell>{transfer.to}</TableCell>
                        <TableCell>{transfer.product}</TableCell>
                        <TableCell>{transfer.quantity}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              transfer.status === 'completed' ? 'default' :
                              transfer.status === 'pending' ? 'secondary' :
                              'destructive'
                            }
                          >
                            {transfer.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="icon">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-600">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Warehouse Dialog */}
      <Dialog open={isAddWarehouseOpen} onOpenChange={setIsAddWarehouseOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Warehouse</DialogTitle>
            <DialogDescription>Create a new warehouse or store location</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="wh-name">Warehouse Name</Label>
              <Input id="wh-name" placeholder="Enter warehouse name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-code">Warehouse Code</Label>
              <Input id="wh-code" placeholder="Enter warehouse code" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="wh-location">Location Address</Label>
              <Input id="wh-location" placeholder="Enter full address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-manager">Manager Name</Label>
              <Input id="wh-manager" placeholder="Enter manager name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wh-phone">Phone Number</Label>
              <Input id="wh-phone" placeholder="Enter phone number" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddWarehouseOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddWarehouseOpen(false)}>
              Add Warehouse
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Stock Transfer Dialog */}
      <Dialog open={isTransferDialogOpen} onOpenChange={setIsTransferDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Stock Transfer</DialogTitle>
            <DialogDescription>Transfer stock between warehouses</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>From Warehouse</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select source warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map(wh => (
                    <SelectItem key={wh.id} value={wh.id}>{wh.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>To Warehouse</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select destination warehouse" />
                </SelectTrigger>
                <SelectContent>
                  {warehouses.map(wh => (
                    <SelectItem key={wh.id} value={wh.id}>{wh.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="product">Product</Label>
              <Input id="product" placeholder="Search product..." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input id="quantity" type="number" placeholder="Enter quantity" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTransferDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsTransferDialogOpen(false)}>
              Create Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}