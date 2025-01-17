import { useEffect, useState } from "react";
import { account } from "@/integrations/appwrite/client";
import { Models } from "appwrite";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

export interface Profile {
  id: string;
  firstName: string | null;
  lastName: string | null;
  role: string | null;
  createdAt: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check current session
    const checkSession = async () => {
      try {
        const currentUser = await account.get();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  return { user, loading };
};

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    // Get profile from user preferences
    const profile: Profile = {
      id: user.$id,
      firstName: user.prefs?.firstName || null,
      lastName: user.prefs?.lastName || null,
      role: user.prefs?.role || null,
      createdAt: user.$createdAt,
    };

    setProfile(profile);
    setLoading(false);
  }, [user]);

  return { profile, loading };
};

export const getRoleLabel = (role: string | null): string => {
  switch (role) {
    case 'admin':
      return 'Administration';
    case 'director':
      return 'Direction';
    case 'teacher':
      return 'Professeur';
    case 'student':
      return 'Étudiant';
    default:
      return '';
  }
};