import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearFamilyBackground,
  createFamilyBackground,
  handleChange,
  toggleAddFamilyBackgroundModal,
  toggleEditFamilyBackgroundModal,
  updateFamilyBackground,
} from 'src/features/users/userSlice';

const AddFamilyBackground = () => {
  const dispatch = useDispatch();
  const {
    isCreatingFamilyBackground,
    isUpdatingFamilyBackground,
    createFamilyBackgroundModal,
    editFamilyBackground,
    father_name,
    father_occupation,
    father_birth_date,
    father_address,
    father_phone,
    mother_name,
    mother_occupation,
    mother_birth_date,
    mother_address,
    mother_phone,
    spouse_name,
    spouse_occupation,
    spouse_birth_date,
    spouse_address,
    spouse_phone,
    children,
    household_gross_income,
    editFamilyBackgroundId,
  } = useSelector((state) => state.users);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  const handleChildrenInput = (i, e) => {
    const name = e.target.name;
    const value = e.target.value;
    const list = [...children];
    list[i] = { ...list[i], [name]: value };

    dispatch(handleChange({ name: 'children', value: list }));
  };

  const handleAddChildren = () => {
    const list = [...children];
    list.push({ child_name: '', child_birth_date: '' });
    dispatch(handleChange({ name: 'children', value: list }));
  };

  const handleRemoveChildren = (i) => {
    const list = [...children];
    list.splice(i, 1);
    dispatch(handleChange({ name: 'children', value: list }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editFamilyBackground) {
      dispatch(
        updateFamilyBackground({
          father_name,
          father_occupation,
          father_birth_date,
          father_address,
          father_phone,
          mother_name,
          mother_occupation,
          mother_address,
          mother_phone,
          mother_birth_date,
          spouse_name,
          spouse_phone,
          spouse_address,
          spouse_birth_date,
          spouse_occupation,
          children,
          household_gross_income,
          editFamilyBackgroundId,
        })
      );
      return;
    }

    dispatch(
      createFamilyBackground({
        father_name,
        father_occupation,
        father_birth_date,
        father_address,
        father_phone,
        mother_name,
        mother_occupation,
        mother_address,
        mother_phone,
        mother_birth_date,
        spouse_name,
        spouse_phone,
        spouse_address,
        spouse_birth_date,
        spouse_occupation,
        children,
        household_gross_income,
      })
    );

    setTimeout(() => {
      dispatch(clearFamilyBackground());
    }, 1000);
  };

  return (
    <Modal
      open={createFamilyBackgroundModal || editFamilyBackground}
      onClose={() => {
        createFamilyBackgroundModal
          ? dispatch(toggleAddFamilyBackgroundModal())
          : dispatch(toggleEditFamilyBackgroundModal());
        dispatch(clearFamilyBackground());
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          bgcolor: 'background.paper',
          borderRadius: '10px',
          padding: '2rem',
        }}
      >
        <Typography variant="h4" sx={{ mb: '2rem' }} component="div">
          {createFamilyBackgroundModal
            ? 'Add Family Background'
            : 'Edit Family Background'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Father's Name"
                variant="outlined"
                name="father_name"
                value={father_name}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Father's Occupation"
                variant="outlined"
                name="father_occupation"
                value={father_occupation}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Father's Phone"
                variant="outlined"
                name="father_phone"
                value={father_phone}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="father_birth_date"></InputLabel>
              <Input
                type="date"
                label="Name"
                variant="outlined"
                name="father_birth_date"
                value={DateTime.fromISO(father_birth_date).toFormat(
                  'yyyy-MM-dd'
                )}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Father's Address"
                variant="outlined"
                name="father_address"
                rows={2}
                multiline
                value={father_address}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Mother's Name"
                variant="outlined"
                name="mother_name"
                value={mother_name}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Mother's Occupation"
                variant="outlined"
                name="mother_occupation"
                value={mother_occupation}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Mother's Phone"
                variant="outlined"
                name="mother_phone"
                value={mother_phone}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="mother_birth_date"></InputLabel>
              <Input
                type="date"
                label="Name"
                variant="outlined"
                name="mother_birth_date"
                value={DateTime.fromISO(mother_birth_date).toFormat(
                  'yyyy-MM-dd'
                )}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Mother's Address"
                variant="outlined"
                name="mother_address"
                rows={2}
                multiline
                value={mother_address}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Spouse's Name"
                variant="outlined"
                name="spouse_name"
                value={spouse_name || ''}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Spouse's Occupation"
                variant="outlined"
                name="spouse_occupation"
                value={spouse_occupation}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Spouse's Phone"
                variant="outlined"
                name="spouse_phone"
                value={spouse_phone || ''}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="spouse_birth_date"></InputLabel>
              <Input
                type="date"
                label="Name"
                variant="outlined"
                name="spouse_birth_date"
                value={
                  DateTime.fromISO(spouse_birth_date).toFormat('yyyy-MM-dd') ||
                  ''
                }
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Spouse's Address"
                variant="outlined"
                name="spouse_address"
                multiline
                rows={2}
                value={spouse_address || ''}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          {children &&
            children?.map((child, index) => (
              <Grid container key={index} p={2} pr={0}>
                <Grid item xs={12} md={6}>
                  <Box style={flexStyles}>
                    <FormControl fullWidth>
                      <TextField
                        label="Child's Name"
                        variant="outlined"
                        name="child_name"
                        value={child.child_name}
                        onChange={(e) => handleChildrenInput(index, e)}
                      />
                    </FormControl>
                    <AddCircleIcon
                      onClick={() => handleAddChildren()}
                      sx={{
                        cursor: 'pointer',
                        color: 'primary.main',
                        fontSize: '2rem',
                      }}
                    />
                    {children.length > 1 && (
                      <RemoveCircleOutlineIcon
                        onClick={() => handleRemoveChildren(index)}
                        sx={{
                          cursor: 'pointer',
                          color: 'error.main',
                          fontSize: '2rem',
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} pr={0}>
                  <FormControl fullWidth>
                    <TextField
                      type="date"
                      label="Child's Birth Date"
                      variant="outlined"
                      name="child_birth_date"
                      value={
                        DateTime.fromISO(child.child_birth_date).toFormat(
                          'yyyy-MM-dd'
                        ) || ''
                      }
                      onChange={(e) => handleChildrenInput(index, e)}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            ))}

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Household Gross Income"
                variant="outlined"
                name="household_gross_income"
                value={household_gross_income}
                onChange={handleInput}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <Button
                type="button"
                onClick={handleSubmit}
                variant="contained"
                disabled={
                  isCreatingFamilyBackground || isUpdatingFamilyBackground
                }
              >
                {createFamilyBackgroundModal ? 'Create' : 'Update'}
              </Button>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

const flexStyles = {
  display: 'flex',
  alignItems: 'center',
};

export default AddFamilyBackground;
