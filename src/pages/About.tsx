import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, GraduationCap, Heart, Users, Target, BookOpen, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const values = [
    {
      icon: GraduationCap,
      title: t("about.values.excellence.title", "Excellence Académique"),
      description: t(
        "about.values.excellence.description",
        "Notre programme éducatif rigoureux suit les standards internationaux tout en s'adaptant aux besoins individuels."
      ),
      color: "text-[#FF6B2C]",
      bgColor: "bg-[#FF6B2C]",
    },
    {
      icon: Heart,
      title: t("about.values.care.title", "Bienveillance"),
      description: t(
        "about.values.care.description",
        "Un environnement chaleureux où chaque élève se sent en sécurité et soutenu dans son développement."
      ),
      color: "text-white",
      bgColor: "bg-[#2E5BFF]",
    },
    {
      icon: Users,
      title: t("about.values.community.title", "Esprit Communautaire"),
      description: t(
        "about.values.community.description",
        "Une communauté soudée où parents, enseignants et élèves collaborent pour la réussite de tous."
      ),
      color: "text-[#FF6B2C]",
      bgColor: "bg-[#FF6B2C]",
    },
    {
      icon: Target,
      title: t("about.values.innovation.title", "Innovation"),
      description: t(
        "about.values.innovation.description",
        "Des méthodes pédagogiques modernes et des outils technologiques au service de l'apprentissage."
      ),
      color: "text-white",
      bgColor: "bg-[#2E5BFF]",
    },
  ];

  const stats = [
    {
      value: "5+",
      label: t("about.stats.experience", "Années d'expérience"),
    },
    {
      value: "95%",
      label: t("about.stats.satisfaction", "Satisfaction des parents"),
    },
    {
      value: "100%",
      label: t("about.stats.success", "Taux de réussite"),
    },
  ];

  return (
    <div className="min-h-screen bg-[#2E5BFF] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E5BFF] to-[#1A3BCC]" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative">
        {/* Header */}
        <div className="container mx-auto px-4 py-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-white/80 transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("about.backToHome", "Retour à l'accueil")}
          </Link>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t("about.title", "Notre Vision de l'Éducation")}
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t(
                "about.description",
                "L'École Khalilia s'engage à former les leaders de demain en combinant excellence académique, valeurs humaines et innovation pédagogique."
              )}
            </p>
          </motion.div>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-24">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-sm border-2 border-white/20 group">
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${value.bgColor} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                      <value.icon className={`w-7 h-7 ${value.color}`} />
                    </div>
                  </div>
                  <h3 className={`text-xl font-semibold mb-4 ${value.color}`}>
                    {value.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Stats section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto mb-24"
          >
            <Card className="p-12 bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-[#FF6B2C] mb-2">{stat.value}</div>
                    <div className="text-white/80">{stat.label}</div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-white mb-6">
              {t("about.cta.title", "Rejoignez Notre École")}
            </h2>
            <p className="text-white/80 mb-8">
              {t(
                "about.cta.description",
                "Découvrez comment nous pouvons accompagner votre enfant vers la réussite."
              )}
            </p>
            <Button
              size="lg"
              onClick={() => {
                navigate('/');
                setTimeout(() => {
                  const admissionForm = document.getElementById('admission-form');
                  if (admissionForm) {
                    admissionForm.scrollIntoView({ behavior: 'smooth' });
                  }
                }, 100);
              }}
              className="text-lg bg-[#FF6B2C] hover:bg-[#E55A1F] text-white border-2 border-transparent transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              {t("about.cta.button", "Commencer l'inscription")}
              <ArrowRight className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 