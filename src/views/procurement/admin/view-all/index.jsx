import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import PaginationButtons from 'src/components/procurement/PaginationButtons';
import { getAllItemRequests } from 'src/features/procurementFeatures/itemRequests/itemRequestsSlice';

const PurchaseRequests = () => {
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
            </TableRow>
          </TableHead>
          <TableBody>
            {itemRequests
              .filter((itemRequest) =>
                selectedStatus ? itemRequest.status === selectedStatus : true
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

export default PurchaseRequests;
