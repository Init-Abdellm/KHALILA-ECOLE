// ... keep existing code (previous translations)

export default {
  welcome: 'مرحباً',
  stats: {
    totalStudents: 'إجمالي الطلاب',
    totalTeachers: 'إجمالي المعلمين',
    totalClasses: 'إجمالي الفصول',
    totalCourses: 'إجمالي الدورات'
  },
  recentActivity: 'النشاط الأخير',
  upcomingEvents: 'الأحداث القادمة',
  fetchError: 'خطأ في جلب البيانات',
  admin: {
    dashboard: {
      title: "لوحة التحكم",
      stats: {
        totalStudents: "إجمالي الطلاب",
        totalTeachers: "إجمالي المعلمين",
        totalClasses: "إجمالي الفصول",
        totalCourses: "إجمالي الدورات"
      },
      recentActivity: "النشاط الأخير",
      upcomingEvents: "الأحداث القادمة",
      fetchError: "خطأ في جلب الإحصائيات"
    },
    users: {
      title: "إدارة المستخدمين",
      list: "قائمة المستخدمين",
      add: "إضافة مستخدم",
      edit: "تعديل مستخدم",
      delete: "حذف مستخدم",
      deleteConfirm: "هل أنت متأكد من حذف هذا المستخدم؟",
      resetPassword: "إعادة تعيين كلمة المرور",
      columns: {
        name: "الاسم",
        role: "الدور",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        status: "الحالة",
        actions: "الإجراءات"
      },
      form: {
        firstName: "الاسم الأول",
        lastName: "اسم العائلة",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        role: "الدور",
        password: "كلمة المرور",
        confirmPassword: "تأكيد كلمة المرور"
      },
      messages: {
        createSuccess: "تم إنشاء المستخدم بنجاح",
        updateSuccess: "تم تحديث المستخدم بنجاح",
        deleteSuccess: "تم حذف المستخدم بنجاح",
        error: "حدث خطأ"
      }
    }
  },
  director: {
    dashboard: {
      title: "لوحة التحكم",
      stats: {
        totalStudents: "إجمالي الطلاب",
        totalTeachers: "إجمالي المعلمين",
        totalClasses: "إجمالي الفصول",
        totalCourses: "إجمالي الدورات"
      }
    },
    classes: {
      title: "إدارة الفصول",
      list: "قائمة الفصول",
      add: "إضافة فصل",
      edit: "تعديل فصل",
      delete: "حذف فصل",
      columns: {
        name: "الاسم",
        level: "المستوى",
        teacher: "المعلم",
        capacity: "السعة",
        room: "الغرفة",
        type: "النوع",
        actions: "الإجراءات"
      }
    },
    teachers: {
      title: "المعلمون",
      list: "قائمة المعلمين",
      columns: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        phone: "الهاتف",
        status: "الحالة",
        actions: "الإجراءات"
      }
    }
  },
  teacher: {
    dashboard: {
      title: "لوحة التحكم",
      welcome: "مرحباً",
      stats: {
        totalStudents: "طلابي",
        totalClasses: "فصولي",
        totalCourses: "دروسي",
        attendance: "الحضور",
        performance: "الأداء"
      },
      schedule: {
        title: "جدولي",
        today: "اليوم",
        upcoming: "القادم"
      },
      notifications: {
        title: "الإشعارات",
        markAllRead: "تحديد الكل كمقروء",
        empty: "لا توجد إشعارات"
      }
    },
    courses: {
      title: "دروسي",
      list: "قائمة الدروس",
      add: "إضافة درس",
      edit: "تعديل درس",
      delete: "حذف درس",
      details: "تفاصيل الدرس",
      students: "الطلاب المسجلون",
      schedule: "الجدول",
      materials: "المواد التعليمية"
    },
    students: {
      title: "طلابي",
      list: "قائمة الطلاب",
      details: "تفاصيل الطالب",
      grades: "الدرجات",
      attendance: "الحضور",
      contact: "معلومات الاتصال"
    },
    grades: {
      title: "الدرجات",
      add: "إضافة درجة",
      edit: "تعديل درجة",
      delete: "حذف درجة",
      type: "نوع التقييم",
      date: "التاريخ",
      comment: "تعليق"
    }
  },
  student: {
    dashboard: {
      title: "لوحة التحكم",
      welcome: "مرحباً",
      stats: {
        courses: "دروسي",
        grades: "درجاتي",
        attendance: "حضوري",
        nextClass: "الدرس القادم"
      },
      schedule: {
        title: "جدولي",
        today: "اليوم",
        upcoming: "القادم"
      }
    },
    courses: {
      title: "دروسي",
      list: "قائمة الدروس",
      details: "تفاصيل الدرس",
      materials: "مواد الدرس",
      assignments: "الواجبات",
      progress: "التقدم"
    },
    grades: {
      title: "درجاتي",
      overview: "نظرة عامة",
      details: "تفاصيل الدرجات",
      improvement: "مجالات التحسين",
      history: "السجل"
    }
  }
};
