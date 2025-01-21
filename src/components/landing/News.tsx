import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { databases, client } from "@/lib/appwrite";
import { Query, Models } from "appwrite";
import { Card } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, BookOpen, Users } from "lucide-react";

interface Event {
  $id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

const News = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { toast } = useToast();
  const { t } = useTranslation();

  const { data: initialEvents, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const response = await databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID!,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID!,
          [Query.orderAsc('date'), Query.limit(3)]
        );
        return response.documents as unknown as Event[];
      } catch (err) {
        console.error("Error fetching events:", err);
        throw err;
      }
    },
    meta: {
      errorMessage: "Failed to load events. Please try again later.",
    },
    retry: 3,
  });

  useEffect(() => {
    if (initialEvents) {
      setEvents(initialEvents);
    }
  }, [initialEvents]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load events. Please try again later.",
        variant: "destructive",
      });
    }
  }, [error, toast]);

  useEffect(() => {
    const unsubscribe = client.subscribe(`databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.events.documents`, (response) => {
      try {
        databases.listDocuments(
          import.meta.env.VITE_APPWRITE_DATABASE_ID!,
          import.meta.env.VITE_APPWRITE_COLLECTION_ID!,
          [Query.orderAsc('date'), Query.limit(3)]
        ).then(response => {
          setEvents(response.documents as unknown as Event[]);
        });
      } catch (error) {
        console.error('Error in realtime subscription:', error);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const announcements = [
    {
      id: 1,
      icon: Calendar,
      title: t("landing.news.announcement1.title", "Rentrée Scolaire 2024"),
      description: t(
        "landing.news.announcement1.description",
        "Préparez sereinement la rentrée ! Découvrez le calendrier, les fournitures nécessaires et nos conseils pour bien débuter l'année."
      ),
      link: "/rentree-2024",
      category: t("landing.news.categories.info", "Information"),
      color: "text-[#FF6B2C]",
      bgColor: "bg-[#FF6B2C]",
    },
    {
      id: 2,
      icon: BookOpen,
      title: t("landing.news.announcement2.title", "Activités Parascolaires"),
      description: t(
        "landing.news.announcement2.description",
        "Arts, sports, sciences... Explorez notre programme d'activités enrichissantes pour l'épanouissement de votre enfant."
      ),
      link: "/activites",
      category: t("landing.news.categories.activities", "Activités"),
      color: "text-white",
      bgColor: "bg-[#2E5BFF]",
    },
    {
      id: 3,
      icon: Users,
      title: t("landing.news.announcement3.title", "Réunion Parents-Enseignants"),
      description: t(
        "landing.news.announcement3.description",
        "Rencontrez l'équipe pédagogique et échangez sur le parcours de votre enfant lors de nos réunions trimestrielles."
      ),
      link: "/reunions",
      category: t("landing.news.categories.events", "Événements"),
      color: "text-[#FF6B2C]",
      bgColor: "bg-[#FF6B2C]",
    },
  ];

  if (error) {
    return (
      <div className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <Card className="p-6 text-center text-red-600">
            Une erreur est survenue lors du chargement des événements.
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-[#2E5BFF]">
      {/* Section transition - top */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1A3BCC] to-transparent" />

      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E5BFF] to-[#1A3BCC]" />
      <div className="absolute inset-0">
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
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
              {t("landing.news.title", "Actualités de l'École")}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t(
                "landing.news.subtitle",
                "Suivez la vie de notre école et restez informé des événements importants"
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {announcements.map((announcement, index) => (
              <motion.div
                key={announcement.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-8 h-full hover:shadow-xl transition-all duration-300 bg-white/10 backdrop-blur-sm border-2 border-white/20 group">
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl ${announcement.bgColor} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
                      <announcement.icon className={`w-7 h-7 ${announcement.color}`} />
                    </div>
                  </div>
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-sm font-medium ${announcement.color} ${announcement.bgColor} bg-opacity-10 rounded-full`}>
                      {announcement.category}
                    </span>
                  </div>
                  <h3 className={`text-xl font-semibold mb-3 ${announcement.color} group-hover:opacity-80 transition-opacity duration-300`}>
                    {announcement.title}
                  </h3>
                  <p className="text-white/80 mb-6 flex-grow">
                    {announcement.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className={`w-full mt-auto border-2 ${announcement.color} hover:bg-white/5 transition-all duration-300`}
                  >
                    <Link to={announcement.link}>
                      {t("landing.news.readMore", "En savoir plus")}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Button
              asChild
              size="lg"
              className="text-lg bg-[#FF6B2C] hover:bg-[#E55A1F] text-white transition-all duration-300 shadow-lg shadow-orange-500/20"
            >
              <Link to="/actualites">
                {t("landing.news.viewAll", "Toutes nos actualités")}
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Section transition - bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1A3BCC] to-transparent" />
    </div>
  );
};

export default News;