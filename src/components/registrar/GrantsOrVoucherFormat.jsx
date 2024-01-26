import {
  Button,
  FormControl,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { IconArrowLeft } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LinkComponent from 'src/components/LinkComponent';
import LoadingScreen from 'src/components/LoadingScreen';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  createGrantsNumberFormat,
  deleteGrantsNumberFormat,
  getGrantsNumberFormats,
  handleChange,
  resetGrantNumberFormat,
  setGrantNumberFormat,
  updateGrantsNumberFormat,
} from 'src/features/registrarFeatures/registrarSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';
import { extractRole } from 'src/utils/helperFunctions';
const GrantsOrVoucherFormat = () => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState('');
  const {
    grantNumberFormats,
    grant_number_format,
    isUpdatingGrantNumberFormat,
    editGrantNumberFormat,
    isDeletingGrantNumberFormat,
    isFetchingGrantNumberFormats,
    editGrantNumberFormatId,
  } = useSelector((state) => state.registrar);
  const { user } = useSelector((state) => state.users);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!grant_number_format) {
      toast.error('Please enter a format for the grant/voucher number');
      return;
    }

    if (editGrantNumberFormat) {
      dispatch(
        updateGrantsNumberFormat({
          id: editGrantNumberFormatId,
          format: grant_number_format,
        })
      );
      dispatch(resetGrantNumberFormat());
      return;
    }

    dispatch(
      createGrantsNumberFormat({
        format: grant_number_format,
      })
    );

    setTimeout(() => {
      dispatch(resetGrantNumberFormat());
    }, 500);
  };

  useEffect(() => {
    dispatch(fetchUserProfile());
    dispatch(getGrantsNumberFormats());
  }, [dispatch]);

  return (
    <Stack>
      <Stack direction={'row'} mb={2} justifyContent="space-between">
        <LinkComponent
          to={`/${extractRole(user.user_role)}/grants-and-vouchers`}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<IconArrowLeft />}
          >
            Back
          </Button>
        </LinkComponent>

        <Stack direction="row" spacing={1}>
          <FormControl fullWidth>
            <TextField
              name="grant_number_format"
              label="Format"
              placeholder="Grant/Voucher No. Format"
              value={grant_number_format}
              onChange={handleInputChange}
              disabled={isUpdatingGrantNumberFormat}
              size="small"
            />
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            onClick={handleSubmit}
            disabled={isUpdatingGrantNumberFormat}
          >
            {editGrantNumberFormat ? 'Update' : 'Create'}
          </Button>

          {editGrantNumberFormat && (
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(resetGrantNumberFormat());
              }}
              disabled={isUpdatingGrantNumberFormat}
            >
              Cancel
            </Button>
          )}
        </Stack>
      </Stack>

      <ConfirmationModal
        isOpen={openModal}
        title="Delete Grant/Voucher"
        message={'Are you sure you want to delete this grant/voucher?'}
        onCancel={() => {
          setOpenModal(false);
          setId('');
        }}
        onConfirm={(e) => {
          e.preventDefault();
          dispatch(deleteGrantsNumberFormat(id));
          setOpenModal(false);
          setId('');
        }}
      />

      {isFetchingGrantNumberFormats ? (
        <LoadingScreen />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Format</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grantNumberFormats.map((grantFormat) => (
                <TableRow key={grantFormat._id}>
                  <TableCell>{grantFormat.format}</TableCell>
                  <TableCell sx={{ textTransform: 'capitalize' }}>
                    {grantFormat?.createdBy?.first_name +
                      ' ' +
                      grantFormat?.createdBy?.last_name}
                  </TableCell>
                  <TableCell>
                    {grantFormat.createdAt
                      ? DateTime.fromISO(grantFormat.createdAt).toFormat(
                          'dd LLL yyyy'
                        )
                      : ''}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => {
                        dispatch(
                          setGrantNumberFormat({
                            format: grantFormat.format,
                            _id: grantFormat._id,
                          })
                        );
                      }}
                      disabled={isDeletingGrantNumberFormat}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{ marginLeft: '0.5rem' }}
                      onClick={() => {
                        setId(grantFormat._id);
                        setOpenModal(true);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};
export default GrantsOrVoucherFormat;
