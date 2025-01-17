import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast";
import { db } from "@/lib/database";
import { Query } from "appwrite";

interface BlogPost {
  $id: string;
  title: string;
  content: string;
  $createdAt: string;
  author_id: string;
  author?: {
    first_name: string;
    last_name: string;
  };
}

const Blog = () => {
  const { data: blogs, isLoading, error } = useQuery<BlogPost[]>({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await db.getBlogs();
      if (error) throw error;

      // Get authors for these blogs
      const authorIds = [...new Set(data?.map(blog => blog.author_id) || [])];
      const authorsData = await Promise.all(
        authorIds.map(id => db.getProfile(id.toString()))
      );
      const authorsMap = new Map(
        authorsData
          .filter(({ data }) => data)
          .map(({ data }) => [data.user_id, data])
      );

      // Combine blog and author data
      return (data || []).map(blog => ({
        ...blog,
        author: authorsMap.get(blog.author_id)
      }));
    },
  });

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
            key={blog.$id} 
            className="overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <CardHeader>
              <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
              <p className="text-sm text-gray-500">
                {blog.author?.first_name && blog.author?.last_name 
                  ? `Par ${blog.author.first_name} ${blog.author.last_name} • `
                  : ''
                }
                {format(new Date(blog.$createdAt), "d MMMM yyyy", { locale: fr })}
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