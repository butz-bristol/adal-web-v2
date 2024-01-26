import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
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
  getAllItemRequests,
  toggleFileUploadModal,
  updateItemRequest,
} from 'src/features/procurementFeatures/itemRequests/itemRequestsSlice';
import { fetchUserProfile } from 'src/features/users/userSlice';

const EvaluateRequests = () => {
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
              <TableCell>Status</TableCell>
              <TableCell>Quotations</TableCell>
              <TableCell>Evaluation</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemRequests
              .filter(
                (itemRequest) =>
                  itemRequest.department === department?.department_name &&
                  itemRequest.status === 'For Evaluation'
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
                    {itemRequest.quotations.map((quotation, index) => (
                      <a key={index} href={quotation.url}>
                        {'Quotation' + (index + 1) + ' '}
                      </a>
                    ))}
                  </TableCell>
                  <TableCell>
                    <a href={itemRequest.evaluationForm}>
                      {itemRequest.evaluationForm
                        ? 'Evaluation Form'
                        : 'None uploaded'}
                    </a>
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Upload Evaluation">
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
                    <FileUpload
                      filePath="evaluationForm_filePath"
                      file={file}
                      setFile={setFile}
                      id={id}
                    />
                    <Tooltip title="Request for more quotations">
                      <Button
                        sx={{ minWidth: '0', width: '20px' }}
                        variant="contained"
                        color="error"
                        onClick={() =>
                          dispatch(
                            updateItemRequest({
                              status: 'For More Quotation',
                              requestId: itemRequest._id,
                            })
                          )
                        }
                      >
                        <ThumbDownOffAltIcon fontSize="10px" />
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

export default EvaluateRequests;
