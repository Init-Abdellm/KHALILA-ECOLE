import { Button } from "@/components/ui/button";
import { ArrowRight, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] opacity-10 bg-cover bg-center mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-primary-dark/90" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            {t('landing.title')}
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto mb-8">
            {t('landing.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 items-center">
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
              className="text-lg border-2 border-white text-white hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto"
            >
              <Link to="/login">
                {t('landing.connectedSpace')}
                <LogIn className="ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;