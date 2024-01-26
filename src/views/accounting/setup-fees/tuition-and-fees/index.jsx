import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import TuitionAndFeesComponent from 'src/views/finance/setup-fees/tuition-and-fees';

const TuitionAndFees = () => {
  return (
    <SuspenseLoadingComponent>
      <TuitionAndFeesComponent />
    </SuspenseLoadingComponent>
  );
};

export default TuitionAndFees;
