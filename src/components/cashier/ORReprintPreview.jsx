import { useEffect } from 'react';
import { Modal, Paper } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { useDispatch, useSelector } from 'react-redux';
import ORReprint from './ORReprint';
import styles from '../modalBoxStyle';

const ORReprintPreview = ({ open, onClose, transaction }) => {
  const { student, clerk, payment_date, payments } = transaction;

  const particularsArray = payments?.map((payment) => ({
    item: payment.description,
    note: payment.note
  }));
  const paymentsArray = payments?.map((payment) => payment.payment_amount);

  return (
    <Modal open={open} onClose={onClose}>
      <Paper sx={{ ...styles, width: '901px', padding: '3px' }}>
        <PDFViewer width="100%" height="700">
          <ORReprint
            desc={particularsArray}
            clerk={`${clerk?.first_name} ${clerk?.middle_name ?? ''} ${clerk?.last_name}`}
            date={payment_date}
            amount={payments?.reduce((acc, curr) => acc + curr.payment_amount, 0)}
            payments={paymentsArray}
            student={`${student?.student_first_name}, ${student?.student_last_name} ${student?.student_middle_name ?? ''}`.toUpperCase()}
            year_level={student?.student_yearlevel?.year_level_name}
          />
        </PDFViewer>
      </Paper>
    </Modal>
  );
};

export default ORReprintPreview;
