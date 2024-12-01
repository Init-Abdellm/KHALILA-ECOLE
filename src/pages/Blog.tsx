import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const Blog = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select(`
          *,
          profiles:author_id (
            first_name,
            last_name
          )
        `)
        .order("published_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
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
          <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>{blog.title}</CardTitle>
              <p className="text-sm text-gray-500">
                Par {blog.profiles?.first_name} {blog.profiles?.last_name} • 
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