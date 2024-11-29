import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      title: "Nouvelle inscription",
      message: "Un nouvel étudiant s'est inscrit",
      type: "info",
      date: "2024-02-20",
    },
    {
      id: 2,
      title: "Mise à jour système",
      message: "Une mise à jour importante est disponible",
      type: "warning",
      date: "2024-02-19",
    },
    {
      id: 3,
      title: "Backup réussi",
      message: "La sauvegarde quotidienne a été effectuée avec succès",
      type: "success",
      date: "2024-02-18",
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <DashboardLayout title="Notifications" role="Administration">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Centre de Notifications</h2>
          <Button variant="outline">Marquer tout comme lu</Button>
        </div>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg"
            >
              {getIcon(notification.type)}
              <div className="flex-1">
                <h3 className="font-semibold">{notification.title}</h3>
                <p className="text-gray-600">{notification.message}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(notification.date).toLocaleDateString("fr-FR")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Notifications;