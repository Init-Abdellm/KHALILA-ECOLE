import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import DashboardLayout from "@/components/DashboardLayout";
import { useProfile } from "@/lib/auth";
import { Notification } from "@/types/database";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

const StudentNotifications = () => {
  const { profile } = useProfile();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: notifications, isLoading, refetch } = useQuery({
    queryKey: ["notifications", profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", profile?.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Notification[];
    },
    enabled: !!profile?.id,
  });

  const markAsRead = async (notificationId: string) => {
    try {
      const { error } = await supabase
        .from("notifications")
        .update({ read: true })
        .eq("id", notificationId);

      if (error) throw error;
      
      toast({
        title: t("common.success"),
        description: t("notifications.marked_as_read"),
      });
      
      refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
      toast({
        title: t("common.error"),
        description: t("notifications.error_marking_read"),
        variant: "destructive",
      });
    }
  };

  if (!profile) {
    return null;
  }

  return (
    <DashboardLayout title="notifications.title" role="Étudiant">
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : notifications && notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${
                  notification.read ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{notification.title}</h3>
                    <p className="text-gray-600 mt-1">{notification.message}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {new Date(notification.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {!notification.read && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      {t("notifications.mark_as_read")}
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">{t("notifications.no_notifications")}</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentNotifications;