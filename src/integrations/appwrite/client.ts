import { Client, Account, Databases, Storage } from 'appwrite';

// Initialize the Appwrite client
const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

// Helper function to check and maintain session
export const checkSession = async () => {
    try {
        await account.get();
        return true;
    } catch (error) {
        return false;
    }
};

export { client }; 