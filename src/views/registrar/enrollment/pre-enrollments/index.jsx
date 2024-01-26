import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentApplicants } from 'src/features/registrarFeatures/registrarSlice';

const {
  Stack,
  Grid,
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
} = require('@mui/material');

const PreEnrollments = () => {
  const dispatch = useDispatch();
  const [preEnrollmentStatus, setPreEnrollmentStatus] = useState('');
  const { students, isFetchingStudents } = useSelector(
    (state) => state.registrar
  );

  const handleChange = (e) => {
    setPreEnrollmentStatus(
      e.target.value === preEnrollmentStatus ? '' : e.target.value
    );
  };

  useEffect(() => {
    dispatch(getStudentApplicants());
  }, [dispatch]);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between">
        <Stack spacing={1}>
          <Typography variant="h5" color="GrayText">
            Enrollment Data For:
          </Typography>
          <Typography variant="h5" color="GrayText">
            SY 2021-2022 as of 2021-08-01
          </Typography>
        </Stack>

        <Box sx={{ minWidth: 250, mb: 3 }}>
          <FormControl fullWidth>
            <InputLabel id="select-pre-enrollment-filter">
              Pre-Enrollment Status
            </InputLabel>
            <Select
              labelId="select-pre-enrollment-filter"
              id="select-pre-enrollment-filter"
              label="Pre-Enrollment Status"
              value={preEnrollmentStatus}
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              <MenuItem value="will-enroll">Will Enroll</MenuItem>
              <MenuItem value="will-not-enroll">Will Not Enroll</MenuItem>
              <MenuItem value="enrolled">Enrolled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <Stack>
        {isFetchingStudents ? (
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            spacing={2}
          >
            <Box
              sx={{
                margin: '0 auto',
                justifyItems: 'center',
                alignItems: 'center',
              }}
            >
              <CircularProgress size="70px" color="secondary" />
            </Box>
          </Grid>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Student No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Program</TableCell>
                  <TableCell>Units</TableCell>
                  <TableCell>Date Enrolled</TableCell>
                  <TableCell>Intent to Enroll</TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        )}
      </Stack>
    </Stack>
  );
};

export default PreEnrollments;
