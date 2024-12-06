import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Calendar, Users, BookOpen } from "lucide-react";

interface Blog {
  id: string;
  title: string;
  content: string;
  published_at: string;
}

const Features = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

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
          // Refresh the blogs data
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

  const features = [
    {
      icon: Calendar,
      title: "Emploi du temps flexible",
      description:
        "Des horaires adaptés aux besoins de chaque élève pour un apprentissage optimal.",
    },
    {
      icon: Users,
      title: "Classes à effectif réduit",
      description:
        "Un environnement propice à l'apprentissage avec une attention personnalisée.",
    },
    {
      icon: BookOpen,
      title: "Programme personnalisé",
      description:
        "Un enseignement adapté au niveau et aux objectifs de chaque élève.",
    },
  ];

  if (isLoading) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Notre Approche Pédagogique
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {features.map((feature, index) => (
              <Card key={index} className="p-6">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Notre Approche Pédagogique
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Card key={blog.id} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p className="text-gray-600 line-clamp-3">{blog.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(blog.published_at).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;