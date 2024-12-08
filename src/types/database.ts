import { Database } from "@/integrations/supabase/types";

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Class = Database['public']['Tables']['classes']['Row'];
export type Course = Database['public']['Tables']['courses']['Row'];
export type Grade = Database['public']['Tables']['grades']['Row'];
export type Event = Database['public']['Tables']['events']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];
export type Blog = Database['public']['Tables']['blogs']['Row'];
export type SubscriptionForm = Database['public']['Tables']['subscription_forms']['Row'];