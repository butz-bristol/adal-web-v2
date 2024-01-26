import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { roles } from 'src/utils/helperFunctions';

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || roles.indexOf(user?.user_role) === -1) {
      navigate('../', { replace: true });
    }
  }, [navigate]);

  return children;
};

export default ProtectedRoute;
