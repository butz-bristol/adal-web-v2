import { Modal, Paper } from '@mui/material';
import styles from '../modalBoxStyle';
import { PDFViewer } from '@react-pdf/renderer';
import MonthlyCashReceipts from './MonthlyCashReceipts';
import { useSelector } from 'react-redux';

const MCRPreview = ({ open, close, data, accData, month }) => {
  return (
    <Modal open={open} onClose={close}>
      <Paper sx={{ ...styles, width: '100%', padding: '3px', height: '90%', maxWidth: '900px' }}>
        <PDFViewer width="100%" height="100%">
          <MonthlyCashReceipts month={month} data={data} accumulatedData={accData} />
        </PDFViewer>
      </Paper>
    </Modal>
  );
};

export default MCRPreview;
