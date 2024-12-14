import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Filter, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import * as XLSX from 'xlsx';

const GradesOverview = () => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { data: grades, isLoading } = useQuery({
    queryKey: ['all-grades', selectedClass, selectedType],
    queryFn: async () => {
      const query = supabase
        .from('grades')
        .select(`
          *,
          course:courses (
            name,
            teacher:profiles!courses_teacher_id_fkey (
              first_name,
              last_name
            ),
            class:classes (
              name,
              level
            )
          ),
          student:profiles!grades_student_id_fkey (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedClass) {
        query.eq('course.class_id', selectedClass);
      }
      if (selectedType) {
        query.eq('type', selectedType);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: "Error",
          description: "Failed to load grades",
          variant: "destructive",
        });
        return [];
      }
      return data;
    }
  });

  const { data: classes } = useQuery({
    queryKey: ['all-classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select('*')
        .order('name');

      if (error) {
        console.error('Error fetching classes:', error);
        toast({
          title: "Error",
          description: "Failed to load classes",
          variant: "destructive",
        });
        return [];
      }
      return data;
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
      'Level': grade.course?.class?.level,
      'Type': grade.type,
      'Grade': grade.grade,
      'Date': new Date(grade.date).toLocaleDateString('fr-FR')
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
                  key={class_.id}
                  variant={selectedClass === class_.id ? "default" : "outline"}
                  onClick={() => setSelectedClass(class_.id)}
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
                  <TableHead>Type</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades?.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">
                      {grade.student?.first_name} {grade.student?.last_name}
                    </TableCell>
                    <TableCell>{grade.course?.name}</TableCell>
                    <TableCell>
                      {grade.course?.teacher?.first_name} {grade.course?.teacher?.last_name}
                    </TableCell>
                    <TableCell>{grade.course?.class?.name}</TableCell>
                    <TableCell>{grade.type}</TableCell>
                    <TableCell>{grade.grade}/20</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(grade.date).toLocaleDateString('fr-FR')}
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