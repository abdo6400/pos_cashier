import { AlertTriangle, Package, DollarSign, UserPlus, CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'warning',
    title: 'Low Stock Alert',
    message: 'Logitech MX Master 3S has only 8 units left. Minimum stock is 20.',
    time: '5 minutes ago',
    read: false,
  },
  {
    id: '2',
    type: 'error',
    title: 'Products Expired',
    message: '2 products have expired and need to be removed from inventory.',
    time: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'info',
    title: 'New Customer',
    message: 'New customer "Alice Cooper" has been added to the database.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: '4',
    type: 'success',
    title: 'Payment Received',
    message: 'Payment of $2,088.90 received from Sarah Johnson.',
    time: '3 hours ago',
    read: true,
  },
  {
    id: '5',
    type: 'warning',
    title: 'Pending Invoices',
    message: '5 invoices are overdue and require attention.',
    time: '5 hours ago',
    read: true,
  },
];

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const unreadCount = mockNotifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      case 'error':
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      case 'info':
        return <UserPlus className="w-5 h-5 text-blue-600" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Package className="w-5 h-5 text-gray-600" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50 dark:bg-orange-900/20';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20';
      case 'info':
        return 'bg-blue-50 dark:bg-blue-900/20';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Notifications
            {unreadCount > 0 && (
              <Badge variant="destructive">{unreadCount} new</Badge>
            )}
          </SheetTitle>
          <SheetDescription>
            Stay updated with your warehouse activities
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-2">
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="sm">
              Mark all as read
            </Button>
            <Button variant="ghost" size="sm">
              Clear all
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-200px)] mt-4">
          <div className="space-y-3 pr-4">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`
                  p-4 rounded-lg border transition-colors
                  ${!notification.read ? 'border-blue-200 dark:border-blue-800' : 'border-gray-200 dark:border-gray-700'}
                  ${!notification.read ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}
                `}
              >
                <div className="flex gap-3">
                  <div className={`${getBgColor(notification.type)} p-2 rounded-lg h-fit`}>
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className="line-clamp-1">{notification.title}</p>
                      <Button variant="ghost" size="icon" className="h-6 w-6 flex-shrink-0">
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <p className="text-xs text-gray-500">{notification.time}</p>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}