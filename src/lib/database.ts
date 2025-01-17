import { databases } from "@/integrations/appwrite/client";
import { ID, Query } from "appwrite";
import {
  Profile,
  Class,
  Course,
  Grade,
  StudentClass,
  Notification,
  Event,
  TimetableTemplate,
  TimetableEntry,
  SubscriptionForm
} from "@/types/database";

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;

export const db = {
  // Profiles
  async getProfile(userId: string) {
    try {
      const data = await databases.listDocuments<Profile>(
        DATABASE_ID,
        'profiles',
        [Query.equal('user_id', userId)]
      );
      return { data: data.documents[0], error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  getProfiles: async (queries: string[] = []) => {
    try {
      const data = await databases.listDocuments(
        DATABASE_ID,
        'profiles',
        queries
      );
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Classes
  async getClasses() {
    try {
      const data = await databases.listDocuments<Class>(DATABASE_ID, 'classes');
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getClassById(classId: string) {
    try {
      const data = await databases.getDocument<Class>(DATABASE_ID, 'classes', classId);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Courses
  async getCourses(filters?: any[]) {
    try {
      const data = await databases.listDocuments<Course>(
        DATABASE_ID,
        'courses',
        filters || []
      );
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getCourseById(courseId: string) {
    try {
      const data = await databases.getDocument<Course>(DATABASE_ID, 'courses', courseId);
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Grades
  async getGrades(filters?: any[]) {
    try {
      const data = await databases.listDocuments<Grade>(
        DATABASE_ID,
        'grades',
        filters || []
      );
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createGrade(gradeData: Omit<Grade, keyof typeof ID>) {
    try {
      const data = await databases.createDocument<Grade>(
        DATABASE_ID,
        'grades',
        ID.unique(),
        gradeData
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Students Classes
  getStudentClasses: async (studentIdOrQueries: string | string[] = []) => {
    try {
      const queries = typeof studentIdOrQueries === 'string'
        ? [Query.equal('student_id', studentIdOrQueries)]
        : studentIdOrQueries;

      const data = await databases.listDocuments(
        DATABASE_ID,
        'students_classes',
        queries
      );
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Notifications
  async getNotifications(userId: string) {
    try {
      const data = await databases.listDocuments<Notification>(
        DATABASE_ID,
        'notifications',
        [Query.equal('user_id', userId)]
      );
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createNotification(notificationData: Omit<Notification, keyof typeof ID>) {
    try {
      const data = await databases.createDocument<Notification>(
        DATABASE_ID,
        'notifications',
        ID.unique(),
        notificationData
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Events
  async getEvents() {
    try {
      const data = await databases.listDocuments<Event>(DATABASE_ID, 'events');
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async createEvent(eventData: Omit<Event, keyof typeof ID>) {
    try {
      const data = await databases.createDocument<Event>(
        DATABASE_ID,
        'events',
        ID.unique(),
        eventData
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Timetable
  async getTimetableTemplates() {
    try {
      const data = await databases.listDocuments<TimetableTemplate>(DATABASE_ID, 'timetable_templates');
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getTimetableEntries(templateId: string) {
    try {
      const data = await databases.listDocuments<TimetableEntry>(
        DATABASE_ID,
        'timetable_entries',
        [Query.equal('template_id', templateId)]
      );
      return { data: data.documents, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Subscription Forms
  async createSubscriptionForm(formData: Omit<SubscriptionForm, keyof typeof ID>) {
    try {
      const data = await databases.createDocument<SubscriptionForm>(
        DATABASE_ID,
        'subscription_forms',
        ID.unique(),
        {
          ...formData,
          status: 'pending'
        }
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  async getBlogs(queries: string[] = []) {
    try {
      const { documents } = await databases.listDocuments(
        DATABASE_ID,
        'blogs',
        queries
      );
      return { data: documents, error: null };
    } catch (error) {
      console.error('Error getting blogs:', error);
      return { data: null, error };
    }
  },

  async createCourse(courseData: Omit<Course, keyof typeof ID>) {
    try {
      const data = await databases.createDocument<Course>(
        DATABASE_ID,
        'courses',
        ID.unique(),
        courseData
      );
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
}; 