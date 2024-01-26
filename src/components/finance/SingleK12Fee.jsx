import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

const SingleK12Fee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
  }, [dispatch, id]);

  return <div>SingleK12Fee</div>;
};
export default SingleK12Fee;
