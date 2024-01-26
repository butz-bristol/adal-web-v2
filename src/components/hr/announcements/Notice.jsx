import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import PageviewIcon from '@mui/icons-material/Pageview';
import { Button, TableCell, TableRow } from '@mui/material';
import { DateTime } from 'luxon';
import { useDispatch } from 'react-redux';
import {
  deleteNotice,
  setNotice,
  toggleEditAnnouncementModal,
  toggleViewAnnouncementModal,
} from 'src/features/hrFeatures/coreHr/hrSlice';

const Notice = ({
  index,
  _id,
  notice_image,
  notice_title,
  notice_date,
  notice_description,
  department_id,
}) => {
  const dispatch = useDispatch();

  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {index + 1}
      </TableCell>
      <TableCell sx={{ textTransform: 'capitalize' }}>{notice_title}</TableCell>
      <TableCell>
        {DateTime.fromISO(notice_date).toLocaleString(DateTime.DATE_MED)}
      </TableCell>
      <TableCell>{notice_description}</TableCell>
      <TableCell>{department_id?.department_name}</TableCell>
      <TableCell>
        <Button
          sx={{ minWidth: '0', width: '20px', m: '0.1rem' }}
          variant="contained"
          color="info"
          onClick={() => {
            dispatch(toggleViewAnnouncementModal());
            dispatch(
              setNotice({
                _id,
                notice_title,
                notice_image,
                notice_date,
                notice_description,
                department_id,
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
              setNotice({
                _id,
                notice_title,
                notice_image,
                notice_date,
                notice_description,
                department_id,
              })
            );
          }}
        >
          <EditIcon fontSize="10px" />
        </Button>
        <Button
          sx={{ minWidth: '0', width: '20px', m: '0.1rem' }}
          variant="contained"
          color="error"
          onClick={() => dispatch(deleteNotice(_id))}
        >
          <DeleteIcon fontSize="10px" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Notice;
