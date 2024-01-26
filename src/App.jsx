import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavigationScroll from 'src/layout/NavigationScroll';
import Routes from 'src/routes';
import themes from 'src/themes';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
      <ToastContainer position="top-center" transition={Flip}></ToastContainer>
    </StyledEngineProvider>
  );
};

export default App;
