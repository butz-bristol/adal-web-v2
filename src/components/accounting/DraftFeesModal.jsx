import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  submitFeesForApproval,
  toggleViewDraftFee,
} from 'src/features/accountingFeatures/accountingSlice';
import { setFee } from 'src/features/financeFeatures/financeSlice';

const DraftFeesModal = () => {
  const dispatch = useDispatch();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const { fees: allFees } = useSelector((state) => state.finance);
  const { academic_years: academicYears } = useSelector(
    (state) => state.registrar
  );
  const { viewingDraftFee, isSubmittingFees } = useSelector(
    (state) => state.accounting
  );

  const fees = allFees?.filter(
    (fee) =>
      fee.status === 'draft' && fee.academic_year._id === selectedAcademicYear
  );

  return (
    <Modal
      open={viewingDraftFee}
      onClose={() => {
        dispatch(toggleViewDraftFee());
        setSelectedAcademicYear('');
      }}
    >
      <Paper
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1000,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h4" gutterBottom textAlign="center">
            Draft Fees
          </Typography>

          <Box width={'300px'}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select">Academic Year</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedAcademicYear}
                label="Academic Year"
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
              >
                {academicYears.map((year) => (
                  <MenuItem key={year._id} value={year._id}>
                    {year.school_year}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Stack>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>School Year</TableCell>
                <TableCell>Prepared By</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {fees.length < 1 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No data found
                  </TableCell>
                </TableRow>
              ) : (
                fees.map((fee) => (
                  <TableRow key={fee._id}>
                    <TableCell>{fee.fee_label}</TableCell>
                    <TableCell>{fee?.fee_type?.fee_type}</TableCell>
                    <TableCell>{fee.fee}</TableCell>
                    <TableCell>{fee?.academic_year?.school_year}</TableCell>
                    <TableCell>
                      {fee?.createdBy.first_name +
                        ' ' +
                        fee?.createdBy.last_name}
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <Button
                          variant="contained"
                          color="primary"
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
                            dispatch(toggleViewDraftFee());
                            setSelectedAcademicYear('');
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="contained"
                          color="secondary"
                          size="small"
                          onClick={() => dispatch(toggleDeleteFeeModal(fee))}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Stack direction="row" justifyContent="flex-end" mt={4} spacing={1}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => {
              dispatch(toggleViewDraftFee());
              setSelectedAcademicYear('');
            }}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="secondary"
            disabled={
              selectedAcademicYear === '' || fees.length < 1 || isSubmittingFees
            }
            onClick={() => {
              dispatch(
                submitFeesForApproval({
                  fees: fees,
                  academic_year: selectedAcademicYear,
                })
              );
            }}
          >
            Submit For Approval
          </Button>
        </Stack>
      </Paper>
    </Modal>
  );
};
export default DraftFeesModal;
