import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import News from "@/components/landing/News";
import SubscriptionForm from "@/components/landing/SubscriptionForm";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  published_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

const Landing = () => {
  const [latestBlogs, setLatestBlogs] = useState<BlogPost[]>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);

  const { data: blogs, isLoading: blogsLoading } = useQuery({
    queryKey: ["landing-blogs"],
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
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      return data as BlogPost[];
    },
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["landing-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .gte("date", new Date().toISOString().split("T")[0])
        .order("date", { ascending: true })
        .limit(3);

      if (error) throw error;
      return data as Event[];
    },
  });

  useEffect(() => {
    if (blogs) setLatestBlogs(blogs);
    if (events) setUpcomingEvents(events);

    // Subscribe to real-time changes
    const blogsChannel = supabase
      .channel("blogs-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "blogs",
        },
        async () => {
          const { data } = await supabase
            .from("blogs")
            .select(`
              *,
              profiles (
                first_name,
                last_name
              )
            `)
            .order("published_at", { ascending: false })
            .limit(3);
          
          if (data) setLatestBlogs(data as BlogPost[]);
        }
      )
      .subscribe();

    const eventsChannel = supabase
      .channel("events-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
        },
        async () => {
          const { data } = await supabase
            .from("events")
            .select("*")
            .gte("date", new Date().toISOString().split("T")[0])
            .order("date", { ascending: true })
            .limit(3);
          
          if (data) setUpcomingEvents(data as Event[]);
        }
      )
      .subscribe();

    return () => {
      blogsChannel.unsubscribe();
      eventsChannel.unsubscribe();
    };
  }, [blogs, events]);

  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <News blogs={latestBlogs} events={upcomingEvents} isLoading={blogsLoading || eventsLoading} />
      <SubscriptionForm />
    </div>
  );
};

export default Landing;