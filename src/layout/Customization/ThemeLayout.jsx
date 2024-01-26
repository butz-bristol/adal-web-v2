// material-ui
import { FormControlLabel, FormGroup, Stack, Switch } from '@mui/material';

// assets
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from 'src/store/customizationSlice';

// ==============================|| CUSTOMIZATION - MODE ||============================== //

const ThemeModeLayout = () => {
  const dispatch = useDispatch();
  const customization = useSelector((state) => state.customization);

  const toggleThemeMode = (e) => {
    let navType = '';
    if (e.target.checked) {
      navType = 'dark';
    } else {
      navType = 'light';
    }
    dispatch(setTheme(navType));
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      p={2}
      justifyContent="space-between"
      spacing={2.5}
      sx={{ width: '100%' }}
    >
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={
                (customization.navType === 'dark' ? true : false) ?? false
              }
              onChange={toggleThemeMode}
              sx={{ m: 1 }}
            />
          }
          label={customization.navType + ' mode'}
          sx={{ textTransform: 'capitalize' }}
        />
      </FormGroup>
    </Stack>
  );
};

export default ThemeModeLayout;
