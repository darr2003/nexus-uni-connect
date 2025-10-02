import React, { useState } from 'react';
import { CreditCard, DollarSign, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const Payments = () => {
  const { toast } = useToast();
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const pendingPayments = [
    {
      id: 'MAT-2024-1',
      concept: 'Matrícula Semestre 2024-1',
      amount: 1200000,
      dueDate: '2024-02-15',
      status: 'pending'
    },
    {
      id: 'LAB-2024-1',
      concept: 'Laboratorios',
      amount: 150000,
      dueDate: '2024-02-20',
      status: 'pending'
    },
    {
      id: 'BIB-2024-1',
      concept: 'Biblioteca - Carnet Anual',
      amount: 85000,
      dueDate: '2024-02-25',
      status: 'pending'
    },
    {
      id: 'SEG-2024',
      concept: 'Seguro Estudiantil',
      amount: 120000,
      dueDate: '2024-02-28',
      status: 'pending'
    },
    {
      id: 'DEP-2024-1',
      concept: 'Deportes y Recreación',
      amount: 95000,
      dueDate: '2024-03-01',
      status: 'pending'
    },
    {
      id: 'MAT-DID-2024-1',
      concept: 'Material Didáctico',
      amount: 180000,
      dueDate: '2024-03-05',
      status: 'pending'
    },
    {
      id: 'CERT-2024',
      concept: 'Certificado de Estudios',
      amount: 45000,
      dueDate: '2024-03-10',
      status: 'pending'
    },
    {
      id: 'GRAD-PHOTO-2024',
      concept: 'Fotografía de Grado',
      amount: 65000,
      dueDate: '2024-03-12',
      status: 'pending'
    }
  ];

  const paymentHistory = [
    {
      id: 'MAT-2023-2',
      concept: 'Matrícula Semestre 2023-2',
      amount: 1150000,
      date: '2023-08-15',
      status: 'paid',
      method: 'Tarjeta de Crédito'
    },
    {
      id: 'GRAD-2023',
      concept: 'Derechos de Grado',
      amount: 200000,
      date: '2023-12-01',
      status: 'paid',
      method: 'PSE'
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handlePaymentToggle = (paymentId: string) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId) 
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const getSelectedTotal = () => {
    return pendingPayments
      .filter(p => selectedPayments.includes(p.id))
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const handlePayment = () => {
    if (selectedPayments.length === 0) {
      toast({
        title: "Error",
        description: "Por favor selecciona al menos un concepto de pago",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Redirigiendo a pasarela de pago",
      description: `Serás redirigido al sistema de pagos en línea para ${selectedPayments.length} concepto${selectedPayments.length > 1 ? 's' : ''}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'paid': return 'bg-accent/20 text-accent-foreground';
      case 'overdue': return 'bg-destructive/20 text-destructive';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'paid': return 'Pagado';
      case 'overdue': return 'Vencido';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-primary" />
          Pago en Línea
        </h1>
        <p className="text-muted-foreground">
          Realiza tus pagos de manera segura y consulta tu historial financiero
        </p>
      </div>

      <Tabs defaultValue="payment" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="payment" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Realizar Pago
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Historial
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payment" className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Resumen de Pagos Pendientes
              </CardTitle>
              <CardDescription>
                Conceptos pendientes de pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{payment.concept}</h3>
                      <p className="text-sm text-muted-foreground">
                        Vence: {payment.dueDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                      <Badge className={getStatusColor(payment.status)}>
                        {getStatusText(payment.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                <div className="border-t pt-4 flex items-center justify-between">
                  <span className="text-lg font-semibold">Total a Pagar:</span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(pendingPayments.reduce((sum, p) => sum + p.amount, 0))}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle>Realizar Pago</CardTitle>
              <CardDescription>
                Selecciona el concepto que deseas pagar
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Selecciona los conceptos a pagar</label>
                  <div className="space-y-3">
                    {pendingPayments.map((payment) => (
                      <div 
                        key={payment.id} 
                        className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <Checkbox 
                          id={payment.id}
                          checked={selectedPayments.includes(payment.id)}
                          onCheckedChange={() => handlePaymentToggle(payment.id)}
                        />
                        <label 
                          htmlFor={payment.id}
                          className="flex-1 flex items-center justify-between cursor-pointer"
                        >
                          <span className="text-sm font-medium">{payment.concept}</span>
                          <span className="text-sm font-bold">{formatCurrency(payment.amount)}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedPayments.length > 0 && (
                  <div className="p-4 bg-accent/20 rounded-lg border border-primary/20">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Total seleccionado:</span>
                      <span className="text-xl font-bold text-primary">
                        {formatCurrency(getSelectedTotal())}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {selectedPayments.length} concepto{selectedPayments.length > 1 ? 's' : ''} seleccionado{selectedPayments.length > 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-3">
                  <Button 
                    onClick={handlePayment}
                    className="flex items-center gap-2"
                    disabled={selectedPayments.length === 0}
                  >
                    <CreditCard className="h-4 w-4" />
                    Tarjeta de Crédito/Débito
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handlePayment}
                    disabled={selectedPayments.length === 0}
                  >
                    PSE
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handlePayment}
                    disabled={selectedPayments.length === 0}
                  >
                    Transferencia Bancaria
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Historial de Pagos
              </CardTitle>
              <CardDescription>
                Consulta tus pagos realizados anteriormente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-medium">{payment.concept}</h3>
                      <p className="text-sm text-muted-foreground">
                        {payment.date} • {payment.method}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{formatCurrency(payment.amount)}</p>
                      <Badge className={getStatusColor(payment.status)}>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        {getStatusText(payment.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Payment Methods Info */}
      <Card>
        <CardHeader>
          <CardTitle>Métodos de Pago Disponibles</CardTitle>
          <CardDescription>
            Información sobre las opciones de pago aceptadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <CreditCard className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Tarjetas</h4>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, American Express</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <DollarSign className="h-8 w-8 text-accent" />
              <div>
                <h4 className="font-medium">PSE</h4>
                <p className="text-sm text-muted-foreground">Débito desde tu cuenta bancaria</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Calendar className="h-8 w-8 text-primary" />
              <div>
                <h4 className="font-medium">Transferencia</h4>
                <p className="text-sm text-muted-foreground">Transferencia bancaria tradicional</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Payments;