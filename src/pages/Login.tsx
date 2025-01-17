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

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
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
          <h1 className="text-2xl font-bold text-primary">{t('login.title')}</h1>
          <p className="text-gray-600">{t('login.subtitle')}</p>
          <p className="text-sm text-gray-500 mt-2">
            Admin test: admin@admin.com / admin
          </p>
        </motion.div>

        <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm border-0 ring-1 ring-black/5">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('login.email')}</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('login.password')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? t('login.loading') : t('login.submit')}
            </Button>
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm text-primary hover:text-primary-dark transition-colors duration-200"
              >
                {t('login.forgotPassword')}
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;