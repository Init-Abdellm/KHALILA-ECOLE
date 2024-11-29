import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, Calendar, Bell } from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { title: "Étudiants Total", value: "1,234", icon: Users, color: "text-primary" },
    { title: "Classes", value: "45", icon: BookOpen, color: "text-secondary" },
    { title: "Événements", value: "12", icon: Calendar, color: "text-green-500" },
    { title: "Notifications", value: "89", icon: Bell, color: "text-purple-500" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Administration">
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
          <h2 className="text-lg font-semibold mb-4">Activité Récente</h2>
          {/* Add activity feed here */}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Statistiques</h2>
          {/* Add statistics chart here */}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;