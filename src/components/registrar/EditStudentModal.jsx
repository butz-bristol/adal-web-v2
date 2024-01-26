import {
  Avatar,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
  getStudent,
  handleChange,
  updateStudent,
} from 'src/features/registrarFeatures/registrarSlice';
import { nationalities } from 'src/utils/helperFunctions';

const EditStudentModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const {
    year_levels,
    college_tracks,
    departments,
    student_id,
    student_first_name,
    student_last_name,
    student_middle_name,
    student_personal_email,
    student_number,
    student_contact_number,
    student_permanent_address,
    student_birthdate,
    student_nationality,
    student_gender,
    student_civil_status,
    student_father_name,
    student_father_contact_number,
    student_father_occupation,
    student_mother_name,
    student_mother_contact_number,
    student_mother_occupation,
    student_guardian_name,
    student_guardian_contact_number,
    student_guardian_occupation,
    student_registration_status,
    student_department,
    student_program,
    student_yearlevel,
    student_college_track,
  } = useSelector((state) => state.registrar);
  const { programs } = useSelector((state) => state.academics);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateStudent({
        _id: student_id,
        student_first_name,
        student_last_name,
        student_middle_name,
        student_personal_email,
        student_number,
        student_contact_number,
        student_permanent_address,
        student_birthdate,
        student_nationality,
        student_gender,
        student_civil_status,
        student_father_name,
        student_father_contact_number,
        student_father_occupation,
        student_mother_name,
        student_mother_contact_number,
        student_mother_occupation,
        student_guardian_name,
        student_guardian_contact_number,
        student_guardian_occupation,
        student_registration_status,
        student_department,
        student_program,
        student_yearlevel,
        student_college_track,
      })
    );

    dispatch(getStudent(student_id));

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title">
      <Stack
        component={Paper}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: 450, md: 650 },
          p: 2,
          overflow: 'auto',
          maxHeight: '85vh',
        }}
      >
        <Typography variant="h3" mb={3}>
          Edit Student
        </Typography>

        <Grid container spacing={1.5}>
          <Grid item xs={12} mb={2}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto' }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="First Name"
                variant="outlined"
                name="student_first_name"
                value={student_first_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Last Name"
                variant="outlined"
                name="student_last_name"
                value={student_last_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Middle Name"
                variant="outlined"
                name="student_middle_name"
                value={student_middle_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          {student_registration_status === 'registered' && (
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Student Number"
                  variant="outlined"
                  name="student_number"
                  value={student_number}
                  onChange={handleInputChange}
                  inputProps={{ readOnly: true }}
                />
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Email"
                variant="outlined"
                name="student_personal_email"
                value={student_personal_email}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Birth Date"
                type="date"
                variant="outlined"
                name="student_birthdate"
                value={DateTime.fromISO(student_birthdate).toFormat(
                  'yyyy-MM-dd'
                )}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-gender">Gender</InputLabel>
              <Select
                labelId="select-gender"
                label="Gender"
                variant="outlined"
                name="student_gender"
                value={student_gender}
                onChange={handleInputChange}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Contact Number"
                variant="outlined"
                name="student_contact_number"
                value={student_contact_number}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-civil-status">Civil Status</InputLabel>
              <Select
                labelId="select-civil-status"
                label="Civil Status"
                variant="outlined"
                name="student_civil_status"
                value={student_civil_status}
                onChange={handleInputChange}
              >
                <MenuItem value="Single">Single</MenuItem>
                <MenuItem value="Married">Married</MenuItem>
                <MenuItem value="Divorced">Divorced</MenuItem>
                <MenuItem value="Separated">Separated</MenuItem>
                <MenuItem value="Widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-nationality">Nationality</InputLabel>
              <Select
                labelId="select-nationality"
                label="Nationality"
                variant="outlined"
                name="student_nationality"
                value={student_nationality}
                onChange={handleInputChange}
              >
                {nationalities.map((nationality, index) => (
                  <MenuItem key={index} value={nationality}>
                    {nationality}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Address"
                variant="outlined"
                name="student_permanent_address"
                value={student_permanent_address}
                multiline
                rows={2}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} my={2}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-department">Department</InputLabel>
              <Select
                labelId="select-department"
                label="Department"
                variant="outlined"
                name="student_department"
                value={student_department || ''}
                onChange={handleInputChange}
              >
                {departments
                  ?.filter((department) => department.remarks === 'Active')
                  .map((department) => (
                    <MenuItem key={department._id} value={department._id}>
                      {department?.department_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-college-or-track">
                College/Track
              </InputLabel>
              <Select
                labelId="select-college-or-track"
                label="College/Track"
                variant="outlined"
                name="student_college_track"
                value={student_college_track || ''}
                onChange={handleInputChange}
              >
                {college_tracks
                  .filter(
                    (track) => track?.department?._id === student_department
                  )
                  .map((track) => (
                    <MenuItem key={track._id} value={track._id}>
                      {track.college_track_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-year-or-grade">
                Year/Grade Level
              </InputLabel>
              <Select
                labelId="select-year-or-grade"
                label="Year/Grade Level"
                variant="outlined"
                name="student_yearlevel"
                value={student_yearlevel || ''}
                onChange={handleInputChange}
              >
                {year_levels
                  ?.filter(
                    (year_level) =>
                      year_level?.department?._id === student_department
                  )
                  .map((year_level) => (
                    <MenuItem key={year_level._id} value={year_level._id}>
                      {year_level.year_level_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="select-program">
                Program (if applicable)
              </InputLabel>
              <Select
                labelId="select-program"
                label="Program (if applicable)"
                variant="outlined"
                name="student_program"
                value={student_program || ''}
                onChange={handleInputChange}
              >
                {programs
                  ?.filter(
                    (program) =>
                      program.college_track?._id === student_college_track
                  )
                  .map((program) => (
                    <MenuItem key={program._id} value={program._id}>
                      {program.program_name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} my={2}>
            <Divider />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label={`Father's Name`}
                value={student_father_name}
                name="student_father_name"
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Father's Contact Number"
                variant="outlined"
                name="student_father_contact_number"
                value={student_father_contact_number}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Father's Occupation"
                variant="outlined"
                name="student_father_occupation"
                value={student_father_occupation}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Mother's Name"
                name="student_mother_name"
                value={student_mother_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Mother's Contact Number"
                variant="outlined"
                name="student_mother_contact_number"
                value={student_mother_contact_number}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Mother's Occupation"
                variant="outlined"
                name="student_mother_occupation"
                value={student_mother_occupation}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                label="Guardian's Name"
                name="student_guardian_name"
                value={student_guardian_name}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Guardian's Contact Number"
                variant="outlined"
                name="student_guardian_contact_number"
                value={student_guardian_contact_number}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Guardian's Occupation"
                variant="outlined"
                name="student_guardian_occupation"
                value={student_guardian_occupation}
                onChange={handleInputChange}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} my={2}>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleSubmit}
            >
              Update Student
            </Button>
          </Grid>
        </Grid>
      </Stack>
    </Modal>
  );
};

export default EditStudentModal;
