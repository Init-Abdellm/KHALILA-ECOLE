import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

const Reports = () => {
  const reports = [
    {
      id: 1,
      title: "Rapport de Performance T1",
      type: "Performance",
      date: "2024-02-15",
      status: "Complété",
    },
    {
      id: 2,
      title: "Évaluation des Enseignants",
      type: "Évaluation",
      date: "2024-02-14",
      status: "En cours",
    },
    {
      id: 3,
      title: "Budget Trimestriel",
      type: "Finance",
      date: "2024-02-13",
      status: "En attente",
    },
  ];

  return (
    <DashboardLayout title="Rapports" role="Direction">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Tous les Rapports</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell>{new Date(report.date).toLocaleDateString('fr-FR')}</TableCell>
                  <TableCell>{report.status}</TableCell>
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
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default Reports;