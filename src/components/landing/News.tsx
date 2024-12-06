import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

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

  const { data: initialEvents, isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(3);

      if (error) throw error;
      return data as Event[];
    },
  });

  useEffect(() => {
    if (initialEvents) {
      setEvents(initialEvents);
    }
  }, [initialEvents]);

  useEffect(() => {
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
          // Refresh the events data
          const { data, error } = await supabase
            .from("events")
            .select("*")
            .order("date", { ascending: true })
            .limit(3);

          if (!error && data) {
            setEvents(data);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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