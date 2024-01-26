import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconUserCog } from '@tabler/icons-react';
import LinkComponent from 'src/components/LinkComponent';

const K12StudentTable = ({ students }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Grade Level</TableCell>
            <TableCell>Section</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {students?.map((student) => (
            <TableRow
              key={student._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {student?.student_number}
              </TableCell>
              <TableCell>
                {student?.student_first_name} {student?.student_last_name}{' '}
                {student?.student_middle_name}
              </TableCell>
              <TableCell>
                {student?.student_department?.department_name}
              </TableCell>
              <TableCell>
                {student?.student_yearlevel?.year_level_name}
              </TableCell>
              <TableCell>
                {student?.section?.section_name ?? 'Not Assigned'}
              </TableCell>
              <TableCell>
                <LinkComponent to={`/academics/students/${student?._id}`}>
                  <IconButton color="secondary">
                    <IconUserCog />
                  </IconButton>
                </LinkComponent>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default K12StudentTable;
