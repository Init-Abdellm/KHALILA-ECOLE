import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { CombinedSchedule } from "@/components/student/CombinedSchedule";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardLayout title="Emploi du temps" role="Étudiant">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CombinedSchedule />
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