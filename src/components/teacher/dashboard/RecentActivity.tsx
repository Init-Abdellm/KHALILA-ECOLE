import { Card } from "@/components/ui/card";
import { Bell, CheckCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

export const RecentActivity = () => {
  const { profile } = useProfile();

  const { data: recentGrades } = useQuery({
    queryKey: ['teacher-recent-grades', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('grades')
        .select(`
          *,
          course:courses (
            name,
            class:classes (
              name
            )
          )
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching grades:', error);
        toast({
          title: "Error",
          description: "Failed to load grades data",
          variant: "destructive",
        });
        return [];
      }
      return data;
    },
    enabled: !!profile?.id
  });

  return (
    <Card className="col-span-1 p-4 md:p-6 bg-white/80 backdrop-blur-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-purple-500" />
        Activités Récentes
      </h2>
      <div className="space-y-4">
        {recentGrades?.map((activity, index) => (
          <div key={index} className="flex items-start gap-4 p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <div className="p-2 rounded-full bg-green-100 text-green-600">
              <CheckCircle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="font-medium">Notes {activity.type} publiées</div>
              <div className="text-sm text-gray-500">{activity.course?.class?.name}</div>
              <div className="text-sm text-gray-400 mt-1">
                {new Date(activity.created_at).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </div>
        ))}
        {(recentGrades?.length || 0) === 0 && (
          <div className="text-center text-gray-500 py-4">
            Aucune activité récente
          </div>
        )}
      </div>
    </Card>
  );
};