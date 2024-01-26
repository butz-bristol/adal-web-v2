import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { applicant } = useSelector((state) => state.applicants);
    const navigate = useNavigate();

    useEffect(() => {
        if (!applicant || !applicant.student_id) {
            navigate('../', { replace: true });
        }
    }, [navigate]);

    return children;
};

export default ProtectedRoute;
