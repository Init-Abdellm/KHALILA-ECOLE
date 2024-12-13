import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Pencil, Trash2, Key } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserFormData {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  password?: string;
  confirmPassword?: string;
}

interface UserManagementDialogProps {
  mode?: 'create' | 'edit';
  userData?: UserFormData;
  onSuccess?: () => void;
}

export function UserManagementDialog({ mode = 'create', userData, onSuccess }: UserManagementDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState<UserFormData>(
    userData || {
      email: "",
      firstName: "",
      lastName: "",
      role: "",
      phone: "",
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password || "tempPassword123!",
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              role: formData.role,
            },
          },
        });

        if (authError) throw authError;

        toast({
          title: t('admin.users.messages.createSuccess'),
        });
      } else {
        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role,
            phone: formData.phone,
          })
          .eq('id', formData.id);

        if (updateError) throw updateError;

        if (formData.password) {
          const { error: passwordError } = await supabase.auth.admin.updateUserById(
            formData.id!,
            { password: formData.password }
          );

          if (passwordError) throw passwordError;
        }

        toast({
          title: t('admin.users.messages.updateSuccess'),
        });
      }

      setIsOpen(false);
      onSuccess?.();
      
      setFormData({
        email: "",
        firstName: "",
        lastName: "",
        role: "",
        phone: "",
      });
    } catch (error: any) {
      toast({
        title: t('admin.users.messages.error'),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userData?.id);

      if (error) throw error;

      toast({
        title: t('admin.users.messages.deleteSuccess'),
      });

      setShowDeleteDialog(false);
      setIsOpen(false);
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: t('admin.users.messages.error'),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {mode === 'create' ? (
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              {t('admin.users.add')}
            </Button>
          ) : (
            <Button variant="ghost" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? t('admin.users.add') : t('admin.users.edit')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              {mode === 'create' && (
                <div>
                  <Label htmlFor="email">{t('admin.users.form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required={mode === 'create'}
                  />
                </div>
              )}
              <div>
                <Label htmlFor="firstName">{t('admin.users.form.firstName')}</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">{t('admin.users.form.lastName')}</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="role">{t('admin.users.form.role')}</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('admin.users.form.role')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="director">Director</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="phone">{t('admin.users.form.phone')}</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              {mode === 'edit' && (
                <div>
                  <Label htmlFor="password">{t('admin.users.form.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              )}
            </div>
            <DialogFooter className="sm:justify-between">
              {mode === 'edit' && (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  {t('admin.users.delete')}
                </Button>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? t('loading') : mode === 'create' ? t('admin.users.add') : t('admin.users.edit')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('admin.users.delete')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.users.deleteConfirm')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t('cancel')}</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              {t('admin.users.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}