import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, TableCell, TableRow } from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  deleteSalaryCutoff,
  setSalaryCutoff,
  toggleEditSalaryCutoff,
} from 'src/features/hrFeatures/payroll/payrollSlice';

const SalaryCutOff = ({ designationId, cutOffPeriod, index, _id }) => {
  const dispatch = useDispatch();

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {designationId?.designation_name}
      </TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>{cutOffPeriod}</TableCell>
      <TableCell>
        <Button
          variant="contained"
          color="warning"
          sx={{ minWidth: '0', width: '20px' }}
          onClick={() => {
            dispatch(toggleEditSalaryCutoff());
            dispatch(
              setSalaryCutoff({
                designationId,
                cutOffPeriod,
                _id,
              })
            );
          }}
        >
          <EditIcon fontSize="20px" />
        </Button>
        <Button
          variant="contained"
          sx={{ ml: '0.5rem', minWidth: '0', width: '20px' }}
          color="error"
          onClick={() => dispatch(deleteSalaryCutoff(_id))}
        >
          <DeleteIcon fontSize="20px" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default SalaryCutOff;
