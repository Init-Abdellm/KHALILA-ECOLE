import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/hooks/useAuth";
import { account } from "@/integrations/appwrite/client";
import { 
  Layout,
  Users, 
  BookOpen, 
  Settings, 
  BarChart, 
  Bell, 
  Calendar,
  ClipboardList,
  FileText,
} from "lucide-react";

const RoleSelector = () => {
  const navigate = useNavigate();

  const handleRouteClick = (path: string) => {
    navigate(path, { replace: true });
  };

  const roles = [
    {
      id: "admin",
      title: "Administration",
      routes: [
        { path: "/admin", icon: Layout, label: "Dashboard" },
        { path: "/admin/users", icon: Users, label: "Users" },
        { path: "/admin/stats", icon: BarChart, label: "Statistics" },
        { path: "/admin/settings", icon: Settings, label: "Settings" },
        { path: "/admin/notifications", icon: Bell, label: "Notifications" },
      ]
    },
    {
      id: "director",
      title: "Direction",
      routes: [
        { path: "/director", icon: Layout, label: "Dashboard" },
        { path: "/director/teachers", icon: Users, label: "Teachers" },
        { path: "/director/classes", icon: BookOpen, label: "Classes" },
        { path: "/director/reports", icon: FileText, label: "Reports" },
        { path: "/director/grades", icon: ClipboardList, label: "Grades" },
        { path: "/director/notifications", icon: Bell, label: "Notifications" },
      ]
    },
    {
      id: "teacher",
      title: "Teacher",
      routes: [
        { path: "/teacher", icon: Layout, label: "Dashboard" },
        { path: "/teacher/courses", icon: BookOpen, label: "Courses" },
        { path: "/teacher/students", icon: Users, label: "Students" },
        { path: "/teacher/schedule", icon: Calendar, label: "Schedule" },
        { path: "/teacher/grades", icon: ClipboardList, label: "Grades" },
        { path: "/teacher/notifications", icon: Bell, label: "Notifications" },
      ]
    },
    {
      id: "student",
      title: "Student",
      routes: [
        { path: "/student", icon: Layout, label: "Dashboard" },
        { path: "/student/courses", icon: BookOpen, label: "Courses" },
        { path: "/student/schedule", icon: Calendar, label: "Schedule" },
        { path: "/student/grades", icon: ClipboardList, label: "Grades" },
        { path: "/student/notifications", icon: Bell, label: "Notifications" },
      ]
    },
  ];

  return (
    <div className="w-full">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
        {roles.map((role) => (
          <Card 
            key={role.id} 
            className="bg-white/95 backdrop-blur p-4 hover:shadow-xl transition-all duration-300"
          >
            <h3 className="text-lg font-semibold mb-3 text-gray-800 pb-2 border-b border-gray-100">
              {role.title}
            </h3>
            <div className="space-y-1">
              {role.routes.map((route) => (
                <div
                  key={route.path}
                  onClick={() => handleRouteClick(route.path)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-blue-50/80 cursor-pointer transition-colors duration-200 group"
                >
                  <route.icon className="text-blue-600 group-hover:text-blue-700" size={16} />
                  <span className="text-sm text-gray-600 group-hover:text-gray-800">{route.label}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};


export default RoleSelector; 