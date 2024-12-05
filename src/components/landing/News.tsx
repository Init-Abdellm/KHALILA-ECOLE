import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const News = () => {
  const news = [
    {
      title: "Journée Portes Ouvertes",
      date: "15 Mars 2024",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    },
    {
      title: "Concours de Sciences",
      date: "20 Mars 2024",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    },
    {
      title: "Spectacle de Fin d'Année",
      date: "30 Juin 2024",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-primary mb-4">Actualités et Événements</h2>
          <div className="w-24 h-1 bg-secondary mx-auto"></div>
        </div>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {news.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden group cursor-pointer">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-semibold mb-2 text-primary-dark group-hover:text-secondary transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500">{item.date}</p>
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