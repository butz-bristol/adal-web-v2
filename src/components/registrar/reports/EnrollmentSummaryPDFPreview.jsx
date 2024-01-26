import { Modal, Paper } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { useMemo } from 'react';
import styles from 'src/components/modalBoxStyle';
import EnrollmentSummaryPDF from './EnrollmentSummaryPDF';

const EnrollmentSummaryPDFPreview = ({ open, close, data, showList, list }) => {
  console.log(showList);
  const componentToRender = useMemo(
    () => (
      <Modal open={open} onClose={close}>
        <Paper sx={{ ...styles, width: '900px', p: 0.5, overflow: 'scroll' }}>
          <PDFViewer width="100%" height="900">
            <EnrollmentSummaryPDF data={data} showList={showList} list={list} />
          </PDFViewer>
        </Paper>
      </Modal>
    ),
    [open, close, data, showList, list]
  );

  return componentToRender;
};

export default EnrollmentSummaryPDFPreview;
