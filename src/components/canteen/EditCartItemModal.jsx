import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCartItem,
  closeEditCartItemModal,
  handleCartItemFormChange,
  setCart,
} from 'src/features/canteenFeatures/orders/ordersSlice';

const EditCartItemModal = () => {
  const dispatch = useDispatch();
  const { cart, cartItem, isEditCartItemModalOpen } = useSelector(
    (state) => state.canteenOrders
  );

  const handleSubmit = () => {
    const { cartIndex, value, quantity } = cartItem;
    dispatch(
      setCart(
        cart.map((item, index) => {
          if (index === cartIndex) {
            return { ...item, value, quantity };
          }
          return item;
        })
      )
    );
    dispatch(closeEditCartItemModal());
    dispatch(clearCartItem());
  };

  return (
    <Dialog
      open={isEditCartItemModalOpen}
      container={() => document.getElementById('root')}
    >
      <DialogContent>
        <Typography variant="h4" gutterBottom mb={1} textAlign="left">
          Editing Cart Item
        </Typography>
        <Typography variant="h4" gutterBottom mb={3} textAlign="left">
          {cartItem.cartIndex !== undefined ? (
            `${cartItem.product.productName} - ${cartItem.product.productSKU}`
          ) : (
            <CircularProgress color="inherit" size={20} />
          )}
        </Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <NumericFormat
                  customInput={TextField}
                  label="Quantity"
                  id="quantity"
                  variant="outlined"
                  name="quantity"
                  value={cartItem.quantity}
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalScale={2}
                  allowNegative={false}
                  onValueChange={({ floatValue }) => {
                    const value =
                      floatValue > 0 && floatValue !== undefined
                        ? floatValue
                        : 1;
                    dispatch(
                      handleCartItemFormChange({ name: 'quantity', value })
                    );
                  }}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <NumericFormat
                  customInput={TextField}
                  label="Price"
                  id="value"
                  variant="outlined"
                  name="value"
                  value={cartItem.value}
                  thousandSeparator=","
                  decimalSeparator="."
                  decimalScale={2}
                  onValueChange={({ floatValue: value }) => {
                    dispatch(
                      handleCartItemFormChange({
                        name: 'value',
                        value: value ?? 0,
                      })
                    );
                  }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
        <DialogActions>
          <Grid item xs={12} md={6}>
            <Button
              variant="contained"
              color="success"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              Ok
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              type="cancel"
              onClick={() => {
                dispatch(closeEditCartItemModal());
                dispatch(clearCartItem());
              }}
            >
              Cancel
            </Button>
          </Grid>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default EditCartItemModal;
