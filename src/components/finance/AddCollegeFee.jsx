import {
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'src/components/modalBoxStyle';
import {
  clearDynamicData,
  handleChange,
} from 'src/features/financeFeatures/financeSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const AddCollegeFee = () => {
  const dispatch = useDispatch();
  const {
    collegeFeeMode,
    collegeFeeId,
    academic_year,
    feeTypes,
    fee_type,
    collegeTrack,
    year_grade_levels,
    program_id,
    subject_id,
  } = useSelector((state) => state.finance);
  const { programs, collegeSubjects } = useSelector((state) => state.academics);
  const { academic_years, college_tracks, year_levels } = useSelector(
    (state) => state.registrar
  );

  const add = collegeFeeMode === 'add';
  const edit = collegeFeeMode === 'edit';

  const clearData = () => {
    dispatch(
      clearDynamicData({
        collegeFeeMode,
        collegeFeeId,
      })
    );
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const sortedYearLevels = year_levels
    ?.filter((level) => level?.department?.department_name === 'College')
    .sort((a, b) => {
      const getNumericValue = (str) =>
        parseInt(str.year_level_name.match(/\d+/)[0]);

      const aNumericValue = getNumericValue(a);
      const bNumericValue = getNumericValue(b);

      return aNumericValue - bNumericValue;
    });

  const handleLevelSelection = (event) => {
    const selectedLevels = event.target.value;

    const uniqueSelectedLevels = [
      ...new Set(selectedLevels.map((subject) => subject._id)),
    ].map((id) => selectedLevels.find((subject) => subject._id === id));

    dispatch(
      handleChange({ name: 'year_grade_levels', value: uniqueSelectedLevels })
    );
  };

  return (
    <Modal open={add || edit} onClose={() => clearData()}>
      <Paper sx={{ ...styles }}>
        <Typography variant="h4" mb={2}>
          {add ? 'Add College Fee' : edit ? 'Edit College Fee' : ''}
        </Typography>

        <form onSubmit={(e) => e.preventDefault()}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="select-academic-year">Academic Year</InputLabel>
                <Select
                  id="select-academic-year"
                  label="Academic Year"
                  name="academic_year"
                  value={academic_year}
                  onChange={handleInput}
                  required
                >
                  {academic_years?.map((academic_year) => (
                    <MenuItem key={academic_year._id} value={academic_year._id}>
                      {academic_year.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormControl fullWidth>
                  <InputLabel id="demo-multiple-subject-label">
                    College/Track
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-subject-label"
                    id="demo-multiple-subject"
                    value={collegeTrack}
                    name="collegeTrack"
                    onChange={handleInput}
                    input={<OutlinedInput label="College/Track" />}
                  >
                    {college_tracks?.map((collegeTrack) => (
                      <MenuItem key={collegeTrack._id} value={collegeTrack._id}>
                        {collegeTrack.college_track_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="year-level-label">Program</InputLabel>
                <Select
                  labelId="year-level-label"
                  id="program_id"
                  name="program_id"
                  value={program_id}
                  label="Program"
                  onChange={handleInput}
                  variant="outlined"
                >
                  {programs
                    .filter(
                      (program) => program?.college_track?._id === collegeTrack
                    )
                    .map((program) => (
                      <MenuItem key={program._id} value={program._id}>
                        {program.program_name}
                      </MenuItem>
                    ))
                    .sort(
                      (a, b) =>
                        (a?.props?.children?.toLowerCase() >
                          b?.props?.children?.toLowerCase() &&
                          1) ||
                        -1
                    )}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel id="select-college-subject">Subject</InputLabel>
                <Select
                  id="select-college-subject"
                  label="Subject"
                  name="subject_id"
                  value={subject_id}
                  onChange={handleInput}
                >
                  {collegeSubjects?.map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      <Stack>
                        <Typography variant="h5">
                          {subject.course_name} - {subject.course_code}
                        </Typography>
                        <Typography variant="subtitle2">
                          {subject?.program?.program_name} -{' '}
                          {subject?.year_level?.year_level_name}
                        </Typography>
                        <Typography variant="subtitle2">
                          {subject?.semester?.semester_term} Semester
                        </Typography>
                      </Stack>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-fee_type">Choose Fee Type</InputLabel>
                <Select
                  labelId="choose-a-fee_type"
                  id="choose-fee_type"
                  value={fee_type}
                  name="fee_type"
                  label="Choose Fee Type"
                  onChange={handleInput}
                >
                  {feeTypes.map((feeType) => (
                    <MenuItem key={feeType._id} value={feeType._id}>
                      {feeType.fee_type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="demo-multiple-subject-label">
                  Year Level
                </InputLabel>
                <Select
                  labelId="demo-multiple-subject-label"
                  id="demo-multiple-subject"
                  multiple
                  value={year_grade_levels}
                  name="year_grade_levels"
                  onChange={handleLevelSelection}
                  input={<OutlinedInput label="Year Level" />}
                  MenuProps={MenuProps}
                  renderValue={(selected) =>
                    selected
                      .map((level) => `${level.year_level_name}`)
                      .join(', ')
                  }
                >
                  {sortedYearLevels?.map((level) => (
                    <MenuItem
                      key={level._id}
                      value={{
                        _id: level._id,
                        year_level_name: level.year_level_name,
                      }}
                    >
                      {level?.year_level_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {year_grade_levels.length > 0 && (
                <Grid item xs={12} mt={2}>
                  Selected Levels:
                  {year_grade_levels.map((level, index) => (
                    <Chip
                      key={index}
                      label={`${level?.year_level_name}`}
                      sx={{ m: 0.5 }}
                      color="secondary"
                      onDelete={() => {
                        const newYearLevels = year_grade_levels.filter(
                          (selectedLevel) => selectedLevel._id !== level._id
                        );
                        dispatch(
                          handleChange({
                            name: 'year_grade_levels',
                            value: newYearLevels,
                          })
                        );
                      }}
                    />
                  ))}
                </Grid>
              )}
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};
export default AddCollegeFee;
