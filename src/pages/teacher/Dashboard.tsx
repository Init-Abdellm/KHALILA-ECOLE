import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Calendar as CalendarIcon, Bell, TrendingUp, FileText, CheckCircle, AlertTriangle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
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
    { time: "08:00", subject: "Mathématiques", room: "A101", class: "6ème A", attendance: 95 },
    { time: "10:00", subject: "Mathématiques", room: "B202", class: "5ème B", attendance: 88 },
    { time: "14:00", subject: "Mathématiques", room: "C303", class: "4ème C", attendance: 92 },
  ];

  const assignments = [
    { class: "6ème A", title: "Exercices Chapitre 3", due: "2024-02-20", status: "En cours", submissions: 18, total: 25 },
    { class: "5ème B", title: "Contrôle continu", due: "2024-02-22", status: "À venir", submissions: 0, total: 28 },
    { class: "4ème C", title: "Devoir maison", due: "2024-02-25", status: "À venir", submissions: 0, total: 22 },
  ];

  const recentActivities = [
    { type: "grade", message: "Notes du contrôle continu publiées", class: "6ème A", time: "Il y a 2h" },
    { type: "attendance", message: "Présences marquées", class: "5ème B", time: "Il y a 3h" },
    { type: "homework", message: "Nouveau devoir assigné", class: "4ème C", time: "Il y a 5h" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Professeur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4 md:p-6 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all">
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
        <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Cours Aujourd'hui
          </h2>
          <div className="space-y-4">
            {upcomingClasses.map((class_, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-gray-600">{class_.time}</div>
                  <div>
                    <div className="font-medium">{class_.subject}</div>
                    <div className="text-sm text-gray-500">
                      {class_.class} - Salle {class_.room}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-600">Présence</div>
                  <div className="text-sm text-gray-500">{class_.attendance}%</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-secondary" />
            Devoirs à Noter
          </h2>
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
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
                <div className="mt-2">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Soumissions</span>
                    <span>{assignment.submissions}/{assignment.total}</span>
                  </div>
                  <Progress value={(assignment.submissions / assignment.total) * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card className="col-span-1 lg:col-span-2 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-purple-500" />
            Activités Récentes
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className={`p-2 rounded-full ${
                  activity.type === 'grade' ? 'bg-green-100 text-green-600' :
                  activity.type === 'attendance' ? 'bg-blue-100 text-blue-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'grade' ? <CheckCircle className="w-4 h-4" /> :
                   activity.type === 'attendance' ? <Users className="w-4 h-4" /> :
                   <AlertTriangle className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <div className="font-medium">{activity.message}</div>
                  <div className="text-sm text-gray-500">{activity.class}</div>
                  <div className="text-sm text-gray-400 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-green-500" />
            Calendrier
          </h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;