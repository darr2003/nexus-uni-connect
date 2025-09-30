import React from 'react';
import { Receipt, Download, Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const AccountStatus = () => {
  const accountSummary = {
    totalBalance: -1350000,
    pendingCharges: 1350000,
    paidAmount: 2300000,
    lastPayment: '2023-12-15'
  };

  const movements = [
    {
      id: 'TXN-001',
      date: '2024-01-15',
      concept: 'Matrícula Semestre 2024-1',
      type: 'charge',
      amount: -1200000,
      status: 'pending'
    },
    {
      id: 'TXN-002',
      date: '2024-01-10',
      concept: 'Laboratorios',
      type: 'charge',
      amount: -150000,
      status: 'pending'
    },
    {
      id: 'TXN-003',
      date: '2023-12-15',
      concept: 'Pago Matrícula 2023-2',
      type: 'payment',
      amount: 1150000,
      status: 'completed'
    },
    {
      id: 'TXN-004',
      date: '2023-12-01',
      concept: 'Derechos de Grado',
      type: 'payment',
      amount: 200000,
      status: 'completed'
    },
    {
      id: 'TXN-005',
      date: '2023-08-15',
      concept: 'Matrícula Semestre 2023-2',
      type: 'charge',
      amount: -1150000,
      status: 'completed'
    }
  ];

  const documents = [
    {
      id: 'DOC-001',
      name: 'Estado de Cuenta Enero 2024',
      date: '2024-01-31',
      type: 'PDF',
      size: '245 KB'
    },
    {
      id: 'DOC-002',
      name: 'Comprobante de Pago - Derechos de Grado',
      date: '2023-12-01',
      type: 'PDF',
      size: '180 KB'
    },
    {
      id: 'DOC-003',
      name: 'Estado de Cuenta Diciembre 2023',
      date: '2023-12-31',
      type: 'PDF',
      size: '230 KB'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
  };

  const getBalanceColor = (amount: number) => {
    return amount < 0 ? 'text-destructive' : 'text-accent';
  };

  const getMovementIcon = (type: string) => {
    return type === 'payment' ? TrendingUp : DollarSign;
  };

  const getMovementColor = (type: string, status: string) => {
    if (status === 'pending') return 'text-amber-600';
    return type === 'payment' ? 'text-accent' : 'text-destructive';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-amber-100 text-amber-800">Pendiente</Badge>;
      case 'completed':
        return <Badge className="bg-accent/20 text-accent-foreground">Completado</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Receipt className="h-8 w-8 text-primary" />
          Estado de Cuenta
        </h1>
        <p className="text-muted-foreground">
          Consulta tus movimientos financieros y descarga comprobantes
        </p>
      </div>

      {/* Account Summary */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo Actual</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getBalanceColor(accountSummary.totalBalance)}`}>
              {accountSummary.totalBalance < 0 ? '-' : ''}{formatCurrency(accountSummary.totalBalance)}
            </div>
            <p className="text-xs text-muted-foreground">
              {accountSummary.totalBalance < 0 ? 'Saldo pendiente' : 'Saldo a favor'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cargos Pendientes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(accountSummary.pendingCharges)}
            </div>
            <p className="text-xs text-muted-foreground">Por pagar</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(accountSummary.paidAmount)}
            </div>
            <p className="text-xs text-muted-foreground">Este año</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Último Pago</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{accountSummary.lastPayment}</div>
            <p className="text-xs text-muted-foreground">Fecha</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="movements" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="movements" className="flex items-center gap-2">
            <Receipt className="h-4 w-4" />
            Movimientos
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Documentos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="movements">
          <Card>
            <CardHeader>
              <CardTitle>Historial de Movimientos</CardTitle>
              <CardDescription>
                Consulta todos tus movimientos financieros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {movements.map((movement) => {
                  const Icon = getMovementIcon(movement.type);
                  return (
                    <div key={movement.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full bg-muted ${getMovementColor(movement.type, movement.status)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div>
                          <h3 className="font-medium">{movement.concept}</h3>
                          <p className="text-sm text-muted-foreground">{movement.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-lg font-bold ${getMovementColor(movement.type, movement.status)}`}>
                          {movement.type === 'payment' ? '+' : ''}{formatCurrency(movement.amount)}
                        </p>
                        {getStatusBadge(movement.status)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Documentos Disponibles</CardTitle>
              <CardDescription>
                Descarga tus comprobantes y estados de cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10">
                        <Receipt className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{doc.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {doc.date} • {doc.type} • {doc.size}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Gestiona tu información financiera
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start gap-2">
              <Download className="h-4 w-4" />
              Estado de Cuenta Actual
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Receipt className="h-4 w-4" />
              Certificado de Paz y Salvo
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <Calendar className="h-4 w-4" />
              Solicitar Convenio de Pago
            </Button>
            <Button variant="outline" className="justify-start gap-2">
              <DollarSign className="h-4 w-4" />
              Ir a Pagos
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountStatus;