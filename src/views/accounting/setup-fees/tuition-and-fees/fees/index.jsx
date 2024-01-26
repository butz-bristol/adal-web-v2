import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  Grid,
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
import { IconArrowLeft, IconNotes, IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import CreateDraftFees from 'src/components/accounting/CreateDraftFees';
import DraftFeesModal from 'src/components/accounting/DraftFeesModal';
import FeeApprovalModal from 'src/components/accounting/PendingApprovalFees';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import {
  toggleAddDraftFee,
  toggleViewDraftFee,
} from 'src/features/accountingFeatures/accountingSlice';
import {
  fetchAllFeeTypes,
  fetchAllFees,
  fetchAllTuitionAndFees,
  resetTuitionAndFeeId,
  toggleApproveFeeModal,
} from 'src/features/financeFeatures/financeSlice';
import {
  getAllAcademicYears,
  getAllYearLevels,
} from 'src/features/registrarFeatures/registrarSlice';
import { formatSalary } from 'src/utils/helperFunctions';
const Fee = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [20, 40, 100];
  const [appliesTo, setAppliesTo] = useState('');
  const [yearLevel, setYearLevel] = useState('');
  const [program, setProgram] = useState('');
  const [label, setLabel] = useState('');
  const { year_levels } = useSelector((state) => state.registrar);
  const { programs } = useSelector((state) => state.academics);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { tuition_and_fee_id, fees, isFetchingFees } = useSelector(
    (state) => state.finance
  );

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
    ?.filter((fee) => {
      if (label) {
        return fee.fee_label.toLowerCase().includes(label.toLowerCase());
      }

      return fee;
    })
    .filter((fee) => {
      if (appliesTo === 'Programs' && program) {
        return fee?.programs?.find((p) => p._id === program._id);
      } else if (isK12 && yearLevel) {
        return fee?.levels?.find((l) => l._id === yearLevel._id);
      }

      return fee;
    });

  const tableData = filteredFees
    ?.filter((fee) => fee.status === 'approved')
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

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
    dispatch(getAllAcademicYears());

    if (tuition_and_fee_id) {
      dispatch(fetchAllFees(tuition_and_fee_id));
    }
  }, [dispatch, tuition_and_fee_id]);

  useEffect(() => {
    setProgram('');
    setYearLevel('');
  }, [appliesTo]);

  return (
    <Stack>
      <Stack
        direction="row"
        mb={2}
        justifyContent="space-between"
        alignItems={'center'}
      >
        <LinkComponent
          to="/accounting/setup-fees/tuition-and-fees"
          onClick={() => dispatch(resetTuitionAndFeeId())}
        >
          <Button
            startIcon={<IconArrowLeft />}
            color="secondary"
            variant="outlined"
          >
            Back
          </Button>
        </LinkComponent>

        <Stack direction="row" columnGap={1} alignItems={'center'}>
          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            spacing={1}
          >
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
                  onChange={(e) => setAppliesTo(e.target.value)}
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
          </Stack>

          <Stack
            direction={{
              xs: 'column',
              lg: 'row',
            }}
            spacing={1}
          >
            <Button
              variant="contained"
              size="small"
              color="warning"
              endIcon={<IconNotes stroke={2} size="1.2rem" />}
              onClick={() => dispatch(toggleViewDraftFee())}
            >
              View Drafts
            </Button>

            <Button
              variant="contained"
              size="small"
              color="secondary"
              onClick={() => dispatch(toggleApproveFeeModal())}
            >
              Pending Approval
            </Button>

            <Button
              variant="contained"
              size="small"
              startIcon={<IconPlus stroke={2} size="1.2rem" />}
              onClick={() => {
                dispatch(toggleAddDraftFee());
              }}
            >
              New Fee
            </Button>
          </Stack>
        </Stack>
      </Stack>

      <CreateDraftFees />
      <FeeApprovalModal />
      <DraftFeesModal />

      <Stack>
        {isFetchingFees ? (
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
          <>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Label</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>School Year</TableCell>
                    <TableCell>Applied To</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {(rowsPerPage > 0 ? tableData : fees)
                    ?.filter((fee) => fee.status === 'approved')
                    .map((fee) => (
                      <TableRow key={fee._id}>
                        <TableCell>{fee.fee_label}</TableCell>
                        <TableCell>{fee?.fee_type?.fee_type}</TableCell>
                        <TableCell>{formatSalary(fee.fee ?? 0)}</TableCell>
                        <TableCell>{fee?.academic_year?.school_year}</TableCell>
                        <TableCell>{fee?.applies_to}</TableCell>
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
              count={
                filteredFees?.filter((fee) => fee.status === 'approved').length
              }
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Fee;
