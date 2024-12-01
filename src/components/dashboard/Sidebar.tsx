import { School, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarNav } from "./SidebarNav";
import { useIsMobile } from "@/hooks/use-mobile";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  role: string;
  unreadNotifications: number;
}

export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen, role, unreadNotifications }: SidebarProps) => {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      <div 
        className={`fixed top-0 left-0 h-full bg-neutral-100 shadow-lg transition-all duration-300 z-50
          ${isSidebarOpen 
            ? isMobile 
              ? 'w-64 translate-x-0' 
              : 'w-64' 
            : isMobile 
              ? '-translate-x-full' 
              : 'w-20'
          }`}
      >
        <div className="p-4 flex items-center gap-3">
          <School className="text-primary w-6 h-6 md:w-8 md:h-8" />
          {isSidebarOpen && <span className="text-lg md:text-xl font-bold text-primary">Khalilia</span>}
        </div>
        
        {!isMobile && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-[-20px] top-4 z-50"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}

        <SidebarNav 
          role={role}
          isSidebarOpen={isSidebarOpen}
          unreadNotifications={unreadNotifications}
        />
      </div>
    </>
  );
};