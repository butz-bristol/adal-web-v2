import {
  Box,
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
import { toggleApproveFeeModal } from 'src/features/financeFeatures/financeSlice';

const FeeApprovalModal = () => {
  const dispatch = useDispatch();
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('');
  const { approveFeeModal, fees: allFees } = useSelector(
    (state) => state.finance
  );
  const { academic_years: academicYears } = useSelector(
    (state) => state.registrar
  );

  const fees = allFees?.filter(
    (fee) =>
      fee.status === 'pending approval' &&
      fee.academic_year._id === selectedAcademicYear
  );

  return (
    <Modal
      open={approveFeeModal}
      onClose={() => {
        dispatch(toggleApproveFeeModal());
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
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Modal>
  );
};

export default FeeApprovalModal;
