import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'fr',
    resources: {
      en: {
        translation: {
          dashboard: {
            welcome: 'Welcome',
            stats: {
              totalStudents: 'Total Students',
              classes: 'Classes',
              events: 'Events',
              notifications: 'Notifications'
            },
            recentActivity: 'Recent Activity',
            upcomingEvents: 'Upcoming Events',
            quickActions: 'Quick Actions',
            performance: 'Performance Overview',
            attendance: 'Attendance',
            courses: {
              myCourses: 'My Courses',
              schedule: 'Schedule',
              grades: 'Grades',
              assignments: 'Assignments'
            },
            admin: {
              userManagement: 'User Management',
              settings: 'Settings',
              reports: 'Reports',
              systemHealth: 'System Health'
            },
            director: {
              teacherManagement: 'Teacher Management',
              classManagement: 'Class Management',
              schoolMetrics: 'School Metrics',
              admissions: 'Admissions'
            },
            teacher: {
              myClasses: 'My Classes',
              studentProgress: 'Student Progress',
              lessonPlans: 'Lesson Plans',
              gradeBook: 'Grade Book'
            },
            student: {
              myProgress: 'My Progress',
              nextClass: 'Next Class',
              homework: 'Homework',
              achievements: 'Achievements'
            }
          },
          common: {
            loading: 'Loading...',
            error: 'An error occurred',
            success: 'Success',
            save: 'Save',
            cancel: 'Cancel',
            edit: 'Edit',
            delete: 'Delete',
            view: 'View',
            search: 'Search',
            filter: 'Filter',
            sort: 'Sort',
            actions: 'Actions',
            status: 'Status',
            date: 'Date',
            time: 'Time',
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            address: 'Address',
            role: 'Role',
            submit: 'Submit',
            back: 'Back',
            next: 'Next',
            previous: 'Previous',
            logout: 'Logout',
            profile: 'Profile',
            settings: 'Settings',
            help: 'Help',
            about: 'About'
          }
        }
      },
      ar: {
        translation: {
          dashboard: {
            welcome: 'مرحباً',
            stats: {
              totalStudents: 'إجمالي الطلاب',
              classes: 'الفصول',
              events: 'الفعاليات',
              notifications: 'الإشعارات'
            },
            recentActivity: 'النشاط الأخير',
            upcomingEvents: 'الفعاليات القادمة',
            quickActions: 'إجراءات سريعة',
            performance: 'نظرة عامة على الأداء',
            attendance: 'الحضور',
            courses: {
              myCourses: 'دوراتي',
              schedule: 'الجدول',
              grades: 'الدرجات',
              assignments: 'الواجبات'
            },
            admin: {
              userManagement: 'إدارة المستخدمين',
              settings: 'الإعدادات',
              reports: 'التقارير',
              systemHealth: 'صحة النظام'
            },
            director: {
              teacherManagement: 'إدارة المعلمين',
              classManagement: 'إدارة الفصول',
              schoolMetrics: 'مقاييس المدرسة',
              admissions: 'القبول'
            },
            teacher: {
              myClasses: 'فصولي',
              studentProgress: 'تقدم الطلاب',
              lessonPlans: 'خطط الدروس',
              gradeBook: 'سجل الدرجات'
            },
            student: {
              myProgress: 'تقدمي',
              nextClass: 'الفصل التالي',
              homework: 'الواجب المنزلي',
              achievements: 'الإنجازات'
            }
          },
          common: {
            loading: 'جاري التحميل...',
            error: 'حدث خطأ',
            success: 'تم بنجاح',
            save: 'حفظ',
            cancel: 'إلغاء',
            edit: 'تعديل',
            delete: 'حذف',
            view: 'عرض',
            search: 'بحث',
            filter: 'تصفية',
            sort: 'ترتيب',
            actions: 'إجراءات',
            status: 'الحالة',
            date: 'التاريخ',
            time: 'الوقت',
            name: 'الاسم',
            email: 'البريد الإلكتروني',
            phone: 'الهاتف',
            address: 'العنوان',
            role: 'الدور',
            submit: 'إرسال',
            back: 'رجوع',
            next: 'التالي',
            previous: 'السابق',
            logout: 'تسجيل الخروج',
            profile: 'الملف الشخصي',
            settings: 'الإعدادات',
            help: 'المساعدة',
            about: 'حول'
          }
        }
      },
      fr: {
        translation: {
          dashboard: {
            welcome: 'Bienvenue',
            stats: {
              totalStudents: 'Total des Élèves',
              classes: 'Classes',
              events: 'Événements',
              notifications: 'Notifications'
            },
            recentActivity: 'Activité Récente',
            upcomingEvents: 'Événements à Venir',
            quickActions: 'Actions Rapides',
            performance: 'Aperçu des Performances',
            attendance: 'Présence',
            courses: {
              myCourses: 'Mes Cours',
              schedule: 'Emploi du Temps',
              grades: 'Notes',
              assignments: 'Devoirs'
            },
            admin: {
              userManagement: 'Gestion des Utilisateurs',
              settings: 'Paramètres',
              reports: 'Rapports',
              systemHealth: 'État du Système'
            },
            director: {
              teacherManagement: 'Gestion des Enseignants',
              classManagement: 'Gestion des Classes',
              schoolMetrics: 'Métriques de l\'École',
              admissions: 'Admissions'
            },
            teacher: {
              myClasses: 'Mes Classes',
              studentProgress: 'Progrès des Élèves',
              lessonPlans: 'Plans de Cours',
              gradeBook: 'Carnet de Notes'
            },
            student: {
              myProgress: 'Mon Progrès',
              nextClass: 'Prochain Cours',
              homework: 'Devoirs',
              achievements: 'Réalisations'
            }
          },
          common: {
            loading: 'Chargement...',
            error: 'Une erreur est survenue',
            success: 'Succès',
            save: 'Sauvegarder',
            cancel: 'Annuler',
            edit: 'Modifier',
            delete: 'Supprimer',
            view: 'Voir',
            search: 'Rechercher',
            filter: 'Filtrer',
            sort: 'Trier',
            actions: 'Actions',
            status: 'Statut',
            date: 'Date',
            time: 'Heure',
            name: 'Nom',
            email: 'Email',
            phone: 'Téléphone',
            address: 'Adresse',
            role: 'Rôle',
            submit: 'Envoyer',
            back: 'Retour',
            next: 'Suivant',
            previous: 'Précédent',
            logout: 'Déconnexion',
            profile: 'Profil',
            settings: 'Paramètres',
            help: 'Aide',
            about: 'À propos'
          }
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
