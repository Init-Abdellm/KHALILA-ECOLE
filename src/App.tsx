import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AdminDashboard from "./pages/admin/Dashboard";
import DirectorDashboard from "./pages/director/Dashboard";
import TeacherDashboard from "./pages/teacher/Dashboard";
import StudentDashboard from "./pages/student/Dashboard";
import TeacherCourses from "./pages/teacher/Courses";
import TeacherStudents from "./pages/teacher/Students";
import TeacherSchedule from "./pages/teacher/Schedule";
import TeacherGrades from "./pages/teacher/Grades";
import TeacherNotifications from "./pages/teacher/Notifications";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Director Routes */}
          <Route path="/director" element={<DirectorDashboard />} />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/courses" element={<TeacherCourses />} />
          <Route path="/teacher/students" element={<TeacherStudents />} />
          <Route path="/teacher/schedule" element={<TeacherSchedule />} />
          <Route path="/teacher/grades" element={<TeacherGrades />} />
          <Route path="/teacher/notifications" element={<TeacherNotifications />} />
          
          {/* Student Routes */}
          <Route path="/student" element={<StudentDashboard />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;