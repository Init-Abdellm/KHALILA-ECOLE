import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { StatsCards } from "@/components/teacher/dashboard/StatsCards";
import { UpcomingClasses } from "@/components/teacher/dashboard/UpcomingClasses";
import { RecentActivity } from "@/components/teacher/dashboard/RecentActivity";

const TeacherDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <DashboardLayout title="Tableau de Bord" role="Professeur">
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <UpcomingClasses />
        <RecentActivity />
      </div>

      <div className="mt-6">
        <Card className="p-4 md:p-6 bg-white/80 backdrop-blur-sm">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-green-500" />
            Calendrier
          </h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;