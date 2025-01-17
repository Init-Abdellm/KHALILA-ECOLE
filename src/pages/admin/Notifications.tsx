import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/database";
import { useToast } from "@/components/ui/use-toast";
import { useProfile } from "@/lib/auth";
import { Query } from "appwrite";
import { databases } from "@/integrations/appwrite/client";
import { Notification } from "@/types/database";

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { toast } = useToast();
  const { profile } = useProfile();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const { data, error } = await db.getNotifications(profile?.id || '');

      if (error) throw error;
      setNotifications(data || []);
    } catch (error: any) {
      console.error('Error fetching notifications:', error);
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive",
      });
    }
  };

  const markAllAsRead = async () => {
    try {
      if (!profile?.id) return;

      const { data: unreadNotifications } = await db.getNotifications(profile.id);
      
      // Update all unread notifications
      await Promise.all(
        (unreadNotifications || [])
          .filter(notification => !notification.read)
          .map(notification =>
            databases.updateDocument(
              import.meta.env.VITE_APPWRITE_DATABASE_ID,
              'notifications',
              notification.$id,
              { read: true }
            )
          )
      );
      
      await fetchNotifications();
      toast({
        title: "Success",
        description: "All notifications marked as read",
      });
    } catch (error: any) {
      console.error('Error marking notifications as read:', error);
      toast({
        title: "Error",
        description: "Failed to mark notifications as read",
        variant: "destructive",
      });
    }
  };

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
          <Button variant="outline" onClick={markAllAsRead}>
            Marquer tout comme lu
          </Button>
        </div>
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucune notification
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.$id}
                className={`flex items-start gap-4 p-4 ${
                  notification.read ? 'bg-neutral-50' : 'bg-white'
                } rounded-lg`}
              >
                {getIcon(notification.type)}
                <div className="flex-1">
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-gray-600">{notification.message}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(notification.$createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Notifications;