import { Modal, Paper } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from 'src/features/users/userSlice';
import OR from './OR';
import styles from './modalBoxStyle';

const ORPreview = ({ open, onClose, tuitionParticular }) => {
  const { user, userProfile } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const {
    amount_paid,
    student: selectedStudent,
    otherFee1,
    otherFee2,
    otherFee3,
    other_fee_1_amount,
    other_fee_2_amount,
    other_fee_3_amount,
    other_fee_1_note,
    other_fee_2_note,
    other_fee_3_note,
    tuition_note,
    month,
    total_payment_amount,
  } = useSelector((state) => state.cashier);

  const particularsArray = [];
  const paymentsArray = [];

  if (month && amount_paid) {
    particularsArray.push({ item: `${tuitionParticular}`, note: tuition_note });
    paymentsArray.push(amount_paid);
  }

  if (other_fee_1_amount > 0) {
    particularsArray.push({
      item: otherFee1?.otherFee
        ? otherFee1?.otherFee?.other_fee?.toUpperCase()
        : otherFee1?.other_fee?.toUpperCase(),
      note: other_fee_1_note,
    });
    paymentsArray.push(other_fee_1_amount);
  }

  if (other_fee_2_amount > 0) {
    particularsArray.push({
      item: otherFee2?.otherFee
        ? otherFee2?.otherFee?.other_fee?.toUpperCase()
        : otherFee2?.other_fee?.toUpperCase(),
      note: other_fee_2_note,
    });
    paymentsArray.push(other_fee_2_amount);
  }

  if (other_fee_3_amount > 0) {
    particularsArray.push({
      item: otherFee3?.otherFee
        ? otherFee3?.otherFee?.other_fee?.toUpperCase()
        : otherFee3?.other_fee?.toUpperCase(),
      note: other_fee_3_note,
    });
    paymentsArray.push(other_fee_3_amount);
  }

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch, user?.userId]);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ ...styles, width: '900px', padding: '3px' }}>
        <PDFViewer width="100%" height="700">
          <OR
            desc={particularsArray}
            clerk={`${userProfile?.first_name} ${
              userProfile?.middle_name ?? ''
            } ${userProfile.last_name}`}
            amount={
              parseFloat(amount_paid || 0) +
              parseFloat(other_fee_1_amount || 0) +
              parseFloat(other_fee_2_amount || 0) +
              parseFloat(other_fee_3_amount || 0)
            }
            payments={paymentsArray}
            student={`${selectedStudent?.student_first_name}, ${
              selectedStudent?.student_last_name
            } ${selectedStudent?.student_middle_name ?? ''}`.toUpperCase()}
            year_level={selectedStudent?.student_yearlevel?.year_level_name}
            total_payment_amount={total_payment_amount}
            change={
              parseFloat(total_payment_amount) -
              (parseFloat(amount_paid || 0) +
                parseFloat(other_fee_1_amount || 0) +
                parseFloat(other_fee_2_amount || 0) +
                parseFloat(other_fee_3_amount || 0))
            }
          />
        </PDFViewer>
      </Paper>
    </Modal>
  );
};

export default ORPreview;
