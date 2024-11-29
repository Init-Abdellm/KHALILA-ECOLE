import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { School } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg p-8 space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <School className="w-10 h-10 text-primary" />
          <h1 className="text-3xl font-bold text-primary">Khalilia</h1>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-center">Portail de Connexion</h2>
          <p className="text-center text-gray-600">Sélectionnez votre type d'utilisateur</p>
          
          <div className="grid gap-3">
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/admin'}>
              Administration
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/director'}>
              Direction
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/teacher'}>
              Enseignants
            </Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = '/student'}>
              Étudiants & Parents
            </Button>
          </div>
        </div>

        <div className="flex justify-center space-x-4 pt-4">
          <button className="text-sm text-gray-600 hover:text-primary">Français</button>
          <button className="text-sm text-gray-600 hover:text-primary">العربية</button>
          <button className="text-sm text-gray-600 hover:text-primary">English</button>
        </div>
      </Card>
    </div>
  );
};

export default Index;