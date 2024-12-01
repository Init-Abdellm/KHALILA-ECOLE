import { School, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "./SidebarNav";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  role: string;
  unreadNotifications: number;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, role, unreadNotifications }: SidebarProps) => {
  return (
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

      <SidebarNav 
        role={role}
        isSidebarOpen={isSidebarOpen}
        unreadNotifications={unreadNotifications}
      />
    </div>
  );
};