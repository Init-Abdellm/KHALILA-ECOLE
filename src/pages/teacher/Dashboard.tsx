import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { BookOpen, TrendingUp, Clock, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

const TeacherDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = [
    { title: "Classes", value: "4", icon: BookOpen, color: "text-primary" },
    { title: "Élèves", value: "120", icon: TrendingUp, color: "text-secondary" },
    { title: "Heures", value: "18", icon: Clock, color: "text-green-500" },
    { title: "Événements", value: "2", icon: CalendarIcon, color: "text-purple-500" },
  ];

  const upcomingClasses = [
    { time: "08:00", class: "6ème A", subject: "Mathématiques", room: "A101" },
    { time: "10:00", class: "5ème B", subject: "Mathématiques", room: "B202" },
    { time: "14:00", class: "4ème C", subject: "Mathématiques", room: "C303" },
  ];

  const assignments = [
    { class: "6ème A", title: "Exercices Chapitre 3", due: "2024-02-20", status: "À noter" },
    { class: "5ème B", title: "Contrôle continu", due: "2024-02-22", status: "Planifié" },
    { class: "4ème C", title: "Devoir maison", due: "2024-02-25", status: "En cours" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Professeur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-neutral-100 ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Emploi du Temps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-600">{item.time}</div>
                    <div>
                      <div className="font-medium">{item.subject}</div>
                      <div className="text-sm text-gray-500">
                        {item.class} - Salle {item.room}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Devoirs à Noter</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="font-medium">{assignment.class}</div>
                    <div className="text-sm text-gray-500">{assignment.title}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600">
                      Pour le {new Date(assignment.due).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-sm text-gray-500">{assignment.status}</div>
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
          <CardContent>
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

export default TeacherDashboard;