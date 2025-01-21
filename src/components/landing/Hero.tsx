import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const scrollToAdmission = () => {
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
      admissionForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] overflow-hidden bg-[#2E5BFF]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E5BFF] to-[#1A3BCC]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-[#FF6B2C] rounded-full blur-xl" />
        <div className="absolute top-40 right-20 w-40 h-40 bg-[#FF6B2C] rounded-full blur-xl" />
        <div className="absolute bottom-20 left-1/3 w-48 h-48 bg-[#2E5BFF] rounded-full blur-xl" />
      </div>
      
      {/* Top navigation area */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-end">
            <Button
              asChild
              variant="outline"
              className="border-2 border-[#FF6B2C] text-[#FF6B2C] hover:bg-[#FF6B2C]/10 hover:text-white transition-all duration-300 bg-transparent"
            >
              <Link to="/login">
                {t("landing.hero.login", "Espace Connecté")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
        >
          <div className="text-left space-y-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
              <GraduationCap className="w-5 h-5 text-[#FF6B2C] mr-2" />
              <span className="text-white/90 text-sm font-medium">
                {t("landing.hero.banner", "Inscriptions 2025-2026 ouvertes")}
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              {t("landing.hero.title", "Bienvenue à l'École Khalilia")}
              <span className="block text-[#FF6B2C] mt-2">
                {t("landing.hero.subtitle", "Un Avenir Brillant Commence Ici")}
              </span>
            </h1>
            
            <p className="text-xl text-white/90 leading-relaxed">
              {t("landing.hero.description", "Une éducation d'excellence fondée sur des valeurs fortes, où chaque enfant développe son plein potentiel dans un environnement bienveillant et stimulant.")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={scrollToAdmission}
                size="lg"
                className="text-lg bg-[#FF6B2C] hover:bg-[#E55A1F] text-white border-2 border-transparent transition-all duration-300 shadow-lg shadow-orange-500/20"
              >
                {t("landing.hero.admission", "Inscrivez votre enfant")}
                <ArrowRight className="ml-2" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg border-2 border-white text-blue-600 hover:bg-white hover:text-[#2E5BFF] transition-all duration-300"
              >
                <Link to="/about">
                  {t("landing.hero.about", "Découvrir notre école")}
                </Link>
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto lg:mx-0">
              <div className="absolute inset-0 rounded-lg ring-4 ring-white/20 backdrop-blur bg-white/5" />
              <img
                src="/logo.png"
                alt="Élèves de l'École Khalilia"
                className="relative z-10 rounded-lg shadow-2xl object-contain w-full h-full p-8"
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#FF6B2C] rounded-lg rotate-6 opacity-20" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white rounded-lg -rotate-12 opacity-20" />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className="text-sm uppercase tracking-wider text-white/80 mb-6">
            {t("landing.hero.recognition", "Reconnu pour notre excellence éducative")}
          </p>
          <div className="flex flex-wrap justify-center gap-12 items-center">
            <img src="/logo.png" alt="Accréditation 1" className="h-16 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <img src="/logo.png" alt="Accréditation 2" className="h-16 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300" />
            <img src="/logo.png" alt="Accréditation 3" className="h-16 brightness-0 invert opacity-70 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;