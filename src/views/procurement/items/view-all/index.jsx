import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { IconSearch } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PaginationButtons from 'src/components/procurement/PaginationButtons';
import {
  changePage,
  getAllItems,
} from 'src/features/procurementFeatures/items/itemsSlice';

const Items = () => {
  const { items, totalPages, page, itemsPerPage } = useSelector(
    (state) => state.items
  );
  const [selectedStatus, setSelectedStatus] = useState('');
  const selectedStatusString = selectedStatus ? selectedStatus.toString() : ' ';
  const [query, setQuery] = useState('');

  const { isCreatingItem, isEditingItem, isDeletingItem } = useSelector(
    (state) => state.items
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllItems());
  }, [selectedStatus, query, dispatch, page]);

  return (
    <Stack>
      <div className="search">
        <TextField
          id="outlined-basic"
          variant="outlined"
          fullWidth
          label="Search for an item"
          onChange={(event) => {
            setQuery(event.target.value);
            setSelectedStatus('');
            dispatch(getAllItems());
          }}
          value={query}
          InputProps={{
            endAdornment: <IconSearch stroke={1.5} size="1.5rem" />,
          }}
        />
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Supplier</TableCell>
              <TableCell>Serial No.</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Model No.</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date Purchased</TableCell>
              <TableCell>Quantity</TableCell>
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
                    dispatch(getAllItems());
                  }}
                >
                  <option></option>
                  <option value="On Stock">On Stock</option>
                  <option value="Not Available">Not Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Borrowed">Borrowed</option>
                  <option value="Damaged">Damaged</option>
                  <option value="Expired">Expired</option>
                  <option value="Under Maintenance">Under Maintenance</option>
                </select>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {query != (null || undefined || '') && selectedStatus == ''
              ? items
                  .filter(
                    (item) =>
                      item.item_name
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      item.supplier
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      item.brand.toLowerCase().includes(query.toLowerCase()) ||
                      item.model_no
                        .toLowerCase()
                        .includes(query.toLowerCase()) ||
                      item.item_serial_no
                        .toLowerCase()
                        .includes(query.toLowerCase())
                  )
                  .map((item, index) => (
                    <TableRow
                      key={item._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {(page - 1) * itemsPerPage + index + 1}
                      </TableCell>

                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.item_serial_no}</TableCell>
                      <TableCell>{item.brand}</TableCell>
                      <TableCell>{item.model_no}</TableCell>
                      <TableCell>{item.item_price}</TableCell>
                      <TableCell>
                        {new Date(item.date_purchased).toLocaleDateString(
                          'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.item_status}</TableCell>
                    </TableRow>
                  ))
              : selectedStatus != (null || undefined || '') && query == ''
                ? items
                    .filter((item) => item.item_status == selectedStatusString)
                    .map((item, index) => (
                      <TableRow
                        key={item.item_id}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {(page - 1) * itemsPerPage + index + 1}
                        </TableCell>

                        <TableCell>{item.item_name}</TableCell>
                        <TableCell>{item.type}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.supplier}</TableCell>
                        <TableCell>{item.item_serial_no}</TableCell>
                        <TableCell>{item.brand}</TableCell>
                        <TableCell>{item.model_no}</TableCell>
                        <TableCell>{item.item_price}</TableCell>
                        <TableCell>
                          {new Date(item.date_purchased).toLocaleDateString(
                            'en-US',
                            { month: 'short', day: 'numeric', year: 'numeric' }
                          )}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{item.department}</TableCell>
                        <TableCell>{item.item_status}</TableCell>
                      </TableRow>
                    ))
                : items.map((item, index) => (
                    <TableRow
                      key={item._id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {(page - 1) * itemsPerPage + index + 1}
                      </TableCell>

                      <TableCell>{item.item_name}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.supplier}</TableCell>
                      <TableCell>{item.item_serial_no}</TableCell>
                      <TableCell>{item.brand}</TableCell>
                      <TableCell>{item.model_no}</TableCell>
                      <TableCell>{item.item_price}</TableCell>
                      <TableCell>
                        {new Date(item.date_purchased).toLocaleDateString(
                          'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.department}</TableCell>
                      <TableCell>{item.item_status}</TableCell>
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

export default Items;
