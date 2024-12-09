import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useProfile } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { toast } from "@/components/ui/use-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { profile } = useProfile();
  const { t } = useTranslation();

  useEffect(() => {
    console.log("Login - User:", user);
    console.log("Login - Profile:", profile);
    
    if (user?.email === 'admin@admin.com') {
      console.log("Admin user detected, redirecting to admin dashboard");
      const from = location.state?.from?.pathname || '/admin';
      navigate(from, { replace: true });
      return;
    }

    if (user && profile) {
      console.log("User and profile found, redirecting to dashboard");
      const from = location.state?.from?.pathname || getDefaultRoute(profile.role);
      navigate(from, { replace: true });
    }
  }, [user, profile, navigate, location]);

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

  // Handle auth state change
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (event === 'SIGNED_IN') {
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        });
      } else if (event === 'SIGNED_OUT') {
        toast({
          title: "Déconnexion",
          description: "Vous avez été déconnecté.",
        });
      } else if (event === 'USER_UPDATED') {
        console.log("User updated:", session);
      } else if (event === 'PASSWORD_RECOVERY') {
        toast({
          title: "Réinitialisation du mot de passe",
          description: "Veuillez vérifier votre email pour réinitialiser votre mot de passe.",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

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
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#0B3C5D',
                    brandAccent: '#F16522',
                  },
                },
              },
              className: {
                container: 'w-full',
                button: 'w-full px-4 py-2 text-white bg-primary hover:bg-primary-dark transition-colors duration-200',
                input: 'w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors duration-200',
                label: 'text-sm font-medium text-gray-700',
                message: 'text-sm text-red-600',
              },
            }}
            providers={[]}
            redirectTo={window.location.origin}
            onError={(error) => {
              console.error("Auth error:", error);
              toast({
                title: "Erreur de connexion",
                description: error.message === "Invalid login credentials" 
                  ? "Email ou mot de passe incorrect"
                  : "Une erreur est survenue lors de la connexion",
                variant: "destructive",
              });
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: t('login.email'),
                  password_label: t('login.password'),
                  button_label: t('login.submit'),
                  loading_button_label: t('login.loading'),
                  link_text: t('login.forgotPassword'),
                },
              },
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default Login;