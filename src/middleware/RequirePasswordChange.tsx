import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
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

interface Profile {
  first_login: boolean;
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
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/login');
      return;
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('first_login')
      .eq('id', session.user.id)
      .single();

    setNeedsPasswordChange(profile?.first_login ?? false);
    setLoading(false);
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
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ first_login: false })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (updateError) throw updateError;

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