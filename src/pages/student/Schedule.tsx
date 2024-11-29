import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const schedule = [
    { day: "Lundi", classes: [
      { time: "08:00 - 10:00", subject: "Mathématiques", room: "A101" },
      { time: "10:00 - 12:00", subject: "Français", room: "B202" },
      { time: "14:00 - 16:00", subject: "Sciences", room: "C303" },
    ]},
    { day: "Mardi", classes: [
      { time: "08:00 - 10:00", subject: "Histoire", room: "A101" },
      { time: "10:00 - 12:00", subject: "Anglais", room: "B202" },
    ]},
    { day: "Mercredi", classes: [
      { time: "08:00 - 10:00", subject: "Sport", room: "Gymnase" },
      { time: "10:00 - 12:00", subject: "Arts", room: "D404" },
    ]},
  ];

  return (
    <DashboardLayout title="Emploi du temps" role="Étudiant">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Cette Semaine</h2>
          <div className="space-y-6">
            {schedule.map((day) => (
              <div key={day.day}>
                <h3 className="font-medium text-gray-900 mb-3">{day.day}</h3>
                <div className="space-y-3">
                  {day.classes.map((class_, index) => (
                    <div key={index} className="p-3 bg-neutral-50 rounded-lg">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="font-medium">{class_.time}</p>
                          <p className="text-sm text-gray-600">{class_.subject}</p>
                        </div>
                        <div className="mt-2 md:mt-0">
                          <p className="text-sm text-gray-600">Salle {class_.room}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
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