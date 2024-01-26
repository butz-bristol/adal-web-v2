import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { student } = useSelector((state) => state.students);
    const navigate = useNavigate();

    useEffect(() => {
        if (!student || student.student_id === '') {
            navigate('../', { replace: true });
        }
    }, [navigate]);

    return children;
};

export default ProtectedRoute;