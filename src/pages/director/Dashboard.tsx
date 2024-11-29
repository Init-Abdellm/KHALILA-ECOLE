import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { TrendingUp, Users, GraduationCap, Calendar } from "lucide-react";

const DirectorDashboard = () => {
  const stats = [
    { title: "Performance", value: "85%", icon: TrendingUp, color: "text-primary" },
    { title: "Enseignants", value: "89", icon: Users, color: "text-secondary" },
    { title: "Classes", value: "45", icon: GraduationCap, color: "text-green-500" },
    { title: "Événements", value: "12", icon: Calendar, color: "text-purple-500" },
  ];

  return (
    <DashboardLayout title="Tableau de Bord" role="Direction">
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
          <h2 className="text-lg font-semibold mb-4">Rapports</h2>
          {/* Add reports list here */}
        </Card>
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Calendrier</h2>
          {/* Add calendar here */}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DirectorDashboard;