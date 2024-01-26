import {
  Autocomplete,
  Button,
  CircularProgress,
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
import { IconCloudDownload } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from 'src/components/modalBoxStyle';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearFile,
  removeFileFromAWS,
} from 'src/features/fileUploadFeatures/fileUploadSlice';
import {
  addPromissoryNote,
  clearDynamicData,
  fetchPromissoryNote,
  handleChange,
  toggleCreatePromissoryNote,
  toggleEditPromissoryNote,
  updatePromissoryNote,
} from 'src/features/financeFeatures/financeSlice';
import { ExternalLinkComponent } from '../OtherComponents';

const AddPromissoryNote = () => {
  const dispatch = useDispatch();
  const [student, setStudent] = useState('');
  const [removeFile, setRemoveFile] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState(null);
  const { promissory_note_document, isProcessingFile } = useSelector(
    (state) => state.fileUpload
  );
  const { user } = useSelector((state) => state.users);
  const {
    student_id,
    createPromissoryNote,
    editPromissoryNote,
    promissory_note_id,
    promissory_note_reason,
    promissory_note_payment_date,
    promissory_note_request_date,
    promissory_note_other_reason,
    isCreatingPromissoryNote,
  } = useSelector((state) => state.finance);
  const { students } = useSelector((state) => state.registrar);

  const options = students
    .filter((student) => student.student_registration_status === 'registered')
    .map((student) => {
      const first_name = student?.student_first_name;
      const last_name = student?.student_last_name;

      return {
        label: `${first_name} ${last_name}`,
        id: student._id,
        department: student?.student_department?.department_name,
        year_level: student?.student_yearlevel?._id,
      };
    });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    dispatch(handleChange({ name, value }));
  };

  const clearData = () => {
    dispatch(
      clearDynamicData({
        promissory_note_id,
        promissory_note_reason,
        promissory_note_payment_date,
        promissory_note_request_date,
      })
    );

    dispatch(clearFile());
    setFile(null);

    createPromissoryNote
      ? dispatch(toggleCreatePromissoryNote())
      : dispatch(toggleEditPromissoryNote());

    setStudent('');
  };

  const handleDelete = (fileName) => {
    dispatch(
      removeFileFromAWS({
        key: `academic-documents/${fileName}`,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      student: student.id,
      reason: promissory_note_reason,
      file: promissory_note_document,
      promissoryNoteDate: promissory_note_request_date,
      promissoryNotePaymentDate: promissory_note_payment_date,
      otherReason: promissory_note_other_reason,
      createdBy: user.userId,
    };

    if (editPromissoryNote) {
      dispatch(
        updatePromissoryNote({
          id: promissory_note_id,
          ...data,
        })
      ).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(fetchPromissoryNote(promissory_note_id));
          clearData();
          return;
        }
      });
    } else {
      dispatch(addPromissoryNote(data)).then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          clearData();
          return;
        }
      });
    }
  };

  useEffect(() => {
    if (editPromissoryNote) {
      const student = students.find((student) => student._id === student_id);
      setStudent({
        label: `${student?.student_first_name} ${student?.student_last_name}`,
        id: student?._id,
        department: student?.student_department?.department_name,
        year_level: student?.student_yearlevel?._id,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, editPromissoryNote, student_id]);

  return (
    <Modal
      open={createPromissoryNote || editPromissoryNote}
      onClose={() => clearData()}
    >
      <Paper sx={{ ...styles }}>
        <Typography variant="h4" mb={2}>
          {createPromissoryNote
            ? 'Create Promissory Note'
            : 'Edit Promissory Note'}
        </Typography>

        <ConfirmationModal
          isOpen={removeFile}
          title="Delete File Upload"
          message={
            'Are you sure you want to delete this file attached to this promissory note?'
          }
          onCancel={() => {
            setRemoveFile(false);
          }}
          onConfirm={() => {
            handleDelete(promissory_note_document.file);

            if (editPromissoryNote) {
              dispatch(
                updatePromissoryNote({
                  id: promissory_note_id,
                  file: '',
                })
              ).then((res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                  dispatch(fetchPromissoryNote(promissory_note_id));
                }
              });
            }

            setRemoveFile(false);
            dispatch(clearFile());
            setFile(null);
          }}
        />

        <form>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Autocomplete
                  id="student"
                  options={options}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      label="Student"
                      variant="outlined"
                    />
                  )}
                  value={student}
                  onChange={(event, value) => {
                    setStudent(value);
                  }}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  inputValue={inputValue}
                  inputMode="search"
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="reason" required>
                  Reason
                </InputLabel>
                <Select
                  id="reason"
                  label="Reason"
                  labelId="reason"
                  value={promissory_note_reason}
                  name="promissory_note_reason"
                  onChange={handleInputChange}
                >
                  <MenuItem value="Family Emergency">Family Emergency</MenuItem>
                  <MenuItem value="Medical Emergency">
                    Medical Emergency
                  </MenuItem>
                  <MenuItem value="Financial Emergency">
                    Financial Emergency
                  </MenuItem>
                  <MenuItem value="Others">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {promissory_note_reason === 'Others' && (
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <TextField
                    id="other_reason"
                    label="Specify Reason"
                    fullWidth
                    value={promissory_note_other_reason}
                    name="promissory_note_other_reason"
                    onChange={handleInputChange}
                  />
                </FormControl>
              </Grid>
            )}

            <Grid item xs={12} md={6}>
              <TextField
                id="request_date"
                label="Request Date"
                type="date"
                fullWidth
                value={DateTime.fromISO(promissory_note_request_date).toFormat(
                  'yyyy-MM-dd'
                )}
                name="promissory_note_request_date"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                id="payment_date"
                label="Payment Date"
                type="date"
                fullWidth
                value={DateTime.fromISO(promissory_note_payment_date).toFormat(
                  'yyyy-MM-dd'
                )}
                name="promissory_note_payment_date"
                onChange={handleInputChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              {promissory_note_document && (
                <ExternalLinkComponent to={promissory_note_document}>
                  <IconCloudDownload color="#0b7a39" />
                </ExternalLinkComponent>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              md={promissory_note_reason === 'Others' ? 12 : 6}
            >
              <Stack spacing={1} direction={'row'} justifyContent={'flex-end'}>
                <Button
                  onClick={() => {
                    clearData();
                  }}
                  variant="contained"
                  color="warning"
                >
                  Cancel
                </Button>

                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={isProcessingFile}
                >
                  {isCreatingPromissoryNote ? <CircularProgress /> : 'Submit'}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddPromissoryNote;
