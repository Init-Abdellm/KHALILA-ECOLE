import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Calendar, Users, BookOpen, Award, Target, ChartBar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

interface Blog {
  id: string;
  title: string;
  content: string;
  published_at: string;
}

const Features = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const { t } = useTranslation();

  const features = [
    {
      icon: Calendar,
      title: t('landing.features.schedule.title'),
      description: t('landing.features.schedule.description'),
      color: 'text-blue-500',
    },
    {
      icon: Users,
      title: t('landing.features.classes.title'),
      description: t('landing.features.classes.description'),
      color: 'text-green-500',
    },
    {
      icon: BookOpen,
      title: t('landing.features.program.title'),
      description: t('landing.features.program.description'),
      color: 'text-purple-500',
    },
    {
      icon: Award,
      title: "Excellence Académique",
      description: "Un programme d'études rigoureux visant l'excellence et la réussite de chaque élève.",
      color: 'text-yellow-500',
    },
    {
      icon: Target,
      title: "Suivi Personnalisé",
      description: "Un accompagnement individualisé pour garantir le progrès de chaque élève.",
      color: 'text-red-500',
    },
    {
      icon: ChartBar,
      title: "Évaluation Continue",
      description: "Un système d'évaluation moderne permettant un suivi précis des progrès.",
      color: 'text-indigo-500',
    },
  ];

  const { data: initialBlogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as Blog[];
    },
  });

  useEffect(() => {
    if (initialBlogs) {
      setBlogs(initialBlogs);
    }
  }, [initialBlogs]);

  useEffect(() => {
    const channel = supabase
      .channel("blogs-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blogs",
        },
        async (payload) => {
          console.log("Real-time blog update:", payload);
          const { data, error } = await supabase
            .from("blogs")
            .select("*")
            .order("published_at", { ascending: false })
            .limit(3);

          if (!error && data) {
            setBlogs(data);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="py-24 bg-gradient-to-b from-background to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">
            {t('landing.features.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les atouts qui font de notre établissement un lieu d'excellence pour l'éducation de votre enfant.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                <feature.icon className={`w-12 h-12 ${feature.color} mb-4`} />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {!isLoading && blogs.length > 0 && (
          <div className="mt-16">
            <h3 className="text-2xl font-bold text-center mb-8">Dernières actualités</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <motion.div
                  key={blog.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-600 line-clamp-3">{blog.content}</p>
                    <p className="text-sm text-gray-500 mt-4">
                      {new Date(blog.published_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features;