import { Card } from "@/components/ui/card";
import { Bell, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/database";
import { Query } from "appwrite";
import { Grade } from "@/types/database";

export const RecentActivity = () => {
  const { profile } = useProfile();

  const { data: recentGrades } = useQuery({
    queryKey: ['teacher-recent-grades', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      const { data, error } = await db.getGrades([
        Query.orderDesc('$createdAt'),
        Query.limit(5)
      ]);

      if (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: "Error",
          description: "Failed to load grades data",
          variant: "destructive",
        });
        return [];
      }

      // Get course details for each grade
      const courseIds = [...new Set(data?.map(grade => grade.course_id) || [])];
      const coursesData = await Promise.all(
        courseIds.map(id => db.getCourseById(id.toString()))
      );
      const coursesMap = new Map(
        coursesData
          .filter(({ data }) => data)
          .map(({ data }) => [data.$id, data])
      );

      // Get class details for each course
      const classIds = [...new Set(coursesData
        .filter(({ data }) => data)
        .map(({ data }) => data.class_id))];
      const classesData = await Promise.all(
        classIds.map(id => db.getClassById(id.toString()))
      );
      const classesMap = new Map(
        classesData
          .filter(({ data }) => data)
          .map(({ data }) => [data.$id, data])
      );

      return data?.map(grade => ({
        ...grade,
        course: coursesMap.get(grade.course_id),
        class: classesMap.get(coursesMap.get(grade.course_id)?.class_id || '')
      }));
    },
    enabled: !!profile?.id
  });

  return (
    <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-purple-500" />
        Activités Récentes
      </h2>
      <div className="space-y-4">
        {recentGrades?.map((activity) => (
          <div key={activity.$id} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Notes {activity.type} publiées</div>
              <div className="text-sm text-gray-500">{activity.class?.name}</div>
              <div className="text-sm text-gray-400 mt-1">
                {new Date(activity.$createdAt).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        ))}
        {(recentGrades?.length || 0) === 0 && (
          <div className="text-center text-gray-500 py-4">
            Aucune activité récente
          </div>
        )}
      </div>
    </Card>
  );
};