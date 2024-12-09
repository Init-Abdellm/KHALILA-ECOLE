import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Calendar as CalendarIcon, Bell, TrendingUp, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

interface CourseWithClass {
  id: string;
  name: string;
  schedule_time: string;
  classes: {
    name: string;
    room: string;
    students_classes: {
      count: number;
    }[];
  };
}

interface Grade {
  id: string;
  type: string;
  created_at: string;
  course: {
    name: string;
    class: {
      name: string;
    };
  };
}

const TeacherDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { profile } = useProfile();

  const { data: coursesData, isLoading: coursesLoading } = useQuery({
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
      return data as CourseWithClass[];
    },
    enabled: !!profile?.id
  });

  const { data: gradesData, isLoading: gradesLoading } = useQuery({
    queryKey: ['teacher-grades', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('grades')
        .select(`
          *,
          course:courses (
            name,
            class:classes (
              name
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: "Error",
          description: "Failed to load grades data",
          variant: "destructive",
        });
        return [];
      }
      return data as Grade[];
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

  if (coursesLoading || gradesLoading) {
    return (
      <DashboardLayout title="Tableau de Bord" role="Professeur">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

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

  const upcomingClasses = coursesData?.map(course => ({
    time: course.schedule_time,
    subject: course.name,
    room: course.classes?.room || "",
    class: course.classes?.name || "",
    attendance: 95
  })) || [];

  const recentGrades = gradesData?.map(grade => ({
    type: 'grade',
    message: `Notes ${grade.type} publiées`,
    class: grade.course?.class?.name || "",
    time: new Date(grade.created_at).toLocaleDateString('fr-FR')
  })) || [];

  return (
    <DashboardLayout title="Tableau de Bord" role="Professeur">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Cours Aujourd'hui
          </h2>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-gray-600">{class_.time}</div>
                  <div>
                    <div className="font-medium">{class_.subject}</div>
                    <div className="text-sm text-gray-500">
                      {class_.class} - Salle {class_.room}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">Présence</div>
                  <div className="text-sm text-gray-500">{class_.attendance}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-500" />
            Activités Récentes
          </h2>
          <div className="space-y-4">
            {recentGrades.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="p-2 rounded-full bg-green-100 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.message}</div>
                  <div className="text-sm text-gray-500">{activity.class}</div>
                  <div className="text-sm text-gray-400 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card className="p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-green-500" />
            Calendrier
          </h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;