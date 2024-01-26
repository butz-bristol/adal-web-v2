import { Modal, Paper } from '@mui/material';
import styles from '../modalBoxStyle';
import { PDFViewer } from '@react-pdf/renderer';
import YearlyCashReceipts from './YearlyCashReceipts';
import { useSelector } from 'react-redux';

const YCRPreview = ({ open, close, data, accData, academic_year }) => {
  return (
    <Modal open={open} onClose={close}>
      <Paper sx={{ ...styles, width: '100%', padding: '3px', height: '90%', maxWidth: '900px' }}>
        <PDFViewer width="100%" height="99%">
          <YearlyCashReceipts academic_year={academic_year} data={data} accumulatedData={accData} />
        </PDFViewer>
      </Paper>
    </Modal>
  );
};

export default YCRPreview;
