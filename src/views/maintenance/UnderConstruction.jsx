import { Link } from 'react-router-dom';

// material-ui
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// project imports
import { DASHBOARD_PATH } from 'src/config';
import { gridSpacing } from 'src/store/constant';
import AnimateButton from 'src/ui-component/extended/AnimateButton';

// assets
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import imageDarkBackground from 'src/assets/images/maintenance/img-bg-grid-dark.svg';
import imageBackground from 'src/assets/images/maintenance/img-bg-grid.svg';
import imageParts from 'src/assets/images/maintenance/img-bg-parts.svg';
import image from 'src/assets/images/maintenance/img-build.svg';

// styles
const CardMediaWrapper = styled('div')({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative',
});

const PageContentWrapper = styled('div')({
  maxWidth: 350,
  margin: '0 auto',
  textAlign: 'center',
});

const ConstructionCard = styled(Card)({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const CardMediaBuild = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '5s bounce ease-in-out infinite',
});

const CardMediaParts = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '10s blink ease-in-out infinite',
});

// ========================|| UNDER CONSTRUCTION PAGE ||======================== //

const UnderConstruction = ({ showNav = true }) => {
  const theme = useTheme();

  return (
    <ConstructionCard>
      <CardContent>
        <Grid container justifyContent="center" spacing={gridSpacing}>
          <Grid item xs={12}>
            <CardMediaWrapper>
              <CardMedia
                component="img"
                image={
                  theme.palette.mode === 'dark'
                    ? imageDarkBackground
                    : imageBackground
                }
                title="Slider 3 image"
              />
              <CardMediaParts src={imageParts} title="Slider 1 image" />
              <CardMediaBuild src={image} title="Slider 2 image" />
            </CardMediaWrapper>
          </Grid>
          <Grid item xs={12}>
            <PageContentWrapper>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                  <Typography variant="h1" component="div">
                    Under Construction
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    This site is on under construction!! Please check after some
                    time
                  </Typography>
                </Grid>
                {showNav && (
                  <Grid item xs={12}>
                    <AnimateButton>
                      <Button
                        variant="contained"
                        size="large"
                        component={Link}
                        to={DASHBOARD_PATH}
                      >
                        <HomeTwoToneIcon
                          sx={{ fontSize: '1.3rem', mr: 0.75 }}
                        />{' '}
                        Home
                      </Button>
                    </AnimateButton>
                  </Grid>
                )}
              </Grid>
            </PageContentWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </ConstructionCard>
  );
};

export default UnderConstruction;
