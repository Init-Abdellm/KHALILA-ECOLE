import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { databases, client } from "@/lib/appwrite";
import { Query } from "appwrite";
import { Card } from "@/components/ui/card";
import { CalendarDays, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

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

  const { data: initialEvents, isLoading, error } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      try {
        const response = await databases.listDocuments(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          'events',
          [Query.orderAsc('date'), Query.limit(3)]
        );
        return response.documents as Event[];
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
    const unsubscribe = client.subscribe(
      `databases.${import.meta.env.VITE_APPWRITE_DATABASE_ID}.collections.events.documents`,
      (response) => {
        try {
          databases.listDocuments(
            import.meta.env.VITE_APPWRITE_DATABASE_ID,
            'events',
            [Query.orderAsc('date'), Query.limit(3)]
          ).then(response => {
            setEvents(response.documents as Event[]);
          });
        } catch (err) {
          console.error("Failed to refresh events:", err);
          toast({
            title: "Error",
            description: "Failed to refresh events. Please try again later.",
            variant: "destructive",
          });
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [toast]);

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
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Événements à venir</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Restez informé des prochains événements et activités de notre établissement.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            [...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </Card>
            ))
          ) : (
            events.map((event, index) => (
              <motion.div
                key={event.$id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold mb-4">{event.title}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <CalendarDays className="w-5 h-5 mr-2 text-primary" />
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
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  <div className="flex items-center text-gray-500">
                    <MapPin className="w-5 h-5 mr-2 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default News;