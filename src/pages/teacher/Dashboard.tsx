import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Users, Clock, CheckCircle } from "lucide-react";

const TeacherDashboard = () => {
  const stats = [
    { title: "Mes Classes", value: "5", icon: BookOpen, color: "text-primary" },
    { title: "Étudiants", value: "150", icon: Users, color: "text-secondary" },
    { title: "Heures", value: "24", icon: Clock, color: "text-green-500" },
    { title: "Devoirs", value: "8", icon: CheckCircle, color: "text-purple-500" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Enseignant">
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
          <h2 className="text-lg font-semibold mb-4">Devoirs à Noter</h2>
          {/* Add assignments to grade here */}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;