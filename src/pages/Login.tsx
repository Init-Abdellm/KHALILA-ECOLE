import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { toast } from "@/components/ui/use-toast";
import { account } from "@/integrations/appwrite/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RoleSelector from "@/components/RoleSelector";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdminBypass, setIsAdminBypass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Development bypass for admin login
      if (email === "admin@admin.com" && password === "admin") {
        toast({
          title: t('login.success'),
          description: "Development admin login successful",
        });
        setIsAdminBypass(true);
        setLoading(false);
        return;
      }

      await account.createEmailSession(email, password);
      const user = await account.get();
      
      // Get user role from custom attributes or a separate collection
      const role = user.prefs?.role || 'student';
      
      toast({
        title: t('login.success'),
        description: t('login.success'),
      });

      const from = location.state?.from?.pathname || getDefaultRoute(role);
      navigate(from, { replace: true });
    } catch (error: any) {
      toast({
        title: t('login.error'),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDefaultRoute = (role: string | null) => {
    switch (role) {
      case 'admin':
        return '/admin';
      case 'director':
        return '/director';
      case 'teacher':
        return '/teacher';
      case 'student':
        return '/student';
      default:
        return '/';
    }
  };

  if (isAdminBypass) {
    return (
      <div className="min-h-screen bg-[#2E5BFF] flex flex-col items-center justify-center p-4 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#2E5BFF] to-[#1A3BCC]" />
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative w-full max-w-md space-y-4">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-white mb-2">Development Mode</h1>
            <p className="text-white/80">Select a role to access different dashboards</p>
          </div>
          <RoleSelector />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2E5BFF] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E5BFF] to-[#1A3BCC]" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative w-full max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-white/80 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('login.backToHome')}
          </Link>
          <LanguageSwitcher />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <img
            src="/logo.png"
            alt="École Khalilia"
            className="h-16 w-auto mx-auto mb-4"
          />
          <h1 className="text-3xl font-bold text-white mb-2">{t('login.title')}</h1>
          <p className="text-white/80">{t('login.subtitle')}</p>
          {process.env.NODE_ENV === 'development' && (
            <p className="text-sm text-white/60 mt-2">
              Admin test: admin@admin.com / admin
            </p>
          )}
        </motion.div>

        <Card className="p-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#FF6B2C] hover:bg-[#E55A1F] text-white border-2 border-transparent transition-all duration-300 shadow-lg shadow-orange-500/20"
              disabled={loading}
            >
              {loading ? t('login.loading') : t('login.submit')}
            </Button>
            <div className="flex flex-col items-center space-y-2 text-sm">
              <Link
                to="/forgot-password"
                className="text-white hover:text-white/80 transition-colors duration-200"
              >
                {t('login.forgotPassword')}
              </Link>
              <div className="flex items-center space-x-1">
                <span className="text-white/80">{t('login.noAccount', "Pas encore de compte ?")}</span>
                <Link
                  to="/register"
                  className="text-[#FF6B2C] hover:text-[#E55A1F] font-medium transition-colors duration-200"
                >
                  {t('login.register', "S'inscrire")}
                </Link>
              </div>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;