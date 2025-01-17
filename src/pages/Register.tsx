import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { account } from "@/integrations/appwrite/client";
import { ID } from "appwrite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create user account
      const user = await account.create(
        ID.unique(),
        email,
        password,
        firstName + ' ' + lastName
      );

      // Set user preferences (role and name details)
      await account.updatePrefs({
        role: 'student',
        firstName,
        lastName
      });

      toast({
        title: "Inscription réussie",
        description: "Votre compte a été créé avec succès. Vous pouvez maintenant vous connecter.",
      });
      
      navigate('/login');
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-primary hover:text-primary-dark transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour à l'accueil
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 shadow-lg bg-white/80 backdrop-blur-sm border-0 ring-1 ring-black/5">
            <div className="flex flex-col items-center mb-8">
              <img
                src="/logo.png"
                alt="École Khalilia"
                className="h-16 w-auto mb-4"
              />
              <h1 className="text-2xl font-bold text-primary">Inscription</h1>
              <p className="text-gray-600">Créez votre compte</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    className="bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white transition-all duration-200"
                disabled={loading}
              >
                {loading ? "Inscription..." : "S'inscrire"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              Déjà inscrit ?{" "}
              <Link to="/login" className="text-primary hover:text-primary-dark hover:underline transition-colors duration-200">
                Se connecter
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;