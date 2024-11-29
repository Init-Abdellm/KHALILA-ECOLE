import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone } from "lucide-react";

const Teachers = () => {
  const teachers = [
    {
      id: 1,
      name: "Sophie Martin",
      subject: "Mathématiques",
      email: "sophie.martin@khalilia.edu",
      phone: "+33 6 12 34 56 78",
      status: "Actif",
    },
    {
      id: 2,
      name: "Thomas Bernard",
      subject: "Français",
      email: "thomas.bernard@khalilia.edu",
      phone: "+33 6 23 45 67 89",
      status: "Actif",
    },
    {
      id: 3,
      name: "Marie Dubois",
      subject: "Sciences",
      email: "marie.dubois@khalilia.edu",
      phone: "+33 6 34 56 78 90",
      status: "En congé",
    },
  ];

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
                <TableHead>Matière</TableHead>
                <TableHead className="hidden md:table-cell">Email</TableHead>
                <TableHead className="hidden md:table-cell">Téléphone</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell>{teacher.subject}</TableCell>
                  <TableCell className="hidden md:table-cell">{teacher.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{teacher.phone}</TableCell>
                  <TableCell>{teacher.status}</TableCell>
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