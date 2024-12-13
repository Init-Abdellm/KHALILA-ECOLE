export default {
  welcome: 'Welcome',
  stats: {
    totalStudents: 'Total Students',
    totalTeachers: 'Total Teachers',
    totalClasses: 'Total Classes',
    totalCourses: 'Total Courses'
  },
  recentActivity: 'Recent Activity',
  upcomingEvents: 'Upcoming Events',
  fetchError: 'Error fetching data',
  admin: {
    dashboard: {
      title: "Dashboard",
      stats: {
        totalStudents: "Total Students",
        totalTeachers: "Total Teachers",
        totalClasses: "Total Classes",
        totalCourses: "Total Courses"
      },
      recentActivity: "Recent Activity",
      upcomingEvents: "Upcoming Events",
      fetchError: "Error fetching statistics"
    },
    users: {
      title: "User Management",
      list: "User List",
      add: "Add User",
      edit: "Edit User",
      delete: "Delete User",
      deleteConfirm: "Are you sure you want to delete this user?",
      resetPassword: "Reset Password",
      columns: {
        name: "Name",
        role: "Role",
        email: "Email",
        phone: "Phone",
        status: "Status",
        actions: "Actions"
      },
      form: {
        firstName: "First Name",
        lastName: "Last Name",
        email: "Email",
        phone: "Phone",
        role: "Role",
        password: "Password",
        confirmPassword: "Confirm Password"
      },
      messages: {
        createSuccess: "User created successfully",
        updateSuccess: "User updated successfully",
        deleteSuccess: "User deleted successfully",
        error: "An error occurred"
      }
    }
  },
  director: {
    dashboard: {
      title: "Dashboard",
      stats: {
        totalStudents: "Total Students",
        totalTeachers: "Total Teachers",
        totalClasses: "Total Classes",
        totalCourses: "Total Courses"
      }
    },
    classes: {
      title: "Class Management",
      list: "Class List",
      add: "Add Class",
      edit: "Edit Class",
      delete: "Delete Class",
      columns: {
        name: "Name",
        level: "Level",
        teacher: "Teacher",
        capacity: "Capacity",
        room: "Room",
        type: "Type",
        actions: "Actions"
      }
    },
    teachers: {
      title: "Teachers",
      list: "Teacher List",
      columns: {
        name: "Name",
        email: "Email",
        phone: "Phone",
        status: "Status",
        actions: "Actions"
      }
    }
  },
  teacher: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome",
      stats: {
        totalStudents: "My Students",
        totalClasses: "My Classes",
        totalCourses: "My Courses"
      }
    },
    courses: {
      title: "My Courses",
      list: "Course List",
      add: "Add Course",
      edit: "Edit Course",
      delete: "Delete Course"
    },
    students: {
      title: "My Students",
      list: "Student List"
    }
  },
  student: {
    dashboard: {
      title: "Dashboard",
      welcome: "Welcome",
      stats: {
        courses: "My Courses",
        grades: "My Grades",
        events: "Events"
      }
    },
    courses: {
      title: "My Courses",
      list: "Course List"
    },
    grades: {
      title: "My Grades",
      list: "Grade List"
    }
  }
};