import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/database";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";
import { Users, BookOpen, School, Bell, Loader2 } from "lucide-react";
import { Query } from "appwrite";
import { Event, Notification } from "@/types/database";

const AdminDashboard = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      try {
        // Get role counts
        const { data: students } = await db.getProfiles([
          Query.equal('role', 'Étudiant')
        ]);
        const studentCount = students?.length || 0;

        const { data: teachers } = await db.getProfiles([
          Query.equal('role', 'Professeur')
        ]);
        const teacherCount = teachers?.length || 0;

        // Get class and course counts
        const { data: classes } = await db.getClasses();
        const totalClasses = classes?.length || 0;

        const { data: courses } = await db.getCourses();
        const totalCourses = courses?.length || 0;

        return {
          totalStudents: studentCount,
          totalTeachers: teacherCount,
          totalClasses: totalClasses,
          totalCourses: totalCourses,
        };
      } catch (error: any) {
        console.error('Error fetching stats:', error);
        toast({
          title: t('error'),
          description: t('admin.dashboard.fetchError'),
          variant: "destructive",
        });
        return {
          totalStudents: 0,
          totalTeachers: 0,
          totalClasses: 0,
          totalCourses: 0,
        };
      }
    }
  });

  const { data: recentActivity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: async () => {
      const { data: notifications } = await db.getNotifications('admin');
      return (notifications || [])
        .sort((a, b) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime())
        .slice(0, 5);
    }
  });

  const { data: upcomingEvents, isLoading: isLoadingEvents } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data } = await db.getEvents();
      const now = new Date();
      return (data || [])
        .filter(event => new Date(event.date) >= now)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 5);
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
          {isLoadingActivity ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : recentActivity?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {t('admin.dashboard.noRecentActivity')}
            </p>
          ) : (
            <div className="space-y-4">
              {recentActivity?.map((activity) => (
                <div key={activity.$id} className="flex items-start gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary" />
                  <div>
                    <p className="font-medium">{activity.title}</p>
                    <p className="text-sm text-gray-600">{activity.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(activity.$createdAt).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">{t('admin.dashboard.upcomingEvents')}</h2>
          {isLoadingEvents ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : upcomingEvents?.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              {t('admin.dashboard.noUpcomingEvents')}
            </p>
          ) : (
            <div className="space-y-4">
              {upcomingEvents?.map((event) => (
                <div key={event.$id} className="flex items-start gap-3">
                  <div className="w-8 text-center">
                    <p className="text-sm font-bold text-primary">
                      {new Date(event.date).getDate()}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.date).toLocaleString('fr-FR', { month: 'short' })}
                    </p>
                  </div>
                  <div>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.description}</p>
                    <p className="text-xs text-gray-400">{event.time}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;