import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Users, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ClassManagementDialog } from "@/components/director/ClassManagementDialog";
import { TimetableManagementDialog } from "@/components/director/TimetableManagementDialog";

const Classes = () => {
  const { data: classes, isLoading } = useQuery({
    queryKey: ['classes'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          teacher:profiles!classes_teacher_id_fkey (
            first_name,
            last_name
          ),
          students_classes (count)
        `);
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Gestion des Classes" role="Direction">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Gestion des Classes" role="Direction">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Liste des Classes</h2>
          <div className="flex gap-4">
            <ClassManagementDialog />
            <TimetableManagementDialog />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Classe</TableHead>
                <TableHead>Niveau</TableHead>
                <TableHead>Professeur</TableHead>
                <TableHead>Effectif</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((class_) => (
                <TableRow key={class_.id}>
                  <TableCell className="font-medium">{class_.name}</TableCell>
                  <TableCell>{class_.level}</TableCell>
                  <TableCell>
                    {class_.teacher?.first_name} {class_.teacher?.last_name}
                  </TableCell>
                  <TableCell>
                    {class_.students_classes?.[0]?.count || 0}/{class_.capacity}
                  </TableCell>
                  <TableCell>{class_.room}</TableCell>
                  <TableCell className="capitalize">{class_.type}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Users className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Classes;