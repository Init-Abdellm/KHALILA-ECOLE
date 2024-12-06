import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import News from "@/components/landing/News";
import SubscriptionForm from "@/components/landing/SubscriptionForm";

const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleConnectClick = () => {
    if (user) {
      navigate("/admin");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-neutral-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="h-10" />
            <span className="text-xl font-semibold text-primary">Khalilia</span>
          </div>
          <Button onClick={handleConnectClick} variant="default">
            Espace Connecté
          </Button>
        </div>
      </nav>

      <main className="pt-20">
        <Hero />
        <Features />
        <News />
        <SubscriptionForm />
      </main>

      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-sm">N° 68 Lot El Massira - Ouarzazate (M)</p>
              <p className="text-sm mt-2">Email: contact@khalilia.edu</p>
              <p className="text-sm mt-2">Tél: +212 5XX XX XX XX</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="/blog" className="hover:underline">Blog</a></li>
                <li><a href="/events" className="hover:underline">Événements</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-secondary">Facebook</a>
                <a href="#" className="hover:text-secondary">Instagram</a>
                <a href="#" className="hover:text-secondary">LinkedIn</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-primary-foreground/20 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Khalilia. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;