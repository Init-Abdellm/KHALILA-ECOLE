import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/database";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';
import { Query } from "appwrite";
import { Grade, Course, Profile, Class } from "@/types/database";

interface GradeWithDetails extends Grade {
  course?: Course & {
    class?: Class;
  };
  student?: Profile;
}

interface CourseWithClass extends Course {
  classes?: Class;
}

const Grades = () => {
  const { profile } = useProfile();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: grades, isLoading } = useQuery<GradeWithDetails[]>({
    queryKey: ['teacher-grades', profile?.id, selectedCourse, selectedType],
    queryFn: async () => {
      if (!profile?.id) return [];

      // Get grades with filters
      const filters = [Query.orderDesc('$createdAt')];
      if (selectedCourse) {
        filters.push(Query.equal('course_id', selectedCourse));
      }

      const { data: gradesData, error } = await db.getGrades(filters);

      if (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: "Error",
          description: "Failed to load grades",
          variant: "destructive",
        });
        return [];
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

      // Get students for these grades
      const studentIds = [...new Set((gradesData as Grade[])?.map(grade => grade.student_id) || [])];
      const studentsData = await Promise.all(
        studentIds.map(id => db.getProfile(id))
      );
      const studentsMap = new Map(
        studentsData
          .filter(({ data }) => data)
          .map(({ data }) => [data.user_id, data])
      );

      // Combine all data
      return (gradesData as Grade[])?.map(grade => {
        const course = coursesMap.get(grade.course_id);
        const classData = course ? classesMap.get(course.class_id) : undefined;
        const student = studentsMap.get(grade.student_id);

        return {
          ...grade,
          course: course ? {
            ...course,
            class: classData
          } : undefined,
          student
        };
      }) || [];
    },
    enabled: !!profile?.id
  });

  const { data: courses } = useQuery<CourseWithClass[]>({
    queryKey: ['teacher-courses', profile?.id],
    queryFn: async () => {
      if (!profile?.id) return [];

      const { data: coursesData, error } = await db.getCourses([
        Query.equal('teacher_id', profile.id)
      ]);

      if (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to load courses",
          variant: "destructive",
        });
        return [];
      }

      // Get classes for these courses
      const classIds = [...new Set((coursesData as Course[])?.map(course => course.class_id) || [])];
      const classesData = await Promise.all(
        classIds.map(id => db.getClassById(id))
      );
      const classesMap = new Map(
        classesData
          .filter(({ data }) => data)
          .map(({ data }) => [data.$id, data])
      );

      // Combine course and class data
      return (coursesData as Course[])?.map(course => ({
        ...course,
        classes: classesMap.get(course.class_id)
      })) || [];
    },
    enabled: !!profile?.id
  });

  const gradeTypes = ['Quiz', 'Exam', 'Homework', 'Project'];

  const exportToExcel = () => {
    if (!grades) return;

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(grades.map(grade => ({
      'Student Name': `${grade.student?.first_name} ${grade.student?.last_name}`,
      'Course': grade.course?.name,
      'Class': grade.course?.class?.name,
      'Grade': grade.grade,
      'Comment': grade.comment,
      'Date': new Date(grade.$createdAt).toLocaleDateString('fr-FR')
    })));

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades');
    XLSX.writeFile(workbook, 'grades_report.xlsx');
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Notes" role="Professeur">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Notes" role="Professeur">
      <Card className="w-full">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={!selectedCourse ? "default" : "outline"}
                onClick={() => setSelectedCourse(null)}
              >
                Tous les cours
              </Button>
              {courses?.map((course) => (
                <Button
                  key={course.$id}
                  variant={selectedCourse === course.$id ? "default" : "outline"}
                  onClick={() => setSelectedCourse(course.$id)}
                >
                  {course.name} - {course.classes?.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <Button onClick={exportToExcel}>
              <Download className="mr-2 h-4 w-4" />
              Exporter en Excel
            </Button>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades?.map((grade) => (
                  <TableRow key={grade.$id}>
                    <TableCell className="font-medium">
                      {grade.student?.first_name} {grade.student?.last_name}
                    </TableCell>
                    <TableCell>{grade.course?.name}</TableCell>
                    <TableCell>{grade.course?.class?.name}</TableCell>
                    <TableCell>{grade.grade}/20</TableCell>
                    <TableCell>{grade.comment || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(grade.$createdAt).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Grades;