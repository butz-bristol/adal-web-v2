import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import PaymentsProcessing from 'src/views/cashier/students/payments';

const Payments = () => {
  return (
    <SuspenseLoadingComponent>
      <PaymentsProcessing />
    </SuspenseLoadingComponent>
  );
};

export default Payments;
