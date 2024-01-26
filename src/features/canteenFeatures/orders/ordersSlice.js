import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  getFoundProductsThunk,
  getLastOrderNumberThunk,
  getBuyOrdersThunk,
  createBuyOrderThunk,
  getBuyOrderThunk,
  updateBuyOrderThunk,
  deleteBuyOrderThunk,
  getSellOrdersThunk,
  createSellOrderThunk,
  getSellOrderThunk,
  updateSellOrderThunk,
  deleteSellOrderThunk
} from './ordersThunk';
import { toast } from 'react-toastify';

const initialState = {
  searchQuery: '',
  foundProducts: [],

  isEditCartItemModalOpen: false,
  // For EditCartItemModal
  cartItem: {
    cartIndex: undefined,
    product: {
      _id: undefined,
      productName: undefined,
      productSKU: undefined
    },
    value: 0,
    quantity: 1
  },

  // For 'Create' and 'Update' in '/canteen/buy'
  orderNumber: '',
  cart: [],

  // view-one
  order: {
    _id: undefined,
    supplierName: undefined,
    orderNumber: undefined,
    cart: []
  },

  // view-all
  buyOrders: [],
  sellOrders: [],

  // API Calls
  isFetchingFoundProducts: false,
  isFetchingLastOrderNumber: false,

  isCreatingBuyOrder: false,
  isUpdatingBuyOrder: false,
  isDeletingBuyOrder: false,
  isFetchingBuyOrders: false,
  isFetchingBuyOrder: false,

  isCreatingSellOrder: false,
  isUpdatingSellOrder: false,
  isDeletingSellOrder: false,
  isFetchingSellOrders: false,
  isFetchingSellOrder: false
};

export const getFoundProducts = createAsyncThunk('orders/searchProducts', async (_, thunkAPI) => {
  const { searchQuery } = thunkAPI.getState().canteenOrders;

  if (!searchQuery) {
    return { foundProducts: [] };
  }

  const url = `/canteen/orders/search?query=${searchQuery}`;
  return getFoundProductsThunk(url, thunkAPI);
});

export const getLastOrderNumber = createAsyncThunk('orders/lastOrderNumber', async (transactionType, thunkAPI) => {
  return getLastOrderNumberThunk(`/canteen/orders/${transactionType}/last-formatted-order`, thunkAPI);
});

export const createBuyOrder = createAsyncThunk('orders/createBuyOrder', async (buyTransaction, thunkAPI) => {
  return createBuyOrderThunk('/canteen/orders/buy', buyTransaction, thunkAPI);
});

export const updateBuyOrder = createAsyncThunk('orders/updateBuyOrder', async (orderToUpdate, thunkAPI) => {
  const { _id: orderId, ...restOfOrder } = orderToUpdate;
  return updateBuyOrderThunk(`/canteen/orders/buy/${orderId}`, restOfOrder, thunkAPI);
});

export const deleteBuyOrder = createAsyncThunk('orders/deleteBuyOrder', async (orderId, thunkAPI) => {
  return deleteBuyOrderThunk(`/canteen/orders/buy/${orderId}`, thunkAPI);
});

export const getBuyOrders = createAsyncThunk('orders/getBuyOrders', async (_, thunkAPI) => {
  return getBuyOrdersThunk('/canteen/orders/buy', thunkAPI);
});

export const getBuyOrder = createAsyncThunk('orders/getBuyOrder', async (buyOrderId, thunkAPI) => {
  return getBuyOrderThunk(`/canteen/orders/buy/${buyOrderId}`, thunkAPI);
});

export const createSellOrder = createAsyncThunk('orders/createSellOrder', async (sellTransaction, thunkAPI) => {
  return createSellOrderThunk('/canteen/orders/sell', sellTransaction, thunkAPI);
});

export const updateSellOrder = createAsyncThunk('orders/updateSellOrder', async (orderToUpdate, thunkAPI) => {
  const { _id: orderId, ...restOfOrder } = orderToUpdate;
  return updateSellOrderThunk(`/canteen/orders/sell/${orderId}`, restOfOrder, thunkAPI);
});

export const deleteSellOrder = createAsyncThunk('orders/deleteSellOrder', async (orderId, thunkAPI) => {
  return deleteSellOrderThunk(`/canteen/orders/sell/${orderId}`, thunkAPI);
});

export const getSellOrders = createAsyncThunk('orders/getSellOrders', async (_, thunkAPI) => {
  return getSellOrdersThunk('/canteen/orders/sell', thunkAPI);
});

export const getSellOrder = createAsyncThunk('orders/getSellOrder', async (sellOrderId, thunkAPI) => {
  return getSellOrderThunk(`/canteen/orders/sell/${sellOrderId}`, thunkAPI);
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearFoundProducts(state) {
      state.foundProducts = initialState.foundProducts;
    },

    setOrderNumber: (state, action) => {
      state.orderNumber = action.payload;
    },

    setCart: (state, action) => {
      state.cart = action.payload;
    },

    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },

    clearSearchQuery(state) {
      state.searchQuery = initialState.searchQuery;
    },

    clearTransaction(state) {
      state.orderNumber = initialState.orderNumber;
      state.cart = initialState.cart;
    },

    openEditCartItemModal(state) {
      state.isEditCartItemModalOpen = true;
    },

    closeEditCartItemModal(state) {
      state.isEditCartItemModalOpen = false;
    },

    handleCartItemFormChange(state, { payload }) {
      state.cartItem[payload.name] = payload.value;
    },

    setCartItem: (state, action) => {
      state.cartItem = action.payload;
    },

    clearCartItem(state) {
      state.cartItem = initialState.cartItem;
    },

    setOrder: (state, action) => {
      state.order = action.payload;
    },

    clearOrder(state) {
      state.order = initialState.order;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFoundProducts.pending, (state) => {
        state.isFetchingFoundProducts = true;
      })
      .addCase(getFoundProducts.fulfilled, (state, { payload }) => {
        state.isFetchingFoundProducts = false;
        state.foundProducts = payload.foundProducts;
      })
      .addCase(getFoundProducts.rejected, (state) => {
        state.isFetchingFoundProducts = false;
      })

      .addCase(getLastOrderNumber.pending, (state) => {
        state.isFetchingLastOrderNumber = true;
      })
      .addCase(getLastOrderNumber.fulfilled, (state, { payload }) => {
        state.isFetchingLastOrderNumber = false;
        const { lastOrderNumber } = payload;
        const [year, month, orderCount] = lastOrderNumber.split('.');
        const incrementedOrderCount = (Number(orderCount) + 1).toString().padStart(4, '0');
        state.orderNumber = `${year}.${month}.${incrementedOrderCount}`;
      })
      .addCase(getLastOrderNumber.rejected, (state) => {
        state.isFetchingLastOrderNumber = false;
      })

      .addCase(createBuyOrder.pending, (state) => {
        state.isCreatingBuyOrder = true;
      })
      .addCase(createBuyOrder.fulfilled, (state) => {
        state.isCreatingBuyOrder = false;
        toast.success('Purchase order created successfully');
      })
      // TODO:
      // Handle auto-increment in case of order number collision
      // e.g. if another user creates a transaction with an order number
      // equal to the current user's, this will cause a 400 Error
      .addCase(createBuyOrder.rejected, (state, { payload }) => {
        state.isCreatingBuyOrder = false;
        toast.error(`Buy error: ${payload.msg}`);
      })

      .addCase(updateBuyOrder.pending, (state) => {
        state.isUpdatingBuyOrder = true;
      })
      .addCase(updateBuyOrder.fulfilled, (state) => {
        state.isUpdatingBuyOrder = false;
        toast.success('Purchase order updated successfully');
      })
      .addCase(updateBuyOrder.rejected, (state, { payload }) => {
        state.isUpdatingBuyOrder = false;
        toast.error(`Update order error: ${payload.msg}`);
      })

      .addCase(deleteBuyOrder.pending, (state) => {
        state.isDeletingBuyOrder = true;
      })
      .addCase(deleteBuyOrder.fulfilled, (state) => {
        state.isDeletingBuyOrder = false;
        toast.success('Purchase order deleted successfully');
      })
      .addCase(deleteBuyOrder.rejected, (state, { payload }) => {
        state.isDeletingBuyOrder = false;
        toast.error(`Delete order error: ${payload.msg}`);
      })

      .addCase(getBuyOrders.pending, (state) => {
        state.isFetchingBuyOrders = true;
      })
      .addCase(getBuyOrders.fulfilled, (state, { payload }) => {
        state.isFetchingBuyOrders = false;
        state.buyOrders = payload.orders;
      })
      .addCase(getBuyOrders.rejected, (state) => {
        state.isFetchingBuyOrders = false;
      })

      .addCase(getBuyOrder.pending, (state) => {
        state.isFetchingBuyOrder = true;
      })
      .addCase(getBuyOrder.fulfilled, (state, { payload }) => {
        state.isFetchingBuyOrder = false;
        state.order = payload.order;
      })
      .addCase(getBuyOrder.rejected, (state, { payload }) => {
        state.isFetchingBuyOrder = false;
        toast.error(`Get buy order error: ${payload.msg}`);
      })

      .addCase(createSellOrder.pending, (state) => {
        state.isCreatingSellOrder = true;
      })
      .addCase(createSellOrder.fulfilled, (state) => {
        state.isCreatingSellOrder = false;
        toast.success('Sales order created successfully');
      })
      // TODO:
      // Handle auto-increment in case of order number collision
      // e.g. if another user creates a transaction with an order number
      // equal to the current user's, this will cause a 400 Error
      .addCase(createSellOrder.rejected, (state, { payload }) => {
        state.isCreatingSellOrder = false;
        toast.error(`Sell error: ${payload.msg}`);
      })

      .addCase(updateSellOrder.pending, (state) => {
        state.isUpdatingSellOrder = true;
      })
      .addCase(updateSellOrder.fulfilled, (state) => {
        state.isUpdatingSellOrder = false;
        toast.success('Sales order updated successfully');
      })
      .addCase(updateSellOrder.rejected, (state, { payload }) => {
        state.isUpdatingSellOrder = false;
        toast.error(`Update order error: ${payload.msg}`);
      })

      .addCase(deleteSellOrder.pending, (state) => {
        state.isDeletingSellOrder = true;
      })
      .addCase(deleteSellOrder.fulfilled, (state) => {
        state.isDeletingSellOrder = false;
        toast.success('Sales order deleted successfully');
      })
      .addCase(deleteSellOrder.rejected, (state, { payload }) => {
        state.isDeletingSellOrder = false;
        toast.error(`Delete order error: ${payload.msg}`);
      })

      .addCase(getSellOrders.pending, (state) => {
        state.isFetchingSellOrders = true;
      })
      .addCase(getSellOrders.fulfilled, (state, { payload }) => {
        state.isFetchingSellOrders = false;
        state.sellOrders = payload.orders;
      })
      .addCase(getSellOrders.rejected, (state) => {
        state.isFetchingSellOrders = false;
      })

    .addCase(getSellOrder.pending, (state) => {
      state.isFetchingSellOrder = true;
    })
    .addCase(getSellOrder.fulfilled, (state, { payload }) => {
      state.isFetchingSellOrder = false;
      state.order = payload.order;
    })
    .addCase(getSellOrder.rejected, (state, { payload }) => {
      state.isFetchingSellOrder = false;
      toast.error(`Get sell order error: ${payload.msg}`);
    });
  }
});

export const {
  clearFoundProducts,
  setOrderNumber,
  setCart,
  setSearchQuery,
  clearSearchQuery,
  clearTransaction,
  openEditCartItemModal,
  closeEditCartItemModal,
  handleCartItemFormChange,
  setCartItem,
  clearCartItem,
  setOrder,
  clearOrder
} = ordersSlice.actions;

export default ordersSlice.reducer;
