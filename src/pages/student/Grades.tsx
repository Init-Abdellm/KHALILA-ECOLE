import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const Grades = () => {
  const grades = [
    {
      id: 1,
      subject: "Mathématiques",
      type: "Contrôle",
      date: "2024-02-15",
      grade: "16/20",
      average: "15.5/20",
    },
    {
      id: 2,
      subject: "Français",
      type: "Devoir",
      date: "2024-02-14",
      grade: "14/20",
      average: "14.8/20",
    },
    {
      id: 3,
      subject: "Sciences",
      type: "Examen",
      date: "2024-02-13",
      grade: "18/20",
      average: "16.2/20",
    },
  ];

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
              {grades.map((grade) => (
                <TableRow key={grade.id}>
                  <TableCell className="font-medium">{grade.subject}</TableCell>
                  <TableCell>{grade.type}</TableCell>
                  <TableCell>{new Date(grade.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{grade.grade}</TableCell>
                  <TableCell>{grade.average}</TableCell>
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