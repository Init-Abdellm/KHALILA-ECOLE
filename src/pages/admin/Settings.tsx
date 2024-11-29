import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const Settings = () => {
  return (
    <DashboardLayout title="Paramètres" role="Administration">
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Paramètres Généraux</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Notifications par email</Label>
                <p className="text-sm text-gray-500">Recevoir des notifications par email</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Mode sombre</Label>
                <p className="text-sm text-gray-500">Activer le mode sombre</p>
              </div>
              <Switch />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informations de l'École</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="schoolName">Nom de l'école</Label>
              <Input id="schoolName" defaultValue="Khalilia" />
            </div>
            <div>
              <Label htmlFor="address">Adresse</Label>
              <Input id="address" />
            </div>
            <div>
              <Label htmlFor="phone">Téléphone</Label>
              <Input id="phone" type="tel" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" />
            </div>
            <Button>Sauvegarder les modifications</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Settings;