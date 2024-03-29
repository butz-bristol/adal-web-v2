import { Delete } from '@mui/icons-material';
import {
  Button,
  CircularProgress,
  TableCell,
  TableRow,
  Tooltip,
} from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import EditCartItemModal from 'src/components/canteen/EditCartItemModal';
import {
  clearFoundProducts,
  clearSearchQuery,
  clearTransaction,
  createSellOrder,
  getFoundProducts,
  getLastOrderNumber,
  openEditCartItemModal,
  setCart,
  setCartItem,
  setSearchQuery,
  updateSellOrder,
} from 'src/features/canteenFeatures/orders/ordersSlice';
import ManageOrder from './ManageOrder';

const ManageSellOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    cart,
    searchQuery,
    foundProducts,
    isFetchingFoundProducts,
    orderNumber,
    isFetchingLastOrderNumber,
    isCreatingSellOrder,
    isUpdatingSellOrder,
  } = useSelector((state) => state.canteenOrders);

  const renderEditCartItemModal = () => <EditCartItemModal />;

  const renderOrderNumber = () => {
    if (id) {
      return <h3>{`Editing Sales Order #${orderNumber}`}</h3>;
    }
    return (
      <h3>
        Sales Order #
        {isFetchingLastOrderNumber ? (
          <CircularProgress color="inherit" size={20} />
        ) : (
          orderNumber
        )}
      </h3>
    );
  };

  const renderCartTableHead = () => (
    <TableRow>
      <TableCell>SKU</TableCell>
      <TableCell>Name</TableCell>
      <TableCell>Quantity</TableCell>
      <TableCell>Price</TableCell>
      <TableCell>Subtotal</TableCell>
      <TableCell>Actions</TableCell>
    </TableRow>
  );

  const renderCartTableBody = () => {
    if (cart.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} align="center">
            Empty Cart
          </TableCell>
        </TableRow>
      );
    }
    return cart.map((item, index) => {
      const { _id, productSKU, productName } = item.product;
      const { value, quantity } = item;
      return (
        <TableRow
          hover
          key={_id}
          role="button"
          style={{ cursor: 'pointer' }}
          onClick={() => {
            dispatch(
              setCartItem({
                cartIndex: index,
                product: {
                  _id,
                  productName,
                  productSKU,
                },
                value,
                quantity,
              })
            );
            dispatch(openEditCartItemModal());
          }}
        >
          <TableCell>{productSKU}</TableCell>
          <TableCell>{productName}</TableCell>
          <TableCell>{quantity}</TableCell>
          <TableCell>₱ {value.toFixed(2)}</TableCell>
          <TableCell>₱ {(value * quantity).toFixed(2)}</TableCell>
          <TableCell>
            <Tooltip title="Delete Product">
              <Button
                sx={{ minWidth: '0', width: '20px', marginRight: '0.1rem' }}
                variant="contained"
                color="error"
                onClick={(event) => {
                  event.stopPropagation();
                  dispatch(
                    setCart(cart.filter((item) => item.product._id !== _id))
                  );
                }}
              >
                <Delete fontSize="10px" />
              </Button>
            </Tooltip>
          </TableCell>
        </TableRow>
      );
    });
  };

  const renderMakeTransactionButton = (className) => {
    const salesTotal = cart.reduce(
      (total, item) => (total += item.quantity * item.value),
      0
    );
    return (
      <Button
        className={className}
        variant="contained"
        color="primary"
        onClick={() => {
          const transactionPayload = id
            ? { _id: id, orderNumber, cart }
            : { orderNumber, cart };
          if (id) {
            dispatch(updateSellOrder(transactionPayload));
            navigate('/canteen/orders/sales');
          } else {
            dispatch(createSellOrder(transactionPayload));
          }
        }}
      >
        <strong>Sell</strong>
        <strong>₱ {salesTotal.toFixed(2)}</strong>
      </Button>
    );
  };

  const addSelectedItemToCart = (selectedItem) => {
    const itemIndex = cart.findIndex(
      (item) => item.product._id === selectedItem._id
    );
    dispatch(
      setCart(
        itemIndex !== -1
          ? cart.map((item, index) => {
              if (index === itemIndex) {
                return { ...item, quantity: item.quantity + 1 };
              }
              return item;
            })
          : [
              ...cart,
              {
                product: selectedItem,
                value: selectedItem.sellingPrice,
                quantity: 1,
              },
            ]
      )
    );
    dispatch(clearSearchQuery());
    dispatch(clearFoundProducts());
  };

  const handleSearchInput = (query) => {
    dispatch(setSearchQuery(query));
    dispatch(getFoundProducts());
  };

  useEffect(() => {
    if (!id) {
      dispatch(clearTransaction());
      dispatch(getLastOrderNumber('sell'));
    }
  }, [dispatch, id]);

  return (
    <ManageOrder
      addSelectedItemToCart={addSelectedItemToCart}
      searchQuery={searchQuery}
      handleSearchInput={handleSearchInput}
      foundProducts={foundProducts}
      isFetchingFoundProducts={isFetchingFoundProducts}
      isCreatingTransaction={isCreatingSellOrder || isUpdatingSellOrder}
      renderEditCartItemModal={renderEditCartItemModal}
      renderOrderNumber={renderOrderNumber}
      renderCartTableHead={renderCartTableHead}
      renderCartTableBody={renderCartTableBody}
      renderMakeTransactionButton={renderMakeTransactionButton}
    />
  );
};

export default ManageSellOrder;
