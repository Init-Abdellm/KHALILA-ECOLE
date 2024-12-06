import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import News from "@/components/landing/News";
import SubscriptionForm from "@/components/landing/SubscriptionForm";

const Landing = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <News />
      <SubscriptionForm />
    </div>
  );
};

export default Landing;