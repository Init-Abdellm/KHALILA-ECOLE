import { Client, Databases, ID } from 'node-appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint(process.env.VITE_APPWRITE_ENDPOINT || '')
    .setProject(process.env.VITE_APPWRITE_PROJECT_ID || '')
    .setKey(process.env.VITE_APPWRITE_API_KEY || '');

const databases = new Databases(client);

async function createDatabase() {
    try {
        const database = await databases.create(
            ID.unique(),
            'school_management'
        );
        return database;
    } catch (error) {
        console.error('Error creating database:', error);
        throw error;
    }
}

async function createCollections(databaseId: string) {
    try {
        // Profiles Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'profiles',
            [
                { key: 'user_id', type: 'string', required: true, array: false },
                { key: 'first_name', type: 'string', required: true, array: false },
                { key: 'last_name', type: 'string', required: true, array: false },
                { key: 'role', type: 'string', required: true, array: false },
                { key: 'email', type: 'string', required: true, array: false },
                { key: 'first_login', type: 'boolean', required: true, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Classes Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'classes',
            [
                { key: 'name', type: 'string', required: true, array: false },
                { key: 'teacher_id', type: 'string', required: true, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Courses Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'courses',
            [
                { key: 'name', type: 'string', required: true, array: false },
                { key: 'description', type: 'string', required: false, array: false },
                { key: 'class_id', type: 'string', required: true, array: false },
                { key: 'teacher_id', type: 'string', required: true, array: false },
                { key: 'schedule', type: 'string', required: false, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Grades Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'grades',
            [
                { key: 'student_id', type: 'string', required: true, array: false },
                { key: 'course_id', type: 'string', required: true, array: false },
                { key: 'grade', type: 'number', required: true, array: false },
                { key: 'comment', type: 'string', required: false, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Students Classes Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'students_classes',
            [
                { key: 'student_id', type: 'string', required: true, array: false },
                { key: 'class_id', type: 'string', required: true, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Notifications Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'notifications',
            [
                { key: 'user_id', type: 'string', required: true, array: false },
                { key: 'title', type: 'string', required: true, array: false },
                { key: 'message', type: 'string', required: true, array: false },
                { key: 'type', type: 'string', required: true, array: false },
                { key: 'read', type: 'boolean', required: true, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Events Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'events',
            [
                { key: 'title', type: 'string', required: true, array: false },
                { key: 'description', type: 'string', required: false, array: false },
                { key: 'start_date', type: 'datetime', required: true, array: false },
                { key: 'end_date', type: 'datetime', required: true, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Timetable Templates Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'timetable_templates',
            [
                { key: 'name', type: 'string', required: true, array: false },
                { key: 'description', type: 'string', required: false, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Timetable Entries Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'timetable_entries',
            [
                { key: 'template_id', type: 'string', required: true, array: false },
                { key: 'day_of_week', type: 'integer', required: true, array: false },
                { key: 'start_time', type: 'string', required: true, array: false },
                { key: 'end_time', type: 'string', required: true, array: false },
                { key: 'course_id', type: 'string', required: true, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        // Subscription Forms Collection
        await databases.createCollection(
            databaseId,
            ID.unique(),
            'subscription_forms',
            [
                { key: 'student_name', type: 'string', required: true, array: false },
                { key: 'parent_name', type: 'string', required: true, array: false },
                { key: 'email', type: 'string', required: true, array: false },
                { key: 'phone', type: 'string', required: true, array: false },
                { key: 'message', type: 'string', required: false, array: false },
                { key: 'status', type: 'string', required: true, array: false },
                { key: 'created_at', type: 'datetime', required: true, array: false }
            ]
        );

        console.log('All collections created successfully');
    } catch (error) {
        console.error('Error creating collections:', error);
        throw error;
    }
}

async function main() {
    try {
        const database = await createDatabase();
        await createCollections(database.$id);
        console.log('Database and collections setup completed successfully');
    } catch (error) {
        console.error('Setup failed:', error);
    }
}

main(); 