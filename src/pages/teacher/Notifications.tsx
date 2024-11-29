import { Bell, Check, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success';
}

const mockNotifications: Notification[] = [
  {
    id: 1,
    title: "Réunion des enseignants",
    message: "Réunion importante ce jeudi à 14h dans la salle des professeurs.",
    date: "2024-02-20",
    read: false,
    type: 'info'
  },
  {
    id: 2,
    title: "Bulletins de notes",
    message: "N'oubliez pas de soumettre les notes du trimestre avant vendredi.",
    date: "2024-02-19",
    read: false,
    type: 'warning'
  },
  {
    id: 3,
    title: "Formation pédagogique",
    message: "La formation sur les nouvelles méthodes d'enseignement aura lieu le mois prochain.",
    date: "2024-02-18",
    read: true,
    type: 'success'
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return 'text-secondary';
      case 'success':
        return 'text-green-500';
      default:
        return 'text-primary';
    }
  };

  return (
    <DashboardLayout title="Notifications" role="Professeur">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Notifications ({notifications.filter(n => !n.read).length} non lues)
          </h2>
          <Button
            variant="outline"
            onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          >
            Tout marquer comme lu
          </Button>
        </div>

        <div className="grid gap-4">
          {notifications.map((notification) => (
            <Card key={notification.id} className={`p-4 ${notification.read ? 'bg-neutral-100' : 'bg-white'}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Bell className={`h-5 w-5 mt-1 ${getNotificationColor(notification.type)}`} />
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.date).toLocaleDateString('fr-FR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!notification.read && (
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => markAsRead(notification.id)}
                      className="text-primary hover:text-primary/80"
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => deleteNotification(notification.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;