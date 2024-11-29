import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone } from "lucide-react";

const Students = () => {
  const students = [
    {
      id: 1,
      name: "Jean Dupont",
      class: "6ème A",
      email: "jean.dupont@example.com",
      phone: "+33 6 12 34 56 78",
      average: "15.5",
    },
    {
      id: 2,
      name: "Marie Martin",
      class: "6ème A",
      email: "marie.martin@example.com",
      phone: "+33 6 23 45 67 89",
      average: "14.8",
    },
    {
      id: 3,
      name: "Lucas Bernard",
      class: "6ème A",
      email: "lucas.bernard@example.com",
      phone: "+33 6 34 56 78 90",
      average: "16.2",
    },
  ];

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
                  <TableHead>Moyenne</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium">{student.name}</TableCell>
                    <TableCell>{student.class}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                    <TableCell className="hidden md:table-cell">{student.phone}</TableCell>
                    <TableCell>{student.average}</TableCell>
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