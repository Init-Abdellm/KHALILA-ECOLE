import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const Grades = () => {
  const { profile } = useProfile();

  const { data: grades, isLoading } = useQuery({
    queryKey: ['student-grades', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('grades')
        .select(`
          *,
          course:courses (
            name,
            class:classes (
              name
            )
          )
        `)
        .eq('student_id', profile?.id)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: "Error",
          description: "Failed to load grades",
          variant: "destructive",
        });
        throw error;
      }

      return data;
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
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Moyenne de la classe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grades?.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.course.name}</TableCell>
                  <TableCell>{grade.type}</TableCell>
                  <TableCell>{new Date(grade.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{grade.grade}/20</TableCell>
                  <TableCell>{grade.course.class.name}</TableCell>
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