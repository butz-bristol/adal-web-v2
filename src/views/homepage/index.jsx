// material-ui
import { styled, useTheme } from '@mui/material/styles';

// project imports
import Customization from 'src/layout/Customization';
import AppBar from 'src/ui-component/extended/AppBar';
import FooterSection from './FooterSection';
import HeaderSection from './HeaderSection';
// import IncludeSection from './IncludeSection';
// import RtlInfoSection from './RtlInfoSection';

// custom stlye
const HeaderWrapper = styled('div')(({ theme }) => ({
  overflowX: 'hidden',
  overflowY: 'clip',
  background:
    theme.palette.mode === 'dark'
      ? theme.palette.background.default
      : `linear-gradient(360deg, ${theme.palette.grey[100]} 1.09%, ${theme.palette.background.paper} 100%)`,
  [theme.breakpoints.down('md')]: {},
}));

const SectionWrapper = styled('div')({
  paddingTop: 100,
  paddingBottom: 100,
});

// =============================|| LANDING MAIN ||============================= //

const Landing = () => {
  const theme = useTheme();

  return (
    <>
      {/* 1. header and hero section */}
      <HeaderWrapper id="home">
        <AppBar />
        <HeaderSection />
      </HeaderWrapper>

      {/* 2. card section */}

      {/* 10. footer section */}
      <SectionWrapper
        sx={{
          bgcolor:
            theme.palette.mode === 'dark' ? 'background.default' : 'dark.900',
          pb: 0,
        }}
      >
        <FooterSection />
      </SectionWrapper>
      <Customization />
    </>
  );
};

export default Landing;
