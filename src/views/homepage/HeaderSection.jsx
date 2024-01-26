import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

// third party
import { motion } from 'framer-motion';

// project imports
import AnimateButton from 'src/ui-component/extended/AnimateButton';

// assets
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SystemImages from 'src/components/Images';

const HeaderAnimationImage = styled('img')({
  maxWidth: '100%',
  filter: 'drop-shadow(0px 0px 50px rgb(33 150 243 / 30%))',
});

// ==============================|| LANDING - HEADER PAGE ||============================== //

const HeaderSection = () => {
  const theme = useTheme();
  const HeaderAnimationImageMemo = useMemo(
    () => (
      <HeaderAnimationImage
        src={
          theme.palette.mode === 'dark'
            ? SystemImages.BgDark
            : SystemImages.BgLight
        }
        alt="Berry"
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          filter: 'none',
          bottom: { md: 0 },
          right: 0,
          width: '50%',
          transformOrigin: '50% 50%',
        }}
      />
    ),
    [theme]
  );

  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: { xs: 10, sm: 6, md: 30 }, mb: { xs: 2.5, md: 10 } }}
      >
        <Grid item xs={12} md={5}>
          <Grid container spacing={6}>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
              >
                <Stack spacing={1}>
                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    variant="h1"
                    sx={{ fontSize: '4rem' }}
                  >
                    ADAL
                  </Typography>

                  <Typography
                    textAlign={{ xs: 'center', md: 'left' }}
                    variant="h2"
                    sx={{ fontSize: '3rem' }}
                    color="primary"
                  >
                    Education Management System
                  </Typography>
                </Stack>
              </motion.div>
            </Grid>

            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.4,
                }}
              >
                <Grid
                  container
                  spacing={2}
                  sx={{ justifyContent: { xs: 'center', md: 'flex-start' } }}
                >
                  <Grid item>
                    <AnimateButton>
                      <Button
                        component={RouterLink}
                        to="/login"
                        target="_blank"
                        size="large"
                        variant="contained"
                        color="secondary"
                        startIcon={<PlayArrowIcon />}
                      >
                        Student Portal
                      </Button>
                    </AnimateButton>
                  </Grid>
                  <Grid item>
                    <Button
                      component={Link}
                      href="/applicants"
                      target="_blank"
                      size="large"
                    >
                      Enroll Now
                    </Button>
                  </Grid>
                </Grid>
              </motion.div>
            </Grid>
            <Grid item xs={12}>
              <motion.div
                initial={{ opacity: 0, translateY: 550 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 150,
                  damping: 30,
                  delay: 0.6,
                }}
              ></motion.div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={7} sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Box
            sx={{
              zIndex: 9,
              position: 'relative',
              animation: '5s slideY linear infinite',
              animationDelay: '2s',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: 'spring',
                stiffness: 150,
                damping: 30,
                delay: 0.4,
              }}
            >
              <HeaderAnimationImage
                sx={{
                  position: 'relative',
                  right: { lg: -100, md: 0 },
                  borderRadius: 16,
                  width: { md: 800, lg: 1000 },
                }}
                src={SystemImages.landing}
                alt="ADAL"
              />
            </motion.div>
          </Box>
          {HeaderAnimationImageMemo}
        </Grid>
      </Grid>
    </Container>
  );
};

export default HeaderSection;
