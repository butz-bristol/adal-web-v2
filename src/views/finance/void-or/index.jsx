import {
  Box,
  Button,
  FormControl,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { IconPlus } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddVoidORNo from 'src/components/finance/AddVoidORNo';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  deleteVoidORNo,
  fetchAllVoidORNos,
  setDynamicData,
  toggleAddVoidORNo,
  toggleEditVoidORNo,
} from 'src/features/financeFeatures/financeSlice';

const VoidReceiptNos = ({ isCashier = false }) => {
  const dispatch = useDispatch();
  const [orID, setOrID] = useState('');
  const [orNo, setOrNo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [10, 25, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { voidORNoList } = useSelector((state) => state.finance);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const { value } = event.target;
    setRowsPerPage(parseInt(value, 10));
    setPage(0);
  };

  const filteredORNumbers = voidORNoList.filter((orNo) => {
    if (searchTerm) {
      return orNo.or_no.toString().includes(searchTerm);
    }

    return orNo;
  });

  const tableData = filteredORNumbers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    dispatch(fetchAllVoidORNos());
  }, [dispatch]);

  return (
    <Stack rowGap={1}>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Box>
          <FormControl fullWidth sx={{ minWidth: 200 }}>
            <TextField
              label={'Receipt No'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </FormControl>
        </Box>

        {!isCashier && (
          <Box>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<IconPlus />}
              onClick={() => dispatch(toggleAddVoidORNo())}
            >
              Add to List
            </Button>
          </Box>
        )}
      </Stack>

      <AddVoidORNo />

      <ConfirmationModal
        isOpen={showModal}
        onCancel={() => {
          setShowModal(false);
          setOrID('');
          setOrNo('');
        }}
        title={'Delete Void OR No'}
        message={`Are you sure you want to delete OR No ${orNo}? This is irreversible.`}
        onConfirm={() => {
          dispatch(deleteVoidORNo(orID));
          setShowModal(false);
          setOrID('');
          setOrNo('');
        }}
      />

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>OR No</TableCell>
                <TableCell>Void Reason</TableCell>
                <TableCell>Void Date/Time</TableCell>
                <TableCell>Voided By</TableCell>
                {!isCashier && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData.map(
                ({ _id, or_no, void_by, void_date, void_reason }) => (
                  <TableRow key={_id}>
                    <TableCell>{or_no}</TableCell>
                    <TableCell>{void_reason || 'N/A'}</TableCell>
                    <TableCell>
                      {DateTime.fromISO(void_date).toLocaleString(
                        DateTime.DATETIME_MED
                      )}
                    </TableCell>
                    <TableCell>{`${void_by.first_name} ${void_by.last_name}`}</TableCell>
                    {!isCashier && (
                      <TableCell>
                        <Stack
                          direction={'row'}
                          spacing={1}
                          alignItems={'center'}
                        >
                          <Button
                            variant="contained"
                            size="small"
                            color="warning"
                            onClick={() => {
                              dispatch(toggleEditVoidORNo());
                              dispatch(
                                setDynamicData({
                                  or_no,
                                  voidOrId: _id,
                                  void_reason,
                                })
                              );
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            variant={'outlined'}
                            color={'secondary'}
                            size="small"
                            onClick={() => {
                              setOrID(_id);
                              setShowModal(true);
                              setOrNo(or_no);
                            }}
                          >
                            Delete
                          </Button>
                        </Stack>
                      </TableCell>
                    )}
                  </TableRow>
                )
              )}

              {tableData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={10}>
                    <Typography variant={'body1'} textAlign={'center'}>
                      No data found.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          rowsPerPageOptions={rowsPerPageOptions}
          count={tableData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
};

export default VoidReceiptNos;
