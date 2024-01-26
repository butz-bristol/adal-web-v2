import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import PropTypes from 'prop-types';
import LoadingScreen from 'src/components/LoadingScreen';

const Orders = ({
  isFetchingOrders,
  renderOrderTableHead,
  renderOrderTableBody,
}) => {
  return (
    <>
      {isFetchingOrders && <LoadingScreen />}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>{renderOrderTableHead()}</TableHead>
          <TableBody>{renderOrderTableBody()}</TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

Orders.propTypes = {
  isFetchingOrders: PropTypes.bool,
  renderOrderTableHead: PropTypes.func,
  renderOrderTableBody: PropTypes.func,
};

export default Orders;
