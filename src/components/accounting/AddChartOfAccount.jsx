import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {
  clearChartOfAccount,
  createChartOfAccount,
  handleChange,
  toggleCreateChartOfAccount,
  toggleEditChartOfAccount,
  updateChartOfAccount,
} from 'src/features/accountingFeatures/accountingSlice';
import { formatMonthDay } from 'utils/dateFunctions';

const AddChartOfAccount = () => {
  const {
    editChartOfAccount,
    createChartOfAccountStatus,
    chart_of_account_id,
    editChartOfAccountId,
    isUpdatingChartOfAccount,
    isCreatingChartOfAccount,
    chart_of_account,
    chart_of_accounts,
    fiscal_years,
    fiscalYear,
  } = useSelector((state) => state.accounting);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const chartOfAccountExists = chart_of_accounts.find((chart_of_account) => {
    return (
      !chart_of_account.isArchived &&
      chart_of_account.fiscalYear?._id === fiscalYear
    );
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!fiscalYear) {
        toast.error('Fiscal Year is required');
        return;
      }

      if (chartOfAccountExists) {
        toast.error('Chart Of Account  already exists');
        return;
      }

      if (editChartOfAccount) {
        dispatch(
          updateChartOfAccount({
            fiscalYear,
            updatedBy: user.userId,
            id: editChartOfAccountId,
          })
        );
        return handleClose();
      } else {
        dispatch(
          createChartOfAccount({
            fiscalYear: fiscalYear,
            createdBy: user.userId,
          })
        );
        return handleClose();
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    createChartOfAccountStatus
      ? dispatch(toggleCreateChartOfAccount())
      : dispatch(toggleEditChartOfAccount());
    dispatch(clearChartOfAccount());
  };

  return (
    <Modal
      open={createChartOfAccountStatus || editChartOfAccount}
      onClose={handleClose}
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          {editChartOfAccount
            ? 'Edit Chart of Account Label'
            : 'Add Chart of Account Label'}
        </Typography>

        <form>
          <Grid container spacing={2} mt={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="account">Fiscal Year </InputLabel>
                <Select
                  id="fiscal_year-select"
                  label="fiscal Year"
                  name="fiscalYear"
                  value={fiscalYear || ''}
                  onChange={handleInputChange}
                >
                  {fiscal_years?.map((fiscal_year) => (
                    <MenuItem key={fiscal_year._id} value={fiscal_year._id}>
                      {formatMonthDay(fiscal_year?.start_date)} to{' '}
                      {formatMonthDay(fiscal_year?.end_date)} :{' '}
                      {fiscal_year?.academic_year?.school_year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                disabled={!editChartOfAccount && !fiscalYear}
              >
                {createChartOfAccountStatus ? 'Add New' : 'Update'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
};

export default AddChartOfAccount;
