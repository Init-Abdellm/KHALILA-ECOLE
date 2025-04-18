import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Mail, Phone, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/database";
import { UserManagementDialog } from "@/components/admin/UserManagementDialog";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { Query } from "appwrite";
import { Profile } from "@/types/database";

const Users = () => {
  const { t } = useTranslation();
  const { toast } = useToast();

  const { data: users = [], isLoading, error, refetch } = useQuery<Profile[]>({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const { data, error } = await db.getProfiles([
          Query.orderDesc('$createdAt')
        ]);
        
        if (error) {
          toast({
            title: "Error",
            description: "Failed to fetch users",
            variant: "destructive",
          });
          throw error;
        }
        return data || [];
      } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
      }
    }
  });

  if (isLoading) {
    return (
      <DashboardLayout title={t('admin.users.title')} role="Administration">
        <div className="flex justify-center items-center h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout title={t('admin.users.title')} role="Administration">
        <Card className="p-6">
          <div className="text-center text-red-600">
            {t('admin.users.error')}
          </div>
        </Card>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title={t('admin.users.title')} role="Administration">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">{t('admin.users.list')}</h2>
          <UserManagementDialog onSuccess={() => refetch()} />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('admin.users.columns.name')}</TableHead>
                <TableHead>{t('admin.users.columns.role')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.users.columns.email')}</TableHead>
                <TableHead className="hidden md:table-cell">{t('admin.users.columns.phone')}</TableHead>
                <TableHead>{t('admin.users.columns.status')}</TableHead>
                <TableHead>{t('admin.users.columns.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.$id}>
                  <TableCell className="font-medium">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{user.phone || t('notSpecified')}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <UserManagementDialog
                        mode="edit"
                        userData={{
                          id: user.$id,
                          email: user.email || '',
                          firstName: user.first_name || '',
                          lastName: user.last_name || '',
                          role: user.role || '',
                          phone: user.phone || '',
                        }}
                        onSuccess={() => refetch()}
                      />
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default Users;