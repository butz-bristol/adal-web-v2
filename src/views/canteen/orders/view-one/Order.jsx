import { ArrowCircleLeft } from '@mui/icons-material';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material';
import { Stack } from '@mui/system';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import LoadingData from 'src/components/LoadingData';

const Order = ({
  isFetchingOrder,
  renderVoidConfirmationModal,
  renderHeader,
  renderCartTableHead,
  renderCartTableBody,
  renderEditOrderButton,
  renderVoidOrderButton,
}) => {
  const navigate = useNavigate();
  return (
    <>
      <Stack direction="row" justifyContent="space-between" mb={1}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<ArrowCircleLeft />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        {!isFetchingOrder && (
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            {renderEditOrderButton()}
            {renderVoidOrderButton()}
          </Stack>
        )}
      </Stack>

      {isFetchingOrder ? (
        <LoadingData />
      ) : (
        <>
          {renderVoidConfirmationModal()}
          {renderHeader()}
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>{renderCartTableHead()}</TableHead>
              <TableBody>{renderCartTableBody()}</TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

Order.propTypes = {
  isFetchingOrder: PropTypes.bool,
  renderVoidConfirmationModal: PropTypes.func,
  renderHeader: PropTypes.func,
  renderCartTableHead: PropTypes.func,
  renderCartTableBody: PropTypes.func,
  renderEditOrderButton: PropTypes.func,
  renderVoidOrderButton: PropTypes.func,
};

export default Order;
