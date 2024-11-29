import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TrendingUp, Users, GraduationCap, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const DirectorDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = [
    { title: "Performance", value: "85%", icon: TrendingUp, color: "text-primary" },
    { title: "Enseignants", value: "89", icon: Users, color: "text-secondary" },
    { title: "Classes", value: "45", icon: GraduationCap, color: "text-green-500" },
    { title: "Événements", value: "12", icon: CalendarIcon, color: "text-purple-500" },
  ];

  const recentReports = [
    { title: "Rapport de Performance T1", date: "2024-02-15", status: "Complété" },
    { title: "Évaluation des Enseignants", date: "2024-02-14", status: "En cours" },
    { title: "Budget Trimestriel", date: "2024-02-13", status: "En attente" },
  ];

  const upcomingEvents = [
    { title: "Réunion du Conseil", date: "2024-02-20", time: "09:00" },
    { title: "Formation Pédagogique", date: "2024-02-22", time: "14:00" },
    { title: "Assemblée Générale", date: "2024-02-25", time: "10:00" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Direction">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-neutral-100 ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Rapports Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Statut</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{new Date(report.date).toLocaleDateString('fr-FR')}</TableCell>
                    <TableCell>{report.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Événements à Venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DirectorDashboard;