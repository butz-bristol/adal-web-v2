import {
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { IconCircleXFilled, IconDownload, IconEye } from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import EnrollmentPDFFile from './PDFDocument';
import { H5Typography } from '../OtherComponents';

const SHSAssessments = ({ assessments }) => {
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [50, 100, 150];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const tableData = assessments.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Stack>
      <Stack
        direction={{
          xs: 'column',
          sm: 'row',
        }}
        spacing={2}
        mb={2}
      >
        <Card>
          <CardContent
            style={{
              padding: '15px',
              backgroundColor: '#740202',
            }}
          >
            <Stack direction={'row'} spacing={2}>
              <H5Typography>Withdrawn Enrollments:</H5Typography>
              <H5Typography>0</H5Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent
            style={{
              padding: '15px',
              backgroundColor: '#2196f3',
            }}
          >
            <Stack direction={'row'} spacing={2}>
              <H5Typography>Withdrawn Enrollments:</H5Typography>
              <H5Typography>0</H5Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent
            style={{
              padding: '15px',
            }}
          >
            <Stack direction={'row'} spacing={2}>
              <H5Typography variant="h5" color="secondary">
                Withdrawn Enrollments:
              </H5Typography>
              <H5Typography variant="h5" color="secondary">
                0
              </H5Typography>
            </Stack>
          </CardContent>
        </Card>
      </Stack>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>School Year</TableCell>
                <TableCell>Payment</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tableData?.map((assessment) => (
                <TableRow key={assessment._id}>
                  <TableCell>
                    <Typography>
                      {assessment?.student?.student_last_name},{' '}
                      {assessment?.student?.student_first_name}{' '}
                      {assessment?.student?.student_middle_name ?? ''}
                    </Typography>
                    <Typography variant="caption">
                      {assessment?.student?.student_number}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {assessment?.year_level?.year_level_name}
                  </TableCell>
                  <TableCell>
                    {assessment?.academic_year?.school_year}
                  </TableCell>
                  <TableCell>{assessment?.payment_status}</TableCell>
                  <TableCell>
                    <Stack
                      direction={{ xs: 'column', sm: 'row', md: 'row' }}
                      alignItems={'center'}
                    >
                      <Tooltip title="Withdraw Assessment">
                        <IconButton
                          variant="contained"
                          color="success"
                          onClick={() => toast.info('Feature Coming Soon..')}
                        >
                          <IconCircleXFilled />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="View Assessment">
                        <IconButton
                          color="info"
                          onClick={() => toast.info('Feature Coming Soon..')}
                        >
                          <IconEye />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download PDF">
                        <IconButton
                          variant="contained"
                          color="secondary"
                          size="small"
                        >
                          <PDFDownloadLink
                            document={
                              <EnrollmentPDFFile
                                student_first_name={
                                  assessment?.student?.student_first_name
                                }
                                student_last_name={
                                  assessment?.student?.student_last_name
                                }
                                student_middle_name={
                                  assessment?.student?.student_middle_name
                                }
                                student_section={'N/A'}
                                student_number={
                                  assessment?.student?.student_number
                                }
                                student_year_level={
                                  assessment?.year_level?.year_level_name
                                }
                                studentFees={assessment?.studentFees}
                                payment_scheme={[]}
                                subjects={[]}
                                track={'Pre-School & Grade School'}
                                totalFees={0}
                                studentLedger={[]}
                              />
                            }
                            fileName={`${
                              assessment?.student?.student_last_name
                            }, ${assessment?.student?.student_first_name} ${
                              assessment?.student?.student_middle_name ?? ''
                            } - ${assessment?.academic_year?.school_year}`}
                          >
                            {({ blob, url, loading, error }) =>
                              loading ? (
                                <CircularProgress
                                  size={'20px'}
                                  style={{ color: '#740202' }}
                                />
                              ) : (
                                <IconDownload color="#740202" />
                              )
                            }
                          </PDFDownloadLink>
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}

              {tableData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Typography variant="h5" color="textSecondary">
                      No Assessments Found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={tableData.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
        />
      </Paper>
    </Stack>
  );
};
export default SHSAssessments;
