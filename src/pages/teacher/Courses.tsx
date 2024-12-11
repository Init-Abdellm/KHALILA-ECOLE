import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CourseManagementDialog } from "@/components/teacher/CourseManagementDialog";

interface CourseWithClass {
  id: string;
  name: string;
  schedule_day: string;
  schedule_time: string;
  classes: {
    name: string;
    students_classes: {
      count: number;
    }[];
  };
}

const Courses = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['teacher-courses', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          classes (
            name,
            students_classes (count)
          )
        `)
        .eq('teacher_id', profile?.id);

      if (error) throw error;
      return data as CourseWithClass[];
    },
    enabled: !!profile?.id
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Mes Cours" role="Professeur">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes Cours" role="Professeur">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Liste des Cours</h2>
        <CourseManagementDialog />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <Card key={course.id} className="p-4 md:p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-500">
                  {course.schedule_day}, {course.schedule_time}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.classes?.name}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-auto">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.classes?.students_classes?.[0]?.count || 0} élèves</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>2h/semaine</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => navigate(`/teacher/courses/${course.id}`)}
                >
                  Détails
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/teacher/grades?course=${course.id}`)}
                >
                  Notes
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Courses;