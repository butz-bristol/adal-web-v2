import { useDispatch, useSelector } from 'react-redux';
import { getBuyOrders } from 'src/features/canteenFeatures/orders/ordersSlice';

import { IconButton, TableCell, TableRow, Tooltip } from '@mui/material';
import { IconEye } from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect } from 'react';
import LinkComponent from 'src/components/LinkComponent';
import Orders from './Orders';

const BuyOrders = () => {
  const dispatch = useDispatch();
  const { buyOrders, isFetchingBuyOrders } = useSelector(
    (state) => state.canteenOrders
  );

  const computeCartAmount = (cart) => {
    return cart
      .reduce((total, item) => (total += item.quantity * item.value), 0)
      .toFixed(2);
  };

  const renderOrderTableHead = () => (
    <TableRow>
      <TableCell>Order No.</TableCell>
      <TableCell>Created At</TableCell>
      <TableCell>Last Updated At</TableCell>
      <TableCell>Amount</TableCell>
      <TableCell>Supplier</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  );

  const renderOrderTableBody = () => {
    if (buyOrders.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={5} align="center">
            No results found
          </TableCell>
        </TableRow>
      );
    }
    return buyOrders.map((order) => (
      <TableRow
        key={order._id}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell>{order.orderNumber}</TableCell>
        <TableCell>
          {DateTime.fromISO(order.createdAt).toLocaleString({
            ...DateTime.DATE_MED,
            ...DateTime.TIME_24_SIMPLE,
          })}
        </TableCell>
        <TableCell>
          {DateTime.fromISO(order.updatedAt).toLocaleString({
            ...DateTime.DATE_MED,
            ...DateTime.TIME_24_SIMPLE,
          })}
        </TableCell>
        <TableCell>₱ {computeCartAmount(order.cart)}</TableCell>
        <TableCell>{order.supplierName}</TableCell>
        <TableCell>
          <LinkComponent to={order._id}>
            <Tooltip title="View order">
              <IconButton aria-label="View order" size="small" color="info">
                <IconEye />
              </IconButton>
            </Tooltip>
          </LinkComponent>
        </TableCell>
      </TableRow>
    ));
  };

  useEffect(() => {
    dispatch(getBuyOrders());
  }, [dispatch]);

  return (
    <Orders
      isFetchingOrders={isFetchingBuyOrders}
      renderOrderTableHead={renderOrderTableHead}
      renderOrderTableBody={renderOrderTableBody}
    />
  );
};

export default BuyOrders;
