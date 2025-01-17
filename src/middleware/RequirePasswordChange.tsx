import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { account, databases } from '@/integrations/appwrite/client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useTranslation } from "react-i18next";

interface RequirePasswordChangeProps {
  children: React.ReactNode;
}

export function RequirePasswordChange({ children }: RequirePasswordChangeProps) {
  const [loading, setLoading] = useState(true);
  const [needsPasswordChange, setNeedsPasswordChange] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    checkPasswordChangeRequired();
  }, []);

  const checkPasswordChangeRequired = async () => {
    try {
      const user = await account.get();
      if (!user) {
        navigate('/login');
        return;
      }

      // Check if first_login is true in user preferences
      const firstLogin = user.prefs?.first_login ?? false;
      setNeedsPasswordChange(firstLogin);
    } catch (error) {
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: t('error'),
        description: t('passwords.doNotMatch'),
        variant: "destructive",
      });
      return;
    }

    try {
      // Update password
      await account.updatePassword(password);

      // Update user preferences to set first_login to false
      await account.updatePrefs({
        first_login: false
      });

      setNeedsPasswordChange(false);
      toast({
        title: t('success'),
        description: t('passwords.changeSuccess'),
      });
    } catch (error: any) {
      toast({
        title: t('error'),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return null;
  }

  if (needsPasswordChange) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('passwords.changeRequired')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <Label htmlFor="password">{t('passwords.new')}</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">{t('passwords.confirm')}</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t('passwords.change')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    );
  }

  return <>{children}</>;
}