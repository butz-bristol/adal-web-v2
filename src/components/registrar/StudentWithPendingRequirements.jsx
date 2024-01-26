import SuspenseLoadingComponent from 'src/components/utilities/SuspenseLoadingComponent';
import Applicant from './Student';

const StudentWithPendingRequirements = () => {
  return (
    <SuspenseLoadingComponent>
      <Applicant />
    </SuspenseLoadingComponent>
  );
};
export default StudentWithPendingRequirements;
