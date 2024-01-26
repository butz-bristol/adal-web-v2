import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import ReportsComponent from 'src/views/cashier/reports';

const Reports = () => {
  return (
    <SuspenseLoadingComponent>
      <ReportsComponent />
    </SuspenseLoadingComponent>
  );
};

export default Reports;
