import { Button } from "@/components/ui/button";
import { LogOut, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Profile } from "@/lib/auth";
import { useIsMobile } from "@/hooks/use-mobile";

interface HeaderProps {
  title: string;
  role: string;
  profile: Profile | null;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const Header = ({ title, role, profile, isSidebarOpen, setIsSidebarOpen }: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-4 py-3 md:px-6 md:py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
          <div className="flex items-center gap-4">
            <img
              src="/placeholder.svg"
              alt="Logo"
              className="h-8 w-auto"
            />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
              <p className="text-xs md:text-sm text-gray-600">
                {profile?.first_name} {profile?.last_name} - {role}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex gap-2">
            <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-primary">FR</Button>
            <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-primary">عربي</Button>
            <Button variant="ghost" size="sm" className="text-sm text-gray-600 hover:text-primary">EN</Button>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};