import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';

const TESDAEnrollmentReport = ({ enrollments }) => {
  const [page, setPage] = React.useState(0);
  const rowsPerPageOptions = [50, 75, 100];
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  const tableData = enrollments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Paper>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Student</TableCell>
              <TableCell>Sex</TableCell>
              <TableCell>Year Level</TableCell>
              <TableCell>Program</TableCell>
              <TableCell>Major</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tableData.map((enrollment) => (
              <TableRow key={enrollment._id}>
                <TableCell>
                  <Typography>
                    {enrollment.student.student_last_name} {enrollment.student.student_first_name} {enrollment.student.student_middle_name}
                  </Typography>
                  <Typography variant="caption">{enrollment.student.student_number}</Typography>
                </TableCell>
                <TableCell>{enrollment.student.student_gender}</TableCell>
                <TableCell>{enrollment.student?.student_yearlevel?.year_level_name ?? 'N/A'}</TableCell>
                <TableCell>{enrollment.student.student_program.program_name}</TableCell>
                <TableCell>{enrollment.student?.student_major ? enrollment.student.student_major.major_name : 'N/A'}</TableCell>
              </TableRow>
            ))}

            {tableData.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography>No data available</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={enrollments.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default TESDAEnrollmentReport;
