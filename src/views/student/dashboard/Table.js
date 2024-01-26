import PropTypes from 'prop-types';

// material-ui
import {
  Button,
  CardActions,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

// third party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'src/ui-component/cards/MainCard';

// table data
function createData(image, subject, dept, date) {
  return { image, subject, dept, date };
}
const rows = [
  createData('1', 'Math', '80%', 'Passed'),
  createData('2', 'English', '85%', 'Passed'),
  createData('3', 'Science', '88%', 'Passed'),
];

// =========================|| DASHBOARD ANALYTICS - LATEST CUSTOMERS TABLE CARD ||========================= //

const LatestCustomerTableCard = ({ title }) => (
  <MainCard title={title} content={false}>
    <PerfectScrollbar style={{ height: 345, padding: 0 }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }}>#</TableCell>
              <TableCell>Subjects</TableCell>
              <TableCell>Grades</TableCell>
              <TableCell align="right" sx={{ pr: 3 }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow hover key={index}>
                <TableCell>{row.image}</TableCell>
                <TableCell>{row.subject}</TableCell>
                <TableCell>{row.dept}</TableCell>
                <TableCell align="right" sx={{ pr: 3 }}>
                  {row.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PerfectScrollbar>

    <Divider />
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button variant="text" size="small">
        View all Latest Customers
      </Button>
    </CardActions>
  </MainCard>
);

LatestCustomerTableCard.propTypes = {
  title: PropTypes.string,
};

export default LatestCustomerTableCard;
