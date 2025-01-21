import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Book, Heart, Users, School } from "lucide-react";

const Features = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: Book,
      title: t("landing.features.education.title", "Apprentissage Personnalisé"),
      description: t(
        "landing.features.education.description",
        "Un programme adapté au rythme de chaque élève, favorisant la curiosité et le plaisir d'apprendre."
      ),
      color: "text-[#FF6B2C]",
      bgColor: "bg-[#FF6B2C]",
    },
    {
      icon: Heart,
      title: t("landing.features.values.title", "Environnement Bienveillant"),
      description: t(
        "landing.features.values.description",
        "Un cadre sécurisant et chaleureux où chaque enfant s'épanouit en toute confiance."
      ),
      color: "text-white",
      bgColor: "bg-[#2E5BFF]",
    },
    {
      icon: Users,
      title: t("landing.features.teachers.title", "Équipe Passionnée"),
      description: t(
        "landing.features.teachers.description",
        "Des enseignants dévoués qui accompagnent chaque élève vers la réussite avec enthousiasme."
      ),
      color: "text-[#FF6B2C]",
      bgColor: "bg-[#FF6B2C]",
    },
    {
      icon: School,
      title: t("landing.features.facilities.title", "Activités Enrichissantes"),
      description: t(
        "landing.features.facilities.description",
        "Des projets stimulants et des activités variées pour développer tous les talents."
      ),
      color: "text-white",
      bgColor: "bg-[#2E5BFF]",
    },
  ];

  return (
    <div className="relative overflow-hidden bg-[#2E5BFF]">
      {/* Section transition - top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1A3BCC] to-transparent" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E5BFF] to-[#1A3BCC]" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("landing.features.title", "Notre Approche Éducative")}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t(
                "landing.features.subtitle",
                "Une pédagogie innovante centrée sur l'épanouissement et la réussite de chaque élève."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-sm border-2 border-white/20 group">
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${feature.bgColor} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                      <feature.icon className={`w-7 h-7 ${feature.color}`} />
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${feature.color}`}>
                    {feature.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-24 max-w-4xl mx-auto text-center"
          >
            <blockquote className="text-2xl font-serif text-white italic mb-6">
              {t(
                "landing.features.quote",
                "Chaque enfant est unique, et notre mission est de révéler le meilleur de chacun d'eux."
              )}
            </blockquote>
            <cite className="text-lg text-white/90 font-medium block">
              {t("landing.features.quote_author", "L'équipe pédagogique de l'École Khalilia")}
            </cite>
          </motion.div>
        </div>
      </div>

      {/* Section transition - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A3BCC] to-transparent" />
    </div>
  );
};

export default Features;