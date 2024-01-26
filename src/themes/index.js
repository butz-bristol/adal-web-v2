import { createTheme } from '@mui/material/styles';

// assets
import colors from 'src/assets/scss/_themes-vars.module.scss';

// project imports
import componentStyleOverrides from './compStyleOverride';
import themePalette from './palette';
import themeTypography from './typography';

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors;
  const navType = customization.navType;
  const themeOption = {
    colors: color,
    heading: navType === 'dark' ? color.grey100 : color.grey900,
    paper: color.paper,
    backgroundDefault: color.paper,
    background: color.se,
    darkTextPrimary: navType === 'dark' ? color.grey200 : color.grey700,
    darkTextSecondary: color.grey500,
    textDark: color.grey800,
    menuSelected:
      navType === 'dark' ? color.darkSecondaryMain : color.secondaryDark,
    menuSelectedBack:
      navType === 'dark' ? color.secondaryLight : color.secondaryLight,
    divider: navType === 'dark' ? color.grey500 : color.grey200,
    customization,
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themePalette(navType, themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px',
        },
      },
    },
    typography: themeTypography(themeOption),
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(navType, themeOption);

  return themes;
};

export default theme;
