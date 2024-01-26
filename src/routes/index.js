import { useRoutes } from 'react-router-dom';
// routes

import academicsRoutes from './AcademicsRoutes';
import accountingRoutes from './AccountingRoutes';
import AdmissionFormRoutes from './AdmissionFormRoutes';
import admissionsRoutes from './AdmissionsRoutes';
import applicantRoutes from './ApplicantRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import canteenRoutes from './CanteenRoutes';
import cashierRoutes from './CashierRoutes';
import financeRoutes from './FinanceRoutes';
import hrRoutes from './HrRoutes';
import LibraryRoutes from './LibraryRoutes';
import PRFormRoutes from './PRFormRoutes';
import procurementRoutes from './ProcurementRoutes';
import registrarRoutes from './RegistrarRoutes';
import StudentRoutes from './StudentRoutes';
// =============|| ROUTING RENDER ||============= //

export default function ThemeRoutes() {
  return useRoutes([
    AuthenticationRoutes,
    hrRoutes,
    AdmissionFormRoutes,
    admissionsRoutes,
    LibraryRoutes,
    cashierRoutes,
    canteenRoutes,
    applicantRoutes,
    financeRoutes,
    registrarRoutes,
    accountingRoutes,
    procurementRoutes,
    PRFormRoutes,
    academicsRoutes,
    StudentRoutes,
  ]);
}
