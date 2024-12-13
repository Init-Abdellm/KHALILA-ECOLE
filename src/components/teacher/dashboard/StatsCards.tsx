import { Card } from "@/components/ui/card";
import { BookOpen, Users, TrendingUp, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

export const StatsCards = () => {
  const { profile } = useProfile();

  const { data: coursesData } = useQuery({
    queryKey: ['teacher-courses', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          classes (
            name,
            room,
            students_classes (count)
          )
        `)
        .eq('teacher_id', profile?.id);

      if (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to load courses data",
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
    enabled: !!profile?.id
  });

  const { data: notificationsCount } = useQuery({
    queryKey: ['notifications-count', profile?.id],
    queryFn: async () => {
      const { count, error } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', profile?.id)
        .eq('read', false);

      if (error) {
        console.error('Error fetching notifications count:', error);
        return 0;
      }
      return count || 0;
    },
    enabled: !!profile?.id
  });

  const stats = [
    { 
      title: "Cours", 
      value: coursesData?.length.toString() || "0", 
      icon: BookOpen, 
      color: "text-primary" 
    },
    { 
      title: "Élèves Total", 
      value: coursesData?.reduce((acc, course) => 
        acc + (course.classes?.students_classes?.[0]?.count || 0), 0).toString() || "0",
      icon: Users, 
      color: "text-secondary" 
    },
    { 
      title: "Heures/Semaine", 
      value: (coursesData?.length * 2).toString() || "0", 
      icon: TrendingUp, 
      color: "text-green-500" 
    },
    { 
      title: "Notifications", 
      value: notificationsCount?.toString() || "0", 
      icon: Bell, 
      color: "text-purple-500" 
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="p-4 md:p-6 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-full bg-neutral-100 ${stat.color}`}>
              <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};