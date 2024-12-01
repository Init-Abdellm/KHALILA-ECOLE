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
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  parentName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  parentEmail: z.string().email("Email invalide"),
  parentPhone: z.string().min(8, "Numéro de téléphone invalide"),
  childName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  childAge: z.string().refine((val) => !Number.isNaN(parseInt(val)) && parseInt(val) > 0, {
    message: "L'âge doit être un nombre positif",
  }),
  currentSchool: z.string().optional(),
  message: z.string().optional(),
});

const SubscriptionForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      parentEmail: "",
      parentPhone: "",
      childName: "",
      childAge: "",
      currentSchool: "",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const { error } = await supabase.from('subscription_forms').insert([{
        parent_name: values.parentName,
        parent_email: values.parentEmail,
        parent_phone: values.parentPhone,
        child_name: values.childName,
        child_age: parseInt(values.childAge),
        current_school: values.currentSchool || null,
        message: values.message || null,
      }]);

      if (error) throw error;

      toast({
        title: "Formulaire envoyé",
        description: "Nous vous contacterons bientôt.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du formulaire.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="parentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du parent</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom complet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentEmail"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="parentPhone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input placeholder="Votre numéro de téléphone" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="childName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom de l'enfant</FormLabel>
                <FormControl>
                  <Input placeholder="Nom complet de l'enfant" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="childAge"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Âge de l'enfant</FormLabel>
                <FormControl>
                  <Input placeholder="Âge" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentSchool"
            render={({ field }) => (
              <FormItem>
                <FormLabel>École actuelle (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="École actuelle" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message (optionnel)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Informations supplémentaires..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Envoyer la demande d'inscription
        </Button>
      </form>
    </Form>
  );
};

export default SubscriptionForm;