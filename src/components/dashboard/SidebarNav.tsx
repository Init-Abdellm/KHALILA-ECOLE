import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, Users, Calendar, ClipboardList, Bell, Settings, FileText, GraduationCap } from "lucide-react";

interface NavItem {
  icon: any;
  label: string;
  path: string;
}

interface SidebarNavProps {
  role: string;
  isSidebarOpen: boolean;
  unreadNotifications: number;
}

export const SidebarNav = ({ role, isSidebarOpen, unreadNotifications }: SidebarNavProps) => {
  const location = useLocation();
  
  const teacherNavItems: NavItem[] = [
    { icon: Home, label: "Tableau de bord", path: "/teacher" },
    { icon: BookOpen, label: "Mes Cours", path: "/teacher/courses" },
    { icon: Users, label: "Mes Élèves", path: "/teacher/students" },
    { icon: Calendar, label: "Emploi du temps", path: "/teacher/schedule" },
    { icon: ClipboardList, label: "Notes", path: "/teacher/grades" },
    { icon: Bell, label: "Notifications", path: "/teacher/notifications" },
  ];

  const adminNavItems: NavItem[] = [
    { icon: Home, label: "Tableau de bord", path: "/admin" },
    { icon: Users, label: "Utilisateurs", path: "/admin/users" },
    { icon: Settings, label: "Paramètres", path: "/admin/settings" },
    { icon: Bell, label: "Notifications", path: "/admin/notifications" },
  ];

  const directorNavItems: NavItem[] = [
    { icon: Home, label: "Tableau de bord", path: "/director" },
    { icon: Users, label: "Enseignants", path: "/director/teachers" },
    { icon: GraduationCap, label: "Classes", path: "/director/classes" },
    { icon: FileText, label: "Rapports", path: "/director/reports" },
    { icon: Bell, label: "Notifications", path: "/director/notifications" },
  ];

  const studentNavItems: NavItem[] = [
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
            {isSidebarOpen && (
              <>
                <span className="ml-2 truncate">{item.label}</span>
                {item.path.includes('notifications') && unreadNotifications > 0 && (
                  <span className="ml-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {unreadNotifications}
                  </span>
                )}
              </>
            )}
          </Button>
        </Link>
      ))}
    </div>
  );
};