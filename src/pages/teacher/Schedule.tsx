import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";
import type { Course } from "@/types/database";

interface CourseWithClass extends Course {
  classes: {
    name: string;
    room: string;
  } | null;
}

type GroupedCourses = {
  [key: string]: CourseWithClass[];
};

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const { profile } = useProfile();

  const { data: courses, isLoading } = useQuery({
    queryKey: ['teacher-schedule', profile?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('courses')
        .select(`
          *,
          classes (
            name,
            room
          )
        `)
        .eq('teacher_id', profile?.id)
        .order('schedule_day', { ascending: true });
      
      if (error) throw error;
      
      // Group courses by day
      const groupedCourses = (data || []).reduce<GroupedCourses>((acc, course) => {
        if (!acc[course.schedule_day]) {
          acc[course.schedule_day] = [];
        }
        acc[course.schedule_day].push(course);
        return acc;
      }, {});

      return groupedCourses;
    },
    enabled: !!profile?.id
  });

  if (isLoading) {
    return (
      <DashboardLayout title="Emploi du temps" role="Professeur">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Emploi du temps" role="Professeur">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Cette Semaine</h2>
          <div className="space-y-6">
            {Object.entries(courses || {}).map(([day, dayCourses]) => (
              <div key={day}>
                <h3 className="font-medium text-gray-900 mb-3">{day}</h3>
                <div className="space-y-3">
                  {dayCourses.map((course, index) => (
                    <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-medium">{course.schedule_time}</p>
                          <p className="text-sm text-gray-600">{course.name}</p>
                        </div>
                        <div className="mt-2 md:mt-0 text-right">
                          <p className="text-sm font-medium">{course.classes?.name}</p>
                          <p className="text-sm text-gray-600">Salle {course.classes?.room}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4">Calendrier</h2>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;