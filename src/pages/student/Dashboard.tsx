import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Progress } from "@/components/ui/progress";
import { BookOpen, TrendingUp, Clock, Calendar as CalendarIcon, GraduationCap, Trophy } from "lucide-react";
import { useState } from "react";

const StudentDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const stats = [
    { title: "Cours", value: "6", icon: BookOpen, color: "text-primary" },
    { title: "Moyenne", value: "15.5", icon: TrendingUp, color: "text-secondary" },
    { title: "Heures", value: "24", icon: Clock, color: "text-green-500" },
    { title: "Rang", value: "3", icon: Trophy, color: "text-orange-500" },
  ];

  const assignments = [
    { subject: "Mathématiques", title: "Exercices Chapitre 3", due: "2024-02-20", status: "En cours", progress: 75 },
    { subject: "Français", title: "Dissertation", due: "2024-02-22", status: "À faire", progress: 0 },
    { subject: "Sciences", title: "Rapport de laboratoire", due: "2024-02-25", status: "À faire", progress: 0 },
  ];

  const schedule = [
    { time: "08:00", subject: "Mathématiques", room: "A101", teacher: "M. Dupont" },
    { time: "10:00", subject: "Français", room: "B202", teacher: "Mme Martin" },
    { time: "14:00", subject: "Sciences", room: "C303", teacher: "M. Bernard" },
  ];

  const grades = [
    { subject: "Mathématiques", grade: "16/20", type: "Contrôle", date: "2024-02-15" },
    { subject: "Français", grade: "15/20", type: "Dissertation", date: "2024-02-14" },
    { subject: "Sciences", grade: "18/20", type: "TP", date: "2024-02-13" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Étudiant">
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
        <Card className="p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-primary" />
            Emploi du Temps Aujourd'hui
          </h2>
          <div className="space-y-4">
            {schedule.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-sm font-medium text-gray-600">{item.time}</div>
                  <div>
                    <div className="font-medium">{item.subject}</div>
                    <div className="text-sm text-gray-500">
                      Salle {item.room} - {item.teacher}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-secondary" />
            Devoirs
          </h2>
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <div key={index} className="p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-medium">{assignment.title}</div>
                    <div className="text-sm text-gray-500">{assignment.subject}</div>
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
                    <span>Progression</span>
                    <span>{assignment.progress}%</span>
                  </div>
                  <Progress value={assignment.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        <Card className="col-span-1 lg:col-span-2 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-green-500" />
            Notes Récentes
          </h2>
          <div className="space-y-4">
            {grades.map((grade, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
                <div>
                  <div className="font-medium">{grade.subject}</div>
                  <div className="text-sm text-gray-500">{grade.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-primary">{grade.grade}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(grade.date).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-orange-500" />
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

export default StudentDashboard;