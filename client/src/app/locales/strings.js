import LocalizedStrings from 'react-localization';

const translations = {
 en:{
   login:"Login",
   logout:"Logout",
   artists:"Artists",
   how:"How do you want your egg today?",
   boiledEgg:"Boiled egg",
   softBoiledEgg:"Soft-boiled egg",
   choice:"How to choose the egg",
 },
 fr: {
   login:"Se connecter",
   logout:"Se déconnecter",
   artists:"Artistes",
   how:"Come vuoi il tuo uovo oggi?",
   boiledEgg:"Uovo sodo",
   softBoiledEgg:"Uovo alla coque",
   choice:"Come scegliere l'uovo",
 }
}

const strings = new LocalizedStrings(translations);

export default strings