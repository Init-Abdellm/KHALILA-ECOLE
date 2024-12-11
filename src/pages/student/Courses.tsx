import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";

const Courses = () => {
  const { profile } = useProfile();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['student-courses', profile?.id],
    queryFn: async () => {
      const { data: studentClasses, error: classesError } = await supabase
        .from('students_classes')
        .select('class_id')
        .eq('student_id', profile?.id);

      if (classesError) throw classesError;

      const classIds = studentClasses?.map(sc => sc.class_id) || [];

      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          classes (
            name,
            students_classes (count)
          ),
          teacher:profiles!courses_teacher_id_fkey (
            first_name,
            last_name
          )
        `)
        .in('class_id', classIds);

      if (coursesError) throw coursesError;
      return coursesData || [];
    },
    enabled: !!profile?.id
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Mes Cours" role="Étudiant">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes Cours" role="Étudiant">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Prof. {course.teacher?.first_name} {course.teacher?.last_name}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {course.schedule_day} {course.schedule_time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {course.classes?.students_classes?.[0]?.count || 0} élèves
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Courses;