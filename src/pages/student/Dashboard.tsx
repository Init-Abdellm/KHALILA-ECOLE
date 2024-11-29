import { Card } from "@/components/ui/card";

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Tableau de Bord Étudiant</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Cours</h2>
            <p className="text-3xl font-bold text-primary">6</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Moyenne</h2>
            <p className="text-3xl font-bold text-primary">15.5</p>
          </Card>
          <Card className="p-6">
            <h2 className="font-semibold mb-2">Devoirs</h2>
            <p className="text-3xl font-bold text-primary">4</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;