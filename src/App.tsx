import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Blog from "@/pages/Blog";
import Events from "@/pages/Events";

// Admin routes
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminUsers from "@/pages/admin/Users";
import AdminStats from "@/pages/admin/Stats";
import AdminSettings from "@/pages/admin/Settings";
import AdminNotifications from "@/pages/admin/Notifications";

// Director routes
import DirectorDashboard from "@/pages/director/Dashboard";
import DirectorTeachers from "@/pages/director/Teachers";
import DirectorClasses from "@/pages/director/Classes";
import DirectorReports from "@/pages/director/Reports";
import DirectorNotifications from "@/pages/director/Notifications";

// Teacher routes
import TeacherDashboard from "@/pages/teacher/Dashboard";
import TeacherCourses from "@/pages/teacher/Courses";
import TeacherStudents from "@/pages/teacher/Students";
import TeacherSchedule from "@/pages/teacher/Schedule";
import TeacherGrades from "@/pages/teacher/Grades";
import TeacherNotifications from "@/pages/teacher/Notifications";

// Student routes
import StudentDashboard from "@/pages/student/Dashboard";
import StudentCourses from "@/pages/student/Courses";
import StudentSchedule from "@/pages/student/Schedule";
import StudentGrades from "@/pages/student/Grades";
import StudentNotifications from "@/pages/student/Notifications";

import { useProfile } from "@/lib/auth";
import { useEffect } from "react";

function App() {
  const { profile } = useProfile();

  useEffect(() => {
    if (profile?.role === "admin") {
      console.info("Admin access granted to all routes");
    }
  }, [profile?.role]);

  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/events" element={<Events />} />

        {/* Admin routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/stats" element={<AdminStats />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/notifications" element={<AdminNotifications />} />

        {/* Director routes */}
        <Route path="/director" element={<DirectorDashboard />} />
        <Route path="/director/teachers" element={<DirectorTeachers />} />
        <Route path="/director/classes" element={<DirectorClasses />} />
        <Route path="/director/reports" element={<DirectorReports />} />
        <Route path="/director/notifications" element={<DirectorNotifications />} />

        {/* Teacher routes */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/courses" element={<TeacherCourses />} />
        <Route path="/teacher/students" element={<TeacherStudents />} />
        <Route path="/teacher/schedule" element={<TeacherSchedule />} />
        <Route path="/teacher/grades" element={<TeacherGrades />} />
        <Route path="/teacher/notifications" element={<TeacherNotifications />} />

        {/* Student routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/courses" element={<StudentCourses />} />
        <Route path="/student/schedule" element={<StudentSchedule />} />
        <Route path="/student/grades" element={<StudentGrades />} />
        <Route path="/student/notifications" element={<StudentNotifications />} />
      </Routes>
    </Router>
  );
}

export default App;