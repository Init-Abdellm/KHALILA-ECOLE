import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

const Students = () => {
  const { profile } = useProfile();

  const { data: students, isLoading } = useQuery({
    queryKey: ['teacher-students', profile?.id],
    queryFn: async () => {
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('id')
        .eq('teacher_id', profile?.id);

      if (classesError) {
        console.error('Error fetching classes:', classesError);
        throw classesError;
      }

      const classIds = classesData.map(c => c.id);

      const { data: studentsData, error: studentsError } = await supabase
        .from('students_classes')
        .select(`
          student:profiles (
            id,
            first_name,
            last_name,
            email,
            phone
          ),
          class:classes (
            name
          )
        `)
        .in('class_id', classIds);

      if (studentsError) {
        console.error('Error fetching students:', studentsError);
        throw studentsError;
      }

      return studentsData;
    },
    enabled: !!profile?.id,
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Mes Élèves" role="Professeur">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Mes Élèves" role="Professeur">
      <Card className="w-full">
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Classe</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students?.map((entry) => (
                  <TableRow key={entry.student.id}>
                    <TableCell className="font-medium">
                      {entry.student.first_name} {entry.student.last_name}
                    </TableCell>
                    <TableCell>{entry.class.name}</TableCell>
                    <TableCell className="hidden md:table-cell">{entry.student.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{entry.student.phone}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Phone className="h-4 w-4" />
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

export default Students;