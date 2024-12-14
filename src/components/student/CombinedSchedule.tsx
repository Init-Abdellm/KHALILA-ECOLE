import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface ScheduleEntry {
  id: string;
  name: string;
  schedule_day: string;
  schedule_time: string;
  teacher: {
    first_name: string | null;
    last_name: string | null;
  } | null;
  classes: {
    name: string;
    room: string;
  } | null;
}

type GroupedSchedule = {
  [key: string]: ScheduleEntry[];
};

export function CombinedSchedule() {
  const { profile } = useProfile();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const { data: schedule, isLoading } = useQuery({
    queryKey: ['student-combined-schedule', profile?.id],
    queryFn: async () => {
      // Get student's classes
      const { data: studentClasses, error: classesError } = await supabase
        .from('students_classes')
        .select('class_id')
        .eq('student_id', profile?.id);

      if (classesError) throw classesError;

      const classIds = studentClasses?.map(sc => sc.class_id) || [];

      // Get all courses for these classes
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select(`
          *,
          classes (
            name,
            room
          ),
          teacher:profiles!courses_teacher_id_fkey (
            first_name,
            last_name
          )
        `)
        .in('class_id', classIds)
        .order('schedule_time', { ascending: true });

      if (coursesError) throw coursesError;

      // Group courses by day
      const groupedSchedule = (coursesData || []).reduce<GroupedSchedule>((acc, course) => {
        if (!acc[course.schedule_day]) {
          acc[course.schedule_day] = [];
        }
        acc[course.schedule_day].push(course);
        return acc;
      }, {});

      return groupedSchedule;
    },
    enabled: !!profile?.id
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-6">
      {days.map(day => (
        <Card key={day} className={`p-4 ${day === today ? 'border-primary' : ''}`}>
          <h3 className="font-semibold text-lg mb-4">{day}</h3>
          <div className="space-y-3">
            {schedule?.[day]?.map((course) => (
              <div
                key={course.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-neutral-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{course.schedule_time}</p>
                  <p className="text-sm text-gray-600">{course.name}</p>
                  <p className="text-xs text-gray-500">
                    Prof. {course.teacher?.first_name} {course.teacher?.last_name}
                  </p>
                </div>
                <div className="mt-2 md:mt-0 text-right">
                  <p className="text-sm font-medium">{course.classes?.name}</p>
                  <p className="text-sm text-gray-600">Salle {course.classes?.room}</p>
                </div>
              </div>
            ))}
            {(!schedule?.[day] || schedule[day].length === 0) && (
              <p className="text-center text-gray-500 py-2">No classes scheduled</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}