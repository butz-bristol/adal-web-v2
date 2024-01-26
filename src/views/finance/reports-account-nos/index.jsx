import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import ReportAccountNosComponent from 'src/views/cashier/reports-account-nos';

const ReportAccountNos = () => {
  return (
    <SuspenseLoadingComponent>
      <ReportAccountNosComponent />
    </SuspenseLoadingComponent>
  );
};

export default ReportAccountNos;
