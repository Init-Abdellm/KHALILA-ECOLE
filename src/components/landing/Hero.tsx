import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn, GraduationCap, Users, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: GraduationCap, label: "Élèves", value: "300+" },
    { icon: Users, label: "Enseignants", value: "30+" },
    { icon: Calendar, label: "Années d'excellence", value: "5+" },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] opacity-10 bg-cover bg-center mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('landing.title')}
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto mb-12">
            {t('landing.subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center mb-16">
            <Button
              asChild
              size="lg"
              className="text-lg bg-secondary hover:bg-secondary-dark text-white transition-colors duration-300 w-full sm:w-auto"
            >
              <Link to="/blog">
                {t('landing.discoverBlog')}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg border-2 border-white text-orange-500 font-bold hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto"
            >
              <Link to="/login">
                {t('landing.connectedSpace')}
                <LogIn className="ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-white"
              >
                <stat.icon className="w-12 h-12 mx-auto mb-4 text-secondary" />
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-neutral-200">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-16 text-background fill-current"
          viewBox="0 0 1440 48"
          preserveAspectRatio="none"
        >
          <path d="M0 48h1440V0c-283.146 39.828-566.479 48-849.998 48C306.482 48 23.15 39.828-260 0v48z" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;