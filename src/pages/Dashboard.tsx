import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  CreditCard,
  Receipt,
  Settings,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Información Personal',
      description: 'Ver y actualizar datos personales',
      icon: User,
      link: '/personal-info',
      color: 'bg-primary',
      priority: 'normal'
    },
    {
      title: 'Matrícula',
      description: 'Gestionar proceso de matrícula',
      icon: GraduationCap,
      link: '/enrollment',
      color: 'bg-accent',
      priority: 'normal'
    },
    {
      title: 'Finanzas',
      description: 'Pagos, estado de cuenta, becas y documentos',
      icon: Receipt,
      link: '/finances',
      color: 'bg-destructive',
      priority: 'high'
    },
    {
      title: 'Servicios',
      description: 'Solicitar certificados y trámites',
      icon: Settings,
      link: '/services',
      color: 'bg-accent',
      priority: 'normal'
    }
  ];

  const notifications = [
    {
      type: 'warning',
      title: 'Pago Pendiente',
      message: 'Tienes un pago de matrícula pendiente para el semestre 2024-1',
      date: '2024-01-15'
    },
    {
      type: 'info',
      title: 'Nuevo Semestre',
      message: 'La matrícula para el semestre 2024-2 estará disponible el 20 de enero',
      date: '2024-01-10'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          ¡Bienvenido, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground">
          Estudiante ID: {user?.studentId} • {user?.program}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Semestre Actual</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2024-1</div>
            <p className="text-xs text-muted-foreground">En curso</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado Financiero</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">Pendiente</div>
            <p className="text-xs text-muted-foreground">$1,200,000</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estado Matrícula</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">Activa</div>
            <p className="text-xs text-muted-foreground">2024-1</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Accesos Rápidos</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-lg transition-all hover:scale-[1.02] ${
                action.priority === 'high' ? 'ring-2 ring-destructive shadow-lg' : ''
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${action.color} shrink-0`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{action.title}</h3>
                      {action.priority === 'high' && (
                        <Badge variant="destructive" className="text-xs">Importante</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    <Button 
                      asChild 
                      size="sm" 
                      className="w-full"
                      variant={action.priority === 'high' ? 'destructive' : 'default'}
                    >
                      <Link to={action.link}>
                        Acceder
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Becas y Beneficios - Acceso Directo */}
      <Card className="border-accent shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent">
                <Receipt className="h-6 w-6 text-white" />
              </div>
              <div>
                <CardTitle className="flex items-center gap-2">
                  Becas y Beneficios Activos
                </CardTitle>
                <CardDescription>
                  Consulta tus becas y pagos bancarios directamente
                </CardDescription>
              </div>
            </div>
            <Button asChild variant="outline">
              <Link to="/finances?tab=scholarships">
                Ver Todo
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            <Button
              asChild
              variant="ghost"
              className="h-auto p-4 bg-accent/10 rounded-lg border border-accent/20 hover:bg-accent/20 transition-colors justify-start"
            >
              <Link to="/finances?tab=scholarships">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Total en Becas</span>
                    <Badge className="bg-accent text-accent-foreground">Activas</Badge>
                  </div>
                  <p className="text-2xl font-bold text-accent">$950.000</p>
                  <p className="text-xs text-muted-foreground mt-1">2 becas activas • Semestre 2024-1</p>
                </div>
              </Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              className="h-auto p-4 bg-primary/10 rounded-lg border border-primary/20 hover:bg-primary/20 transition-colors justify-start"
            >
              <Link to="/finances?tab=bank">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-muted-foreground">Pagos Bancarios</span>
                    <Badge className="bg-primary/20 text-primary-foreground">Completados</Badge>
                  </div>
                  <p className="text-2xl font-bold text-primary">$1.850.000</p>
                  <p className="text-xs text-muted-foreground mt-1">2 pagos recibidos en cuenta</p>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 p-4">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    notification.type === 'warning' ? 'bg-amber-100' : 'bg-blue-100'
                  }`}>
                    <AlertCircle className={`h-5 w-5 ${
                      notification.type === 'warning' ? 'text-amber-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{notification.title}</h3>
                      <Badge variant={notification.type === 'warning' ? 'destructive' : 'secondary'} className="text-xs">
                        {notification.type === 'warning' ? 'Urgente' : 'Info'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{notification.date}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;