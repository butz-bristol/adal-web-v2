// material-ui
import {
  Badge,
  Box,
  CardMedia,
  Container,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

// third-party
import Slider from 'react-slick';

// project imports
import SubCard from 'src/ui-component/cards/SubCard';

// assets
import Angular from 'src/assets/images/landing/frameworks/angular.svg';
import Bootstrap from 'src/assets/images/landing/frameworks/bootstrap.svg';
import Codeigniter from 'src/assets/images/landing/frameworks/codeigniter.svg';
import Django from 'src/assets/images/landing/frameworks/django.svg';
import DotNet from 'src/assets/images/landing/frameworks/dot-net.svg';
import Flask from 'src/assets/images/landing/frameworks/flask.svg';
import FullStack from 'src/assets/images/landing/frameworks/full-stack.svg';
import Shopify from 'src/assets/images/landing/frameworks/shopify.svg';
import Vue from 'src/assets/images/landing/frameworks/vue.svg';

export const frameworks = [
  {
    title: 'Bootstrap 5',
    logo: Bootstrap,
    link: 'https://www.bridge360.ph/',
  },
  {
    title: 'Angular',
    logo: Angular,
    link: 'https://www.bridge360.ph/',
  },
  {
    title: 'CodeIgniter',
    logo: Codeigniter,
    link: 'https://www.bridge360.ph/',
  },
  {
    title: '.Net',
    logo: DotNet,
    link: 'https://www.bridge360.ph/',
  },
  {
    title: 'Shopify',
    logo: Shopify,
    link: '/',
    isUpcoming: true,
  },
  {
    title: 'Vuetify 3',
    logo: Vue,
    link: 'https://www.bridge360.ph/',
  },
  {
    title: 'Full Stack',
    logo: FullStack,
    link: 'https://www.bridge360.ph/',
  },
  {
    title: 'Django',
    logo: Django,
    link: 'https://www.bridge360.ph/',
  },
  {
    title: 'Flask',
    logo: Flask,
    link: 'https://www.bridge360.ph/',
  },
];

// =============================|| LANDING - FRAMWORK SECTION ||============================= //

const FrameworkSection = () => {
  const theme = useTheme();

  const settings = {
    dots: true,
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 7,
    slidesToScroll: 7,
    speed: 500,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1534,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          dots: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          dots: true,
        },
      },
    ],
  };

  return (
    <>
      <Container sx={{ mb: 6 }}>
        <Stack spacing={0.25} alignItems="center">
          <Typography
            variant="h2"
            align="center"
            sx={{ fontSize: { xs: '1.5rem', sm: '2.125rem' } }}
          >
            Lorem ipsum dolor sit amet
          </Typography>
          <Typography variant="body2" align="center" sx={{ pt: 1 }}>
            Lorem ipsum dolor sit amet. Click to{' '}
            <Link
              href="https://www.bridge360.ph/"
              target="_blank"
              underline="hover"
            >
              learn more.
            </Link>
          </Typography>
        </Stack>
      </Container>
      <Box
        sx={{
          overflow: 'hidden',
          div: {
            textAlign: 'center',
          },
          '.slick-track': {
            display: { xs: 'flex', xl: 'inherit' },
          },
          '& .slick-dots': {
            position: 'initial',
            mt: 4,
            '& li button:before': {
              fontSize: '0.75rem',
            },
            '& li.slick-active button:before': {
              opacity: 1,
              color: 'primary.main',
            },
          },
        }}
      >
        <Slider {...settings}>
          {frameworks.map((item, index) => (
            <Badge
              key={index}
              color="primary"
              badgeContent={item.isUpcoming ? 'Coming Soon' : 0}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiBadge-badge': {
                  left: '50%',
                  transform: 'scale(1) translate(-50%, 0)',
                  ...(item.isUpcoming && {
                    bgcolor: 'background.paper',
                    color: 'primary.main',
                    border: '1px solid',
                    borderColor: theme.palette.primary.main,
                  }),
                },
              }}
            >
              <SubCard
                content={false}
                sx={{
                  width: '180px !important',
                  height: 140,
                  // boxShadow: '0px 4px 15px 0px rgba(3, 99, 242, 0.15)',
                  border: 'none',
                  display: 'inline-flex !important',
                  alignItems: 'center',
                  justifyContent: 'center',
                  my: 1,
                  borderRadius: 2,
                  cursor: 'pointer',
                  bgcolor:
                    theme.palette.mode === 'dark' ? 'dark.800' : 'grey.100',
                  '&:hover': {
                    bgcolor:
                      theme.palette.mode === 'dark'
                        ? 'primary.main'
                        : 'primary.light',
                  },
                }}
              >
                <Box
                  component={Link}
                  href={item.link}
                  target="_blank"
                  underline="none"
                  sx={{
                    display: 'flex',
                    flex: 1,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Stack spacing={2} alignItems="center">
                    <Stack
                      sx={{ width: 'auto', height: 48 }}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <CardMedia
                        alt={item.title}
                        src={item.logo}
                        component="img"
                      />
                    </Stack>
                    <Typography variant="h4" sx={{ width: 'max-content' }}>
                      {item.title}
                    </Typography>
                  </Stack>
                </Box>
              </SubCard>
            </Badge>
          ))}
        </Slider>
      </Box>
    </>
  );
};

export default FrameworkSection;
