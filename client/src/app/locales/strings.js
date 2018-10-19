import LocalizedStrings from 'react-localization';

const translations = {
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
 },
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
 }
}
const strings = new LocalizedStrings(translations);

export default strings
