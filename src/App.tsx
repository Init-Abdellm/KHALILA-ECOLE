import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminUsers from "./pages/admin/Users";
import AdminSettings from "./pages/admin/Settings";
import AdminNotifications from "./pages/admin/Notifications";
import DirectorDashboard from "./pages/director/Dashboard";
import DirectorClasses from "./pages/director/Classes";
import TeacherDashboard from "./pages/teacher/Dashboard";
import TeacherCourses from "./pages/teacher/Courses";
import TeacherStudents from "./pages/teacher/Students";
import TeacherSchedule from "./pages/teacher/Schedule";
import TeacherGrades from "./pages/teacher/Grades";
import TeacherNotifications from "./pages/teacher/Notifications";
import StudentDashboard from "./pages/student/Dashboard";
import StudentCourses from "./pages/student/Courses";
import StudentSchedule from "./pages/student/Schedule";
import StudentGrades from "./pages/student/Grades";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children, allowedRoles = [] }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />
          <Route path="/admin/notifications" element={<ProtectedRoute allowedRoles={['admin']}><AdminNotifications /></ProtectedRoute>} />
          
          {/* Director Routes */}
          <Route path="/director" element={<ProtectedRoute allowedRoles={['director']}><DirectorDashboard /></ProtectedRoute>} />
          <Route path="/director/classes" element={<ProtectedRoute allowedRoles={['director']}><DirectorClasses /></ProtectedRoute>} />
          
          {/* Teacher Routes */}
          <Route path="/teacher" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherDashboard /></ProtectedRoute>} />
          <Route path="/teacher/courses" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherCourses /></ProtectedRoute>} />
          <Route path="/teacher/students" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherStudents /></ProtectedRoute>} />
          <Route path="/teacher/schedule" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherSchedule /></ProtectedRoute>} />
          <Route path="/teacher/grades" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherGrades /></ProtectedRoute>} />
          <Route path="/teacher/notifications" element={<ProtectedRoute allowedRoles={['teacher']}><TeacherNotifications /></ProtectedRoute>} />
          
          {/* Student Routes */}
          <Route path="/student" element={<ProtectedRoute allowedRoles={['student']}><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/courses" element={<ProtectedRoute allowedRoles={['student']}><StudentCourses /></ProtectedRoute>} />
          <Route path="/student/schedule" element={<ProtectedRoute allowedRoles={['student']}><StudentSchedule /></ProtectedRoute>} />
          <Route path="/student/grades" element={<ProtectedRoute allowedRoles={['student']}><StudentGrades /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;