import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-gradient-to-br from-primary to-primary-dark">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605810230434-7631ac76ec81')] opacity-10 bg-cover bg-center" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Bienvenue à l'École Khalilia
          </h1>
          <p className="text-xl text-neutral-200 max-w-3xl mx-auto mb-8">
            Une éducation d'excellence pour préparer les leaders de demain
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-lg bg-secondary hover:bg-secondary-dark text-white transition-colors duration-300"
            >
              <Link to="/blog">
                Découvrir Notre Blog
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;