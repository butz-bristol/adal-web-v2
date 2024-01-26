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

import PaginationButtons from 'src/components/procurement/PaginationButtons';
import QuotationUpload from 'src/components/procurement/QuotationUpload';
import {
  getAllItemRequests,
  toggleQuotationUploadModal,
  updateItemRequest,
} from 'src/features/procurementFeatures/itemRequests/itemRequestsSlice';

const ForQuotation = () => {
  const { itemRequests, totalPages, page, changePage, requestId } = useSelector(
    (state) => state.itemRequests
  );
  const [selectedStatus, setSelectedStatus] = useState('');
  const selectedStatusString = selectedStatus ? selectedStatus.toString() : ' ';
  const [query, setQuery] = useState('');
  const [file, setFile] = useState(null);
  const [id, setId] = useState('');
  const [quotations, setQuotations] = useState(null);

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
              <TableCell>Quotations</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {itemRequests
              .filter(
                (itemRequest) =>
                  itemRequest.status === 'For Quotation' ||
                  itemRequest.status === 'For More Quotation' ||
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
                    <Tooltip title="Upload Quotation">
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

                          if (itemRequest.quotations) {
                            setQuotations(itemRequest.quotations);
                          }

                          dispatch(toggleQuotationUploadModal());
                        }}
                      >
                        <FileUploadIcon fontSize="10px" />
                      </Button>
                    </Tooltip>
                    <QuotationUpload
                      filePath="pR_filePath"
                      file={file}
                      setFile={setFile}
                      id={id}
                      quotations={quotations}
                    />
                    <Tooltip title="Reject Purchase Request">
                      <Button
                        sx={{ minWidth: '0', width: '20px' }}
                        variant="contained"
                        color="error"
                        onClick={() =>
                          dispatch(
                            updateItemRequest({
                              status: 'Rejected',
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

export default ForQuotation;
