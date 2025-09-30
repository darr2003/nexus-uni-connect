import React, { useState } from 'react';
import { Settings, FileText, Award, Clock, CheckCircle, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const Services = () => {
  const { toast } = useToast();
  const [selectedService, setSelectedService] = useState('');
  const [requestDescription, setRequestDescription] = useState('');

  const certificates = [
    {
      id: 'enrollment',
      name: 'Certificado de Matrícula',
      description: 'Certificado que acredita tu condición de estudiante activo',
      cost: 15000,
      deliveryTime: '1-2 días hábiles'
    },
    {
      id: 'grades',
      name: 'Certificado de Notas',
      description: 'Historial académico completo con todas las calificaciones',
      cost: 20000,
      deliveryTime: '2-3 días hábiles'
    },
    {
      id: 'conduct',
      name: 'Certificado de Conducta',
      description: 'Certificado de comportamiento académico y disciplinario',
      cost: 15000,
      deliveryTime: '1-2 días hábiles'
    },
    {
      id: 'degree',
      name: 'Certificado de Grado',
      description: 'Documento que certifica la obtención del título académico',
      cost: 50000,
      deliveryTime: '5-7 días hábiles'
    }
  ];

  const requests = [
    {
      id: 'REQ-001',
      type: 'Certificado de Matrícula',
      date: '2024-01-10',
      status: 'completed',
      description: 'Certificado para trámite de beca'
    },
    {
      id: 'REQ-002',
      type: 'Solicitud de Cambio de Programa',
      date: '2024-01-05',
      status: 'in_progress',
      description: 'Cambio de Ingeniería de Sistemas a Ingeniería de Software'
    },
    {
      id: 'REQ-003',
      type: 'Certificado de Notas',
      date: '2023-12-20',
      status: 'completed',
      description: 'Historial académico para proceso de intercambio'
    }
  ];

  const administrativeServices = [
    'Cambio de Programa Académico',
    'Solicitud de Homologación',
    'Retiro Temporal',
    'Reintegro',
    'Validación de Materias',
    'Cambio de Datos Personales',
    'Solicitud de Curso Dirigido',
    'Otros'
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-accent/20 text-accent-foreground';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'in_progress': return 'En Proceso';
      case 'pending': return 'Pendiente';
      default: return 'Desconocido';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'in_progress': return Clock;
      case 'pending': return Clock;
      default: return Clock;
    }
  };

  const handleCertificateRequest = (certificateId: string) => {
    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud de certificado ha sido procesada. Recibirás una notificación cuando esté listo.",
    });
  };

  const handleAdministrativeRequest = () => {
    if (!selectedService || !requestDescription.trim()) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Solicitud enviada",
      description: "Tu solicitud administrativa ha sido enviada. Te contactaremos pronto.",
    });
    
    setSelectedService('');
    setRequestDescription('');
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Settings className="h-8 w-8 text-primary" />
          Servicios
        </h1>
        <p className="text-muted-foreground">
          Solicita certificados y realiza trámites administrativos
        </p>
      </div>

      <Tabs defaultValue="certificates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certificados
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Mis Solicitudes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-6">
          {/* Available Certificates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Certificados Disponibles
              </CardTitle>
              <CardDescription>
                Solicita los certificados que necesites de manera rápida y segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                      <CardTitle className="text-lg">{cert.name}</CardTitle>
                      <CardDescription>{cert.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Costo:</span>
                          <span className="text-lg font-bold text-primary">
                            {formatCurrency(cert.cost)}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Entrega:</span>
                          <span className="text-sm text-muted-foreground">
                            {cert.deliveryTime}
                          </span>
                        </div>
                        <Button 
                          className="w-full"
                          onClick={() => handleCertificateRequest(cert.id)}
                        >
                          Solicitar Certificado
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Administrative Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Solicitudes Administrativas
              </CardTitle>
              <CardDescription>
                Realiza trámites y solicitudes administrativas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="service-type">Tipo de Solicitud</Label>
                  <Select value={selectedService} onValueChange={setSelectedService}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de solicitud" />
                    </SelectTrigger>
                    <SelectContent>
                      {administrativeServices.map((service) => (
                        <SelectItem key={service} value={service}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Descripción de la Solicitud</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe detalladamente tu solicitud..."
                    value={requestDescription}
                    onChange={(e) => setRequestDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={handleAdministrativeRequest}
                  className="flex items-center gap-2"
                  disabled={!selectedService || !requestDescription.trim()}
                >
                  <Send className="h-4 w-4" />
                  Enviar Solicitud
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Historial de Solicitudes
              </CardTitle>
              <CardDescription>
                Consulta el estado de tus solicitudes anteriores
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {requests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          <StatusIcon className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">{request.type}</h3>
                          <p className="text-sm text-muted-foreground">
                            {request.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Solicitado: {request.date}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium mb-1">ID: {request.id}</p>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusText(request.status)}
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Important Information */}
      <Card>
        <CardHeader>
          <CardTitle>Información Importante</CardTitle>
          <CardDescription>
            Ten en cuenta estos aspectos sobre los servicios
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Tiempos de Entrega</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Los certificados se procesan en días hábiles</li>
                <li>• Las solicitudes administrativas pueden tardar hasta 15 días</li>
                <li>• Recibirás notificaciones por correo electrónico</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Métodos de Entrega</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Descarga digital desde el portal</li>
                <li>• Envío por correo certificado (costo adicional)</li>
                <li>• Recogida en oficinas de Registro Académico</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Services;