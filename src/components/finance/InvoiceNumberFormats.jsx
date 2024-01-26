import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
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
import {
  clearDynamicData,
  createInvoiceNumberFormat,
  deleteInvoiceNumberFormat,
  fetchInvoiceNumberFormats,
  handleChange,
  resetInvoiceNumberFormat,
  setInvoiceNumberFormat,
  updateInvoiceNumberFormat,
} from 'src/features/financeFeatures/financeSlice';
import { extractRole } from 'src/utils/helperFunctions';
const InvoiceNumberFormats = () => {
  const dispatch = useDispatch();
  const [editFlag, setEditFlag] = useState(false);
  const { user } = useSelector((state) => state.users);
  const {
    invoiceNumberFormats,
    isFetchingInvoiceNumberFormats,
    isCreatingInvoiceNumberFormat,
    isUpdatingInvoiceNumberFormat,
    isDeletingInvoiceNumberFormat,
    editInvoiceNumberFormatId,
    editInvoiceNumberFormat,
    invoice_number_format,
  } = useSelector((state) => state.finance);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(handleChange({ name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editInvoiceNumberFormat) {
      dispatch(
        updateInvoiceNumberFormat({
          id: editInvoiceNumberFormatId,
          format: invoice_number_format,
        })
      )
        .then((res) => {
          if (res.meta.requestStatus === 'fulfilled') {
            dispatch(clearDynamicData({ invoice_number_format }));
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
      return;
    }

    dispatch(createInvoiceNumberFormat({ format: invoice_number_format }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(clearDynamicData({ invoice_number_format }));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };

  useEffect(() => {
    dispatch(fetchInvoiceNumberFormats());
  }, [dispatch]);

  return (
    <Stack>
      <Stack direction={'row'} mb={2} justifyContent="space-between">
        <LinkComponent
          to={`/${extractRole(user.user_role)}/setup-fees/other-fees`}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<IconArrowLeft />}
          >
            Back
          </Button>
        </LinkComponent>

        <form onSubmit={(e) => e.preventDefault()}>
          <Stack direction="row" spacing={1}>
            <FormControl fullWidth>
              <TextField
                name="invoice_number_format"
                label="Format"
                placeholder="Enter Invoice No. Format"
                value={invoice_number_format}
                onChange={handleInputChange}
                size="small"
                disabled={
                  isCreatingInvoiceNumberFormat || isUpdatingInvoiceNumberFormat
                }
              />
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              type="submit"
              disabled={
                isCreatingInvoiceNumberFormat || isUpdatingInvoiceNumberFormat
              }
            >
              {isCreatingInvoiceNumberFormat || isUpdatingInvoiceNumberFormat
                ? 'Saving...'
                : 'Save'}
            </Button>

            {editInvoiceNumberFormat && (
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  dispatch(resetInvoiceNumberFormat());
                }}
                disabled={
                  isCreatingInvoiceNumberFormat || isUpdatingInvoiceNumberFormat
                }
              >
                Cancel
              </Button>
            )}
          </Stack>
        </form>
      </Stack>

      {isFetchingInvoiceNumberFormats ? (
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
              {invoiceNumberFormats.map((invoiceNumberFormat) => (
                <TableRow key={invoiceNumberFormat._id}>
                  <TableCell>{invoiceNumberFormat.format}</TableCell>
                  <TableCell>
                    {invoiceNumberFormat?.createdBy?.first_name +
                      ' ' +
                      invoiceNumberFormat?.createdBy?.last_name}
                  </TableCell>
                  <TableCell>
                    {invoiceNumberFormat.createdAt
                      ? DateTime.fromISO(
                          invoiceNumberFormat.createdAt
                        ).toFormat('dd LLL yyyy')
                      : ''}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="warning"
                      size="small"
                      onClick={() => {
                        dispatch(
                          setInvoiceNumberFormat({
                            format: invoiceNumberFormat.format,
                            _id: invoiceNumberFormat._id,
                          })
                        );
                      }}
                      disabled={isDeletingInvoiceNumberFormat}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      sx={{ marginLeft: '0.5rem' }}
                      onClick={() =>
                        dispatch(
                          deleteInvoiceNumberFormat(invoiceNumberFormat._id)
                        )
                      }
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

export default InvoiceNumberFormats;
