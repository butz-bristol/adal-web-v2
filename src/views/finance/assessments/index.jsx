import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchStudent,
  fetchStudents,
  handleChange,
  setStudentValues,
} from 'src/features/cashierFeatures/cashierSlice';

const Assessments = () => {
  const dispatch = useDispatch();
  const { student_id, students, student } = useSelector(
    (state) => state.cashier
  );

  const menuProps = {
    PaperProps: {
      style: {
        maxHeight: 58 * 4.5 + 8,
      },
    },
  };

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  useEffect(() => {
    if (student_id) dispatch(fetchStudent(student_id));
  }, [dispatch, student_id]);

  return (
    <Stack>
      <Grid container mb={2} spacing={2}>
        <Grid item xs={12} md={5}>
          <FormControl fullWidth>
            <InputLabel id="select-find-student">Find Student</InputLabel>
            <Select
              labelId="select-find-student"
              id="select-student"
              label="Find Student"
              name="student_id"
              value={student_id}
              onChange={(e) => {
                dispatch(
                  handleChange({ name: e.target.name, value: e.target.value })
                );
                dispatch(setStudentValues({ id: e.target.value }));
              }}
              MenuProps={menuProps}
            >
              {students.map((student) => (
                <MenuItem key={student._id} value={student._id}>
                  {student.student_last_name}, {student.student_first_name}{' '}
                  {student.student_middle_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Assessments;
