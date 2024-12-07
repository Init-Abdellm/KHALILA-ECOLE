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
          hero: {
            title: 'Welcome to Khalilia School',
            subtitle: 'Excellence in education to prepare tomorrow\'s leaders',
            discoverBlog: 'Discover Our Blog',
            connectedSpace: 'Connected Space'
          },
          features: {
            title: 'Our Pedagogical Approach',
            schedule: {
              title: 'Flexible Schedule',
              description: 'Schedules adapted to each student\'s needs for optimal learning.'
            },
            classes: {
              title: 'Small Class Sizes',
              description: 'A conducive learning environment with personalized attention.'
            },
            program: {
              title: 'Personalized Program',
              description: 'Teaching adapted to each student\'s level and objectives.'
            }
          },
          news: {
            title: 'News',
            location: 'Location'
          },
          subscription: {
            title: 'Registration Request',
            parentName: 'Parent Name',
            parentEmail: 'Email',
            parentPhone: 'Phone',
            childName: 'Child Name',
            childAge: 'Child Age',
            currentSchool: 'Current School (optional)',
            message: 'Message (optional)',
            submit: 'Submit Registration Request',
            success: 'Form submitted',
            successMessage: 'We will contact you soon.',
            error: 'Error',
            errorMessage: 'An error occurred while submitting the form.'
          },
          login: {
            title: 'Login',
            subtitle: 'Sign in to your account',
            email: 'Email',
            password: 'Password',
            submit: 'Sign in',
            forgotPassword: 'Forgot password?',
            noAccount: "Don't have an account?",
            register: 'Register',
            backToHome: 'Back to home'
          }
        }
      },
      ar: {
        translation: {
          hero: {
            title: 'مرحباً بكم في مدرسة خليلية',
            subtitle: 'التميز في التعليم لإعداد قادة الغد',
            discoverBlog: 'اكتشف مدونتنا',
            connectedSpace: 'الفضاء المتصل'
          },
          features: {
            title: 'نهجنا التربوي',
            schedule: {
              title: 'جدول مرن',
              description: 'جداول مكيفة حسب احتياجات كل طالب للتعلم الأمثل'
            },
            classes: {
              title: 'فصول صغيرة',
              description: 'بيئة تعليمية مواتية مع اهتمام شخصي'
            },
            program: {
              title: 'برنامج مخصص',
              description: 'تعليم مكيف حسب مستوى وأهداف كل طالب'
            }
          },
          news: {
            title: 'الأخبار',
            location: 'الموقع'
          },
          subscription: {
            title: 'طلب التسجيل',
            parentName: 'اسم الوالد',
            parentEmail: 'البريد الإلكتروني',
            parentPhone: 'الهاتف',
            childName: 'اسم الطفل',
            childAge: 'عمر الطفل',
            currentSchool: 'المدرسة الحالية (اختياري)',
            message: 'رسالة (اختياري)',
            submit: 'إرسال طلب التسجيل',
            success: 'تم إرسال النموذج',
            successMessage: 'سنتصل بك قريباً',
            error: 'خطأ',
            errorMessage: 'حدث خطأ أثناء إرسال النموذج'
          },
          login: {
            title: 'تسجيل الدخول',
            subtitle: 'تسجيل الدخول إلى حسابك',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            submit: 'تسجيل الدخول',
            forgotPassword: 'نسيت كلمة المرور؟',
            noAccount: 'ليس لديك حساب؟',
            register: 'تسجيل',
            backToHome: 'العودة إلى الصفحة الرئيسية'
          }
        }
      },
      fr: {
        translation: {
          hero: {
            title: 'Bienvenue à l\'École Khalilia',
            subtitle: 'Une éducation d\'excellence pour préparer les leaders de demain',
            discoverBlog: 'Découvrir Notre Blog',
            connectedSpace: 'Espace Connecté'
          },
          features: {
            title: 'Notre Approche Pédagogique',
            schedule: {
              title: 'Emploi du temps flexible',
              description: 'Des horaires adaptés aux besoins de chaque élève pour un apprentissage optimal.'
            },
            classes: {
              title: 'Classes à effectif réduit',
              description: 'Un environnement propice à l\'apprentissage avec une attention personnalisée.'
            },
            program: {
              title: 'Programme personnalisé',
              description: 'Un enseignement adapté au niveau et aux objectifs de chaque élève.'
            }
          },
          news: {
            title: 'Actualités',
            location: 'Lieu'
          },
          subscription: {
            title: 'Demande d\'inscription',
            parentName: 'Nom du parent',
            parentEmail: 'Email',
            parentPhone: 'Téléphone',
            childName: 'Nom de l\'enfant',
            childAge: 'Âge de l\'enfant',
            currentSchool: 'École actuelle (optionnel)',
            message: 'Message (optionnel)',
            submit: 'Envoyer la demande d\'inscription',
            success: 'Formulaire envoyé',
            successMessage: 'Nous vous contacterons bientôt.',
            error: 'Erreur',
            errorMessage: 'Une erreur est survenue lors de l\'envoi du formulaire.'
          },
          login: {
            title: 'Connexion',
            subtitle: 'Connectez-vous à votre compte',
            email: 'Email',
            password: 'Mot de passe',
            submit: 'Se connecter',
            forgotPassword: 'Mot de passe oublié ?',
            noAccount: 'Vous n\'avez pas de compte ?',
            register: 'S\'inscrire',
            backToHome: 'Retour à l\'accueil'
          }
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;