import {
  Button,
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
  TextField,
  Typography,
} from '@mui/material';
import { IconNotes } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleAddDraftFee } from 'src/features/accountingFeatures/accountingSlice';
import {
  createFee,
  handleChange,
  resetFee,
  toggleEditFee,
  updateFee,
} from 'src/features/financeFeatures/financeSlice';
import styles from './modalBoxStyle';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const CreateDraftFees = () => {
  const {
    fee,
    fee_label,
    fee_type,
    editFee,
    editFeeId,
    isUpdatingFee,
    isCreatingFee,
    tuition_and_fee_id,
    applies_to,
    sections,
    academicYears,
    academic_year,
    feeTypes,
    year_grade_levels,
    tuitionAndFees,
    selectedPrograms,
  } = useSelector((state) => state.finance);
  const { year_levels } = useSelector((state) => state.registrar);
  const { creatingDraftFee } = useSelector((state) => state.accounting);
  const { programs } = useSelector((state) => state.academics);
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const selectedTuitionPlan = tuitionAndFees?.find(
    (tuition) => tuition._id === tuition_and_fee_id
  );

  const isK12 =
    applies_to === 'Pre-School & Grade School' ||
    applies_to === 'Junior High School' ||
    applies_to === 'Senior High School';

  const sortedYearLevels = year_levels
    ?.filter((level) => level?.department?.department_name === applies_to)
    .sort((a, b) => {
      const gradeA = parseInt(a?.year_level_name?.split(' ')[1]);
      const gradeB = parseInt(b?.year_level_name?.split(' ')[1]);

      return gradeA - gradeB;
    });

  const handleLevelSelection = (event) => {
    const selectedLevels = event.target.value;

    const uniqueSelectedLevels = [
      ...new Set(selectedLevels.map((level) => level._id)),
    ].map((id) => selectedLevels.find((level) => level._id === id));

    dispatch(
      handleChange({ name: 'year_grade_levels', value: uniqueSelectedLevels })
    );
  };

  const handleProgramSelection = (event) => {
    const selectedPrograms = event.target.value;

    const uniqueSelectedPrograms = [
      ...new Set(selectedPrograms.map((program) => program._id)),
    ].map((id) => selectedPrograms.find((program) => program._id === id));

    dispatch(
      handleChange({ name: 'selectedPrograms', value: uniqueSelectedPrograms })
    );
  };

  const handleDraftFee = (e) => {
    e.preventDefault();

    if (!fee || !fee_label || !fee_type)
      return toast.error('Please fill all fields');

    if (applies_to === 'Programs' && !selectedPrograms.length)
      return toast.error('Please select at least one program');

    if (isK12 && !year_grade_levels.length)
      return toast.error('Please select at least one year level');

    if (editFee) {
      dispatch(
        updateFee({
          fee,
          id: editFeeId,
          tuition_and_fee_id,
          fee_label,
          fee_type,
          applies_to,
          levels: isK12 ? year_grade_levels.map((level) => level._id) : null,
          programs:
            applies_to === 'Programs'
              ? selectedPrograms.map((program) => program._id)
              : null,
          status: 'draft',
          academic_year: selectedTuitionPlan?.academic_year?._id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(toggleAddDraftFee());
          return dispatch(resetFee());
        }
      });

      return;
    }

    if (creatingDraftFee) {
      dispatch(
        createFee({
          fee,
          tuition_and_fee_id,
          fee_label,
          fee_type,
          applies_to,
          levels: isK12 ? year_grade_levels.map((level) => level._id) : null,
          programs:
            applies_to === 'Programs'
              ? selectedPrograms.map((program) => program._id)
              : null,
          status: 'draft',
          academic_year: selectedTuitionPlan?.academic_year?._id,
        })
      ).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(toggleAddDraftFee());
          return dispatch(resetFee());
        }
      });
    }
  };

  return (
    <Modal
      open={creatingDraftFee || editFee}
      onClose={() => {
        creatingDraftFee
          ? dispatch(toggleAddDraftFee())
          : dispatch(toggleEditFee());
        dispatch(resetFee());
      }}
    >
      <Paper sx={{ ...styles, maxHeight: '90vh', overflowY: 'scroll' }}>
        <Typography variant="h4" gutterBottom>
          {editFee ? 'Edit Fee' : 'Add Fee'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Fee Label"
                  variant="outlined"
                  name="fee_label"
                  value={fee_label}
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Academic Year"
                  variant="outlined"
                  value={selectedTuitionPlan?.academic_year?.school_year || ''}
                  inputProps={{
                    readOnly: true,
                  }}
                  disabled
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-fee_type">Choose Fee Type</InputLabel>
                <Select
                  labelId="choose-a-fee_type"
                  id="choose-fee_type"
                  value={fee_type || ''}
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <TextField
                  label="Fee Amount"
                  variant="outlined"
                  name="fee"
                  value={fee}
                  onChange={handleInput}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                Applies To:
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="choose-a-section">Choose One</InputLabel>
                <Select
                  labelId="choose-a-section"
                  id="choose-section"
                  value={applies_to}
                  name="applies_to"
                  label="Choose One"
                  onChange={handleInput}
                  defaultValue="All"
                >
                  <MenuItem value="Pre-School & Grade School">
                    Pre-School & Grade School
                  </MenuItem>
                  <MenuItem value="Junior High School">
                    Junior High School
                  </MenuItem>
                  <MenuItem value="Programs">Programs/Strands</MenuItem>
                  <MenuItem value="Senior High School">
                    Senior High School
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {applies_to === 'Programs' && (
              <>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-programs-label">
                      Select Program(s)
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-programs-label"
                      id="demo-multiple-programs"
                      multiple
                      value={selectedPrograms}
                      name="selectedPrograms"
                      onChange={handleProgramSelection}
                      input={<OutlinedInput label="Select Program(s)" />}
                      MenuProps={MenuProps}
                      renderValue={(selected) =>
                        selected
                          .map((program) => `${program.program_name}`)
                          .join(', ')
                      }
                    >
                      {programs?.map((program) => (
                        <MenuItem
                          key={program._id}
                          value={{
                            _id: program._id,
                            program_name: program.program_name,
                          }}
                        >
                          {program?.program_name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                {selectedPrograms.length > 0 && (
                  <Grid item xs={12} mt={2}>
                    Selected Program(s):
                    {selectedPrograms.map((program, index) => (
                      <Chip
                        key={index}
                        label={program?.program_name}
                        sx={{ m: 0.5 }}
                        color="secondary"
                        onDelete={() => {
                          const newPrograms = selectedPrograms.filter(
                            (selectedProgram) =>
                              selectedProgram._id !== program._id
                          );
                          dispatch(
                            handleChange({
                              name: 'selectedPrograms',
                              value: newPrograms,
                            })
                          );
                        }}
                      />
                    ))}
                  </Grid>
                )}
              </>
            )}

            {isK12 && (
              <>
                <Grid item xs={8}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-subject-label">
                      Select Year Level(s)
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-subject-label"
                      id="demo-multiple-subject"
                      multiple
                      value={year_grade_levels}
                      name="year_grade_levels"
                      onChange={handleLevelSelection}
                      input={<OutlinedInput label="Select Year Level(s)" />}
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
                </Grid>

                {year_grade_levels?.length > 0 && (
                  <Grid item xs={12} mt={2}>
                    Selected Levels:
                    {year_grade_levels?.map((level, index) => (
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
              </>
            )}

            <Grid item xs={12} mt={2}>
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                {editFee && (
                  <Button
                    variant="contained"
                    color="warning"
                    disabled={isCreatingFee}
                    onClick={() => {
                      dispatch(toggleEditFee());
                      dispatch(resetFee());
                    }}
                  >
                    Cancel
                  </Button>
                )}

                <Button
                  variant="contained"
                  color="secondary"
                  disabled={isCreatingFee}
                  onClick={handleDraftFee}
                  endIcon={<IconNotes stroke={2} size="1.2rem" />}
                >
                  Save Draft
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default CreateDraftFees;
