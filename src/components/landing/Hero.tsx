import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Bienvenue à l'École Khalilia
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Une éducation d'excellence pour préparer les leaders de demain
          </p>
          <div className="flex justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="text-lg bg-primary hover:bg-primary/90 text-white"
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