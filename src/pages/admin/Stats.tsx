import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { db } from "@/lib/database";
import { Query } from "appwrite";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Stats = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalClasses: 0,
    totalCourses: 0,
  });
  const [monthlySignups, setMonthlySignups] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchStats();
    fetchMonthlySignups();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch students count
      const { data: students } = await db.getProfiles([
        Query.equal('role', 'Étudiant')
      ]);
      const studentsCount = students?.length || 0;

      // Fetch teachers count
      const { data: teachers } = await db.getProfiles([
        Query.equal('role', 'Professeur')
      ]);
      const teachersCount = teachers?.length || 0;

      // Fetch classes count
      const { data: classes } = await db.getClasses();
      const classesCount = classes?.length || 0;

      // Fetch courses count
      const { data: courses } = await db.getCourses();
      const coursesCount = courses?.length || 0;

      setStats({
        totalStudents: studentsCount,
        totalTeachers: teachersCount,
        totalClasses: classesCount,
        totalCourses: coursesCount,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les statistiques",
        variant: "destructive",
      });
    }
  };

  const fetchMonthlySignups = async () => {
    try {
      const { data, error } = await db.getProfiles([
        Query.orderAsc('$createdAt')
      ]);

      if (error) throw error;

      // Process data to get monthly signups
      const monthlyCounts = data.reduce((acc, profile) => {
        const month = new Date(profile.$createdAt).toLocaleString("fr-FR", {
          month: "long",
          year: "numeric",
        });
        acc[month] = (acc[month] || 0) + 1;
        return acc;
      }, {});

      const chartData = Object.entries(monthlyCounts).map(([month, count]) => ({
        month,
        signups: count,
      }));

      setMonthlySignups(chartData);
    } catch (error) {
      console.error("Error fetching monthly signups:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les inscriptions mensuelles",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout title="Statistiques" role="Administration">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Étudiants</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.totalStudents}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Professeurs</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.totalTeachers}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Classes</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.totalClasses}
          </p>
        </Card>
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-2">Total Cours</h3>
          <p className="text-3xl font-bold text-primary">
            {stats.totalCourses}
          </p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h3 className="text-lg font-semibold mb-4">Inscriptions Mensuelles</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlySignups}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="signups" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Stats;