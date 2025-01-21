import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Card } from "@/components/ui/card";
import { databases } from "@/lib/appwrite";
import { ID } from "appwrite";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Pencil } from "lucide-react";

const formSchema = z.object({
  parentName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  parentEmail: z.string().email({
    message: "Veuillez entrer une adresse email valide",
  }),
  parentPhone: z.string().min(8, {
    message: "Veuillez entrer un numéro de téléphone valide",
  }),
  childName: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  childBirthdate: z.string().min(1, {
    message: "Veuillez entrer la date de naissance",
  }),
  gradeLevel: z.string().min(1, {
    message: "Veuillez sélectionner un niveau",
  }),
  currentSchool: z.string().optional(),
  message: z.string().optional(),
});

const AdmissionForm = () => {
  const { t } = useTranslation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      childName: "",
      childBirthdate: "",
      gradeLevel: "",
      currentSchool: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID!,
        'admission_requests',
        ID.unique(),
        {
          parent_name: values.parentName,
          parent_email: values.parentEmail,
          parent_phone: values.parentPhone,
          child_name: values.childName,
          child_birthdate: values.childBirthdate,
          grade_level: values.gradeLevel,
          current_school: values.currentSchool || null,
          message: values.message || null,
          status: 'pending',
          created_at: new Date().toISOString(),
        }
      );

      toast({
        title: t("admissionForm.success.title", "Demande envoyée avec succès"),
        description: t(
          "admissionForm.success.description",
          "Notre équipe d'admission vous contactera prochainement."
        ),
      });
      form.reset();
    } catch (error) {
      toast({
        title: t("admissionForm.error.title", "Erreur"),
        description: t(
          "admissionForm.error.description",
          "Une erreur est survenue lors de l'envoi du formulaire. Veuillez réessayer."
        ),
        variant: "destructive",
      });
    }
  };

  const gradeLevels = [
    { value: "ps", label: "Petite Section" },
    { value: "ms", label: "Moyenne Section" },
    { value: "gs", label: "Grande Section" },
    { value: "cp", label: "CP" },
    { value: "ce1", label: "CE1" },
    { value: "ce2", label: "CE2" },
    { value: "cm1", label: "CM1" },
    { value: "cm2", label: "CM2" },
  ];

  return (
    <div id="admission-form" className="relative overflow-hidden bg-[#2E5BFF]">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2E5BFF] to-[#1A3BCC]" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#FF6B2C] rounded-full blur-3xl opacity-20" />
      </div>

      <div className="relative py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF6B2C] bg-opacity-20 mb-6">
              <Pencil className="w-8 h-8 text-[#FF6B2C]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t("admissionForm.title", "Demande d'Admission")}
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              {t(
                "admissionForm.subtitle",
                "Commencez le parcours scolaire de votre enfant dans un environnement d'excellence"
              )}
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 bg-white/10 backdrop-blur-sm border-2 border-white/20 shadow-xl">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="parentName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t("admissionForm.fields.parentName", "Nom du parent")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50" />
                            </FormControl>
                            <FormMessage className="text-[#FF6B2C]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="parentEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t("admissionForm.fields.email", "Email")}</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50" />
                            </FormControl>
                            <FormMessage className="text-[#FF6B2C]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="parentPhone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t("admissionForm.fields.phone", "Téléphone")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50" />
                            </FormControl>
                            <FormMessage className="text-[#FF6B2C]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="childName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t("admissionForm.fields.childName", "Nom de l'enfant")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50" />
                            </FormControl>
                            <FormMessage className="text-[#FF6B2C]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="childBirthdate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t("admissionForm.fields.birthdate", "Date de naissance")}</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50" />
                            </FormControl>
                            <FormMessage className="text-[#FF6B2C]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="gradeLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t("admissionForm.fields.gradeLevel", "Niveau souhaité")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder={t("admissionForm.fields.selectGrade", "Sélectionner un niveau")} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {gradeLevels.map((grade) => (
                                  <SelectItem key={grade.value} value={grade.value}>
                                    {grade.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-[#FF6B2C]" />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="currentSchool"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">{t("admissionForm.fields.currentSchool", "École actuelle (optionnel)")}</FormLabel>
                            <FormControl>
                              <Input {...field} className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50" />
                            </FormControl>
                            <FormMessage className="text-[#FF6B2C]" />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">{t("admissionForm.fields.message", "Message (optionnel)")}</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={t("admissionForm.fields.messagePlaceholder", "Informations complémentaires...")}
                              className="bg-white/10 border-2 border-white/20 text-white placeholder:text-white/50 resize-none h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[#FF6B2C]" />
                        </FormItem>
                      )}
                    />
                    <Button 
                      type="submit" 
                      className="w-full bg-[#FF6B2C] hover:bg-[#E55A1F] text-white text-lg py-6 shadow-lg shadow-orange-500/20 transition-all duration-300"
                    >
                      {t("admissionForm.submit", "Envoyer la demande d'admission")}
                    </Button>
                  </form>
                </Form>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionForm;