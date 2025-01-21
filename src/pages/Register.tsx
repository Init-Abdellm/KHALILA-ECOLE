import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { toast } from "@/components/ui/use-toast";
import { account } from "@/integrations/appwrite/client";
import { ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await account.create(
        ID.unique(),
        email,
        password,
        name
      );

      await account.createEmailSession(email, password);
      
      toast({
        title: t('register.success'),
        description: t('register.successMessage'),
      });

      navigate('/student');
    } catch (error: any) {
      toast({
        title: t('register.error'),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

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
            {t('register.backToHome')}
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
          <h1 className="text-3xl font-bold text-white mb-2">{t('register.title', "Créer un compte")}</h1>
          <p className="text-white/80">{t('register.subtitle', "Rejoignez notre communauté éducative")}</p>
        </motion.div>

        <Card className="p-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-xl">
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">{t('register.name', "Nom complet")}</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">{t('register.email', "Email")}</Label>
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
              <Label htmlFor="password" className="text-white">{t('register.password', "Mot de passe")}</Label>
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
              {loading ? t('register.loading', "Création du compte...") : t('register.submit', "Créer mon compte")}
            </Button>
            <div className="flex justify-center items-center space-x-1 text-sm">
              <span className="text-white/80">{t('register.haveAccount', "Déjà un compte ?")}</span>
              <Link
                to="/login"
                className="text-[#FF6B2C] hover:text-[#E55A1F] font-medium transition-colors duration-200"
              >
                {t('register.login', "Se connecter")}
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;