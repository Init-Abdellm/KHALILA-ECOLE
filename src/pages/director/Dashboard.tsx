import { Card } from "@/components/ui/card";

const DirectorDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Directeur</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Performance</h2>
            <p className="text-3xl font-bold text-primary">85%</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Événements</h2>
            <p className="text-3xl font-bold text-primary">12</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Rapports</h2>
            <p className="text-3xl font-bold text-primary">25</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DirectorDashboard;