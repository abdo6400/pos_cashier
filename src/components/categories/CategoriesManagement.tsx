import { useState } from 'react';
import { Search, Plus, Edit, Trash2, Tag, Grid3x3 } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { mockCategories } from '../../lib/mockData';

const mockBrands = [
  { id: '1', name: 'Samsung', category: 'Electronics', productCount: 45 },
  { id: '2', name: 'Apple', category: 'Electronics', productCount: 38 },
  { id: '3', name: 'Sony', category: 'Electronics', productCount: 28 },
  { id: '4', name: 'Dell', category: 'Electronics', productCount: 22 },
  { id: '5', name: 'Nike', category: 'Clothing', productCount: 56 },
];

const mockUnits = [
  { id: '1', name: 'Piece', shortName: 'pcs', baseUnit: true },
  { id: '2', name: 'Box', shortName: 'box', baseUnit: false, conversion: '1 box = 12 pieces' },
  { id: '3', name: 'Kilogram', shortName: 'kg', baseUnit: true },
  { id: '4', name: 'Gram', shortName: 'g', baseUnit: false, conversion: '1 kg = 1000 g' },
  { id: '5', name: 'Liter', shortName: 'L', baseUnit: true },
  { id: '6', name: 'Milliliter', shortName: 'ml', baseUnit: false, conversion: '1 L = 1000 ml' },
  { id: '7', name: 'Dozen', shortName: 'doz', baseUnit: false, conversion: '1 dozen = 12 pieces' },
];

export function CategoriesManagement() {
  const [categories] = useState(mockCategories);
  const [brands] = useState(mockBrands);
  const [units] = useState(mockUnits);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false);
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div>
        <h1>Categories, Brands & Units</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Organize your product taxonomy and measurement units
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <Grid3x3 className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Categories</p>
                <h3>{categories.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                <Tag className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Brands</p>
                <h3>{brands.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                <Grid3x3 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Units</p>
                <h3>{units.length}</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="categories" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="brands">Brands</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
        </TabsList>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setIsAddCategoryOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Product Categories ({categories.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                              <Grid3x3 className="w-4 h-4 text-blue-600" />
                            </div>
                            <p>{category.name}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-600 dark:text-gray-400">
                          {category.description}
                        </TableCell>
                        <TableCell>
                          <Badge>{category.productCount} products</Badge>
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

        {/* Brands Tab */}
        <TabsContent value="brands" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search brands..."
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setIsAddBrandOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Brand
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Brands ({brands.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Brand Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Products</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {brands.map((brand) => (
                      <TableRow key={brand.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded">
                              <Tag className="w-4 h-4 text-purple-600" />
                            </div>
                            <p>{brand.name}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{brand.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge>{brand.productCount} products</Badge>
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

        {/* Units Tab */}
        <TabsContent value="units" className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search units..."
                    className="pl-10"
                  />
                </div>
                <Button onClick={() => setIsAddUnitOpen(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Unit
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Measurement Units ({units.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Unit Name</TableHead>
                      <TableHead>Short Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Conversion</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {units.map((unit) => (
                      <TableRow key={unit.id}>
                        <TableCell>
                          <p>{unit.name}</p>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{unit.shortName}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={unit.baseUnit ? 'default' : 'secondary'}>
                            {unit.baseUnit ? 'Base Unit' : 'Derived Unit'}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">
                          {unit.conversion || '-'}
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

      {/* Add Category Dialog */}
      <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Category</DialogTitle>
            <DialogDescription>Create a new product category</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">Category Name</Label>
              <Input id="category-name" placeholder="Enter category name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category-desc">Description</Label>
              <Input id="category-desc" placeholder="Enter description" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddCategoryOpen(false)}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Brand Dialog */}
      <Dialog open={isAddBrandOpen} onOpenChange={setIsAddBrandOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Brand</DialogTitle>
            <DialogDescription>Create a new brand</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input id="brand-name" placeholder="Enter brand name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand-category">Category</Label>
              <Input id="brand-category" placeholder="Select category" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddBrandOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddBrandOpen(false)}>Add Brand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Unit Dialog */}
      <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Unit</DialogTitle>
            <DialogDescription>Create a new measurement unit</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="unit-name">Unit Name</Label>
              <Input id="unit-name" placeholder="Enter unit name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit-short">Short Name</Label>
              <Input id="unit-short" placeholder="Enter short name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit-conversion">Conversion (Optional)</Label>
              <Input id="unit-conversion" placeholder="e.g., 1 kg = 1000 g" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddUnitOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsAddUnitOpen(false)}>Add Unit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}