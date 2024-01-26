import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import StudentAccounts from 'src/views/cashier/students/accounts';

const Accounts = () => {
  return (
    <SuspenseLoadingComponent>
      <StudentAccounts />
    </SuspenseLoadingComponent>
  );
};

export default Accounts;
