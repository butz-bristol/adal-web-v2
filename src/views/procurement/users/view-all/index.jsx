import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteIcon from '@mui/icons-material/Delete';
import FileUploadIcon from '@mui/icons-material/FileUpload';
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

import FileUpload from 'src/components/procurement/FileUpload';
import PaginationButtons from 'src/components/procurement/PaginationButtons';
import { fetchAllDepartments } from 'src/features/hrFeatures/coreHr/hrSlice';
import {
  deleteItemRequest,
  getAllItemRequests,
  toggleFileUploadModal,
} from 'src/features/procurementFeatures/itemRequests/itemRequestsSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';

const UserRequests = () => {
  const { itemRequests, totalPages, page, changePage, requestId } = useSelector(
    (state) => state.itemRequests
  );
  const [selectedStatus, setSelectedStatus] = useState('');
  const selectedStatusString = selectedStatus ? selectedStatus.toString() : ' ';
  const [query, setQuery] = useState('');
  const [file, setFile] = useState(null);
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

              <TableCell>
                Status
                <select
                  style={{ width: '20px', marginLeft: '5px', border: 'none' }}
                  name="selectedStatus"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setQuery('');
                  }}
                >
                  <option></option>
                  <option value="For Endorsement">For Endorsement</option>
                  <option value="For Quotation">For Quotation</option>
                  <option value="For Purchase Order">For Purchase Order</option>
                  <option value="For Evaluation">For Evaluation</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="For Delivery">For Delivery</option>
                  <option value="For More Quotation">For More Quotation</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </TableCell>
              <TableCell>Signed Form</TableCell>
              <TableCell>Quotations</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemRequests
              .filter(
                (itemRequest) =>
                  itemRequest.department === department?.department_name &&
                  (selectedStatus
                    ? itemRequest.status === selectedStatus
                    : true)
              )
              .map((itemRequest, index) => (
                <TableRow key={itemRequest._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{itemRequest.PR_No}</TableCell>
                  <TableCell>{itemRequest.requestedBy}</TableCell>
                  <TableCell>{formatDate(itemRequest.requestDate)}</TableCell>
                  <TableCell>{itemRequest.department}</TableCell>
                  <TableCell>{itemRequest.status}</TableCell>
                  <TableCell>
                    <a href={itemRequest.signedForm}>
                      {itemRequest.signedForm ? 'File' : 'None uploaded'}
                    </a>
                  </TableCell>
                  <TableCell>
                    {itemRequest.quotations.map((quotation, index) => (
                      <a key={index} href={quotation.url}>
                        {'Quotation' + (index + 1) + ' '}
                      </a>
                    ))}
                  </TableCell>
                  <TableCell>
                    {!itemRequest.signedForm ? (
                      <Tooltip title="Upload Signed Form">
                        <Button
                          sx={{
                            minWidth: '0',
                            width: '20px',
                            marginRight: '0.5rem',
                          }}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setId(itemRequest._id);
                            dispatch(toggleFileUploadModal());
                          }}
                        >
                          <FileUploadIcon fontSize="10px" />
                        </Button>
                      </Tooltip>
                    ) : null}
                    <FileUpload
                      filePath="pR_filePath"
                      file={file}
                      setFile={setFile}
                      id={id}
                    />
                    <Tooltip title="Cancel Purchase Request">
                      <Button
                        sx={{ minWidth: '0', width: '20px' }}
                        variant="contained"
                        color="error"
                        onClick={() =>
                          dispatch(deleteItemRequest(itemRequest._id))
                        }
                      >
                        <DeleteIcon fontSize="10px" />
                      </Button>
                    </Tooltip>
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

export default UserRequests;
