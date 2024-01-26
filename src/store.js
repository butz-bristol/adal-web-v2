import { configureStore } from '@reduxjs/toolkit';
import academicSlice from 'src/features/academicFeatures/academicSlice';
import accountingSlice from 'src/features/accountingFeatures/accountingSlice';
import admissionsSlice from 'src/features/admissionsFeatures/admissionsSlice';
import applicantSlice from 'src/features/applicantFeatures/applicantSlice';
import {
  canteenOrdersSlice,
  canteenProductSlice,
} from 'src/features/canteenFeatures';
import cashierSlice from 'src/features/cashierFeatures/cashierSlice';
import fileUploadSlice from 'src/features/fileUploadFeatures/fileUploadSlice';
import financeSlice from 'src/features/financeFeatures/financeSlice';
import hrSlice from 'src/features/hrFeatures/coreHr/hrSlice';
import employeeSlice from 'src/features/hrFeatures/employees/employeeSlice';
import payrollSlice from 'src/features/hrFeatures/payroll/payrollSlice';
import booksSlice from 'src/features/libraryFeatures/books/booksSlice';
import epubsSlice from 'src/features/libraryFeatures/e-publications/epubsSlice';
import bookOverdueFinesSlice from 'src/features/libraryFeatures/overdueBooks/bookOverdueFinesSlice';
import categoriesSlice from 'src/features/procurementFeatures/categories/categoriesSlice';
import itemRequestsSlice from 'src/features/procurementFeatures/itemRequests/itemRequestsSlice';
import itemsSlice from 'src/features/procurementFeatures/items/itemsSlice';
import registrarSlice from 'src/features/registrarFeatures/registrarSlice';
import studentSlice from 'src/features/studentFeatures/studentSlice';
import userSlice from 'src/features/users/userSlice';
import customizationReducer from 'src/store/customizationSlice';

const store = configureStore({
  reducer: {
    users: userSlice,
    customization: customizationReducer,
    coreHr: hrSlice,
    employees: employeeSlice,
    payroll: payrollSlice,
    admissions: admissionsSlice,
    applicants: applicantSlice,
    students: studentSlice,
    books: booksSlice,
    epublications: epubsSlice,
    cashier: cashierSlice,
    registrar: registrarSlice,
    finance: financeSlice,
    accounting: accountingSlice,
    items: itemsSlice,
    itemRequests: itemRequestsSlice,
    fileUpload: fileUploadSlice,
    academics: academicSlice,
    categories: categoriesSlice,
    bookOverdueFines: bookOverdueFinesSlice,
    canteenProducts: canteenProductSlice,
    canteenOrders: canteenOrdersSlice,
  },
});

export default store;
