import { Delete, Edit } from '@mui/icons-material';
import { Button, TableCell, TableRow } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  clearOrder,
  deleteBuyOrder,
  getBuyOrder,
  setCart,
  setOrderNumber,
} from 'src/features/canteenFeatures/orders/ordersSlice';
import Order from './Order';

const BuyOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { order, isFetchingBuyOrder, isDeletingBuyOrder } = useSelector(
    (state) => state.canteenOrders
  );
  const [isVoidConfirmationModalOpen, setIsVoidConfirmationModalOpen] =
    useState(false);

  const renderHeader = () => <h3>Purchase Order #{order.orderNumber}</h3>;

  const renderVoidConfirmationModal = () => (
    <ConfirmationModal
      isOpen={isVoidConfirmationModalOpen}
      title={'Confirm Action'}
      message="Are you sure you want to void this transaction?"
      onConfirm={() => {
        dispatch(deleteBuyOrder(order._id));
        setIsVoidConfirmationModalOpen(() => false);
        navigate('/canteen/orders/purchases');
      }}
      onCancel={() => {
        setIsVoidConfirmationModalOpen(() => false);
      }}
    />
  );

  const renderCartTableHead = () => (
    <>
      <TableRow>
        <TableCell align="center" colSpan={5}>
          Details
        </TableCell>
        <TableCell align="right">Price</TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center">No.</TableCell>
        <TableCell>SKU</TableCell>
        <TableCell>Name</TableCell>
        <TableCell align="center">Quantity</TableCell>
        <TableCell align="right">Cost</TableCell>
        <TableCell align="right">Sum</TableCell>
      </TableRow>
    </>
  );

  const renderCartTableBody = () => {
    const { cart } = order;
    if (cart.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            Empty Cart
          </TableCell>
        </TableRow>
      );
    }
    const cartTotal = cart.reduce(
      (total, item) => (total += item.quantity * item.value),
      0
    );
    const fillerCells = Array.from({ length: 4 }, (_, index) => (
      <TableCell key={index} sx={{ borderBottom: 'none' }} />
    ));

    return (
      <>
        {cart.map((item, index) => {
          const { _id, productSKU, productName } = item.product;
          const { value, quantity } = item;

          return (
            <TableRow key={_id}>
              <TableCell align="center">{index + 1}</TableCell>
              <TableCell>{productSKU}</TableCell>
              <TableCell>{productName}</TableCell>
              <TableCell align="center">{quantity}</TableCell>
              <TableCell align="right">{value.toFixed(2)}</TableCell>
              <TableCell align="right">
                {(value * quantity).toFixed(2)}
              </TableCell>
            </TableRow>
          );
        })}

        {/* Total Row */}
        <TableRow>
          {fillerCells}
          <TableCell sx={{ borderBottom: 'none' }} align="right">
            <strong>Total</strong>
          </TableCell>
          <TableCell sx={{ borderBottom: 'none' }} align="right">
            <strong>{`₱ ${cartTotal.toFixed(2)}`}</strong>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const renderEditBuyOrderButton = () => (
    <Button
      variant="contained"
      color="info"
      startIcon={<Edit />}
      onClick={() => {
        dispatch(setOrderNumber(order.orderNumber));
        dispatch(setCart(order.cart));
        navigate(`/canteen/buy/${order._id}`);
      }}
    >
      Edit
    </Button>
  );

  const renderVoidBuyOrderButton = () => (
    <Button
      variant="contained"
      color="error"
      startIcon={<Delete />}
      onClick={() => setIsVoidConfirmationModalOpen(() => true)}
      disabled={isDeletingBuyOrder}
    >
      Void
    </Button>
  );

  useEffect(() => {
    dispatch(clearOrder());
    dispatch(getBuyOrder(id));
  }, [dispatch, id]);

  return (
    <Order
      isFetchingOrder={isFetchingBuyOrder}
      renderHeader={renderHeader}
      renderVoidConfirmationModal={renderVoidConfirmationModal}
      renderCartTableHead={renderCartTableHead}
      renderCartTableBody={renderCartTableBody}
      renderEditOrderButton={renderEditBuyOrderButton}
      renderVoidOrderButton={renderVoidBuyOrderButton}
    />
  );
};

export default BuyOrder;
