import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button, TableCell, TableRow } from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import {
  deleteEvent,
  setEvent,
  toggleEditAnnouncementModal,
  toggleViewAnnouncementModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Event = ({
  index,
  _id,
  event_title,
  event_start_date,
  event_end_date,
  event_details,
  department_id,
  event_image,
}) => {
  const dispatch = useDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell>{event_title}</TableCell>
      <TableCell>
        {DateTime.fromISO(event_start_date).toLocaleString(DateTime.DATE_MED)}
      </TableCell>
      <TableCell>
        {DateTime.fromISO(event_end_date).toLocaleString(DateTime.DATE_MED)}
      </TableCell>
      <TableCell>{event_details}</TableCell>
      <TableCell>{department_id?.department_name}</TableCell>
      <TableCell>
        <Button
          sx={{ minWidth: '0', width: '20px', m: '0.1rem' }}
          variant="contained"
          color="info"
          onClick={() => {
            dispatch(toggleViewAnnouncementModal());
            dispatch(
              setEvent({
                _id,
                event_title,
                event_start_date,
                event_end_date,
                event_details,
                department_id,
                event_image,
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
              setEvent({
                _id,
                event_title,
                event_start_date,
                event_end_date,
                event_details,
                department_id,
                event_image,
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
          onClick={() => dispatch(deleteEvent(_id))}
        >
          <DeleteIcon fontSize="10px" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Event;
