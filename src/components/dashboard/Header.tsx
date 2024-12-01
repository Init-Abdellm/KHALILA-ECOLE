import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Profile } from "@/lib/auth";

interface HeaderProps {
  title: string;
  role: string;
  profile: Profile | null;
}

export const Header = ({ title, role, profile }: HeaderProps) => {
  const navigate = useNavigate();

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
    <header className="bg-white shadow-sm">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-sm text-gray-600">
            {profile?.first_name} {profile?.last_name} - {role}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
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