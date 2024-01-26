// material-ui
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ComingSoon1 from 'src/views/maintenance/ComingSoon/ComingSoon1';

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Stack>
      <ComingSoon1 />
    </Stack>
  );
};

export default Dashboard;
