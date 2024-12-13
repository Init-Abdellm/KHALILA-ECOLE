import { Card } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { toast } from "@/components/ui/use-toast";

export const UpcomingClasses = () => {
  const { profile } = useProfile();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();

  const { data: upcomingClasses } = useQuery({
    queryKey: ['teacher-today-classes', profile?.id, today],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          classes (
            name,
            room,
            students_classes (count)
          )
        `)
        .eq('teacher_id', profile?.id)
        .eq('schedule_day', today)
        .order('schedule_time');

      if (error) {
        console.error('Error fetching today classes:', error);
        toast({
          title: "Error",
          description: "Failed to load today's classes",
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
        <CalendarIcon className="w-5 h-5 text-primary" />
        Cours Aujourd'hui
      </h2>
      <div className="space-y-4">
        {upcomingClasses?.map((class_, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg hover:bg-neutral-100 transition-colors">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-gray-600">{class_.schedule_time}</div>
              <div>
                <div className="font-medium">{class_.name}</div>
                <div className="text-sm text-gray-500">
                  {class_.classes?.name} - Salle {class_.classes?.room}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-gray-600">Élèves</div>
              <div className="text-sm text-gray-500">
                {class_.classes?.students_classes?.[0]?.count || 0}
              </div>
            </div>
          </div>
        ))}
        {(upcomingClasses?.length || 0) === 0 && (
          <div className="text-center text-gray-500 py-4">
            Pas de cours aujourd'hui
          </div>
        )}
      </div>
    </Card>
  );
};