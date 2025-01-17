import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/database";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Query } from "appwrite";
import { Grade, Course, Class } from "@/types/database";

interface GradeWithDetails extends Grade {
  course?: {
    name: string;
    class?: {
      name: string;
    };
  };
}

const Grades = () => {
  const { profile } = useProfile();

  const { data: grades, isLoading } = useQuery<GradeWithDetails[]>({
    queryKey: ['student-grades', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];

      // Get grades
      const { data: gradesData, error } = await db.getGrades([
        Query.equal('student_id', profile.id),
        Query.orderDesc('$createdAt')
      ]);

      if (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: "Error",
          description: "Failed to load grades",
          variant: "destructive",
        });
        throw error;
      }

      // Get courses for these grades
      const courseIds = [...new Set((gradesData as Grade[])?.map(grade => grade.course_id) || [])];
      const coursesData = await Promise.all(
        courseIds.map(id => db.getCourseById(id))
      );
      const coursesMap = new Map(
        coursesData
          .filter(({ data }) => data)
          .map(({ data }) => [data.$id, data])
      );

      // Get classes for these courses
      const classIds = [...new Set(
        coursesData
          .filter(({ data }) => data)
          .map(({ data }) => data?.class_id)
      )];
      const classesData = await Promise.all(
        classIds.map(id => db.getClassById(id))
      );
      const classesMap = new Map(
        classesData
          .filter(({ data }) => data)
          .map(({ data }) => [data.$id, data])
      );

      // Combine all data
      return (gradesData as Grade[])?.map(grade => {
        const course = coursesMap.get(grade.course_id);
        const classData = course ? classesMap.get(course.class_id) : undefined;
        return {
          ...grade,
          course: course ? {
            name: course.name,
            class: classData ? {
              name: classData.name
            } : undefined
          } : undefined
        };
      }) || [];
    },
    enabled: !!profile?.id,
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Mes Notes" role="Étudiant">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes Notes" role="Étudiant">
      <Card className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Relevé de Notes</h2>
          <p className="text-sm text-gray-600">Trimestre en cours</p>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Matière</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Commentaire</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Classe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades?.map((grade) => (
                <TableRow key={grade.$id}>
                  <TableCell className="font-medium">{grade.course?.name}</TableCell>
                  <TableCell>{grade.grade}/20</TableCell>
                  <TableCell>{grade.comment || '-'}</TableCell>
                  <TableCell>{new Date(grade.$createdAt).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{grade.course?.class?.name || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Grades;