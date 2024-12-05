import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { Header } from "./dashboard/Header";
import { Sidebar } from "./dashboard/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "./ui/card";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  role: string;
}

const DashboardLayout = ({ children, title, role }: DashboardLayoutProps) => {
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const { profile } = useProfile();

  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    if (!profile?.id) return;

    const fetchUnreadNotifications = async () => {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile.id)
        .eq('read', false);

      setUnreadNotifications(count || 0);
    };

    fetchUnreadNotifications();

    const channel = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${profile.id}`,
        },
        () => {
          fetchUnreadNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [profile?.id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        role={role}
        unreadNotifications={unreadNotifications}
      />

      <div 
        className={`transition-all duration-300 ${
          isSidebarOpen 
            ? isMobile 
              ? 'ml-0' 
              : 'ml-64' 
            : 'ml-0 md:ml-20'
        }`}
      >
        <Header 
          title={title} 
          role={role} 
          profile={profile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="p-4 md:p-6">
          <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
            {children}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;