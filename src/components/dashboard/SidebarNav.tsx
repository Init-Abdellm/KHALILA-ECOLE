import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard,
  BookOpen,
  Users,
  Calendar,
  ClipboardList,
  Bell,
  Settings,
  FileText,
  GraduationCap,
  ChartBar
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

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
  const isMobile = useIsMobile();
  
  const teacherNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/teacher" },
    { icon: BookOpen, label: "Mes Cours", path: "/teacher/courses" },
    { icon: Users, label: "Mes Élèves", path: "/teacher/students" },
    { icon: Calendar, label: "Emploi du temps", path: "/teacher/schedule" },
    { icon: ClipboardList, label: "Notes", path: "/teacher/grades" },
    { icon: Bell, label: "Notifications", path: "/teacher/notifications" },
  ];

  const adminNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/admin" },
    { icon: Users, label: "Utilisateurs", path: "/admin/users" },
    { icon: ChartBar, label: "Statistiques", path: "/admin/stats" },
    { icon: Settings, label: "Paramètres", path: "/admin/settings" },
    { icon: Bell, label: "Notifications", path: "/admin/notifications" },
  ];

  const directorNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/director" },
    { icon: Users, label: "Enseignants", path: "/director/teachers" },
    { icon: GraduationCap, label: "Classes", path: "/director/classes" },
    { icon: FileText, label: "Rapports", path: "/director/reports" },
    { icon: Bell, label: "Notifications", path: "/director/notifications" },
  ];

  const studentNavItems: NavItem[] = [
    { icon: LayoutDashboard, label: "Tableau de bord", path: "/student" },
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
    <div className="mt-6 px-3 md:px-4 space-y-1 md:space-y-2">
      {getNavItems().map((item) => (
        <Link 
          key={item.path} 
          to={item.path}
          className="block w-full"
        >
          <Button
            variant={isActive(item.path) ? "secondary" : "ghost"}
            className={cn(
              "w-full justify-start",
              !isSidebarOpen && !isMobile ? 'px-2' : '',
              isActive(item.path) ? 'bg-primary text-white hover:bg-primary/90' : ''
            )}
            size={isMobile ? "default" : "sm"}
          >
            <item.icon className={cn(
              "h-4 w-4 shrink-0",
              isActive(item.path) ? 'text-white' : 'text-primary'
            )} />
            {isSidebarOpen && (
              <>
                <span className="ml-2 truncate text-sm">{item.label}</span>
                {item.path.includes('notifications') && unreadNotifications > 0 && (
                  <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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