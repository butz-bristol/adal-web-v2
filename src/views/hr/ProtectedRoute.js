import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector((state) => state.users);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user || user.user_role !== 'hr admin') {
            navigate('../', { replace: true });
        }
    }, [navigate]);

    return children;
};

export default ProtectedRoute;