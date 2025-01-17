import { Button } from "@/components/ui/button";
import { LogOut, Menu, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { account } from "@/lib/appwrite";
import { toast } from "@/components/ui/use-toast";
import { Profile } from "@/lib/auth";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  title: string;
  role: string;
  profile: Profile | null;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}

export const Header = ({ 
  title, 
  role, 
  profile, 
  isSidebarOpen, 
  setIsSidebarOpen 
}: HeaderProps) => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useTranslation();

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      navigate('/login');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('common.error'),
        variant: "destructive",
      });
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="px-4 py-3 md:px-6 md:py-4">
        <div className="flex items-center justify-between">
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
                src="/logo.png"
                alt="École Khalilia"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-primary">{t(title)}</h1>
                <p className="text-sm text-gray-600">
                  {profile?.firstName} {profile?.lastName} - {t(`common.role.${role.toLowerCase()}`)}
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  {t('dashboard.notifications.viewAll')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <LogOut className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={handleLogout}>
                  {t('common.logout')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};