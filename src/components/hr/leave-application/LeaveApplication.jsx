import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Chip, TableCell, TableRow } from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteLeaveApplication,
  setLeaveApplication,
  toggleEditingLeaveApplication,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const LeaveApplication = ({
  index,
  _id,
  leave_start_date,
  leave_end_date,
  leave_status,
  leave_reason,
  leave_type,
  supervisor_id,
  userId,
  leave_days,
}) => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.users);

  return (
    <TableRow>
      <TableCell>{index + 1}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {leave_type?.leave_category_name}
      </TableCell>
      <TableCell>
        {DateTime.fromISO(leave_start_date).toLocaleString(DateTime.DATE_MED)}
      </TableCell>
      <TableCell>
        {DateTime.fromISO(leave_end_date).toLocaleString(DateTime.DATE_MED)}
      </TableCell>
      <TableCell>{leave_days}</TableCell>
      <TableCell>{leave_reason}</TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>
        {supervisor_id?.first_name + ' ' + supervisor_id?.last_name}
      </TableCell>
      <TableCell>
        <Chip
          sx={{ textTransform: 'capitalize', fontWeight: 'bold' }}
          label={leave_status}
          color={
            leave_status === 'approved'
              ? 'success'
              : leave_status === 'rejected'
                ? 'error'
                : 'warning'
          }
        />
      </TableCell>
      <TableCell>
        {leave_status !== 'approved' && leave_status !== 'rejected' && (
          <>
            <Button
              sx={{
                minWidth: '0',
                width: '20px',
                marginRight: '0.5rem',
                mb: '0.5rem',
              }}
              variant="contained"
              color="warning"
              onClick={() => {
                dispatch(toggleEditingLeaveApplication());
                dispatch(
                  setLeaveApplication({
                    _id,
                    leave_type,
                    leave_start_date,
                    leave_end_date,
                    leave_status,
                    userId: userProfile._id,
                    leave_reason,
                    leave_days,
                    supervisor_id,
                  })
                );
              }}
            >
              <EditIcon fontSize="10px" />
            </Button>
            <Button
              sx={{ minWidth: '0', width: '20px', mb: '0.5rem' }}
              variant="contained"
              color="error"
              onClick={() => dispatch(deleteLeaveApplication(_id))}
            >
              <DeleteIcon fontSize="10px" />
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};
export default LeaveApplication;
