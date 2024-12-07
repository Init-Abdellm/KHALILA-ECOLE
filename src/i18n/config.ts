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
          login: {
            title: 'Login',
            subtitle: 'Sign in to your account',
            email: 'Email',
            password: 'Password',
            submit: 'Sign in',
            forgotPassword: 'Forgot password?',
            noAccount: "Don't have an account?",
            register: 'Register',
            backToHome: 'Back to home',
          }
        }
      },
      ar: {
        translation: {
          login: {
            title: 'تسجيل الدخول',
            subtitle: 'تسجيل الدخول إلى حسابك',
            email: 'البريد الإلكتروني',
            password: 'كلمة المرور',
            submit: 'تسجيل الدخول',
            forgotPassword: 'نسيت كلمة المرور؟',
            noAccount: 'ليس لديك حساب؟',
            register: 'تسجيل',
            backToHome: 'العودة إلى الصفحة الرئيسية',
          }
        }
      },
      fr: {
        translation: {
          login: {
            title: 'Connexion',
            subtitle: 'Connectez-vous à votre compte',
            email: 'Email',
            password: 'Mot de passe',
            submit: 'Se connecter',
            forgotPassword: 'Mot de passe oublié ?',
            noAccount: "Vous n'avez pas de compte ?",
            register: "S'inscrire",
            backToHome: "Retour à l'accueil",
          }
        }
      }
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;