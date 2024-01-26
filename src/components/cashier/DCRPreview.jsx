import { Modal, Paper } from '@mui/material';
import styles from '../modalBoxStyle';
import { PDFViewer } from '@react-pdf/renderer';
import DailyCashReceiptsPDF from './DailyCashReceiptsPDF';
import { useSelector } from 'react-redux';

const DCRPreview = ({ open, close, date, data, accData, filteredData }) => {
  const { accountNumbers } = useSelector((state) => state.cashier);
  const { userProfile } = useSelector((state) => state.users);

  return (
    <Modal open={open} onClose={close}>
      <Paper sx={{ ...styles, width: '100%', padding: '3px', height: '90%', maxWidth: '900px' }}>
        <PDFViewer width="100%" height="99%">
          <DailyCashReceiptsPDF
            date={date}
            data={data}
            accumulatedPayments={accData}
            filteredPayments={filteredData}
            account_nos={accountNumbers}
            clerk={`${userProfile.first_name} ${userProfile.last_name}`}
          />
        </PDFViewer>
      </Paper>
    </Modal>
  );
};

export default DCRPreview;
