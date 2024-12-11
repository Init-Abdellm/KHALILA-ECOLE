import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { Users, BookOpen, School, Bell } from "lucide-react";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role, count(*)')
          .group('role');

        if (error) throw error;

        const totalStudents = data.find(item => item.role === 'student')?.count || 0;
        const totalTeachers = data.find(item => item.role === 'teacher')?.count || 0;
        const totalClasses = await supabase.from('classes').select('*', { count: 'exact' });
        const totalCourses = await supabase.from('courses').select('*', { count: 'exact' });

        return {
          totalStudents,
          totalTeachers,
          totalClasses: totalClasses.count,
          totalCourses: totalCourses.count,
        };
      } catch (error) {
        console.error('Error fetching stats:', error);
        toast({
          title: "Error",
          description: "Failed to load dashboard statistics",
          variant: "destructive",
        });
      }
    }
  });

  const statCards = [
    { 
      title: t('admin.dashboard.stats.totalStudents'), 
      value: stats?.totalStudents || 0, 
      icon: Users, 
      color: "text-primary" 
    },
    { 
      title: t('admin.dashboard.stats.totalTeachers'), 
      value: stats?.totalTeachers || 0, 
      icon: BookOpen, 
      color: "text-secondary" 
    },
    { 
      title: t('admin.dashboard.stats.totalClasses'), 
      value: stats?.totalClasses || 0, 
      icon: School, 
      color: "text-green-500" 
    },
    { 
      title: t('admin.dashboard.stats.totalCourses'), 
      value: stats?.totalCourses || 0, 
      icon: Bell, 
      color: "text-purple-500" 
    }
  ];

  return (
    <DashboardLayout title={t('admin.dashboard.title')} role="Administration">
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
          <h2 className="text-lg font-semibold mb-4">{t('admin.dashboard.recentActivity')}</h2>
          {/* Activity feed will be implemented in a future update */}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t('admin.dashboard.upcomingEvents')}</h2>
          {/* Upcoming events will be implemented in a future update */}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
