import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { BookOpen, Clock, Users } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      name: "Mathématiques",
      teacher: "Jean Dupont",
      schedule: "Lundi 08:00 - 10:00",
      students: 25,
      progress: 75,
    },
    {
      id: 2,
      name: "Français",
      teacher: "Marie Martin",
      schedule: "Mardi 10:00 - 12:00",
      students: 28,
      progress: 60,
    },
    {
      id: 3,
      name: "Sciences",
      teacher: "Lucas Bernard",
      schedule: "Mercredi 14:00 - 16:00",
      students: 22,
      progress: 80,
    },
  ];

  return (
    <DashboardLayout title="Mes Cours" role="Étudiant">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{course.name}</h3>
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Professeur: {course.teacher}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="h-4 w-4" />
                  {course.schedule}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="h-4 w-4" />
                  {course.students} élèves
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progression</span>
                  <span>{course.progress}%</span>
                </div>
                <div className="h-2 bg-neutral-100 rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${course.progress}%` }}
                  />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Courses;