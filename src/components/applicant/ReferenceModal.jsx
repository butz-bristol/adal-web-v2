import {
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';
import { toggleReferenceModal } from 'src/features/applicantFeatures/applicantSlice';

const ReferenceModal = ({ isOpen, data }) => {
  const dispatch = useDispatch();

  const handleButton = () => {
    dispatch(toggleReferenceModal());
  };

  return (
    <Modal open={isOpen}>
      <Card
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: { lg: 500, xs: 350 },
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CardContent>
          <Grid container justifyContent="center" alignContent="center">
            <Grid item xs={12} md={12} sx={{ my: 5 }}>
              <Typography variant="h3" textAlign={'center'}>
                {data.text}
              </Typography>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleButton}
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Modal>
  );
};

export default ReferenceModal;
