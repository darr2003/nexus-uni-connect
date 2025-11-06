import React from 'react';
import { GraduationCap, Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const Enrollment = () => {
  const enrollmentPeriods = [
    {
      period: 'Semestre 2024-2',
      status: 'available',
      startDate: '2024-01-20',
      endDate: '2024-02-10',
      description: 'Matrícula ordinaria para estudiantes antiguos'
    },
    {
      period: 'Semestre 2024-1',
      status: 'completed',
      startDate: '2023-08-15',
      endDate: '2023-09-05',
      description: 'Período completado'
    }
  ];

  const currentEnrollment = {
    semester: '2024-1',
    status: 'enrolled',
    subjects: [
      { code: 'PROG301', name: 'Programación Avanzada', credits: 4, status: 'enrolled' },
      { code: 'BD201', name: 'Bases de Datos', credits: 3, status: 'enrolled' },
      { code: 'MAT205', name: 'Cálculo III', credits: 4, status: 'enrolled' },
      { code: 'ING101', name: 'Inglés Técnico', credits: 2, status: 'enrolled' },
      { code: 'PROJ401', name: 'Proyecto de Grado I', credits: 3, status: 'enrolled' },
      { code: 'ETI301', name: 'Ética Profesional', credits: 2, status: 'enrolled' }
    ],
    totalCredits: 18
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-accent text-accent-foreground';
      case 'completed': return 'bg-muted text-muted-foreground';
      case 'enrolled': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'completed': return 'Completado';
      case 'enrolled': return 'Matriculado';
      default: return 'Pendiente';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <GraduationCap className="h-8 w-8 text-primary" />
          Gestión de Matrícula
        </h1>
        <p className="text-muted-foreground">
          Administra tu proceso de matrícula y consulta el estado de tus postulaciones
        </p>
      </div>

      {/* Enrollment Periods */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Períodos de Matrícula</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {enrollmentPeriods.map((period, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{period.period}</CardTitle>
                  <Badge className={getStatusColor(period.status)}>
                    {getStatusText(period.status)}
                  </Badge>
                </div>
                <CardDescription>{period.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Inicio: {period.startDate}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Fin: {period.endDate}
                  </div>
                  
                  {period.status === 'available' && (
                    <Button className="w-full mt-4" onClick={() => {
                      alert('El sistema de matrícula en línea te permitirá inscribir asignaturas según tu malla curricular y disponibilidad. Contacta con tu Director de Carrera para autorización.');
                    }}>
                      Iniciar Matrícula
                    </Button>
                  )}
                  
                  {period.status === 'completed' && (
                    <Button variant="outline" className="w-full mt-4" onClick={() => {
                      alert(`Matrícula ${period.period} completada exitosamente el ${period.endDate}. Total de créditos: 18.`);
                    }}>
                      Ver Detalles
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Enrollment Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-accent" />
            Estado Actual de Matrícula - {currentEnrollment.semester}
          </CardTitle>
          <CardDescription>
            Materias matriculadas para el semestre actual
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-accent/10 rounded-lg">
              <div>
                <h3 className="font-medium">Estado Actual De Matricula</h3>
                <p className="text-2xl font-bold text-accent">Activa</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
          <CardDescription>
            Gestiona tu matrícula y consulta información relevante
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="justify-start gap-2" onClick={() => {
              alert('Horarios de clases para el semestre 2024-1. Consulta con tu Escuela para más información sobre salas y horarios actualizados.');
            }}>
              <Calendar className="h-4 w-4" />
              Ver Horarios
            </Button>
            <Button variant="outline" className="justify-start gap-2" onClick={() => {
              alert('Consulta los pre-requisitos de cada asignatura en tu malla curricular. Contacta con la Dirección de Docencia para más información.');
            }}>
              <GraduationCap className="h-4 w-4" />
              Pre-requisitos
            </Button>
            <Button variant="outline" className="justify-start gap-2" onClick={() => {
              alert('Para solicitar cambios de asignatura (retiro, adición o cambio de sección), contacta con tu Director de Carrera durante el período de ajuste de matrícula.');
            }}>
              <AlertCircle className="h-4 w-4" />
              Solicitar Cambios
            </Button>
            <Button asChild variant="outline" className="justify-start gap-2">
              <a href="/services?certificate=alumno-regular">
                <CheckCircle className="h-4 w-4" />
                Certificado de Matrícula
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Enrollment;