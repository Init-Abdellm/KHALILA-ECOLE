import { Models } from 'appwrite';

export interface AppwriteDocument extends Models.Document {
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  $collectionId: string;
  $databaseId: string;
}

export interface Profile extends AppwriteDocument {
  user_id: string;
  first_name: string;
  last_name: string;
  role: string;
  email: string;
  first_login: boolean;
}

export interface Class extends AppwriteDocument {
  name: string;
  teacher_id: string;
}

export interface Course extends AppwriteDocument {
  name: string;
  description?: string;
  class_id: string;
  teacher_id: string;
  schedule?: string;
}

export interface Grade extends AppwriteDocument {
  student_id: string;
  course_id: string;
  grade: number;
  comment?: string;
}

export interface StudentClass extends AppwriteDocument {
  student_id: string;
  class_id: string;
}

export interface Notification extends AppwriteDocument {
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
}

export interface Event extends AppwriteDocument {
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
}

export interface TimetableTemplate extends AppwriteDocument {
  name: string;
  description?: string;
}

export interface TimetableEntry extends AppwriteDocument {
  template_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  course_id: string;
}

export interface SubscriptionForm extends AppwriteDocument {
  student_name: string;
  parent_name: string;
  email: string;
  phone: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
}