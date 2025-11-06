import React, { useState } from 'react';
import { Mail, Lock, User, Phone, MapPin, Save, Building2, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumbs } from '@/components/Breadcrumbs';

const PersonalInfo = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const [personalData, setPersonalData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: '+56 9 8765 4321',
    address: 'Av. España 1680, Valparaíso',
    emergencyContact: 'Ana Rojas - +56 9 8765 1234'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [bankAccounts, setBankAccounts] = useState([
    {
      id: '1',
      bankName: 'Banco de Chile',
      accountType: 'Cuenta Vista',
      accountNumber: '**** **** **** 1234',
      isDefault: true
    }
  ]);

  const [newBankAccount, setNewBankAccount] = useState({
    bankName: '',
    accountType: '',
    accountNumber: ''
  });

  const handlePersonalDataSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Información actualizada",
      description: "Tus datos personales han sido actualizados correctamente",
    });
    
    setIsLoading(false);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "Las contraseñas no coinciden",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword.length < 8) {
      toast({
        title: "Error",
        description: "La contraseña debe tener al menos 8 caracteres",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Contraseña actualizada",
      description: "Tu contraseña ha sido cambiada correctamente",
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    
    setIsLoading(false);
  };

  const handleAddBankAccount = () => {
    if (!newBankAccount.bankName || !newBankAccount.accountType || !newBankAccount.accountNumber) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos de la cuenta bancaria",
        variant: "destructive",
      });
      return;
    }

    const newAccount = {
      id: String(bankAccounts.length + 1),
      ...newBankAccount,
      accountNumber: `**** **** **** ${newBankAccount.accountNumber.slice(-4)}`,
      isDefault: bankAccounts.length === 0
    };

    setBankAccounts([...bankAccounts, newAccount]);
    setNewBankAccount({ bankName: '', accountType: '', accountNumber: '' });
    
    toast({
      title: "Cuenta agregada",
      description: "Tu cuenta bancaria ha sido registrada correctamente",
    });
  };

  const handleSetDefaultAccount = (id: string) => {
    setBankAccounts(bankAccounts.map(account => ({
      ...account,
      isDefault: account.id === id
    })));
    
    toast({
      title: "Cuenta actualizada",
      description: "La cuenta predeterminada ha sido cambiada",
    });
  };

  const handleDeleteBankAccount = (id: string) => {
    setBankAccounts(bankAccounts.filter(account => account.id !== id));
    
    toast({
      title: "Cuenta eliminada",
      description: "La cuenta bancaria ha sido eliminada",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <Breadcrumbs />
      
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Información Personal</h1>
        <p className="text-muted-foreground">
          Gestiona tu información personal y configuración de seguridad
        </p>
      </div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Datos Personales
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Información de Contacto
          </TabsTrigger>
          <TabsTrigger value="bank" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Cuenta Bancaria
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Básica
              </CardTitle>
              <CardDescription>
                Actualiza tu información personal básica
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalDataSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombres</Label>
                    <Input
                      id="firstName"
                      value={personalData.firstName}
                      onChange={(e) => setPersonalData({...personalData, firstName: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellidos</Label>
                    <Input
                      id="lastName"
                      value={personalData.lastName}
                      onChange={(e) => setPersonalData({...personalData, lastName: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="studentId">RUT</Label>
                  <Input
                    id="studentId"
                    value={user?.studentId || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Programa Académico</Label>
                  <Input
                    id="program"
                    value={user?.program || ''}
                    disabled
                    className="bg-muted"
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Guardando..." : "Guardar Cambios"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Información de Contacto
              </CardTitle>
              <CardDescription>
                Mantén actualizada tu información de contacto
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePersonalDataSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalData.email}
                    onChange={(e) => setPersonalData({...personalData, email: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    value={personalData.phone}
                    onChange={(e) => setPersonalData({...personalData, phone: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    id="address"
                    value={personalData.address}
                    onChange={(e) => setPersonalData({...personalData, address: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyContact">Contacto de Emergencia</Label>
                  <Input
                    id="emergencyContact"
                    value={personalData.emergencyContact}
                    onChange={(e) => setPersonalData({...personalData, emergencyContact: e.target.value})}
                  />
                </div>

                <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  {isLoading ? "Guardando..." : "Actualizar Contacto"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bank">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Cuentas Bancarias
              </CardTitle>
              <CardDescription>
                Registra tus cuentas bancarias para recibir pagos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Existing Bank Accounts */}
              {bankAccounts.length > 0 && (
                <div className="space-y-3">
                  <Label>Cuentas Registradas</Label>
                  <div className="space-y-2">
                    {bankAccounts.map((account) => (
                      <div key={account.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent/5 transition-colors">
                        <div className="p-2 rounded-lg bg-primary/10 shrink-0">
                          <CreditCard className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm">{account.bankName}</h4>
                          <p className="text-xs text-muted-foreground">
                            {account.accountType} • {account.accountNumber}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          {account.isDefault ? (
                            <Badge className="bg-accent/20 text-accent-foreground text-xs">
                              Predeterminada
                            </Badge>
                          ) : (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleSetDefaultAccount(account.id)}
                            >
                              Predeterminada
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteBankAccount(account.id)}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Add New Bank Account */}
              <div className="space-y-4 pt-4 border-t">
                <Label className="text-base font-medium">Agregar Nueva Cuenta</Label>
                
                <div className="space-y-2">
                  <Label htmlFor="bankName">Nombre del Banco</Label>
                  <Input
                    id="bankName"
                    placeholder="Ej: Banco de Chile"
                    value={newBankAccount.bankName}
                    onChange={(e) => setNewBankAccount({...newBankAccount, bankName: e.target.value})}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountType">Tipo de Cuenta</Label>
                  <select
                    id="accountType"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={newBankAccount.accountType}
                    onChange={(e) => setNewBankAccount({...newBankAccount, accountType: e.target.value})}
                  >
                    <option value="">Selecciona un tipo</option>
                    <option value="Cuenta Vista">Cuenta Vista</option>
                    <option value="Cuenta Corriente">Cuenta Corriente</option>
                    <option value="Cuenta de Ahorro">Cuenta de Ahorro</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="accountNumber">Número de Cuenta</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Ingresa el número completo"
                    value={newBankAccount.accountNumber}
                    onChange={(e) => setNewBankAccount({...newBankAccount, accountNumber: e.target.value})}
                  />
                </div>

                <Button onClick={handleAddBankAccount} className="flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Agregar Cuenta Bancaria
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Cambiar Contraseña
              </CardTitle>
              <CardDescription>
                Actualiza tu contraseña para mantener tu cuenta segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Contraseña Actual</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">Nueva Contraseña</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Nueva Contraseña</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    required
                  />
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• La contraseña debe tener al menos 8 caracteres</p>
                  <p>• Se recomienda usar mayúsculas, minúsculas, números y símbolos</p>
                </div>

                <Button type="submit" disabled={isLoading} className="flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  {isLoading ? "Actualizando..." : "Cambiar Contraseña"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        
      </Tabs>
    </div>
  );
};

export default PersonalInfo;