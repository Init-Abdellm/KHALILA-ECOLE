export default {
  welcome: 'Bienvenue',
  stats: {
    totalStudents: 'Total des Élèves',
    totalTeachers: 'Total des Professeurs',
    totalClasses: 'Total des Classes',
    totalCourses: 'Total des Cours',
    classes: 'Classes',
    events: 'Événements',
    notifications: 'Notifications'
  },
  recentActivity: 'Activité Récente',
  upcomingEvents: 'Événements à Venir',
  fetchError: 'Erreur lors de la récupération des données',
  admin: {
    dashboard: {
      title: "Tableau de Bord",
      stats: {
        totalStudents: "Total des Élèves",
        totalTeachers: "Total des Professeurs",
        totalClasses: "Total des Classes",
        totalCourses: "Total des Cours"
      },
      recentActivity: "Activité Récente",
      upcomingEvents: "Événements à Venir",
      fetchError: "Erreur lors de la récupération des statistiques"
    },
    users: {
      title: "Gestion des Utilisateurs",
      list: "Liste des Utilisateurs",
      add: "Ajouter un Utilisateur",
      edit: "Modifier un Utilisateur",
      delete: "Supprimer un Utilisateur",
      deleteConfirm: "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",
      resetPassword: "Réinitialiser le Mot de Passe",
      columns: {
        name: "Nom",
        role: "Rôle",
        email: "Email",
        phone: "Téléphone",
        status: "Statut",
        actions: "Actions"
      },
      form: {
        firstName: "Prénom",
        lastName: "Nom",
        email: "Email",
        phone: "Téléphone",
        role: "Rôle",
        password: "Mot de Passe",
        confirmPassword: "Confirmer le Mot de Passe"
      },
      messages: {
        createSuccess: "Utilisateur créé avec succès",
        updateSuccess: "Utilisateur mis à jour avec succès",
        deleteSuccess: "Utilisateur supprimé avec succès",
        error: "Une erreur est survenue"
      }
    }
  },
  director: {
    dashboard: {
      title: "Tableau de Bord",
      stats: {
        totalStudents: "Total des Élèves",
        totalTeachers: "Total des Professeurs",
        totalClasses: "Total des Classes",
        totalCourses: "Total des Cours"
      }
    },
    classes: {
      title: "Gestion des Classes",
      list: "Liste des Classes",
      add: "Ajouter une Classe",
      edit: "Modifier une Classe",
      delete: "Supprimer une Classe",
      columns: {
        name: "Nom",
        level: "Niveau",
        teacher: "Professeur",
        capacity: "Capacité",
        room: "Salle",
        type: "Type",
        actions: "Actions"
      }
    },
    teachers: {
      title: "Enseignants",
      list: "Liste des Enseignants",
      columns: {
        name: "Nom",
        email: "Email",
        phone: "Téléphone",
        status: "Statut",
        actions: "Actions"
      }
    }
  },
  teacher: {
    dashboard: {
      title: "Tableau de Bord",
      welcome: "Bienvenue",
      stats: {
        totalStudents: "Mes Élèves",
        totalClasses: "Mes Classes",
        totalCourses: "Mes Cours"
      }
    },
    courses: {
      title: "Mes Cours",
      list: "Liste des Cours",
      add: "Ajouter un Cours",
      edit: "Modifier un Cours",
      delete: "Supprimer un Cours"
    },
    students: {
      title: "Mes Élèves",
      list: "Liste des Élèves"
    }
  },
  student: {
    dashboard: {
      title: "Tableau de Bord",
      welcome: "Bienvenue",
      stats: {
        courses: "Mes Cours",
        grades: "Mes Notes",
        events: "Événements"
      }
    },
    courses: {
      title: "Mes Cours",
      list: "Liste des Cours"
    },
    grades: {
      title: "Mes Notes",
      list: "Liste des Notes"
    }
  }
};