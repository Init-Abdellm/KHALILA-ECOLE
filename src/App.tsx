import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/lib/auth";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Blog from "@/pages/Blog";
import Events from "@/pages/Events";
import TeacherDashboard from "@/pages/teacher/Dashboard";
import TeacherCourses from "@/pages/teacher/Courses";
import TeacherStudents from "@/pages/teacher/Students";
import TeacherSchedule from "@/pages/teacher/Schedule";
import TeacherGrades from "@/pages/teacher/Grades";
import TeacherNotifications from "@/pages/teacher/Notifications";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminSettings from "@/pages/admin/Settings";
import DirectorDashboard from "@/pages/director/Dashboard";
import DirectorTeachers from "@/pages/director/Teachers";
import DirectorClasses from "@/pages/director/Classes";
import DirectorReports from "@/pages/director/Reports";
import StudentDashboard from "@/pages/student/Dashboard";
import StudentCourses from "@/pages/student/Courses";
import StudentSchedule from "@/pages/student/Schedule";
import StudentGrades from "@/pages/student/Grades";
import StudentNotifications from "@/pages/student/Notifications";
import { Toaster } from "@/components/ui/toaster";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Special case for admin@admin.com - allow access to all routes
  if (user.email === 'admin@admin.com') {
    console.log("Admin access granted to all routes");
    return <>{children}</>;
  }

  const userRole = user.user_metadata?.role?.toLowerCase();
  console.log("User role:", userRole);
  console.log("Allowed roles:", allowedRoles);

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.log("User role not allowed, redirecting to landing");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/events" element={<Events />} />

        {/* Teacher routes */}
        <Route
          path="/teacher"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/courses"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/students"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/schedule"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/grades"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherGrades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/teacher/notifications"
          element={
            <ProtectedRoute allowedRoles={["teacher"]}>
              <TeacherNotifications />
            </ProtectedRoute>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminSettings />
            </ProtectedRoute>
          }
        />

        {/* Director routes */}
        <Route
          path="/director"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <DirectorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/director/teachers"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <DirectorTeachers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/director/classes"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <DirectorClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/director/reports"
          element={
            <ProtectedRoute allowedRoles={["director"]}>
              <DirectorReports />
            </ProtectedRoute>
          }
        />

        {/* Student routes */}
        <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/courses"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/schedule"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentSchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/grades"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentGrades />
            </ProtectedRoute>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentNotifications />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;