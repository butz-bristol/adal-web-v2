// material-ui
import {
  Button,
  CardMedia,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project import
import AnimateButton from 'src/ui-component/extended/AnimateButton';

// assets
import LayersTwoToneIcon from '@mui/icons-material/LayersTwoTone';
import { IconCircleCheck } from '@tabler/icons-react';

import LayerLeft from 'src/assets/images/landing/customization-left.png';
import LayerRight from 'src/assets/images/landing/customization-right.png';

// ==============================|| LANDING - CUSTOMIZE ||============================== //

const CustomizeSection = () => {
  const theme = useTheme();
  const listSX = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.7rem',
    padding: '10px 0',
    fontSize: '1rem',
    color: theme.palette.grey[900],
    svg: { color: theme.palette.secondary.main },
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={{ xs: 1.5, sm: 2.5, md: 3, lg: 5 }}
      >
        <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
          <Stack sx={{ width: '75%', mb: 5, mx: 'auto' }}>
            <CardMedia component="img" image={LayerLeft} alt="Layer" />
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Typography
                variant="h5"
                sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}
              >
                Easy Developer Experience
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.primary"
                sx={{
                  fontSize: '1rem',
                  zIndex: '99',
                  width: { xs: '100%', sm: '100%', md: 'calc(100% - 20%)' },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              {/* <Stack direction="row">
                                <AnimateButton>
                                    <Button
                                        startIcon={<LayersTwoToneIcon />}
                                        sx={{ boxShadow: 'none', my: 4 }}
                                        variant="contained"
                                        component={RouterLink}
                                        to="/components/autocomplete"
                                        target="_blank"
                                    >
                                        View All Components
                                    </Button>
                                </AnimateButton>
                            </Stack> */}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' }, mb: 2 }}
              >
                Figma Design System
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.primary"
                sx={{
                  fontSize: '1rem',
                  zIndex: '99',
                  width: { xs: '100%', md: 'calc(100% - 20%)' },
                }}
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Typography sx={listSX}>
                <IconCircleCheck size={20} />
                Lorem ipsum dolor sit amet
              </Typography>
              <Stack direction="row">
                <AnimateButton>
                  <Button
                    startIcon={<LayersTwoToneIcon />}
                    sx={{ boxShadow: 'none', my: 4 }}
                    variant="contained"
                    component={Link}
                    href="https://www.bridge360.ph/"
                    target="_blank"
                  >
                    Explore Figma
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={6} sx={{ img: { width: '100%' } }}>
          <Stack sx={{ width: '70%', mx: 'auto' }}>
            <CardMedia component="img" image={LayerRight} alt="Layer" />
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CustomizeSection;
