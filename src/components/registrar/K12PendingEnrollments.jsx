import {
  Card,
  CardContent,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconCircleXFilled } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const TypographyComponent = ({ children }) => (
  <Typography variant="h5" style={{ color: '#fff' }}>
    {children}
  </Typography>
);

const K12PendingEnrollments = ({ enrollments, academic_year }) => {
  const dispatch = useDispatch();

  const padding = {
    padding: '15px',
  };

  return (
    <Stack>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        mb={2}
      >
        <Card>
          <CardContent
            style={{
              ...padding,
              backgroundColor: '#740202',
            }}
          >
            <Stack direction={'row'} spacing={2}>
              <TypographyComponent>Withdrawn Enrollments:</TypographyComponent>
              <TypographyComponent>40</TypographyComponent>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            style={{
              ...padding,
              backgroundColor: '#2196f3',
            }}
          >
            <Stack direction={'row'} spacing={2}>
              <TypographyComponent>Withdrawn Enrollments:</TypographyComponent>
              <TypographyComponent>40</TypographyComponent>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent
            style={{
              ...padding,
            }}
          >
            <Stack direction={'row'} spacing={2}>
              <Typography variant="h5" color="secondary">
                Withdrawn Enrollments:
              </Typography>
              <Typography variant="h5" color="secondary">
                40
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Grade</TableCell>
              <TableCell>School Year</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {enrollments
              .filter(
                (item) =>
                  !academic_year || item?.academic_year?._id === academic_year
              )
              .map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item?.student?.student_number}</TableCell>
                  <TableCell>
                    {item?.student?.student_last_name},{' '}
                    {item?.student?.student_first_name}{' '}
                    {item?.student?.student_middle_name ?? ''}
                  </TableCell>
                  <TableCell>{item?.year_level?.year_level_name}</TableCell>
                  <TableCell>{item?.academic_year?.school_year}</TableCell>
                  <TableCell>{item?.payment_status}</TableCell>
                  <TableCell>
                    <Stack direction={{ xs: 'column', sm: 'row', md: 'row' }}>
                      <Tooltip title="Withdraw Enrollment">
                        <IconButton
                          variant="contained"
                          color="primary"
                          onClick={() => toast.info('Feature Coming Soon..')}
                        >
                          <IconCircleXFilled />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default K12PendingEnrollments;
