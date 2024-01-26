import { Suspense } from 'react';
import { CircularProgress } from '@mui/material';

const SuspenseLoadingComponent = ({ children }) => {
  return <Suspense fallback={<CircularProgress />}>{children}</Suspense>;
};

export default SuspenseLoadingComponent;
