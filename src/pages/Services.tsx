import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Settings, FileText, Award, Clock, CheckCircle, Send, Download } from 'lucide-react';
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
  const [searchParams] = useSearchParams();
  const [selectedService, setSelectedService] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [selectedCertificateType, setSelectedCertificateType] = useState('');
  const [selectedPurpose, setSelectedPurpose] = useState('');

  useEffect(() => {
    const certificate = searchParams.get('certificate');
    if (certificate === 'paz-y-salvo') {
      setSelectedCertificateType('Paz y Salvo');
      setSelectedPurpose('Fines que estime conveniente');
    } else if (certificate === 'concentracion-notas') {
      setSelectedCertificateType('Concentración de Notas');
      setSelectedPurpose('Fines que estime conveniente');
    }
  }, [searchParams]);

  const certificateTypes = [
    'Alumno Regular',
    'Concentración de Notas',
    'Curso y Créditos Aprobados',
    'Egreso',
    'Legalización de Plan de Estudio',
    'Permanencia',
    'Ramos Inscritos',
    'Situación Académica',
    'Arancel y Matrícula',
    'Postulación a Prácticas',
    'Seguro de Prácticas',
    'Paz y Salvo'
  ];

  const certificatePurposes = [
    'Fines que estime conveniente',
    'Rebajas de pasaje',
    'Universidades',
    'Bienestar Empresas',
    'Becas y Beneficios',
    'Trámites Bancarios',
    'Postulación Laboral',
    'Intercambio Internacional'
  ];

  const exemptCertificates = [
    'Alumno Regular',
    'Concentración de Notas',
    'Arancel y Matrícula',
    'Postulación a Prácticas',
    'Seguro de Prácticas',
    'Paz y Salvo'
  ];

  const conventionalCertificates = [
    {
      type: 'Curso y Créditos Aprobados',
      cost: 3500,
      deliveryTime: '2-3 días hábiles'
    },
    {
      type: 'Egreso',
      cost: 4500,
      deliveryTime: '3-5 días hábiles'
    },
    {
      type: 'Legalización de Plan de Estudio',
      cost: 5000,
      deliveryTime: '5-7 días hábiles'
    },
    {
      type: 'Permanencia',
      cost: 3500,
      deliveryTime: '2-3 días hábiles'
    },
    {
      type: 'Ramos Inscritos',
      cost: 3000,
      deliveryTime: '1-2 días hábiles'
    },
    {
      type: 'Situación Académica',
      cost: 4000,
      deliveryTime: '2-3 días hábiles'
    }
  ];

  const issuedCertificates = [
    {
      id: 'CERT-001',
      name: 'Certificado de Matrícula',
      requestDate: '2024-01-15',
      issueDate: '2024-01-16',
      type: 'PDF',
      size: '320 KB'
    },
    {
      id: 'CERT-002',
      name: 'Certificado de Notas',
      requestDate: '2024-01-10',
      issueDate: '2024-01-12',
      type: 'PDF',
      size: '450 KB'
    },
    {
      id: 'CERT-003',
      name: 'Certificado de Alumno Regular',
      requestDate: '2023-12-20',
      issueDate: '2023-12-21',
      type: 'PDF',
      size: '295 KB'
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
      description: 'Cambio de Ingeniería Civil Informática a Ingeniería Civil Industrial'
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
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
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

  const handleCertificateRequest = () => {
    if (!selectedCertificateType || !selectedPurpose) {
      toast({
        title: "Error",
        description: "Por favor selecciona el tipo de certificado y el fin",
        variant: "destructive",
      });
      return;
    }

    const isExempt = exemptCertificates.includes(selectedCertificateType);
    
    toast({
      title: "Solicitud enviada exitosamente",
      description: isExempt 
        ? `Tu certificado de ${selectedCertificateType} se ha generado. Descargándose automáticamente y será enviado a tu correo institucional.`
        : `Tu solicitud de certificado de ${selectedCertificateType} ha sido procesada. Recibirás una notificación cuando esté listo para retirar en la Dirección de Registro Académico.`,
    });
    
    // Simular descarga para certificados exentos
    if (isExempt) {
      setTimeout(() => {
        toast({
          title: "Descarga completada",
          description: `Certificado_${selectedCertificateType.replace(/\s/g, '_')}_2024.pdf`,
        });
      }, 2000);
    }
    
    setSelectedCertificateType('');
    setSelectedPurpose('');
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="certificates" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            Solicitar Certificados
          </TabsTrigger>
          <TabsTrigger value="downloads" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Certificados Emitidos
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Otras Solicitudes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="certificates" className="space-y-6">
          {/* Certificate Request Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-primary" />
                Solicitar Certificado
              </CardTitle>
              <CardDescription>
                Selecciona el tipo de certificado y el fin para realizar tu solicitud
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificate-type">Tipo de Certificado</Label>
                  <Select value={selectedCertificateType} onValueChange={setSelectedCertificateType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de certificado" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificateTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                          {exemptCertificates.includes(type) && (
                            <span className="ml-2 text-xs text-accent">(Exento)</span>
                          )}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Fin del Certificado</Label>
                  <Select value={selectedPurpose} onValueChange={setSelectedPurpose}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el fin" />
                    </SelectTrigger>
                    <SelectContent>
                      {certificatePurposes.map((purpose) => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCertificateType && (
                  <div className="p-4 rounded-lg bg-muted">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Modalidad:</span>
                        {exemptCertificates.includes(selectedCertificateType) ? (
                          <Badge className="bg-accent text-accent-foreground">
                            Exento - Gratuito
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Convencional - Con costo
                          </Badge>
                        )}
                      </div>
                      {exemptCertificates.includes(selectedCertificateType) ? (
                        <p className="text-sm text-muted-foreground">
                          Este certificado se descargará automáticamente en PDF y será enviado a tu correo electrónico.
                        </p>
                      ) : (
                        <>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Costo:</span>
                            <span className="font-medium">
                              {formatCurrency(
                                conventionalCertificates.find(c => c.type === selectedCertificateType)?.cost || 0
                              )}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Tiempo de entrega:</span>
                            <span className="text-sm">
                              {conventionalCertificates.find(c => c.type === selectedCertificateType)?.deliveryTime}
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}

                <Button 
                  onClick={handleCertificateRequest}
                  className="w-full flex items-center gap-2"
                  disabled={!selectedCertificateType || !selectedPurpose}
                >
                  <Send className="h-4 w-4" />
                  Solicitar Certificado
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Information about certificate types */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-accent">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  Certificados Exentos
                </CardTitle>
                <CardDescription>
                  Gratuitos - Descarga y envío automático por correo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {exemptCertificates.map((cert) => (
                    <li key={cert} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Certificados Convencionales
                </CardTitle>
                <CardDescription>
                  Con costo - Entrega tradicional
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {conventionalCertificates.map((cert) => (
                    <li key={cert.type} className="flex items-center justify-between text-sm">
                      <span>{cert.type}</span>
                      <span className="text-muted-foreground">{formatCurrency(cert.cost)}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

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

        <TabsContent value="downloads">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-primary" />
                Certificados Emitidos
              </CardTitle>
              <CardDescription>
                Descarga los certificados que has solicitado anteriormente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {issuedCertificates.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                    <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                      <Award className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm">{cert.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {cert.requestDate} • {cert.issueDate}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {cert.type} • {cert.size}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge className="bg-accent/20 text-accent-foreground text-xs">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Disponible
                      </Badge>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Descargar
                      </Button>
                    </div>
                  </div>
                ))}
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
              <div className="space-y-2">
                {requests.map((request) => {
                  const StatusIcon = getStatusIcon(request.status);
                  return (
                    <div key={request.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                      <div className={`p-2 rounded-lg shrink-0 ${
                        request.status === 'completed' ? 'bg-accent/20' :
                        request.status === 'in_progress' ? 'bg-blue-100' : 'bg-amber-100'
                      }`}>
                        <StatusIcon className={`h-4 w-4 ${
                          request.status === 'completed' ? 'text-accent' :
                          request.status === 'in_progress' ? 'text-blue-600' : 'text-amber-600'
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm">{request.type}</h3>
                        <p className="text-xs text-muted-foreground">
                          {request.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {request.date}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge className={`${getStatusColor(request.status)} text-xs mb-1`}>
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