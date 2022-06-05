import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    translation: {
      providers: "Professionals",
      Customers: "Customers",
      Home: "Home",
      Login: "Login",
      SignUp: "SignUp",
      ClearAll: "Clear All",
      ViewAllNotifications: "View All Notifications",
      User: "Client",
      Provider: "Professional",
      Dashboard: "Dashboard",
      ProfileSettings: "Profile Settings",
      Reviews: "Reviews",
      Logout: "Logout",
      Password: "Password",
      EnterEmailAddress: "Enter your Email Address",
      EnterPassword: "Enter your Password",
      nothaveAccount: "Don’t have an account? ",
      haveAccount: "Already have an account?",
      // sign up form
      enterName: "Enter your Name",
      enterLastName: "Enter your Last Name",
      Name: "Name",
      LastName: "Last Name",
      confirmPassword: "Confirm your Password",
      Specialty: "Specialty",
      // home page
      SearchFrom: "Search From 150 Verified professionals!",
      LookingFor: "What are you looking for?",
      YourLocation: "Your Location",
      Search: "Search",
      PopularSearches: "Popular Searches",
      ElectricalWorks: "Electrical Works",
      Cleaning: "Cleaning",
      AC_Repair: "AC Repair",
      FeaturedCategories: "Featured Categories",
      Need2Find: "What do you need to find?",
      ViewAll: "View All",
      Computer: "Electronic",
      Interior: "Interior",
      CarWash: "Car Wash",
      Electrical: "Electrical",
      howWork: "How It Works",
      FindWant: "Find Who You Want",
      ChooseToDo: "Choose What To Do",
      proPlace: "Professional at your place",
      proPlaceDetail:
        "Your professional comes to the location of your project on the agreed date.",
      ChooseToDoDetail: "Describe your project and get a price estimate.",
      FindWantDetail: "Find competent professionals near you.",
      AppDownload: "Discover our mobile app",
      // search providers
      FindProfessionnal: "Find a Professional",
      SearchFilter: "Search Filter",
      Keyword: "Keyword",
      ProName: "Professional name",
      Location: "Location",
      SearchLocation: "Search Location",
      Profession: "Profession",
      All: "All",
    },
  },
  fr: {
    translation: {
      providers: "Professionnels",
      Customers: "Clients",
      Home: "Acceuil",
      Login: "Se Connecter",
      SignUp: "S'inscrire",
      ClearAll: "tout supprimer",
      ViewAllNotifications: "Voir Toutes Les Notifications",
      User: "Client",
      Provider: "Professionnel",
      Dashboard: "Tableau de Bord",
      ProfileSettings: "Paramètres de Profile",
      Reviews: "Avis",
      Logout: "Se déconnecter",
      Password: "Mot de Passe",
      EnterEmailAddress: "Entrer votre Addresse Email",
      EnterPassword: "Entrer votre Mot de Passe",
      nothaveAccount: "Vous n'avez pas de compte? ",
      haveAccount: "Vous avez déjà un compte?",
      // sign up form
      enterName: "Entrer votre Prénom",
      enterLastName: "Entrer votre Nom",
      Name: "Prénom",
      LastName: "Nom",
      confirmPassword: "Confirmer Votre Mot de Passe",
      Specialty: "Spécialité",
      // home page
      SearchFrom: "Chercher parmi 150 professionnels vérifiés!",
      LookingFor: "Que Cherchez-vous?",
      YourLocation: "Votre Localisation",
      Search: "Chercher",
      PopularSearches: "Recherches Populaires",
      ElectricalWorks: "Travaux électriques",
      Cleaning: "Nettoyage",
      AC_Repair: "Reparation Climatiseur",
      FeaturedCategories: "Categories",
      Need2Find: "Qu'avez-vous besoin de trouver ?",
      ViewAll: "Voir Tout",
      Computer: "Electronique",
      Interior: "Interieur",
      CarWash: "Lavage Voiture",
      Electrical: "Electrique",
      howWork: "Comment ça marche",
      FindWant: "Selectionnez votre professionnel",
      ChooseToDo: "Choisissez quoi faire",
      proPlace: "Professionnel chez vous",
      proPlaceDetail:
        "Votre professionnel intervient sur le lieu de votre projet à la date convenu.",
      ChooseToDoDetail:
        "Décrivez votre projet et obtenez une estimation du prix.",
      FindWantDetail:
        "Trouvez des professionnels compétents et proches de chez vous.",
      AppDownload: "Découvrez notre application mobile",
      // search providers
      FindProfessionnal: "Trouver un professionnel",
      SearchFilter: "Filtre de recherche",
      Keyword: "Mot clé",
      ProName: "Nom du Professionnel",
      Location: "Localisation",
      SearchLocation: "Chercher Localisation",
      Profession: "Métier",
      All: "Tout",
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
