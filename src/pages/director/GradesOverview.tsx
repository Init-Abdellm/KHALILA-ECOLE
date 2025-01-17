import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/database";
import { toast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';
import { Query } from "appwrite";
import { Grade, Course, Profile, Class } from "@/types/database";

interface GradeWithDetails extends Grade {
  course?: Course & {
    teacher?: Profile;
    class?: Class;
  };
  student?: Profile;
}

const GradesOverview = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: grades, isLoading } = useQuery<GradeWithDetails[]>({
    queryKey: ['all-grades', selectedClass, selectedType],
    queryFn: async () => {
      // Get grades with filters
      const filters = [Query.orderDesc('$createdAt')];
      if (selectedClass) {
        filters.push(Query.equal('class_id', selectedClass));
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

      // Get teachers for these courses
      const teacherIds = [...new Set(
        coursesData
          .filter(({ data }) => data)
          .map(({ data }) => data?.teacher_id)
      )];
      const teachersData = await Promise.all(
        teacherIds.map(id => db.getProfile(id))
      );
      const teachersMap = new Map(
        teachersData
          .filter(({ data }) => data)
          .map(({ data }) => [data.user_id, data])
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
        const teacher = course ? teachersMap.get(course.teacher_id) : undefined;
        const classData = course ? classesMap.get(course.class_id) : undefined;
        const student = studentsMap.get(grade.student_id);

        return {
          ...grade,
          course: course ? {
            ...course,
            teacher,
            class: classData
          } : undefined,
          student
        };
      }) || [];
    }
  });

  const { data: classes } = useQuery<Class[]>({
    queryKey: ['all-classes'],
    queryFn: async () => {
      const { data, error } = await db.getClasses();

      if (error) {
        console.error('Error fetching classes:', error);
        toast({
          title: "Error",
          description: "Failed to load classes",
          variant: "destructive",
        });
        return [];
      }
      return data || [];
    }
  });

  const gradeTypes = ['Quiz', 'Exam', 'Homework', 'Project'];

  const exportToExcel = () => {
    if (!grades) return;

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(grades.map(grade => ({
      'Student Name': `${grade.student?.first_name} ${grade.student?.last_name}`,
      'Course': grade.course?.name,
      'Teacher': `${grade.course?.teacher?.first_name} ${grade.course?.teacher?.last_name}`,
      'Class': grade.course?.class?.name,
      'Grade': grade.grade,
      'Comment': grade.comment,
      'Date': new Date(grade.$createdAt).toLocaleDateString('fr-FR')
    })));

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Grades Overview');
    XLSX.writeFile(workbook, 'grades_overview_report.xlsx');
  };

  if (isLoading) {
    return (
      <DashboardLayout title="Vue d'ensemble des notes" role="Direction">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Vue d'ensemble des notes" role="Direction">
      <Card className="w-full">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={!selectedClass ? "default" : "outline"}
                onClick={() => setSelectedClass(null)}
              >
                Toutes les classes
              </Button>
              {classes?.map((class_) => (
                <Button
                  key={class_.$id}
                  variant={selectedClass === class_.$id ? "default" : "outline"}
                  onClick={() => setSelectedClass(class_.$id)}
                >
                  {class_.name}
                </Button>
              ))}
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={!selectedType ? "default" : "outline"}
                onClick={() => setSelectedType(null)}
              >
                Tous les types
              </Button>
              {gradeTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  onClick={() => setSelectedType(type)}
                >
                  {type}
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
                  <TableHead>Professeur</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Commentaire</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades?.map((grade) => (
                  <TableRow key={grade.$id}>
                    <TableCell className="font-medium">
                      {grade.student?.first_name} {grade.student?.last_name}
                    </TableCell>
                    <TableCell>{grade.course?.name}</TableCell>
                    <TableCell>
                      {grade.course?.teacher?.first_name} {grade.course?.teacher?.last_name}
                    </TableCell>
                    <TableCell>{grade.course?.class?.name}</TableCell>
                    <TableCell>{grade.grade}/20</TableCell>
                    <TableCell>{grade.comment || '-'}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(grade.$createdAt).toLocaleDateString('fr-FR')}
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

export default GradesOverview;