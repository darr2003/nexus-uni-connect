import React from 'react';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { HelpCircle } from 'lucide-react';
import { NotificationButton } from '@/components/NotificationButton';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-6">
            <SidebarTrigger />
            
            <div className="flex items-center gap-4">
              <NotificationButton />
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                Ayuda
              </Button>
            </div>
          </header>
          
          <main className="flex-1 bg-muted/30">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};