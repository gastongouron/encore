import LocalizedStrings from 'react-localization';

const translations = {
 fr: {
   login:"Se connecter",
   mustLogin:"Veuillez vous identifier ou vous inscrire",
   facebook:"Avec Facebook",
   signup:"Inscription",
   sign:"S'inscrire",
   firstName:"Prénom",
   lastName:"Nom",
   required:"Requis",
   invalidEmail:"Format d'adresse email invalide",
   resetPassword:"Mot de passe oublié",
   passwordConfirmation:"Confirmation du mot de passe",
   resetting:"Réinitialization du mot de passe...",
   reset:"Réinitialiser mot de passe",
   avatar:"Avatar",
   logout:"Se déconnecter",
   profile:"Profil",
   email:"Adresse email",
   password:"Mot de passe",
   logging:"Un instant...",
   request:"Renouveller le mot de passe",
   requesting:"Un instant...",
   failed:"Mot de passe ou identifiant invdalide",
   requestResetPasswordSucceeded:"Votre requête de renouvellement de mot de passe à bien été prise en compte. Vous devriez recevoir un email contenant un lien de renouvellement très prochainement.",
   artists:"Artistes",
   switch:"Changer de langue",
   welcome:"Bienvenue!",
   reviews:'Avis de {username}',
   wanna:"Vous aimeriez donner votre avis?",
   search:"Rechercher...",
   new:"Donner mon avis",
   cancel:"Annuler",
   save:"Publier",
   edit:"Éditer",
   update:"Mettre à jour",
   delete:"Supprimer",
   deleteMedia:"Supprimer ce média",
   addMedia:"Ajouter un média",
   changeMedia:"Changer ce média",
   created_at:"Créé ",
   updated_at:"Mis à jour ",
   policy: {
      link:"Politique de confidentialité",
      title:"Encore: Politique de confidentialité",
      p1:"Votre vie privée est importante pour nous. Encore a pour politique de respecter votre vie privée à l’égard des informations que nous pouvons collecter sur votre site internet. ",
      p2:"Nous ne vous demandons pas vos informations personnelles sauf si nous en avons vraiment besoin. Lorsque nous le faisons, nous ne collectons ce dont nous avons besoin que par des moyens équitables et licites et, le cas échéant, à votre connaissance ou avec votre consentement. Nous allons également vous faire savoir pourquoi nous le recueillons et comment il sera utilisé",
      p3:"Nous ne partageons pas vos informations personnelles avec des tiers, sauf si requis par la loi. Nous ne conserverons ces informations que le temps nécessaire pour vous fournir un service",
      p4:"Nous ne stockons pas vos informations personnelles sur nos serveurs, sauf si cela est nécessaire pour vous fournir un service. Ce que nous stockons, nous le protégerons par des moyens commercialement acceptables afin de protéger vos informations personnelles contre la perte ou le vol, ainsi que contre les attaques non autorisées. accès, divulgation, copie, utilisation ou modification.!)",
   },

 },
 en:{
   login:"Login",
   mustLogin:"Please log in or sign up",
   facebook:"with Facebook",
   signup:"Sign up",
   sign:"Sign up",
   firstName:"First name",
   lastName:"Last name",
   required:"Required",
   invalidEmail:"Invalid email format",
   resetPassword:"Forgotten password",
   passwordConfirmation:"Password confirmation",
   resetting:"Resetting password...",
   reset:"Reset password",
   avatar:"Avatar",
   logout:"Logout",
   profile:"Profile",
   email:"Email",
   password:"Password",
   logging:"Logging in...",
   request:"Request password reset",
   requesting:"Requesting...",
   failed:"Invalid credentials",
   requestResetPasswordSucceeded:"Your request to reset you password was received. You should receive an email shortly with a link to reset your password.",
   artists:"Artists",
   switch:"Switch language",
   welcome:"Welcome!",
   reviews:"{username}'s reviews",
   wanna:"Wanna leave a review?",
   search:"Search...",
   new:"New review",
   cancel:"Cancel",
   save:"Publish",
   edit:"Edit",
   update:"Update",
   delete:"Delete",
   deleteMedia:"Delete media file",
   addMedia:"Add a media",
   changeMedia:"Change media",
   created_at:"Created ",
   updated_at:"Updated ",
   policy: {
      link:"Privacy policy",
      title:"Encore: Privacy Policy",
      p1:"Your privacy is important to us. It is Encore's policy to respect your privacy regarding any information we may collect from you across our website.",
      p2:"We don’t ask for your personal information unless we truly need it. When we do, we’ll only collect what we need by fair and lawful means and, where appropriate, with your knowledge or consent. We’ll also let you know why we’re collecting it and how it will be used",
      p3:"We don’t share your personal information with third-parties, except where required by law. We will only retain personal information for as long as necessary to provide you with a service",
      p4:"We don’t store your personal information on our servers unless it’s required for providing a service to you. What we store, we’ll protect within commercially acceptable means to protect your personal information from loss or theft, as well as unauthorized access, disclosure, copying, use or modification.!)",
   },

 }
}
const strings = new LocalizedStrings(translations);

export default strings
