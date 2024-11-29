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
    <section className="py-16 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Actualités et Événements</h2>
        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {news.map((item, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.date}</p>
                  </div>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default News;