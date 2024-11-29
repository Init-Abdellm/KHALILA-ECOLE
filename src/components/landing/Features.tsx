import { Card } from "@/components/ui/card";
import { GraduationCap, Users, Calendar, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const Features = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Excellence Académique",
      description: "Programme d'études complet et innovant",
    },
    {
      icon: Users,
      title: "Corps Enseignant Qualifié",
      description: "Professeurs expérimentés et dévoués",
    },
    {
      icon: Calendar,
      title: "Activités Parascolaires",
      description: "Large choix d'activités culturelles et sportives",
    },
    {
      icon: BookOpen,
      title: "Ressources Modernes",
      description: "Équipements et outils pédagogiques de pointe",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Nos Points Forts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <feature.icon className="w-12 h-12 mx-auto text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;