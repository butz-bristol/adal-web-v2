import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddSalaryGradeGuide from 'src/components/hr/payroll/AddSalaryGradeGuide';
import SalaryGradeGuide from 'src/components/hr/payroll/SalaryGradeGuide';
import {
  fetchAllSalaryGradeGuides,
  toggleCreateSalaryGradeGuide,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const SalaryGradeGuides = () => {
  const dispatch = useDispatch();
  const { salary_grade_guides, isFetchingSalaryGradeGuide } = useSelector(
    (state) => state.payroll
  );

  useEffect(() => {
    dispatch(fetchAllSalaryGradeGuides());
  }, [dispatch]);

  return (
    <Stack>
      <Box mb="1rem">
        <Button
          variant="contained"
          onClick={() => dispatch(toggleCreateSalaryGradeGuide())}
        >
          Add Salary Grade Guide
        </Button>
      </Box>

      <AddSalaryGradeGuide />

      {isFetchingSalaryGradeGuide ? (
        <Grid
          container
          width="100%"
          justifyItems="center"
          alignItems="center"
          minHeight="200px"
        >
          <Box
            sx={{
              margin: '0 auto',
              justifyItems: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress size="70px" />
          </Box>
        </Grid>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Salary Grade</TableCell>
                <TableCell>Basic Salary</TableCell>
                <TableCell>Overtime Rate</TableCell>
                <TableCell>Minimum Salary</TableCell>
                <TableCell>Maximum Salary</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {salary_grade_guides.map((grade_guide, index) => (
                <SalaryGradeGuide
                  {...grade_guide}
                  index={index}
                  key={grade_guide._id}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};

export default SalaryGradeGuides;
