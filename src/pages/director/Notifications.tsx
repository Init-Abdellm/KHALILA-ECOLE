import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";
import { db } from "@/lib/database";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import { databases } from "@/integrations/appwrite/client";
import { Notification } from "@/types/database";

export default function DirectorNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { profile } = useProfile();

  useEffect(() => {
    fetchNotifications();
  }, [profile?.id]);

  const fetchNotifications = async () => {
    try {
      if (!profile?.id) return;

      const { data, error } = await db.getNotifications(profile.id);

      if (error) throw error;

      setNotifications(data || []);
    } catch (error: any) {
      console.error("Error fetching notifications:", error);
      toast({
        title: "Error",
        description: "Failed to load notifications",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId: string) => {
    try {
      await databases.updateDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'notifications',
        notificationId,
        { read: true }
      );

      setNotifications((prev) =>
        prev.map((n) =>
          n.$id === notificationId ? { ...n, read: true } : n
        )
      );

      toast({
        title: "Success",
        description: "Notification marked as read",
      });
    } catch (error: any) {
      console.error("Error marking notification as read:", error);
      toast({
        title: "Error",
        description: "Failed to mark notification as read",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout title="Notifications" role="Direction">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Notifications</h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : notifications.length === 0 ? (
          <div className="text-center text-gray-500">Aucune notification</div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.$id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-sm text-gray-400">
                      {new Date(notification.$createdAt).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  {!notification.read && (
                    <button
                      onClick={() => markAsRead(notification.$id)}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Marquer comme lu
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}