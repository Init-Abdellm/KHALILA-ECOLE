import { useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, useProfile } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const { profile } = useProfile();

  useEffect(() => {
    if (user && profile) {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>
        
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
          <h1 className="text-2xl font-bold text-primary">Connexion</h1>
          <p className="text-gray-600">Connectez-vous à votre espace personnel</p>
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
          />
        </Card>
      </div>
    </div>
  );
};

export default Login;