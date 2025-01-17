import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/database";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { Query } from "appwrite";
import { Course, Profile, StudentClass } from "@/types/database";

interface CourseWithDetails extends Course {
  teacher?: Profile;
  class?: {
    name: string;
    students_count: number;
  };
}

const Courses = () => {
  const { profile } = useProfile();

  const { data: courses, isLoading } = useQuery<CourseWithDetails[]>({
    queryKey: ['student-courses', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];

      // Get student's classes
      const { data: studentClasses, error: classesError } = await db.getStudentClasses(profile.id);
      if (classesError) throw classesError;

      const classIds = (studentClasses as StudentClass[])?.map(sc => sc.class_id) || [];
      if (classIds.length === 0) return [];

      // Get courses for these classes
      const { data: coursesData, error: coursesError } = await db.getCourses([
        Query.equal('class_id', classIds)
      ]);
      if (coursesError) throw coursesError;

      // Get teacher profiles for these courses
      const teacherIds = [...new Set((coursesData as Course[])?.map(course => course.teacher_id) || [])];
      const teacherProfiles = await Promise.all(
        teacherIds.map(id => db.getProfile(id))
      );
      const teachersMap = new Map(
        teacherProfiles
          .filter(({ data }) => data)
          .map(({ data }) => [data.user_id, data])
      );

      // Get class details and student counts
      const classDetails = await Promise.all(
        classIds.map(async (classId) => {
          const { data: classData } = await db.getClassById(classId);
          const { data: studentsCount } = await db.getStudentClasses(classId);
          return {
            id: classId,
            name: classData?.name,
            students_count: studentsCount?.length || 0
          };
        })
      );
      const classesMap = new Map(
        classDetails.map(cls => [cls.id, cls])
      );

      // Combine all data
      return ((coursesData as Course[])?.map(course => ({
        ...course,
        teacher: teachersMap.get(course.teacher_id),
        class: classesMap.get(course.class_id)
      })) || []) as CourseWithDetails[];
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
          <Card key={course.$id} className="p-6">
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
                  {course.schedule}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {course.class?.students_count || 0} élèves
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