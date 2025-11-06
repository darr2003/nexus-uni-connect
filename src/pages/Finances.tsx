import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CreditCard, DollarSign, Calendar, CheckCircle, Receipt, Award, Building2, TrendingUp, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const Finances = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'pending');
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const accountSummary = {
    totalPending: 1830000,
    totalPaid: 2800000,
    scholarships: 950000,
    bankPayments: 1850000
  };

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
    }
  ];

  const movements = [
    {
      id: 'TXN-001',
      date: '2024-02-15',
      concept: 'Matrícula Semestre 2024-1',
      type: 'charge',
      amount: -1200000,
      status: 'pending'
    },
    {
      id: 'TXN-002',
      date: '2024-02-20',
      concept: 'Laboratorios',
      type: 'charge',
      amount: -150000,
      status: 'pending'
    },
    {
      id: 'TXN-003',
      date: '2024-01-05',
      concept: 'Beca Excelencia Académica USM',
      type: 'payment',
      amount: 600000,
      status: 'completed'
    },
    {
      id: 'TXN-004',
      date: '2024-01-05',
      concept: 'Beca de Apoyo Socioeconómico',
      type: 'payment',
      amount: 350000,
      status: 'completed'
    },
    {
      id: 'TXN-005',
      date: '2023-12-20',
      concept: 'Pago Ayudantía Cálculo I',
      type: 'payment',
      amount: 120000,
      status: 'completed'
    },
    {
      id: 'TXN-006',
      date: '2023-12-15',
      concept: 'Pago Matrícula 2023-2',
      type: 'payment',
      amount: 1400000,
      status: 'completed'
    },
    {
      id: 'TXN-007',
      date: '2023-12-01',
      concept: 'Título Profesional',
      type: 'payment',
      amount: 250000,
      status: 'completed'
    },
    {
      id: 'TXN-008',
      date: '2023-08-15',
      concept: 'Matrícula Semestre 2023-2',
      type: 'charge',
      amount: -1150000,
      status: 'completed'
    }
  ];

  const scholarships = [
    {
      id: 'SCH-001',
      name: 'Beca Excelencia Académica USM',
      amount: 600000,
      period: '2024-1',
      date: '2024-01-05',
      status: 'active'
    },
    {
      id: 'SCH-002',
      name: 'Beca de Apoyo Socioeconómico',
      amount: 350000,
      period: '2024-1',
      date: '2024-01-05',
      status: 'active'
    }
  ];

  const bankPayments = [
    {
      id: 'BP-001',
      concept: 'Reembolso Arancel',
      amount: 950000,
      date: '2024-01-20',
      bankAccount: '**** **** **** 1234',
      status: 'completed'
    },
    {
      id: 'BP-002',
      concept: 'Ayuda Práctica Industrial',
      amount: 900000,
      date: '2024-01-15',
      bankAccount: '**** **** **** 1234',
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
      name: 'Comprobante de Pago - Título Profesional',
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
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0
    }).format(Math.abs(amount));
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
      case 'completed': return 'bg-accent/20 text-accent-foreground';
      case 'active': return 'bg-accent/20 text-accent-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'paid': return 'Pagado';
      case 'completed': return 'Completado';
      case 'active': return 'Activa';
      default: return 'Desconocido';
    }
  };

  const getMovementColor = (type: string, status: string) => {
    if (status === 'pending') return 'text-amber-600';
    return type === 'payment' ? 'text-accent' : 'text-destructive';
  };

  const getMovementIcon = (type: string) => {
    return type === 'payment' ? TrendingUp : DollarSign;
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Receipt className="h-8 w-8 text-primary" />
          Gestión Financiera
        </h1>
        <p className="text-muted-foreground">
          Consulta tus pagos pendientes, historial financiero, becas y realiza pagos en línea
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cargos Pendientes</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatCurrency(accountSummary.totalPending)}
            </div>
            <p className="text-xs text-muted-foreground">Por pagar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pagado</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(accountSummary.totalPaid)}
            </div>
            <p className="text-xs text-muted-foreground">Este período académico</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Becas Activas</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(accountSummary.scholarships)}
            </div>
            <p className="text-xs text-muted-foreground">2 becas vigentes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagos Bancarios</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">
              {formatCurrency(accountSummary.bankPayments)}
            </div>
            <p className="text-xs text-muted-foreground">Recibidos en cuenta</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="pending" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Pagar
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Historial
          </TabsTrigger>
          <TabsTrigger value="scholarships" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Becas
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Pagos Bancarios
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Documentos
          </TabsTrigger>
        </TabsList>

        {/* Pending Payments Tab */}
        <TabsContent value="pending" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-primary" />
                Pagos Pendientes
              </CardTitle>
              <CardDescription>
                Selecciona los conceptos que deseas pagar y elige tu método de pago
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  {pendingPayments.map((payment) => (
                    <div 
                      key={payment.id} 
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors"
                    >
                      <Checkbox 
                        id={payment.id}
                        checked={selectedPayments.includes(payment.id)}
                        onCheckedChange={() => handlePaymentToggle(payment.id)}
                        className="shrink-0"
                      />
                      <label 
                        htmlFor={payment.id}
                        className="flex-1 flex items-center gap-3 cursor-pointer min-w-0"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm">{payment.concept}</h3>
                          <p className="text-xs text-muted-foreground">
                            Vence: {payment.dueDate}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-bold text-sm">{formatCurrency(payment.amount)}</p>
                          <Badge className={`${getStatusColor(payment.status)} text-xs`}>
                            {getStatusText(payment.status)}
                          </Badge>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Total de conceptos:</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatCurrency(pendingPayments.reduce((sum, p) => sum + p.amount, 0))}
                    </span>
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
              </div>
            </CardContent>
          </Card>

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
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Historial Completo de Movimientos
              </CardTitle>
              <CardDescription>
                Consulta todos tus cargos, pagos y movimientos financieros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {movements.map((movement) => {
                  const Icon = getMovementIcon(movement.type);
                  return (
                    <div key={movement.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        movement.status === 'pending' ? 'bg-amber-100' : 
                        movement.type === 'payment' ? 'bg-accent/20' : 'bg-destructive/20'
                      }`}>
                        <Icon className={`h-4 w-4 ${getMovementColor(movement.type, movement.status)}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{movement.concept}</h3>
                        <p className="text-xs text-muted-foreground">{movement.date}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className={`font-bold text-sm ${getMovementColor(movement.type, movement.status)}`}>
                          {movement.type === 'payment' ? '+' : ''}{formatCurrency(movement.amount)}
                        </p>
                        <Badge className={`${getStatusColor(movement.status)} text-xs`}>
                          {getStatusText(movement.status)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Scholarships Tab */}
        <TabsContent value="scholarships">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Becas Activas
              </CardTitle>
              <CardDescription>
                Consulta las becas que tienes actualmente vigentes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scholarships.map((scholarship) => (
                  <div key={scholarship.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="p-2 rounded-lg bg-accent/20 shrink-0">
                      <Award className="h-4 w-4 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{scholarship.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {scholarship.period} • {scholarship.date}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm text-accent">
                        {formatCurrency(scholarship.amount)}
                      </p>
                      <Badge className={`${getStatusColor(scholarship.status)} text-xs`}>
                        {getStatusText(scholarship.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-medium">Total en Becas:</span>
                    <span className="text-2xl font-bold text-accent">
                      {formatCurrency(accountSummary.scholarships)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estas becas se aplican automáticamente a tu matrícula y aranceles del semestre actual.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Bank Payments Tab */}
        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Pagos en Cuenta Bancaria
              </CardTitle>
              <CardDescription>
                Historial de pagos recibidos en tu cuenta bancaria registrada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <TrendingUp className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{payment.concept}</h3>
                      <p className="text-xs text-muted-foreground">
                        {payment.date} • {payment.bankAccount}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm text-accent">
                        +{formatCurrency(payment.amount)}
                      </p>
                      <Badge className={`${getStatusColor(payment.status)} text-xs`}>
                        Pagado
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="pt-4 border-t">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-medium">Total Pagado en Cuenta:</span>
                    <span className="text-2xl font-bold text-accent">
                      {formatCurrency(accountSummary.bankPayments)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estos pagos corresponden a reembolsos y ayudas económicas depositadas en tu cuenta bancaria registrada.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Documentos Disponibles
              </CardTitle>
              <CardDescription>
                Descarga tus comprobantes y estados de cuenta
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <Receipt className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{doc.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {doc.date} • {doc.type} • {doc.size}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Finances;
