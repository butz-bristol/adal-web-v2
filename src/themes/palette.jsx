/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(navType, theme) {
  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper
    },
    primary: {
      light: navType === 'dark' ? theme.colors.darkPrimaryLight : theme.colors.primaryLight,
      main: navType === 'dark' ? theme.colors.darkPrimaryMain : theme.colors.primaryMain,
      dark: navType === 'dark' ? theme.colors.darkPrimaryDark : theme.colors.primaryDark,
      200: navType === 'dark' ? theme.colors.darkPrimary200 : theme.colors.primary200,
      800: navType === 'dark' ? theme.colors.darkPrimary800 : theme.colors.primary800
    },
    secondary: {
      light: navType === 'dark' ? theme.colors.secondaryLight : theme.colors.secondaryLight,
      main: navType === 'dark' ? theme.colors.darkSecondaryMain : theme.colors.secondaryMain,
      dark: navType === 'dark' ? theme.colors.darkSecondaryDark : theme.colors.secondaryDark,
      200: navType === 'dark' ? theme.colors.darkSecondary200 : theme.colors.secondary200,
      800: navType === 'dark' ? theme.colors.darkSecondary800 : theme.colors.secondary800
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark
    },
    grey: {
      50: theme.colors.grey50,
      100: theme.colors.grey100,
      500: navType === 'dark' ? theme.colors.darkTextSecondary : theme.colors.grey500,
      600: navType === 'dark' ? theme.colors.darkTextTitle : theme.colors.grey600,
      700: navType === 'dark' ? theme.colors.darkTextPrimary : theme.colors.grey700,
      900: navType === 'dark' ? theme.colors.darkTextPrimary : theme.colors.grey900
    },
    dark: {
      light: theme.colors?.darkPaper,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper
    },
    text: {
      primary: navType === 'dark' ? theme.colors.darkTextPrimary : theme.colors.grey700,
      secondary: navType === 'dark' ? theme.colors.darkTextSecondary : theme.colors.grey500,
      dark: navType === 'dark' ? theme.colors.darkTextPrimary : theme.colors.grey900,
      hint: theme.colors.grey100
    },
    background: {
      paper: navType === 'dark' ? theme.colors.darkPaper : theme.colors.paper,
      default: navType === 'dark' ? theme.colors.darkPaper : theme.colors.paper
    }
  };
}
