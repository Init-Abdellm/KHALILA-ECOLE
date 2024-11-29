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
    // Here you would typically send the data to your backend
    console.log(values);
    toast({
      title: "Formulaire envoyé",
      description: "Nous vous contacterons bientôt.",
    });
    form.reset();
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