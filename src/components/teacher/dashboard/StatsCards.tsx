import { Card } from "@/components/ui/card";
import { BookOpen, Users, TrendingUp, Bell } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/database";
import { Query } from "appwrite";

export const StatsCards = () => {
  const { profile } = useProfile();

  const { data: coursesData } = useQuery({
    queryKey: ['teacher-courses', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      const { data, error } = await db.getCourses([
        Query.equal('teacher_id', profile.id)
      ]);
      
      if (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to load courses data",
          variant: "destructive",
        });
        return [];
      }

      // Get class details for each course
      const classIds = [...new Set(data?.map(course => course.class_id) || [])];
      const classesData = await Promise.all(
        classIds.map(id => db.getClassById(id.toString()))
      );
      const classesMap = new Map(
        classesData
          .filter(({ data }) => data)
          .map(({ data }) => [data.$id, data])
      );

      // Get student counts for each class
      const studentCounts = await Promise.all(
        classIds.map(async (classId) => {
          const { data: students } = await db.getStudentClasses([
            Query.equal('class_id', classId.toString())
          ]);
          return { classId, count: students?.length || 0 };
        })
      );
      const countsMap = new Map(
        studentCounts.map(({ classId, count }) => [classId, count])
      );

      return data?.map(course => ({
        ...course,
        class: classesMap.get(course.class_id),
        studentCount: countsMap.get(course.class_id) || 0
      }));
    },
    enabled: !!profile?.id
  });

  const { data: notificationsCount } = useQuery({
    queryKey: ['notifications-count', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return 0;
      const { data } = await db.getNotifications(profile.id);
      return data?.filter(n => !n.read)?.length || 0;
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
        acc + (course.studentCount || 0), 0).toString() || "0",
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