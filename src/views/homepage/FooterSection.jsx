import PublicIcon from '@mui/icons-material/Public';
import {
  Box,
  Container,
  IconButton,
  Link,
  Stack,
  Typography,
} from '@mui/material'; // Divider

const FooterSection = () => {
  return (
    <Box sx={{ bgcolor: 'dark.dark', py: { xs: 3, sm: 1.5 } }}>
      <Container>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          spacing={{ xs: 1.5, sm: 1, md: 3 }}
        >
          <Typography color="text.secondary">
            © ADAL is managed by{' '}
            <Link
              href="https://www.bridge360.ph/"
              target="_blank"
              underline="hover"
            >
              Bridge360 Inc.
            </Link>
          </Typography>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 3, sm: 1.5, md: 2 }}
          >
            <IconButton
              size="small"
              component={Link}
              href="https://www.bridge360.ph/"
              target="_blank"
            >
              <PublicIcon
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'error.main' },
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default FooterSection;
