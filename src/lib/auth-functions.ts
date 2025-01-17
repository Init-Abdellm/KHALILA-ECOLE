import { account } from "@/integrations/appwrite/client";
import { ID } from "appwrite";

export const signIn = async (email: string, password: string) => {
  try {
    const session = await account.createEmailSession(email, password);
    return { session, error: null };
  } catch (error) {
    return { session: null, error };
  }
};

export const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      firstName + ' ' + lastName
    );

    // Set user preferences
    await account.updatePrefs({
      role: 'student',
      firstName,
      lastName
    });

    await signIn(email, password);
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const signOut = async () => {
  try {
    await account.deleteSession('current');
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return { user, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const updatePassword = async (password: string) => {
  try {
    await account.updatePassword(password);
    return { error: null };
  } catch (error) {
    return { error };
  }
}; 