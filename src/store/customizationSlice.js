// project imports
import { createSlice } from '@reduxjs/toolkit';
import {
  addCustomizationToLocalStorage,
  getCustomizationFromLocalStorage,
} from 'src/utils/localStorage';
const customization = getCustomizationFromLocalStorage();

const initialState = {
  fontFamily: customization?.fontFamily ?? `'Poppins', sans-serif`,
  borderRadius: customization?.borderRadius ?? 4,
  navType: customization?.navType ?? 'light',
  isOpen: [], // for active default menu
  opened: true,
};

const customizationReducer = createSlice({
  name: 'customization',
  initialState,
  reducers: {
    setMenuId: (state, action) => {
      state.isOpen = [action.payload];
    },
    toggleMenu: (state) => {
      state.opened = !state.opened;
    },
    setAppFontFamily: (state, action) => {
      state.fontFamily = action.payload;
      addCustomizationToLocalStorage({
        ...initialState,
        fontFamily: action.payload,
      });
    },
    setAppBorderRadius: (state, action) => {
      state.borderRadius = action.payload;
      addCustomizationToLocalStorage({
        ...initialState,
        borderRadius: action.payload,
      });
    },
    setTheme: (state, action) => {
      state.navType = action.payload;
      addCustomizationToLocalStorage({
        ...initialState,
        navType: action.payload,
      });
    },
  },
});

export const {
  setRTL,
  setMenuId,
  toggleMenu,
  setAppFontFamily,
  setAppBorderRadius,
  setTheme,
} = customizationReducer.actions;

export default customizationReducer.reducer;
