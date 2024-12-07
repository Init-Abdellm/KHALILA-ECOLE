import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published_at: string;
  author_id: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const { data: initialBlogs, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blogs:", error);
        throw error;
      }

      return data as BlogPost[];
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
            .select(`
              *,
              profiles (
                first_name,
                last_name
              )
            `)
            .order("published_at", { ascending: false });

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

  if (error) {
    toast({
      title: "Erreur",
      description: "Impossible de charger les articles du blog.",
      variant: "destructive",
    });
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Notre Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-24 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Notre Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs?.map((blog) => (
          <Card 
            key={blog.id} 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              <p className="text-sm text-gray-500">
                {blog.profiles?.first_name && blog.profiles?.last_name 
                  ? `Par ${blog.profiles.first_name} ${blog.profiles.last_name} • `
                  : ''
                }
                {format(new Date(blog.published_at), "d MMMM yyyy", { locale: fr })}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">{blog.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Blog;