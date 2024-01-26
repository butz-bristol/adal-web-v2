import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import StudentInvoices from 'src/views/cashier/students/invoices';

const Invoices = () => {
  return (
    <SuspenseLoadingComponent>
      <StudentInvoices />
    </SuspenseLoadingComponent>
  );
};

export default Invoices;
