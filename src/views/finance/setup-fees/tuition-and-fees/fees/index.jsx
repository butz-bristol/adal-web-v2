import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { IconArrowLeft, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import LoadingScreen from 'src/components/LoadingScreen';
import AddFee from 'src/components/finance/AddFee';
import FeeApprovalModal from 'src/components/finance/FeeApprovalModal';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import {
  deleteFee,
  fetchAllFeeTypes,
  fetchAllFees,
  fetchAllTuitionAndFees,
  handleChange,
  resetTuitionAndFeeId,
  setFee,
  toggleApproveFeeModal,
  toggleCreateFee,
} from 'src/features/financeFeatures/financeSlice';
import { getAllYearLevels } from 'src/features/registrarFeatures/registrarSlice';
import { formatSalary } from 'src/utils/helperFunctions';
const Fee = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 40, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [openModal, setOpenModal] = useState(false);
  const [feeId, setFeeId] = useState('');
  const [appliesTo, setAppliesTo] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [program, setProgram] = useState('');
  const [label, setLabel] = useState('');
  const { year_levels } = useSelector((state) => state.registrar);
  const { programs } = useSelector((state) => state.academics);
  const {
    tuition_and_fee_id,
    fees,
    isFetchingFees,
    isUpdatingFee,
    isCreatingFee,
    isDisapprovingFee,
    isRejectingFees,
    isDeletingFee,
  } = useSelector((state) => state.finance);

  const isK12 =
    appliesTo === 'Pre-School & Grade School' ||
    appliesTo === 'Junior High School' ||
    appliesTo === 'Senior High School';

  const sortedYearLevels = year_levels
    ?.filter((level) => level?.department?.department_name === appliesTo)
    .sort((a, b) => {
      const gradeA = parseInt(a?.year_level_name?.split(' ')[1]);
      const gradeB = parseInt(b?.year_level_name?.split(' ')[1]);

      return gradeA - gradeB;
    });

  const filteredFees = fees
    ?.filter((fee) => fee.status === 'approved')
    .filter((fee) => {
      if (label) {
        return fee.fee_label.toLowerCase().includes(label.toLowerCase());
      }

      if (appliesTo === 'Programs' && program) {
        return fee?.programs?.find((p) => p._id === program._id);
      } else if (isK12 && yearLevel) {
        return fee?.levels?.find((l) => l._id === yearLevel._id);
      }

      return fee;
    });

  const tableData = filteredFees.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    dispatch(fetchAllFeeTypes());
    dispatch(getAllYearLevels());
    dispatch(getAllPrograms());
    dispatch(fetchAllTuitionAndFees());

    if (tuition_and_fee_id) {
      dispatch(fetchAllFees(tuition_and_fee_id));
    }
  }, [dispatch, tuition_and_fee_id]);

  useEffect(() => {
    setProgram('');
    setYearLevel('');
    setPage(0);
  }, [appliesTo, label]);

  return (
    <Stack>
      <Stack
        direction="row"
        mb={2}
        width={'100%'}
        justifyContent="space-between"
      >
        <LinkComponent
          to="/finance/setup-fees/tuition-and-fees"
          onClick={() => dispatch(resetTuitionAndFeeId())}
        >
          <Button startIcon={<IconArrowLeft />} variant="outlined">
            Back
          </Button>
        </LinkComponent>

        <Stack direction="row" spacing={1} alignItems={'center'}>
          <Box>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <TextField
                id="search-label"
                label="Search Label"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
              />
            </FormControl>
          </Box>

          <Box>
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="choose-a-section">Applies To</InputLabel>
              <Select
                labelId="choose-a-section"
                id="choose-section"
                value={appliesTo}
                name="appliesTo"
                label="Choose One"
                onChange={(e) => {
                  setPage(0);
                  setAppliesTo(e.target.value);
                }}
                defaultValue="All"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
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
          </Box>

          {appliesTo === 'Programs' && (
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="programs-label">Select Program</InputLabel>
              <Select
                labelId="programs-label"
                id="programs"
                value={program}
                onChange={(e) => setProgram(e.target.value)}
                label="Select Program"
                MenuProps={{
                  style: {
                    maxHeight: '300px',
                  },
                }}
              >
                <MenuItem value="" defaultValue={''}>
                  <em>Select One</em>
                </MenuItem>
                {programs?.map((program) => (
                  <MenuItem key={program._id} value={program}>
                    {program.program_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          {isK12 && (
            <FormControl fullWidth sx={{ minWidth: 200 }}>
              <InputLabel id="year-level-label">Select Year Level</InputLabel>
              <Select
                labelId="year-level-label"
                id="year-level"
                value={yearLevel}
                onChange={(e) => setYearLevel(e.target.value)}
                label="Select Year Level"
                MenuProps={{
                  style: {
                    maxHeight: '300px',
                  },
                }}
              >
                <MenuItem value="" defaultValue={''}>
                  <em>Select One</em>
                </MenuItem>
                {sortedYearLevels?.map((level) => (
                  <MenuItem key={level._id} value={level}>
                    {level.year_level_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <Button
            variant="outlined"
            size="small"
            style={{ minWidth: 'fit-content' }}
            onClick={() => dispatch(toggleApproveFeeModal())}
          >
            For Approval
          </Button>

          <Button
            variant="contained"
            size="small"
            style={{ minWidth: 'fit-content' }}
            color="secondary"
            startIcon={<IconPlus stroke={2} size="1.2rem" />}
            onClick={() => {
              dispatch(toggleCreateFee());
              dispatch(handleChange({ name: 'year_grade_levels', value: [] }));
            }}
          >
            New Fee
          </Button>
        </Stack>
      </Stack>

      <AddFee />

      <FeeApprovalModal />

      <ConfirmationModal
        isOpen={openModal}
        title="Confirm Action"
        message={'Are you sure you want to delete this fee?'}
        onCancel={() => {
          setOpenModal(false);
          setFeeId('');
        }}
        onConfirm={(e) => {
          e.preventDefault();
          dispatch(deleteFee(feeId));
          setOpenModal(false);
          setFeeId('');
        }}
      />

      {(isFetchingFees ||
        isUpdatingFee ||
        isCreatingFee ||
        isDisapprovingFee ||
        isRejectingFees ||
        isDeletingFee) && <LoadingScreen />}

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>School Year</TableCell>
                <TableCell>Applied To</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {(tableData ?? filteredFees).map((fee) => (
                <TableRow key={fee._id}>
                  <TableCell>{fee.fee_label}</TableCell>
                  <TableCell>{fee?.fee_type?.fee_type}</TableCell>
                  <TableCell>{formatSalary(fee.fee ?? 0)}</TableCell>
                  <TableCell>{fee?.academic_year?.school_year}</TableCell>
                  <TableCell>{fee?.applies_to}</TableCell>
                  <TableCell>
                    <Stack
                      direction={{
                        xs: 'column',
                        sm: 'column',
                        md: 'row',
                      }}
                      spacing={1}
                      alignItems={'center'}
                    >
                      <Button
                        variant="contained"
                        color="warning"
                        size="small"
                        onClick={() => {
                          dispatch(
                            setFee({
                              _id: fee._id,
                              fee_label: fee?.fee_label,
                              fee_type: fee?.fee_type?._id,
                              fee: fee?.fee,
                              sections: fee?.sections,
                              applies_to: fee?.applies_to,
                              academic_year: fee?.academic_year?._id,
                              collegeTrack: fee?.college_or_track,
                              year_grade_levels: fee?.levels,
                              tuition_and_fee_id: fee?.tuition_and_fee_id,
                              selectedPrograms: fee?.programs,
                            })
                          );
                        }}
                      >
                        Edit
                      </Button>

                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        onClick={() => {
                          setOpenModal(true);
                          setFeeId(fee._id);
                        }}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {tableData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={filteredFees.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Stack>
  );
};

export default Fee;
