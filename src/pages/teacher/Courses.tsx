import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Clock } from "lucide-react";

const Courses = () => {
  const courses = [
    {
      id: 1,
      name: "Mathématiques",
      class: "6ème A",
      students: 30,
      hours: 4,
      nextSession: "Lundi, 08:00",
    },
    {
      id: 2,
      name: "Mathématiques",
      class: "5ème B",
      students: 28,
      hours: 4,
      nextSession: "Lundi, 10:00",
    },
    {
      id: 3,
      name: "Mathématiques",
      class: "4ème C",
      students: 32,
      hours: 4,
      nextSession: "Lundi, 14:00",
    },
  ];

  return (
    <DashboardLayout title="Mes Cours" role="Professeur">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <Card key={course.id} className="p-4 md:p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium text-gray-500">{course.nextSession}</span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{course.name}</h3>
              <p className="text-gray-600 mb-4">{course.class}</p>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-auto">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.students} élèves</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.hours}h/semaine</span>
                </div>
              </div>
              
              <div className="mt-4 flex gap-2">
                <Button variant="outline" className="w-full">Détails</Button>
                <Button className="w-full">Notes</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default Courses;