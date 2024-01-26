import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button, TableCell, TableRow } from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import {
  deleteHoliday,
  setHoliday,
  toggleEditAnnouncementModal,
  toggleViewAnnouncementModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Holiday = ({
  index,
  _id,
  holiday_title,
  holiday_image,
  holiday_start_date,
  holiday_end_date,
  holiday_details,
  department_id,
}) => {
  const dispatch = useDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{holiday_title}</TableCell>
      <TableCell>
        {DateTime.fromISO(holiday_start_date).toLocaleString(DateTime.DATE_MED)}
      </TableCell>
      <TableCell>
        {DateTime.fromISO(holiday_end_date).toLocaleString(DateTime.DATE_MED)}
      </TableCell>
      <TableCell>{holiday_details}</TableCell>
      <TableCell>{department_id?.department_name}</TableCell>
      <TableCell>
        <Button
          sx={{ minWidth: '0', width: '20px', m: '0.1rem' }}
          variant="contained"
          color="info"
          onClick={() => {
            dispatch(toggleViewAnnouncementModal());
            dispatch(
              setHoliday({
                _id,
                holiday_title,
                holiday_start_date,
                holiday_end_date,
                holiday_details,
                department_id,
                holiday_image,
              })
            );
          }}
        >
          <PageviewIcon fontSize="15px" />
        </Button>
        <Button
          sx={{ minWidth: '0', width: '20px', m: '0.1rem' }}
          variant="contained"
          color="warning"
          onClick={() => {
            dispatch(toggleEditAnnouncementModal());
            dispatch(
              setHoliday({
                _id,
                holiday_title,
                holiday_start_date,
                holiday_end_date,
                holiday_details,
                department_id,
                holiday_image,
              })
            );
          }}
        >
          <EditIcon fontSize="10px" />
        </Button>
        <Button
          sx={{ minWidth: '0', width: '20px', m: '0.1rem' }}
          variant="contained"
          color="secondary"
          onClick={() => dispatch(deleteHoliday(_id))}
        >
          <DeleteIcon fontSize="10px" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Holiday;
