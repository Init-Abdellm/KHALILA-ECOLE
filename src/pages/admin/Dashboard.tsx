import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, Calendar, Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import type { Profile, Class, Event, Notification } from "@/types/database";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    students: 0,
    classes: 0,
    events: 0,
    notifications: 0
  });
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch students count
      const { count: studentsCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'student');

      // Fetch classes count
      const { count: classesCount } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true });

      // Fetch events count
      const { count: eventsCount } = await supabase
        .from('events')
        .select('*', { count: 'exact', head: true });

      // Fetch notifications count
      const { count: notificationsCount } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true });

      setStats({
        students: studentsCount || 0,
        classes: classesCount || 0,
        events: eventsCount || 0,
        notifications: notificationsCount || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard statistics",
        variant: "destructive",
      });
    }
  };

  const statCards = [
    { title: "Étudiants Total", value: stats.students.toString(), icon: Users, color: "text-primary" },
    { title: "Classes", value: stats.classes.toString(), icon: BookOpen, color: "text-secondary" },
    { title: "Événements", value: stats.events.toString(), icon: Calendar, color: "text-green-500" },
    { title: "Notifications", value: stats.notifications.toString(), icon: Bell, color: "text-purple-500" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Administration">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-neutral-200 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Activité Récente</h2>
          {/* Activity feed will be implemented in a future update */}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
          {/* Statistics chart will be implemented in a future update */}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;