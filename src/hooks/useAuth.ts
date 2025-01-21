import { useState, useEffect } from 'react';
import { account, checkSession } from '../integrations/appwrite/client';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initAuth = async () => {
            try {
                const isValid = await checkSession();
                setIsAuthenticated(isValid);
            } catch (error) {
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await account.createEmailSession(email, password);
            setIsAuthenticated(true);
            return { success: true };
        } catch (error) {
            return { success: false, error };
        }
    };

    const logout = async () => {
        try {
            await account.deleteSession('current');
            setIsAuthenticated(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return {
        isAuthenticated,
        isLoading,
        login,
        logout
    };
}; 