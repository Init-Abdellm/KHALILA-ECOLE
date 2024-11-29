import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { School, LogOut, Menu } from "lucide-react";
import { useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  role: string;
}

const DashboardLayout = ({ children, title, role }: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-neutral-100 shadow-lg transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="p-4 flex items-center gap-3">
          <School className="text-primary w-8 h-8" />
          {isSidebarOpen && <span className="text-xl font-bold text-primary">Khalilia</span>}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-[-20px] top-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-4 w-4" />
        </Button>

        <div className="mt-8 px-4">
          {/* Add navigation items here based on role */}
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
                <button className="text-sm text-gray-600 hover:text-primary">FR</button>
                <button className="text-sm text-gray-600 hover:text-primary">عربي</button>
                <button className="text-sm text-gray-600 hover:text-primary">EN</button>
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