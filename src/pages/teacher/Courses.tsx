import { useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { CourseManagementDialog } from "@/components/teacher/CourseManagementDialog";
import { db } from "@/lib/database";
import { Query } from "appwrite";
import { Course, Class } from "@/types/database";

interface CourseWithDetails extends Course {
  class?: Class;
  studentCount: number;
}

const Courses = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();

  const { data: courses, isLoading } = useQuery<CourseWithDetails[]>({
    queryKey: ['teacher-courses', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];
      
      // Get all courses for the teacher
      const { data: coursesData, error } = await db.getCourses([
        Query.equal('teacher_id', profile.id)
      ]);
      
      if (error) throw error;

      // Get class details for each course
      const classIds = [...new Set((coursesData || []).map(course => course.class_id))];
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

      return (coursesData || []).map(course => ({
        ...course,
        class: classesMap.get(course.class_id),
        studentCount: countsMap.get(course.class_id) || 0
      }));
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
          <Card key={course.$id} className="p-4 md:p-6">
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
              <p className="text-gray-600 mb-4">{course.class?.name}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-auto">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.studentCount} élèves</span>
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
                  onClick={() => navigate(`/teacher/courses/${course.$id}`)}
                >
                  Détails
                </Button>
                <Button 
                  className="w-full"
                  onClick={() => navigate(`/teacher/grades?course=${course.$id}`)}
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