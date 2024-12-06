import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  location: string;
}

const News = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const { data: initialEvents, isLoading } = useQuery({
    queryKey: ["landing-events"],
    queryFn: async () => {
      console.log("Fetching events...");
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("date", { ascending: true })
        .limit(3);

      if (error) {
        console.error("Error fetching events:", error);
        throw error;
      }
      
      console.log("Fetched events:", data);
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
      .channel('events-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'events',
        },
        async (payload) => {
          console.log('Real-time event update:', payload);
          // Refresh the events list
          const { data } = await supabase
            .from("events")
            .select("*")
            .order("date", { ascending: true })
            .limit(3);
          
          if (data) {
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
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-primary mb-4">Actualités et Événements</h2>
            <div className="w-24 h-1 bg-secondary mx-auto"></div>
          </div>
          <div className="animate-pulse space-y-4">
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Actualités et Événements</h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {events.map((event) => (
              <CarouselItem key={event.id}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
                      alt={event.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-semibold mb-2 text-primary-dark group-hover:text-secondary transition-colors duration-300">
                      {event.title}
                    </h3>
                    <p className="text-neutral-500">
                      {new Date(event.date).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="bg-primary text-white hover:bg-primary-dark" />
          <CarouselNext className="bg-primary text-white hover:bg-primary-dark" />
        </Carousel>
      </div>
    </section>
  );
};

export default News;