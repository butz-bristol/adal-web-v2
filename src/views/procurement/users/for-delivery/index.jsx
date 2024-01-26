import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from '@mui/material';

import LocalShippingIcon from '@mui/icons-material/LocalShipping';

import ActualDeliveryDateModal from 'src/components/procurement/ActualDeliveryDateModal';
import PaginationButtons from 'src/components/procurement/PaginationButtons';
import { fetchAllDepartments } from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  getAllItemRequests,
  getItemRequest,
  toggleAddActualDeliveryDateModal,
} from 'src/features/procurementFeatures/itemRequests/itemRequestsSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';

const ForDelivery = () => {
  const { itemRequests, totalPages, page, changePage, requestId } = useSelector(
    (state) => state.itemRequests
  );
  const [id, setId] = useState('');
  const { userProfile } = useSelector((state) => state.users);
  const { departments } = useSelector((state) => state.coreHr);

  const userId = userProfile._id;
  const department = departments.find(
    (department) => department._id === userProfile.admin_department
  );

  const dispatch = useDispatch();

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
    return formattedDate;
  }

  useEffect(() => {
    dispatch(getAllItemRequests());
    dispatch(fetchUserProfile(userId));
    dispatch(fetchAllDepartments());
  }, [dispatch, page]);

  return (
    <Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>PR Number</TableCell>
              <TableCell>Requested By</TableCell>
              <TableCell>Date Filed</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Signed Form</TableCell>
              <TableCell>Evaluated Form</TableCell>
              <TableCell>Tartget Delivery Date</TableCell>
              <TableCell>Actual Delivery Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemRequests
              .filter(
                (itemRequest) =>
                  itemRequest?.status === 'For Delivery' &&
                  itemRequest?.department === department?.department_name
              )
              .map((itemRequest, index) => (
                <TableRow key={itemRequest._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{itemRequest?.PR_No}</TableCell>
                  <TableCell>{itemRequest?.requestedBy}</TableCell>
                  <TableCell>
                    {itemRequest.requestDate
                      ? formatDate(itemRequest.requestDate)
                      : null}
                  </TableCell>
                  <TableCell>{itemRequest?.department}</TableCell>
                  <TableCell>{itemRequest?.status}</TableCell>
                  <TableCell>
                    <a href={itemRequest.signedForm}>
                      {itemRequest.signedForm ? 'Signed PR' : 'None uploaded'}
                    </a>
                  </TableCell>
                  <TableCell>
                    {itemRequest?.evaluationForm && (
                      <a href={itemRequest?.evaluationForm ?? '#'}>
                        Evaluation Form
                      </a>
                    )}
                  </TableCell>
                  <TableCell>
                    {itemRequest?.targetDeliveryDate
                      ? formatDate(itemRequest.targetDeliveryDate)
                      : 'None'}
                  </TableCell>
                  <TableCell>
                    {itemRequest?.actualDeliveryDate
                      ? formatDate(itemRequest.actualDeliveryDate)
                      : 'None'}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Confirm Actual Delivery Date">
                      <Button
                        sx={{
                          minWidth: '0',
                          width: '20px',
                          marginRight: '0.5rem',
                        }}
                        variant="contained"
                        color="success"
                        onClick={() => {
                          setId(itemRequest._id);
                          dispatch(toggleAddActualDeliveryDateModal());
                          dispatch(getItemRequest(id));
                        }}
                      >
                        <LocalShippingIcon fontSize="10px" />
                      </Button>
                    </Tooltip>
                    <ActualDeliveryDateModal id={id} />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <PaginationButtons
        page={page}
        count={totalPages}
        changePage={changePage}
      />
    </Stack>
  );
};

export default ForDelivery;
