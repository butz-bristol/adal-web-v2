import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  CardContent,
  Divider,
  Grid,
  List,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useTheme } from '@mui/material/styles';
import { getAllItems } from 'src/features/procurementFeatures/items/itemsSlice';

const ViewItemDetail = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { userProfile, user, isLoading } = useSelector((state) => state.users);
  const {
    item_name,
    supplier,
    type,
    category,
    item_price,
    brand,
    quantity,
    model_no,
    item_serial_no,
    department,
    date_purchased,
    itemHistory,
    location,
  } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(getAllItems());
  }, [dispatch]);

  const handleInput = (e) => {
    dispatch(handleChange({ name: e.target.name, value: e.target.value }));
  };

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Card
            sx={{
              border: '1px solid',
              borderColor: theme.palette.primary.light,
              p: 0,
            }}
          >
            <Divider />

            <CardContent sx={{ p: 1 }}>
              <Grid
                container
                display="flex"
                justifyContent="center"
                textAlign="center"
                sx={{ p: 2 }}
              >
                <Grid item>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Name: <b>{item_name || 'N/A'}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Supplier: <b>{supplier || 'N/A'}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Type: <b>{type || 'N/A'}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Category: <b>{category || 'N/A'}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Supplier: <b>{supplier || 'N/A'}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Price: <b>&#8369; {item_price || 'N/A'} </b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Quantity: <b> {quantity || 'N/A'} </b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Brand: <b>{brand || ''}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Model No: <b>{model_no || ''}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Serial No: <b>{item_serial_no || ''}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Department: <b>{department || 'N/A'}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Location: <b>{location || ''}</b>
                  </Typography>
                  <Typography
                    variant="body1"
                    textTransform="capitalize"
                    style={{ marginBottom: 12 }}
                  >
                    Date Purchased:{' '}
                    <b>
                      {date_purchased
                        ? new Date(date_purchased).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })
                        : ''}
                    </b>
                  </Typography>
                </Grid>
              </Grid>
              <List></List>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Updated by</TableCell>
                  <TableCell>Updated On</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {itemHistory.map((historyItem, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{historyItem.status}</TableCell>
                    <TableCell>{historyItem.updated_by}</TableCell>
                    <TableCell>
                      {new Date(historyItem.updated_on).toLocaleDateString(
                        'en-US',
                        { month: 'long', day: 'numeric', year: 'numeric' }
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default ViewItemDetail;
