import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/database";
import { Query } from "appwrite";
import { Profile } from "@/types/database";

const Teachers = () => {
  const { data: teachers, isLoading } = useQuery<Profile[]>({
    queryKey: ['teachers'],
    queryFn: async () => {
      const { data, error } = await db.getProfiles([
        Query.equal('role', 'Professeur')
      ]);
      
      if (error) throw error;
      return data || [];
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Enseignants" role="Direction">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Enseignants" role="Direction">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Liste des Enseignants</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers?.map((teacher) => (
                <TableRow key={teacher.$id}>
                  <TableCell className="font-medium">
                    {teacher.first_name} {teacher.last_name}
                  </TableCell>
                  <TableCell>{teacher.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{teacher.phone || 'Non renseigné'}</TableCell>
                  <TableCell>{teacher.status || 'Actif'}</TableCell>
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
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Teachers;