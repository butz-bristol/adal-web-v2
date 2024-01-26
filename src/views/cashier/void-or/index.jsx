import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import VoidReceiptNos from 'src/views/finance/void-or';

const VoidORNumbers = () => {
  return (
    <SuspenseLoadingComponent>
      <VoidReceiptNos isCashier />
    </SuspenseLoadingComponent>
  );
};

export default VoidORNumbers;
