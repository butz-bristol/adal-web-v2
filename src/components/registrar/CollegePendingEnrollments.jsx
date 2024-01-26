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
import { IconCircleXFilled, IconDownload } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const TypographyComponent = ({ children }) => (
  <Typography variant="h5" style={{ color: '#fff' }}>
    {children}
  </Typography>
);

const CollegePendingEnrollments = ({
  academic_year,
  enrollments,
  semester,
}) => {
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
              <TableCell>Name/Year</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>S.Y. / Sem</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {(academic_year && semester
              ? enrollments?.filter(
                  (item) =>
                    item?.academic_year?._id === academic_year &&
                    item?.semester?._id === semester
                )
              : academic_year
                ? enrollments?.filter(
                    (item) => item?.academic_year?._id === academic_year
                  )
                : semester
                  ? enrollments?.filter(
                      (item) => item?.semester?._id === semester
                    )
                  : enrollments
            ).map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item?.student?.student_number}</TableCell>
                <TableCell>
                  <Typography variant="h5">
                    {item?.student?.student_last_name},{' '}
                    {item?.student?.student_first_name}{' '}
                    {item?.student?.student_middle_name ?? ''}
                  </Typography>
                  <Typography variant="subtitle2">
                    {item?.year_level?.year_level_name}
                  </Typography>
                </TableCell>
                <TableCell>
                  {item?.student?.student_program?.program_name}
                </TableCell>
                <TableCell>
                  {item?.academic_year?.school_year} -{' '}
                  {item?.semester?.semester_term} Semester
                </TableCell>
                <TableCell>{item?.payment_status}</TableCell>
                <TableCell>
                  <Stack
                    direction={{
                      xs: 'column',
                      sm: 'row',
                      md: 'row',
                    }}
                    alignItems={'center'}
                    spacing={1}
                  >
                    <Tooltip title="Withdraw Enrollment">
                      <IconButton
                        variant="contained"
                        color="primary"
                        onClick={() => toast.info('Feature Coming Soon..')}
                      >
                        <IconCircleXFilled />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Download PDF">
                      <IconButton
                        variant="contained"
                        color="secondary"
                        onClick={() => toast.info('Feature Coming Soon..')}
                      >
                        <IconDownload />
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

export default CollegePendingEnrollments;
