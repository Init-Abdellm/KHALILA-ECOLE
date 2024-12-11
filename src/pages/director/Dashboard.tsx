import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { TrendingUp, Users, GraduationCap, Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import type { Event } from "@/types/database";

const DirectorDashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const { data: teachersCount } = useQuery({
    queryKey: ['teachers-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'teacher');
      return count || 0;
    }
  });

  const { data: classesCount } = useQuery({
    queryKey: ['classes-count'],
    queryFn: async () => {
      const { count } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true });
      return count || 0;
    }
  });

  const { data: reports, isLoading: reportsLoading } = useQuery({
    queryKey: ['recent-reports'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .eq('type', 'report')
        .order('created_at', { ascending: false })
        .limit(3);
      return (data || []) as Event[];
    }
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ['upcoming-events'],
    queryFn: async () => {
      const { data } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(3);
      return (data || []) as Event[];
    }
  });

  const stats = [
    { title: "Performance", value: "85%", icon: TrendingUp, color: "text-primary" },
    { title: "Enseignants", value: teachersCount?.toString() || "0", icon: Users, color: "text-secondary" },
    { title: "Classes", value: classesCount?.toString() || "0", icon: GraduationCap, color: "text-green-500" },
    { title: "Événements", value: events?.length.toString() || "0", icon: CalendarIcon, color: "text-purple-500" },
  ];

  if (reportsLoading || eventsLoading) {
    return (
      <DashboardLayout title="Tableau de Bord" role="Direction">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Tableau de Bord" role="Direction">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="p-4 md:p-6">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full bg-neutral-100 ${stat.color}`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-xl md:text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mt-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Rapports Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports?.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.title}</TableCell>
                    <TableCell>{new Date(report.date).toLocaleDateString('fr-FR')}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Événements à Venir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {events?.map((event) => (
                <div key={event.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                  <div>
                    <div className="font-medium">{event.title}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Calendrier</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default DirectorDashboard;