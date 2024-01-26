import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import FeeTypesComponent from 'src/views/finance/setup-fees/fee-types';

const FeeTypes = () => {
  return (
    <SuspenseLoadingComponent>
      <FeeTypesComponent />
    </SuspenseLoadingComponent>
  );
};

export default FeeTypes;
