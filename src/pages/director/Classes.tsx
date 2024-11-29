import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Users } from "lucide-react";

const Classes = () => {
  const classes = [
    { id: 1, name: "6ème A", students: 25, teacher: "Jean Dupont", room: "A101" },
    { id: 2, name: "5ème B", students: 28, teacher: "Marie Martin", room: "B202" },
    { id: 3, name: "4ème C", students: 22, teacher: "Lucas Bernard", room: "C303" },
  ];

  return (
    <DashboardLayout title="Gestion des Classes" role="Direction">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Liste des Classes</h2>
          <Button>Ajouter une classe</Button>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Classe</TableHead>
                <TableHead>Effectif</TableHead>
                <TableHead>Professeur Principal</TableHead>
                <TableHead>Salle</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {classes.map((class_) => (
                <TableRow key={class_.id}>
                  <TableCell className="font-medium">{class_.name}</TableCell>
                  <TableCell>{class_.students} élèves</TableCell>
                  <TableCell>{class_.teacher}</TableCell>
                  <TableCell>{class_.room}</TableCell>
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