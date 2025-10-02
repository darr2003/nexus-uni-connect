import React, { useState } from 'react';
import { Bell, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

interface Notification {
  id: string;
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export const NotificationButton = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Pago Pendiente',
      message: 'Tienes un pago de matrícula pendiente para el semestre 2024-1',
      date: '2024-01-15',
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'Nuevo Semestre',
      message: 'La matrícula para el semestre 2024-2 estará disponible el 20 de enero',
      date: '2024-01-10',
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Renovación de Carnet',
      message: 'Tu carnet de biblioteca vence el 28 de febrero',
      date: '2024-01-08',
      read: false
    },
    {
      id: '4',
      type: 'info',
      title: 'Actualización de Datos',
      message: 'Recuerda actualizar tu información personal para el nuevo semestre',
      date: '2024-01-05',
      read: true
    },
    {
      id: '5',
      type: 'success',
      title: 'Pago Confirmado',
      message: 'Se ha confirmado el pago de laboratorios por $150.000',
      date: '2024-01-03',
      read: true
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-500" />;
      case 'info':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'success':
        return <AlertCircle className="h-5 w-5 text-green-500" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getNotificationBadgeVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'destructive';
      case 'info':
        return 'secondary';
      case 'success':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getNotificationBadgeText = (type: string) => {
    switch (type) {
      case 'warning':
        return 'Urgente';
      case 'info':
        return 'Info';
      case 'success':
        return 'Éxito';
      default:
        return 'Notificación';
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="relative flex items-center gap-2">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-destructive text-destructive-foreground text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificaciones
            </span>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Marcar todas como leídas
              </Button>
            )}
          </SheetTitle>
          <SheetDescription>
            Tienes {unreadCount} notificación{unreadCount !== 1 ? 'es' : ''} sin leer
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-150px)] mt-4">
          <div className="space-y-3 pr-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer transition-colors ${
                  !notification.read ? 'bg-accent/20 border-primary/20' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm truncate">
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={getNotificationBadgeVariant(notification.type) as any}
                          className="text-xs"
                        >
                          {getNotificationBadgeText(notification.type)}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {notification.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
