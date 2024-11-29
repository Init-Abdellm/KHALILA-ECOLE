import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { School, ChevronRight, Users, GraduationCap, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  const roles = [
    { title: "Administration", path: "/admin", icon: Users, description: "Gérez l'établissement et les utilisateurs" },
    { title: "Direction", path: "/director", icon: GraduationCap, description: "Supervisez les activités pédagogiques" },
    { title: "Enseignants", path: "/teacher", icon: BookOpen, description: "Gérez vos cours et vos élèves" },
    { title: "Étudiants & Parents", path: "/student", icon: School, description: "Suivez votre parcours scolaire" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-neutral-200 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-6">
              <School className="w-12 h-12 md:w-16 md:h-16 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold text-primary">Khalilia</h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
              Plateforme de gestion scolaire innovante pour une éducation moderne
            </p>
          </motion.div>

          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
            {roles.map((role, index) => (
              <motion.div
                key={role.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card 
                  className="p-6 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => navigate(role.path)}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <role.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {role.title}
                      </h3>
                      <p className="text-gray-600">{role.description}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Language Selection */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2">
          <Card className="p-2 flex space-x-2">
            <Button variant="ghost" size="sm">Français</Button>
            <Button variant="ghost" size="sm">العربية</Button>
            <Button variant="ghost" size="sm">English</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;