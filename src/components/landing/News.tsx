import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
}

const News = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { toast } = useToast();

  const { data: initialEvents, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      console.log("Fetching events...");
      try {
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .order("date", { ascending: true })
          .limit(3);

        if (error) {
          console.error("Supabase error:", error);
          throw error;
        }
        
        console.log("Fetched events:", data);
        return data as Event[];
      } catch (err) {
        console.error("Error fetching events:", err);
        throw err;
      }
    },
    onError: (err) => {
      console.error("Query error:", err);
      toast({
        title: "Error",
        description: "Failed to load events. Please try again later.",
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    if (initialEvents) {
      setEvents(initialEvents);
    }
  }, [initialEvents]);

  useEffect(() => {
    console.log("Setting up realtime subscription...");
    const channel = supabase
      .channel("events-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "events",
        },
        async (payload) => {
          console.log("Real-time event update:", payload);
          try {
            const { data, error } = await supabase
              .from("events")
              .select("*")
              .order("date", { ascending: true })
              .limit(3);

            if (error) {
              console.error("Error refreshing events:", error);
              throw error;
            }

            if (data) {
              console.log("Updated events:", data);
              setEvents(data);
            }
          } catch (err) {
            console.error("Failed to refresh events:", err);
            toast({
              title: "Error",
              description: "Failed to refresh events. Please try again later.",
              variant: "destructive",
            });
          }
        }
      )
      .subscribe();

    return () => {
      console.log("Cleaning up realtime subscription...");
      supabase.removeChannel(channel);
    };
  }, [toast]);

  if (error) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Actualités</h2>
          <Card className="p-6 text-center text-red-600">
            Une erreur est survenue lors du chargement des événements.
          </Card>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Actualités</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Actualités</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Card key={event.id} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
              <div className="flex items-center text-gray-600 mb-2">
                <CalendarDays className="w-4 h-4 mr-2" />
                <span>
                  {new Date(event.date).toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {" à "}
                  {event.time.slice(0, 5)}
                </span>
              </div>
              <p className="text-gray-600">{event.description}</p>
              <p className="text-sm text-gray-500 mt-2">
                Lieu: {event.location}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;