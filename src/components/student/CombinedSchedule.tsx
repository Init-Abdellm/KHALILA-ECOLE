import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { databases } from "@/lib/appwrite";
import { Query } from "appwrite";
import { useProfile } from "@/lib/auth";
import { Loader2 } from "lucide-react";

interface ScheduleEntry {
  $id: string;
  name: string;
  schedule_day: string;
  schedule_time: string;
  teacher_id: string;
  class_id: string;
  teacher?: {
    firstName: string | null;
    lastName: string | null;
  };
  classes?: {
    name: string;
    room: string;
  };
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
      if (!profile?.id) return {};

      // Get student's classes
      const studentClasses = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'students_classes',
        [Query.equal('student_id', profile.id)]
      );

      const classIds = studentClasses.documents.map(sc => sc.class_id);
      if (classIds.length === 0) return {};

      // Get all courses for these classes
      const coursesData = await databases.listDocuments(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        'courses',
        [
          Query.equal('class_id', classIds),
          Query.orderAsc('schedule_time')
        ]
      );

      // Get all unique teacher IDs and class IDs
      const teacherIds = [...new Set(coursesData.documents.map(course => course.teacher_id))];
      const uniqueClassIds = [...new Set(coursesData.documents.map(course => course.class_id))];

      // Fetch teachers and classes data
      const [teachersResponse, classesResponse] = await Promise.all([
        databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'profiles',
          [Query.equal('$id', teacherIds)]
        ),
        databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID,
          'classes',
          [Query.equal('$id', uniqueClassIds)]
        )
      ]);

      // Create lookup maps
      const teachersMap = teachersResponse.documents.reduce((acc, teacher) => {
        acc[teacher.$id] = {
          firstName: teacher.firstName,
          lastName: teacher.lastName
        };
        return acc;
      }, {} as Record<string, { firstName: string; lastName: string }>);

      const classesMap = classesResponse.documents.reduce((acc, class_) => {
        acc[class_.$id] = {
          name: class_.name,
          room: class_.room
        };
        return acc;
      }, {} as Record<string, { name: string; room: string }>);

      // Combine data and group by day
      const groupedSchedule = coursesData.documents.reduce<GroupedSchedule>((acc, course) => {
        if (!acc[course.schedule_day]) {
          acc[course.schedule_day] = [];
        }

        const enrichedCourse = {
          ...course,
          teacher: teachersMap[course.teacher_id],
          classes: classesMap[course.class_id]
        };

        acc[course.schedule_day].push(enrichedCourse);
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
                key={course.$id}
                className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-neutral-50 rounded-lg"
              >
                <div>
                  <p className="font-medium">{course.schedule_time}</p>
                  <p className="text-sm text-gray-600">{course.name}</p>
                  <p className="text-xs text-gray-500">
                    Prof. {course.teacher?.firstName} {course.teacher?.lastName}
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