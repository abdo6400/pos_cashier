import { Clock, Package, ShoppingCart, Users, DollarSign, Edit } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback } from '../ui/avatar';

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'sale' | 'product' | 'customer' | 'expense' | 'edit';
}

const mockActivities: Activity[] = [
  {
    id: '1',
    user: 'Admin User',
    action: 'completed a sale',
    target: 'INV-2025-0001 ($1,482.80)',
    time: '2 minutes ago',
    type: 'sale',
  },
  {
    id: '2',
    user: 'Jane Manager',
    action: 'added new product',
    target: 'MacBook Pro 16"',
    time: '15 minutes ago',
    type: 'product',
  },
  {
    id: '3',
    user: 'Bob Cashier',
    action: 'updated customer',
    target: 'John Smith',
    time: '32 minutes ago',
    type: 'customer',
  },
  {
    id: '4',
    user: 'Admin User',
    action: 'added expense',
    target: 'Office supplies ($450)',
    time: '1 hour ago',
    type: 'expense',
  },
  {
    id: '5',
    user: 'Jane Manager',
    action: 'edited product',
    target: 'Samsung Galaxy S23',
    time: '2 hours ago',
    type: 'edit',
  },
];

export function ActivityLog() {
  const getIcon = (type: string) => {
    switch (type) {
      case 'sale':
        return <ShoppingCart className="w-4 h-4 text-blue-600" />;
      case 'product':
        return <Package className="w-4 h-4 text-green-600" />;
      case 'customer':
        return <Users className="w-4 h-4 text-purple-600" />;
      case 'expense':
        return <DollarSign className="w-4 h-4 text-red-600" />;
      case 'edit':
        return <Edit className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'sale':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'product':
        return 'bg-green-50 dark:bg-green-900/20';
      case 'customer':
        return 'bg-purple-50 dark:bg-purple-900/20';
      case 'expense':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'edit':
        return 'bg-orange-50 dark:bg-orange-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {mockActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`${getBgColor(activity.type)} p-2 rounded-lg`}>
                  {getIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs">
                        {activity.user.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm">
                      <span>{activity.user}</span>
                      <span className="text-gray-600 dark:text-gray-400"> {activity.action} </span>
                      <span>{activity.target}</span>
                    </p>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 ml-8">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}