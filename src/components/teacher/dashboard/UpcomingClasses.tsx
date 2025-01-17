import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/database";
import { Query } from "appwrite";
import { Course } from "@/types/database";

export const UpcomingClasses = () => {
  const { profile } = useProfile();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  const { data: upcomingClasses } = useQuery({
    queryKey: ['teacher-today-classes', profile?.id, today],
    queryFn: async () => {
      if (!profile?.id) return [];
      const { data, error } = await db.getCourses([
        Query.equal('teacher_id', profile.id),
        Query.equal('schedule_day', today)
      ]);
      
      if (error) {
        console.error('Error fetching today classes:', error);
        toast({
          title: "Error",
          description: "Failed to load today's classes",
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

      return (data || [])
        .map(course => ({
          ...course,
          class: classesMap.get(course.class_id),
          studentCount: countsMap.get(course.class_id) || 0
        }))
        .sort((a, b) => (a.schedule_time || '').localeCompare(b.schedule_time || ''));
    },
    enabled: !!profile?.id
  });

  return (
    <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <CalendarIcon className="w-5 h-5 text-primary" />
        Cours Aujourd'hui
      </h2>
      <div className="space-y-4">
        {upcomingClasses?.map((course, index) => (
          <div key={course.$id || index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-600">{course.schedule_time}</div>
              <div>
                <div className="font-medium">{course.name}</div>
                <div className="text-sm text-gray-500">
                  {course.class?.name} - Salle {course.class?.room}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">Élèves</div>
              <div className="text-sm text-gray-500">
                {course.studentCount}
              </div>
            </div>
          </div>
        ))}
        {(upcomingClasses?.length || 0) === 0 && (
          <div className="text-center text-gray-500 py-4">
            Pas de cours aujourd'hui
          </div>
        )}
      </div>
    </Card>
  );
};