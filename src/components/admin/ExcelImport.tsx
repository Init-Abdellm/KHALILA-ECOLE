import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import * as XLSX from 'xlsx';
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface UserData {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  phone?: string;
}

interface ExcelImportProps {
  onUsersImported: (users: UserData[]) => void;
}

export function ExcelImport({ onUsersImported }: ExcelImportProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      const users: UserData[] = jsonData.map(row => ({
        email: row.email,
        firstName: row.firstName || row.first_name,
        lastName: row.lastName || row.last_name,
        role: row.role?.toLowerCase() || 'student',
        phone: row.phone,
      }));

      onUsersImported(users);
      toast({
        title: t('admin.users.messages.importSuccess'),
        description: t('admin.users.messages.importSuccessDetail', { count: users.length }),
      });
    } catch (error: any) {
      toast({
        title: t('admin.users.messages.importError'),
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        className="hidden"
        id="excel-upload"
      />
      <label
        htmlFor="excel-upload"
        className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
      >
        <Upload className="mr-2 h-4 w-4" />
        {t('admin.users.importExcel')}
      </label>
    </div>
  );
}