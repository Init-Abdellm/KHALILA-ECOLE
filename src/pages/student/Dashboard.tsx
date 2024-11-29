import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, TrendingUp, Clock, Calendar } from "lucide-react";

const StudentDashboard = () => {
  const stats = [
    { title: "Cours", value: "6", icon: BookOpen, color: "text-primary" },
    { title: "Moyenne", value: "15.5", icon: TrendingUp, color: "text-secondary" },
    { title: "Heures", value: "24", icon: Clock, color: "text-green-500" },
    { title: "Événements", value: "3", icon: Calendar, color: "text-purple-500" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Étudiant">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-neutral-200 ${stat.color}`}>
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
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Emploi du Temps</h2>
          {/* Add schedule here */}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Devoirs</h2>
          {/* Add assignments here */}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;