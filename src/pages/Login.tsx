import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { School } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <School className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-primary ml-2">Khalilia</h1>
          </div>
          <p className="text-gray-600">Connectez-vous à votre compte</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <Auth
            supabaseClient={supabase}
            appearance={{ 
              theme: ThemeSupa,
              style: {
                button: {
                  background: 'rgb(147 51 234)',
                  borderRadius: '0.5rem',
                  color: 'white',
                },
                anchor: {
                  color: 'rgb(147 51 234)',
                },
              },
            }}
            providers={[]}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Mot de passe',
                  button_label: 'Se connecter',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Mot de passe',
                  button_label: "S'inscrire",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;