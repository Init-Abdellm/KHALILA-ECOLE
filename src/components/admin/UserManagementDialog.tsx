import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
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
import { UserForm } from "./UserForm";
import { ExcelImport } from "./ExcelImport";

interface UserFormData {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone: string;
  password?: string;
  tags?: string[];
}

interface UserManagementDialogProps {
  mode?: 'create' | 'edit';
  userData?: UserFormData;
  onSuccess?: () => void;
}

const DEFAULT_PASSWORD = "ChangeMe123!";

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
      tags: [],
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === 'create') {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password || DEFAULT_PASSWORD,
          options: {
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
              role: formData.role,
            },
          },
        });

        if (authError) throw authError;

        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone: formData.phone,
            tags: formData.tags,
            first_login: true,
          })
          .eq('id', authData.user?.id);

        if (profileError) throw profileError;

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
            tags: formData.tags,
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
        tags: [],
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

  const handleBulkImport = async (users: UserFormData[]) => {
    setLoading(true);
    let successCount = 0;
    let errorCount = 0;

    for (const user of users) {
      try {
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: user.email,
          password: DEFAULT_PASSWORD,
          options: {
            data: {
              first_name: user.firstName,
              last_name: user.lastName,
              role: user.role,
            },
          },
        });

        if (authError) throw authError;

        const { error: profileError } = await supabase
          .from('profiles')
          .update({
            phone: user.phone,
            tags: user.tags,
            first_login: true,
          })
          .eq('id', authData.user?.id);

        if (profileError) throw profileError;

        successCount++;
      } catch (error) {
        console.error('Error importing user:', user.email, error);
        errorCount++;
      }
    }

    toast({
      title: t('admin.users.messages.bulkImportComplete'),
      description: t('admin.users.messages.bulkImportSummary', {
        success: successCount,
        error: errorCount,
      }),
    });

    setLoading(false);
    onSuccess?.();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          {mode === 'create' ? (
            <div className="flex gap-2">
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                {t('admin.users.add')}
              </Button>
              <ExcelImport onUsersImported={handleBulkImport} />
            </div>
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
          <form onSubmit={handleSubmit}>
            <UserForm
              data={formData}
              onChange={setFormData}
              mode={mode}
            />
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