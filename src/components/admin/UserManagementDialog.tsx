import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { account, databases } from "@/lib/appwrite";
import { UserPlus, Pencil, Trash2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ID, Query } from "appwrite";
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
        // Create user account
        const user = await account.create(
          ID.unique(),
          formData.email,
          formData.password || DEFAULT_PASSWORD,
          formData.firstName + ' ' + formData.lastName
        );

        // Create user profile
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          'profiles',
          ID.unique(),
          {
            user_id: user.$id,
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role,
            phone: formData.phone,
            tags: formData.tags,
            first_login: true,
          }
        );

        toast({
          title: t('admin.users.messages.createSuccess'),
        });
      } else {
        // Update user profile
        await databases.updateDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          'profiles',
          formData.id!,
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: formData.role,
            phone: formData.phone,
            tags: formData.tags,
          }
        );

        if (formData.password) {
          // Update password if provided
          await account.updatePassword(formData.password);
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
      await databases.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
        'profiles',
        userData?.id!
      );

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
        // Create user account
        const createdUser = await account.create(
          ID.unique(),
          user.email,
          DEFAULT_PASSWORD,
          user.firstName + ' ' + user.lastName
        );

        // Create user profile
        await databases.createDocument(
          process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
          'profiles',
          ID.unique(),
          {
            user_id: createdUser.$id,
            first_name: user.firstName,
            last_name: user.lastName,
            role: user.role,
            phone: user.phone,
            tags: user.tags,
            first_login: true,
          }
        );

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