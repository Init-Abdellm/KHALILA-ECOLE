import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

const Grades = () => {
  const { profile } = useProfile();
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const { data: grades, isLoading } = useQuery({
    queryKey: ['teacher-grades', profile?.id, selectedCourse],
    queryFn: async () => {
      const query = supabase
        .from('grades')
        .select(`
          *,
          course:courses (
            name,
            class:classes (
              name
            )
          ),
          student:profiles!grades_student_id_fkey (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (selectedCourse) {
        query.eq('course_id', selectedCourse);
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
    },
    enabled: !!profile?.id
  });

  const { data: courses } = useQuery({
    queryKey: ['teacher-courses', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select('*, classes (name)')
        .eq('teacher_id', profile?.id);

      if (error) {
        console.error('Error fetching courses:', error);
        toast({
          title: "Error",
          description: "Failed to load courses",
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
    enabled: !!profile?.id
  });

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
          <div className="mb-6 flex gap-4">
            <Button
              variant={!selectedCourse ? "default" : "outline"}
              onClick={() => setSelectedCourse(null)}
            >
              Tous les cours
            </Button>
            {courses?.map((course) => (
              <Button
                key={course.id}
                variant={selectedCourse === course.id ? "default" : "outline"}
                onClick={() => setSelectedCourse(course.id)}
              >
                {course.name} - {course.classes?.name}
              </Button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Élève</TableHead>
                  <TableHead>Cours</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades?.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">
                      {grade.student?.first_name} {grade.student?.last_name}
                    </TableCell>
                    <TableCell>{grade.course?.name}</TableCell>
                    <TableCell>{grade.type}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(grade.date).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>{grade.grade}/20</TableCell>
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