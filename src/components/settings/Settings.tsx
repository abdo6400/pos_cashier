import { Building2, Bell, Globe, Palette, Shield, Database, Printer, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Switch } from '../ui/switch';
import { Separator } from '../ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

export function Settings() {
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Page Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Configure your warehouse and shop management system
        </p>
      </div>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="business" className="space-y-4">
          {/* Business Profile */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Business Profile</CardTitle>
                  <CardDescription>Update your business information</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-name">Business Name</Label>
                  <Input id="business-name" defaultValue="WarehousePro Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-email">Email</Label>
                  <Input id="business-email" type="email" defaultValue="info@warehousepro.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="business-phone">Phone</Label>
                  <Input id="business-phone" defaultValue="+1 555-0100" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID / VAT Number</Label>
                  <Input id="tax-id" defaultValue="TAX123456789" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Business Address</Label>
                  <Input id="address" defaultValue="123 Business Street, City, State 12345" />
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Currency & Language */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                  <Globe className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Regional Settings</CardTitle>
                  <CardDescription>Configure currency, language, and timezone</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select defaultValue="usd">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD - US Dollar</SelectItem>
                      <SelectItem value="eur">EUR - Euro</SelectItem>
                      <SelectItem value="gbp">GBP - British Pound</SelectItem>
                      <SelectItem value="aed">AED - UAE Dirham</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Language</Label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="ar">Arabic</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="utc">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="utc">UTC</SelectItem>
                      <SelectItem value="est">EST - Eastern Time</SelectItem>
                      <SelectItem value="pst">PST - Pacific Time</SelectItem>
                      <SelectItem value="gst">GST - Gulf Standard Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Tax Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Settings</CardTitle>
              <CardDescription>Configure tax rates and calculations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Enable Tax</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Apply tax to sales and purchases</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                <Input id="tax-rate" type="number" defaultValue="10" />
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-orange-50 dark:bg-orange-900/20 p-2 rounded-lg">
                  <Bell className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage your notification settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Low Stock Alerts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Get notified when products are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Product Expiry Alerts</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Notifications for products nearing expiry</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Payment Reminders</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Remind customers about pending payments</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Daily Sales Report</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Receive daily sales summary via email</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Push Notifications</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enable push notifications on mobile</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          {/* Appearance */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-pink-50 dark:bg-pink-900/20 p-2 rounded-lg">
                  <Palette className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize the look and feel</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Dark Mode</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Enable dark theme</p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>Theme Color</Label>
                <Select defaultValue="blue">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue (Default)</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                  <Shield className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Manage security settings</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Two-Factor Authentication</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Change Password</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Update your account password</p>
                </div>
                <Button variant="outline" size="sm">Change</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>Session Timeout</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Auto logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Backup & Restore */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded-lg">
                  <Database className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <CardTitle>Backup & Restore</CardTitle>
                  <CardDescription>Manage your data backups</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Auto Backup</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically backup data daily</p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex gap-2">
                <Button variant="outline">Backup Now</Button>
                <Button variant="outline">Restore</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-4">
          {/* Payment Gateways */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <CardTitle>Payment Gateways</CardTitle>
                  <CardDescription>Connect payment providers</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p>Stripe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Accept card payments</p>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <p>PayPal</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">PayPal payment integration</p>
                </div>
                <Button variant="outline" size="sm">Connect</Button>
              </div>
            </CardContent>
          </Card>

          {/* Printer Settings */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
                  <Printer className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <CardTitle>Receipt Printer</CardTitle>
                  <CardDescription>Configure receipt printing</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Printer Type</Label>
                <Select defaultValue="thermal">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thermal">Thermal Printer (80mm)</SelectItem>
                    <SelectItem value="a4">A4 Printer</SelectItem>
                    <SelectItem value="none">No Printer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p>Auto Print</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Automatically print receipts after sale</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}