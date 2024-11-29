import { Card } from "@/components/ui/card";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Administrateur</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Étudiants</h2>
            <p className="text-3xl font-bold text-primary">1,234</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Classes</h2>
            <p className="text-3xl font-bold text-primary">45</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Enseignants</h2>
            <p className="text-3xl font-bold text-primary">89</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;