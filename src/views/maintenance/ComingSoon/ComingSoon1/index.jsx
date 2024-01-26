import BookIcon from '@mui/icons-material/Book';
import FacebookIcon from '@mui/icons-material/Facebook';
import FiberManualRecordTwoToneIcon from '@mui/icons-material/FiberManualRecordTwoTone';
import {
  Avatar,
  ButtonBase,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import React from 'react';
import companyLogo from 'src/assets/images/companyLogo.png';
import imageSoon2 from 'src/assets/images/maintenance/img-soon-2.svg';
import imageSoon3 from 'src/assets/images/maintenance/img-soon-3.svg';
import imageSoon4 from 'src/assets/images/maintenance/img-soon-4.svg';
import imageSoon5 from 'src/assets/images/maintenance/img-soon-5.svg';
import imageSoon6 from 'src/assets/images/maintenance/img-soon-6.svg';
import imageSoon7 from 'src/assets/images/maintenance/img-soon-7.svg';
import imageSoon8 from 'src/assets/images/maintenance/img-soon-8.svg';
import imageDarkGrid from 'src/assets/images/maintenance/img-soon-bg-grid-dark.svg';
import imageGrid from 'src/assets/images/maintenance/img-soon-bg-grid.svg';
import imageBackground from 'src/assets/img-bg.svg';
import Slider from './Slider';

// styles
const CardMediaWrapper = styled('div')(({ theme }) => ({
  maxWidth: 720,
  margin: '0 auto',
  position: 'relative',
  [theme.breakpoints.down('xl')]: {
    marginTop: 30,
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: 450,
  },
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

const PageContentWrapper = styled('div')(({ theme }) => ({
  maxWidth: 550,
  margin: '0 0 0 auto',
  [theme.breakpoints.down('lg')]: {
    margin: '0 auto',
  },
  [theme.breakpoints.up(1400)]: {
    maxWidth: 600,
  },
}));

const ComingSoonCard = styled(Card)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    display: 'block',
  },
  [theme.breakpoints.up(1200)]: {
    overflow: 'hidden',
    maxHeight: '100vh',
  },
  [theme.breakpoints.up(1400)]: {
    alignItems: 'center',
  },
}));

const SliderWrapper = styled('div')(({ theme }) => ({
  borderRadius: '8px',
  width: 'calc(100% - 40px)',
  marginLeft: 40,
  height: 'calc(100% - 40px)',
  position: 'absolute',
  left: 0,
  background: theme.palette.dark.main,
}));

const CardMediaGrid = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 3,
});

const CardMediaWidget = styled('img')({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  animation: '5s wings ease-in-out infinite',
  zIndex: 5,
  '&:nth-of-type(3)': {
    animationDelay: '2s',
  },
  '&:nth-of-type(4)': {
    animationDelay: '1s',
  },
  '&:nth-of-type(5)': {
    animationDelay: '3s',
  },
  '&:nth-of-type(9)': {
    animationDelay: '5s',
  },
  '&:nth-of-type(10)': {
    animationDelay: '6s',
  },
  '&:nth-of-type(7)': {
    animation: '3s blink ease-in-out infinite',
    animationDelay: '1s',
  },
  '&:nth-of-type(6)': {
    animation: '3s blink ease-in-out infinite',
    animationDelay: '2s',
  },
});

// ===========================|| COMING SOON 1 ||=========================== //

const ComingSoon1 = () => {
  const theme = useTheme();

  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <ComingSoonCard>
      <CardContent sx={{ p: 0 }}>
        <CardContent sx={{ position: 'relative' }}>
          <CardMedia
            component="img"
            image={imageBackground}
            title="Slider5 image"
            sx={{
              position: 'absolute',
              bottom: -40,
              left: 50,
              width: 400,
              transform: 'rotate(145deg)',
            }}
          />
        </CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardMediaWrapper>
              <CardMedia
                component="img"
                image={imageBackground}
                title="Slider5 image"
                sx={{ position: 'relative', zIndex: 1 }}
              />
              <CardMediaGrid
                src={theme.palette.mode === 'dark' ? imageDarkGrid : imageGrid}
                title="Slider5 image"
              />
              <CardMediaWidget src={imageSoon2} title="Slider5 image" />
              <CardMediaWidget src={imageSoon3} title="Slider5 image" />
              <CardMediaWidget src={imageSoon4} title="Slider5 image" />
              <CardMediaWidget src={imageSoon5} title="Slider5 image" />
              <CardMediaWidget src={imageSoon6} title="Slider5 image" />
              <CardMediaWidget src={imageSoon7} title="Slider5 image" />
              <CardMediaWidget src={imageSoon8} title="Slider5 image" />
            </CardMediaWrapper>
          </Grid>
        </Grid>
      </CardContent>
      <CardContent sx={{ padding: { xs: 3, xl: 10 }, margin: '0 auto' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <PageContentWrapper>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h1" color="primary">
                    COMING SOON!!!
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h1" color="secondary">
                        ADAL
                      </Typography>
                      <Typography
                        variant="overline"
                        sx={{ fontSize: '0.9rem' }}
                      >
                        ADAL Education Management System - Built and maintained
                        by Bridge360 INC.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="secondary"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <FiberManualRecordTwoToneIcon
                          sx={{ mr: 0.625, fontSize: '1rem' }}
                        />
                        Pre-School and Grade School
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="secondary"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <FiberManualRecordTwoToneIcon
                          sx={{ mr: 0.625, fontSize: '1rem' }}
                        />
                        Junior High School
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="secondary"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <FiberManualRecordTwoToneIcon
                          sx={{ mr: 0.625, fontSize: '1rem' }}
                        />
                        Senior High School
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="secondary"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <FiberManualRecordTwoToneIcon
                          sx={{ mr: 0.625, fontSize: '1rem' }}
                        />
                        College
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="h5"
                        color="secondary"
                        sx={{ display: 'flex', alignItems: 'center' }}
                      >
                        <FiberManualRecordTwoToneIcon
                          sx={{ mr: 0.625, fontSize: '1rem' }}
                        />
                        TESDA
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                    spacing={2}
                  >
                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                      <SliderWrapper />
                      <Link
                        href="#"
                        variant="inherit"
                        component="div"
                        sx={{
                          width: 'calc(100% - 20px)',
                          mt: 2.5,
                          boxShadow: '0px 45px 45px rgba(30, 136, 229, 0.2)',
                          borderRadius: '8px',
                          overflow: 'hidden',
                          cursor: 'pointer',
                        }}
                        onClick={handleClickOpen}
                      >
                        <Slider />
                      </Link>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                      <Grid
                        container
                        justifyContent="space-between"
                        spacing={2}
                      >
                        <Grid item xs={12}>
                          <Grid container justifyContent="flex-end" spacing={1}>
                            <Grid item>
                              <ButtonBase
                                component={Link}
                                href="https://www.bridge360.ph/"
                                target="_blank"
                              >
                                <Avatar
                                  sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    bgcolor:
                                      theme.palette.mode === 'dark'
                                        ? theme.palette.dark.main
                                        : theme.palette.secondary.light,
                                    color:
                                      theme.palette.mode === 'dark'
                                        ? theme.palette.secondary.main
                                        : theme.palette.secondary.dark,
                                  }}
                                >
                                  <BookIcon />
                                </Avatar>
                              </ButtonBase>
                            </Grid>
                            <Grid item>
                              <ButtonBase
                                component={Link}
                                href="https://www.facebook.com/Bridge360PH"
                                target="_blank"
                              >
                                <Avatar
                                  sx={{
                                    ...theme.typography.commonAvatar,
                                    ...theme.typography.mediumAvatar,
                                    bgcolor:
                                      theme.palette.mode === 'dark'
                                        ? theme.palette.dark.main
                                        : theme.palette.primary.light,
                                    color:
                                      theme.palette.mode === 'dark'
                                        ? theme.palette.primary.main
                                        : theme.palette.primary.dark,
                                  }}
                                >
                                  <FacebookIcon />
                                </Avatar>
                              </ButtonBase>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12}>
                          <Grid
                            container
                            alignItems="center"
                            justifyContent="flex-end"
                            spacing={1}
                          >
                            <Grid item>
                              <Typography
                                variant="body1"
                                align="right"
                                component="div"
                              >
                                Project By
                              </Typography>
                            </Grid>
                            <Grid item>
                              <img src={companyLogo} alt="Berry" width="128" />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </PageContentWrapper>
          </Grid>
        </Grid>
      </CardContent>
    </ComingSoonCard>
  );
};

export default ComingSoon1;
