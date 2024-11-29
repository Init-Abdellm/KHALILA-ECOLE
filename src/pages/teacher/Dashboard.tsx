import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Calendar as CalendarIcon, Bell, TrendingUp } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = [
    { title: "Cours", value: "6", icon: BookOpen, color: "text-primary" },
    { title: "Élèves", value: "120", icon: Users, color: "text-secondary" },
    { title: "Heures", value: "24", icon: TrendingUp, color: "text-green-500" },
    { title: "Notifications", value: "3", icon: Bell, color: "text-purple-500" },
  ];

  const upcomingClasses = [
    { time: "08:00", subject: "Mathématiques", room: "A101", class: "6ème A" },
    { time: "10:00", subject: "Mathématiques", room: "B202", class: "5ème B" },
    { time: "14:00", subject: "Mathématiques", room: "C303", class: "4ème C" },
  ];

  const assignments = [
    { class: "6ème A", title: "Exercices Chapitre 3", due: "2024-02-20", status: "En cours" },
    { class: "5ème B", title: "Contrôle continu", due: "2024-02-22", status: "À venir" },
    { class: "4ème C", title: "Devoir maison", due: "2024-02-25", status: "À venir" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Professeur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card className="col-span-1">
          <div className="p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Cours Aujourd'hui</h2>
            <div className="space-y-4">
              {upcomingClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="text-sm font-medium text-gray-600">{class_.time}</div>
                    <div>
                      <div className="font-medium">{class_.subject}</div>
                      <div className="text-sm text-gray-500">
                        {class_.class} - Salle {class_.room}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card className="col-span-1">
          <div className="p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Devoirs à Noter</h2>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-gray-500">{assignment.class}</div>
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
          </div>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <div className="p-4 md:p-6">
            <h2 className="text-lg font-semibold mb-4">Calendrier</h2>
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;