import {
  grey300, grey400, indigo500,
  white, darkBlack, fullBlack
} from 'material-ui/styles/colors';
import {fade} from 'material-ui/utils/colorManipulator';

// NOTE: To see what else can be customized visit: https://github.com/callemall/material-ui/blob/master/src/styles/getMuiTheme.js

export default {
  fontFamily: 'Roboto, sans-serif',
  borderRadius: 2,
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  typography: {
    useNextVariants: true,
  },
  appBar: {
    color: '#000000',
    textColor: 'black',
  },
  palette: {
    // primary1Color: '#283593',
    // primary1Color: '#0000FF',
    primary1Color: "blue",
    textColor: '#212121',
    // textColor: darkBlack,
    // accent1Color: '#f44336',
    accent1Color: "red",
    accent2Color: '#b71c1c',
    accent3Color: '#e57373',
    primary2Color: '#283593',
    starColor: '#fbde56',
    primary3Color: grey400,
    // textColor: darkBlack,
    secondaryTextColor: fade(darkBlack, 0.54),
    alternateTextColor: '#ffffff',
    canvasColor: '#ffffff',
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: indigo500,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  }
};

// {
//     "palette": {
//         "primary1Color": "#283593",
//         "textColor": "#212121",
//         "accent1Color": "#f44336",
//         "accent2Color": "#b71c1c",
//         "accent3Color": "#e57373",
//         "primary2Color": "#283593"
//     },
//     "appBar": {
//         "color": "#000000",
//         "textColor": "#ffffff"
//     },
//     "raisedButton": {
//         "primaryTextColor": "#ffffff",
//         "secondaryTextColor": "#ffffff",
//         "disabledColor": "rgba(255, 255, 255, 0.54)"
//     },
//     "tabs": {
//         "backgroundColor": "#bdbdbd",
//         "selectedTextColor": "#000000",
//         "textColor": "#757575"
//     },
//     "tableHeaderColumn": {
//         "textColor": "#ffffff"
//     }
// }
