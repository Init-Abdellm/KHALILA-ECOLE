import { useState, useEffect } from "react";
import { account, databases, client } from "@/lib/appwrite";
import { useProfile } from "@/lib/auth";
import { Header } from "./dashboard/Header";
import { Sidebar } from "./dashboard/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { ID, Query } from "appwrite";

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
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'notifications',
          [
            Query.equal('user_id', profile.id),
            Query.equal('read', false)
          ]
        );
        setUnreadNotifications(response.total);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchUnreadNotifications();

    // Subscribe to realtime updates
    const unsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.notifications.documents`,
      (response) => {
        fetchUnreadNotifications();
      }
    );

    return () => {
      unsubscribe();
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
        className={cn(
          "transition-all duration-300",
          isSidebarOpen 
            ? isMobile 
              ? 'ml-0' 
              : 'ml-64' 
            : 'ml-0 md:ml-20'
        )}
      >
        <Header 
          title={title} 
          role={role} 
          profile={profile}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <main className="p-4 md:p-6 space-y-6">
          <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm">
            {children}
          </Card>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;