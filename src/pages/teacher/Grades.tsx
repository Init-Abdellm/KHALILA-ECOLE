import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Download } from "lucide-react";

const Grades = () => {
  const grades = [
    {
      id: 1,
      class: "6ème A",
      type: "Contrôle",
      subject: "Mathématiques",
      date: "2024-02-15",
      average: "14.5",
      status: "Publié",
    },
    {
      id: 2,
      class: "5ème B",
      type: "Devoir",
      subject: "Mathématiques",
      date: "2024-02-14",
      average: "13.8",
      status: "En cours",
    },
    {
      id: 3,
      class: "4ème C",
      type: "Examen",
      subject: "Mathématiques",
      date: "2024-02-13",
      average: "15.2",
      status: "À publier",
    },
  ];

  return (
    <DashboardLayout title="Notes" role="Professeur">
      <Card className="w-full">
        <div className="p-4 md:p-6">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Classe</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Matière</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead>Moyenne</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {grades.map((grade) => (
                  <TableRow key={grade.id}>
                    <TableCell className="font-medium">{grade.class}</TableCell>
                    <TableCell>{grade.type}</TableCell>
                    <TableCell>{grade.subject}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(grade.date).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>{grade.average}</TableCell>
                    <TableCell>{grade.status}</TableCell>
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