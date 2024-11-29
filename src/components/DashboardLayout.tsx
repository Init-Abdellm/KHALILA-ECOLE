import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { School, LogOut, Menu, BookOpen, Users, Calendar, ClipboardList, Bell, Home, Settings, FileText, GraduationCap } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  role: string;
}

const DashboardLayout = ({ children, title, role }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const teacherNavItems = [
    { icon: Home, label: "Tableau de bord", path: "/teacher" },
    { icon: BookOpen, label: "Mes Cours", path: "/teacher/courses" },
    { icon: Users, label: "Mes Élèves", path: "/teacher/students" },
    { icon: Calendar, label: "Emploi du temps", path: "/teacher/schedule" },
    { icon: ClipboardList, label: "Notes", path: "/teacher/grades" },
    { icon: Bell, label: "Notifications", path: "/teacher/notifications" },
  ];

  const adminNavItems = [
    { icon: Home, label: "Tableau de bord", path: "/admin" },
    { icon: Users, label: "Utilisateurs", path: "/admin/users" },
    { icon: Settings, label: "Paramètres", path: "/admin/settings" },
    { icon: Bell, label: "Notifications", path: "/admin/notifications" },
  ];

  const directorNavItems = [
    { icon: Home, label: "Tableau de bord", path: "/director" },
    { icon: Users, label: "Enseignants", path: "/director/teachers" },
    { icon: GraduationCap, label: "Classes", path: "/director/classes" },
    { icon: FileText, label: "Rapports", path: "/director/reports" },
    { icon: Bell, label: "Notifications", path: "/director/notifications" },
  ];

  const studentNavItems = [
    { icon: Home, label: "Tableau de bord", path: "/student" },
    { icon: BookOpen, label: "Mes Cours", path: "/student/courses" },
    { icon: Calendar, label: "Emploi du temps", path: "/student/schedule" },
    { icon: ClipboardList, label: "Notes", path: "/student/grades" },
    { icon: Bell, label: "Notifications", path: "/student/notifications" },
  ];

  const getNavItems = () => {
    switch (role) {
      case "Professeur":
        return teacherNavItems;
      case "Administration":
        return adminNavItems;
      case "Direction":
        return directorNavItems;
      case "Étudiant":
        return studentNavItems;
      default:
        return [];
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-neutral-100 shadow-lg transition-all duration-300 z-40 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex items-center gap-3">
          <School className="text-primary w-8 h-8" />
          {isSidebarOpen && <span className="text-xl font-bold text-primary">Khalilia</span>}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[-20px] top-4 z-50"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="mt-8 px-4 space-y-2">
          {getNavItems().map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className="block w-full"
            >
              <Button
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className={`w-full justify-start ${!isSidebarOpen ? 'px-2' : ''}`}
                type="button"
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {isSidebarOpen && <span className="ml-2 truncate">{item.label}</span>}
              </Button>
            </Link>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-sm text-gray-600">{role}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-primary">FR</Button>
                <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-primary">عربي</Button>
                <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-primary">EN</Button>
              </div>
              <Button variant="ghost" size="icon">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;