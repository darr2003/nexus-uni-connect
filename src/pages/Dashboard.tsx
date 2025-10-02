import React from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  GraduationCap,
  CreditCard,
  Receipt,
  Settings,
  Calendar,
  BookOpen,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'Información Personal',
      description: 'Ver y actualizar datos personales',
      icon: User,
      link: '/personal-info',
      color: 'bg-primary'
    },
    {
      title: 'Matrícula',
      description: 'Gestionar proceso de matrícula',
      icon: GraduationCap,
      link: '/enrollment',
      color: 'bg-accent'
    },
    {
      title: 'Pago en Línea',
      description: 'Realizar pagos y consultar estado',
      icon: CreditCard,
      link: '/payments',
      color: 'bg-primary'
    },
    {
      title: 'Estado de Cuenta',
      description: 'Consultar movimientos financieros',
      icon: Receipt,
      link: '/account-status',
      color: 'bg-accent'
    },
    {
      title: 'Servicios',
      description: 'Solicitar certificados y trámites',
      icon: Settings,
      link: '/services',
      color: 'bg-primary'
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
        <Carousel
          opts={{
            align: "start",
            slidesToScroll: 1,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {quickActions.map((action, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="group hover:shadow-md transition-shadow h-full">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${action.color}`}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{action.title}</CardTitle>
                        <CardDescription>{action.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full group-hover:bg-primary/90 transition-colors">
                      <Link to={action.link}>
                        Acceder
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notificaciones</h2>
        <div className="space-y-3">
          {notifications.map((notification, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    {notification.type === 'warning' ? (
                      <AlertCircle className="h-5 w-5 text-amber-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-blue-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{notification.title}</h3>
                      <Badge variant={notification.type === 'warning' ? 'destructive' : 'secondary'}>
                        {notification.type === 'warning' ? 'Urgente' : 'Info'}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                    <p className="text-xs text-muted-foreground">{notification.date}</p>
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