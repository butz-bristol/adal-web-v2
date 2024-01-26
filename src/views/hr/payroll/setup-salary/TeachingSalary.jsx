import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddTeachingGradeInfo from 'src/components/hr/payroll/AddTeachingGradeInfo';
import AddTeachingLoad from 'src/components/hr/payroll/AddTeachingLoad';
import AddTeachingSalary from 'src/components/hr/payroll/AddTeachingSalary';
import {
  deleteTeachingLoad,
  deleteTeachingSalary,
  fetchTeachingGradeInfos,
  fetchTeachingLoads,
  fetchTeachingPrimaryDesignation,
  fetchTeachingSalary,
  handleChange,
  setTeachingGradeInfo,
  setTeachingLoad,
  setTeachingSalary,
  toggleCreateTeachingGradeInfo,
  toggleCreateTeachingLoad,
  toggleCreateTeachingSalary,
  toggleEditTeachingGradeInfo,
  toggleEditTeachingLoad,
  toggleEditTeachingSalary,
  toggleTeachingPrimaryDesignation,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const TeachingSalary = () => {
  const {
    teaching_salaries,
    teaching_loads,
    teaching_grade_infos,
    teaching_primary_designation,
    isFetchingTeachingPrimaryDesignation,
    isSettingTeachingPrimaryDesignation,
  } = useSelector((state) => state.payroll);
  const dispatch = useDispatch();

  const handlePrimaryDesignation = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.checked }));
    dispatch(toggleTeachingPrimaryDesignation());
  };

  useEffect(() => {
    dispatch(fetchTeachingSalary());
    dispatch(fetchTeachingLoads());
    dispatch(fetchTeachingGradeInfos());
    dispatch(fetchTeachingPrimaryDesignation());
  }, [dispatch]);

  return (
    <Stack spacing={3} p={1}>
      <Box>
        <Grid
          container
          alignItems="center"
          mb={2}
          justifyContent={'space-between'}
        >
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              Teaching Salary
            </Typography>
          </Grid>

          <Grid item xs={2} justifySelf="flex-end" md={2} lg={1}>
            <Button
              type="button"
              variant="contained"
              onClick={() => dispatch(toggleCreateTeachingSalary())}
            >
              Create
            </Button>
          </Grid>
        </Grid>

        <AddTeachingSalary />
        <AddTeachingLoad />
        <AddTeachingGradeInfo />

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  '&:last-child th': {
                    border: 0.5,
                    borderColor: 'rgba(224, 224, 224, 1)',
                  },
                }}
              >
                <TableCell>School Year</TableCell>
                <TableCell>Semester</TableCell>
                <TableCell>Days/Year</TableCell>
                <TableCell>Days/Month</TableCell>
                <TableCell>Hours/Year</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teaching_salaries?.map((salary) => (
                <TableRow key={salary._id}>
                  <TableCell>{salary.school_year}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {salary.semester}
                  </TableCell>
                  <TableCell>{salary.no_of_days_per_year}</TableCell>
                  <TableCell>{salary.days_per_month}</TableCell>
                  <TableCell>{salary.no_of_hours_per_year}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="edit"
                      onClick={() => {
                        dispatch(toggleEditTeachingSalary());
                        dispatch(setTeachingSalary(salary));
                      }}
                    >
                      <EditIcon fontSize="20px" />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="delete"
                      onClick={() => dispatch(deleteTeachingSalary(salary._id))}
                    >
                      <DeleteIcon fontSize="20px" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={6} sx={{ padding: 0 }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={teaching_primary_designation}
                        disabled={
                          isFetchingTeachingPrimaryDesignation ||
                          isSettingTeachingPrimaryDesignation
                        }
                        name="teaching_primary_designation"
                        onChange={handlePrimaryDesignation}
                      />
                    }
                    label="Primary Designation?"
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>

      {/* Teaching Grade Info */}

      <Box>
        <Grid
          container
          alignItems="center"
          mb={2}
          justifyContent={'space-between'}
        >
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              Teaching Grade Info
            </Typography>
          </Grid>

          <Grid item xs={2} justifySelf="flex-end" md={2} lg={1}>
            <Button
              variant="contained"
              onClick={() => dispatch(toggleCreateTeachingGradeInfo())}
            >
              Create
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  '&:last-child th': {
                    border: 0.5,
                    borderColor: 'rgba(224, 224, 224, 1)',
                  },
                }}
              >
                <TableCell>Available Grade Levels</TableCell>
                <TableCell>Available Subjects K-12</TableCell>
                <TableCell>Full Load/Subject/Grade</TableCell>
                <TableCell>Minimum Load/Subject/Grade</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teaching_grade_infos?.map((load) => (
                <TableRow key={load._id}>
                  <TableCell>{load.available_grade_level.grade_name}</TableCell>
                  <TableCell>{load.available_subjects_k12}</TableCell>
                  <TableCell>{load.full_load_per_subject_per_grade}</TableCell>
                  <TableCell>
                    {load.minimum_load_per_subject_per_grade}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="edit"
                      onClick={() => {
                        dispatch(toggleEditTeachingGradeInfo());
                        dispatch(setTeachingGradeInfo(load));
                      }}
                    >
                      <EditIcon fontSize="20px" />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="delete"
                      onClick={() =>
                        dispatch(deleteTeachingGradeInfo(load._id))
                      }
                    >
                      <DeleteIcon fontSize="20px" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* 
      Teaching Load
       */}

      <Box>
        <Grid
          container
          alignItems="center"
          mb={2}
          justifyContent={'space-between'}
        >
          <Grid item xs={4}>
            <Typography variant="h4" gutterBottom>
              Teaching Load
            </Typography>
          </Grid>

          <Grid item xs={2} justifySelf="flex-end" md={2} lg={1}>
            <Button
              variant="contained"
              onClick={() => dispatch(toggleCreateTeachingLoad())}
            >
              Create
            </Button>
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  '&:last-child th': {
                    border: 0.5,
                    borderColor: 'rgba(224, 224, 224, 1)',
                  },
                }}
              >
                <TableCell>Full Load/Subject College Faculty</TableCell>
                <TableCell>Minimum Load/Subject College Faculty</TableCell>
                <TableCell>Full Load/Subject TESDA Faculty</TableCell>
                <TableCell>Minimum Load/Subject TESDA Faculty</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teaching_loads?.map((load) => (
                <TableRow key={load._id}>
                  <TableCell>{load.full_load_college_faculty}</TableCell>
                  <TableCell>{load.minimum_load_college_faculty}</TableCell>
                  <TableCell>{load.full_load_tesda_faculty}</TableCell>
                  <TableCell>{load.minimum_load_tesda_faculty}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="edit"
                      onClick={() => {
                        dispatch(toggleEditTeachingLoad());
                        dispatch(setTeachingLoad(load));
                      }}
                    >
                      <EditIcon fontSize="20px" />
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      sx={{ m: '0.1rem', minWidth: '0' }}
                      aria-label="delete"
                      onClick={() => dispatch(deleteTeachingLoad(load._id))}
                    >
                      <DeleteIcon fontSize="20px" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box></Box>
    </Stack>
  );
};
export default TeachingSalary;
