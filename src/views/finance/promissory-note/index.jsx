import {
  Autocomplete,
  Box,
  Button,
  IconButton,
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
  Tooltip,
  Typography,
} from '@mui/material';
import {
  IconCircleXFilled,
  IconDiscountCheckFilled,
  IconFileDots,
  IconPlus,
} from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import AddPromissoryNote from 'src/components/finance/AddPromissoryNote';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  approvePromissoryNote,
  approveWithPendingRequirementsPromissoryNote,
  fetchAllPromissoryNotes,
  rejectPromissoryNote,
  toggleCreatePromissoryNote,
} from 'src/features/financeFeatures/financeSlice';
import { getRegisteredStudents } from 'src/features/registrarFeatures/registrarSlice';

const PromissoryNotes = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [30, 50, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [student, setStudent] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(null);
  const [id, setId] = useState(null);
  const { students } = useSelector((state) => state.registrar);
  const { promissoryNotes, isFetchingPromissoryNotes } = useSelector(
    (state) => state.finance
  );

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const value = parseInt(event.target.value, 10);
    setRowsPerPage(value);
    setPage(0);
  };

  const tableData = promissoryNotes
    ?.filter((note) => {
      if (student) {
        return note?.student?._id === student?.id && !note?.isArchived;
      }

      return !note?.isArchived;
    })
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  useEffect(() => {
    dispatch(fetchAllPromissoryNotes());
    dispatch(getRegisteredStudents());
  }, [dispatch]);

  return (
    <Stack>
      <Box
        component={Stack}
        direction={'row'}
        justifyContent={'space-between'}
        mb={2}
        alignItems={'center'}
      >
        <Box width={300}>
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
        </Box>

        <Button
          color="secondary"
          variant="contained"
          onClick={() => dispatch(toggleCreatePromissoryNote())}
          startIcon={<IconPlus />}
        >
          Add New
        </Button>
      </Box>

      <ConfirmationModal
        isOpen={openModal}
        title={
          status === 'approve' ||
          status === 'approved with pending requirements'
            ? 'Approve Promissory Note'
            : 'Decline Promissory Note'
        }
        message={`Are you sure you want to ${status} this promissory note?`}
        onCancel={() => {
          setOpenModal(false);
          setId(null);
        }}
        onConfirm={() => {
          if (status === 'approve') {
            dispatch(approvePromissoryNote(id)).then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                setOpenModal(false);
                setId(null);
              }
            });
          } else if (status === 'approved with pending requirements') {
            dispatch(approveWithPendingRequirementsPromissoryNote(id)).then(
              (res) => {
                if (res.meta.requestStatus === 'fulfilled') {
                  setOpenModal(false);
                  setId(null);
                }
              }
            );
          } else {
            dispatch(rejectPromissoryNote(id)).then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                setOpenModal(false);
                setId(null);
              }
            });
          }

          setId(null);
        }}
      />

      <AddPromissoryNote />

      {isFetchingPromissoryNotes ? (
        <LoadingData />
      ) : (
        <>
          <Paper>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Request Date</TableCell>
                    <TableCell>Payment Date</TableCell>
                    <TableCell>Actions</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {tableData.map((promissoryNote) => (
                    <TableRow key={promissoryNote._id}>
                      <TableCell>
                        <Typography>
                          {promissoryNote?.student?.student_first_name}{' '}
                          {promissoryNote?.student?.student_last_name}
                        </Typography>

                        <Typography variant="caption">
                          {promissoryNote.student.student_number}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {promissoryNote?.reason === 'Others'
                          ? promissoryNote?.otherReason
                          : promissoryNote.reason}
                      </TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {promissoryNote.status}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(
                          promissoryNote?.promissoryNoteDate
                        ).toLocaleString(DateTime.DATE_MED)}
                      </TableCell>
                      <TableCell>
                        {DateTime.fromISO(
                          promissoryNote?.promissoryNotePaymentDate
                        ).toLocaleString(DateTime.DATE_MED)}
                      </TableCell>
                      <TableCell sx={{ p: 0 }}>
                        <Stack direction={'row'} spacing={1}>
                          <Tooltip title="Approve">
                            <span>
                              <IconButton
                                color="success"
                                onClick={() => {
                                  setOpenModal(true);
                                  setStatus('approve');
                                  setId(promissoryNote._id);
                                }}
                                disabled={promissoryNote.status === 'approved'}
                              >
                                <IconDiscountCheckFilled />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title="Approve with pending requirements">
                            <span>
                              <IconButton
                                color="primary"
                                onClick={() => {
                                  setOpenModal(true);
                                  setStatus(
                                    'approved with pending requirements'
                                  );
                                  setId(promissoryNote._id);
                                }}
                                disabled={
                                  promissoryNote.status ===
                                  'approved with pending requirements'
                                }
                              >
                                <IconFileDots />
                              </IconButton>
                            </span>
                          </Tooltip>
                          <Tooltip title="Decline">
                            <span>
                              <IconButton
                                color="error"
                                onClick={() => {
                                  setOpenModal(true);
                                  setStatus('decline');
                                  setId(promissoryNote._id);
                                }}
                                disabled={promissoryNote.status === 'rejected'}
                              >
                                <IconCircleXFilled />
                              </IconButton>
                            </span>
                          </Tooltip>

                          {/* <Tooltip title="Edit">
                            <IconButton
                              color="primary"
                              onClick={() => {
                                dispatch(toggleEditPromissoryNote());
                                dispatch(
                                  setDynamicData({
                                    promissory_note_id: promissoryNote._id,
                                    promissory_note_reason: promissoryNote.reason,
                                    promissory_note_document: promissoryNote.document,
                                    promissory_note_payment_date: promissoryNote.promissoryNotePaymentDate,
                                    promissory_note_request_date: promissoryNote.promissoryNoteDate,
                                    student_id: promissoryNote.student._id,
                                    promissory_note_other_reason: promissoryNote.otherReason
                                  })
                                );
                                dispatch(
                                  handleFileUploadChange({
                                    name: 'promissory_note_document',
                                    value: promissoryNote.file
                                  })
                                );
                              }}
                            >
                              <IconEdit />
                            </IconButton>
                          </Tooltip> */}
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <LinkComponent
                          to={`/finance/students/promissory-notes/${promissoryNote._id}`}
                        >
                          <Button
                            size="small"
                            color="warning"
                            variant="contained"
                          >
                            View
                          </Button>
                        </LinkComponent>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>

          <TablePagination
            page={page}
            component="div"
            count={tableData.length}
            rowsPerPageOptions={rowsPerPageOptions}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </Stack>
  );
};

export default PromissoryNotes;
