import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  IconAffiliate,
  IconArrowNarrowLeft,
  IconUserPlus,
} from '@tabler/icons-react';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import AssignScholarship from 'src/components/admissions/AssignScholarship';
import BulkAssignScholarship from 'src/components/admissions/BulkAssignScholarship';
import { getAllPrograms } from 'src/features/academicFeatures/academicSlice';
import {
  deleteStudentScholarship,
  fetchAllStudentScholarships,
  fetchScholarship,
  setDynamicData,
  toggleEditStudentScholarship,
} from 'src/features/admissionsFeatures/admissionsSlice';
import {
  getAllAcademicYears,
  getAllCollegeTracks,
  getAllDepartments,
  getAllSemesters,
  getAllYearLevels,
  getRegisteredStudents,
  setDynamicData as setRegistrarData,
} from 'src/features/registrarFeatures/registrarSlice';

const StudentScholarships = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openBulkAssign, setOpenBulkAssign] = useState(false);
  const { studentScholarships, isFetchingStudentScholarships } = useSelector(
    (state) => state.admissions
  );

  const handleOpenBulkAssign = () => setOpenBulkAssign(true);
  const handleCloseBulkAssign = () => setOpenBulkAssign(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getRegisteredStudents());
    dispatch(fetchAllStudentScholarships());
    dispatch(getAllDepartments());
    dispatch(getAllCollegeTracks());
    dispatch(getAllYearLevels());
    dispatch(getAllPrograms());
    dispatch(getAllSemesters());
    dispatch(getAllAcademicYears());
  }, [dispatch]);

  useEffect(() => {
    if (!id) return;

    dispatch(fetchScholarship(id));
  }, [dispatch, id]);

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" mb={3}>
        <LinkComponent to="/admissions/student-scholarship">
          <Button variant="outlined" color="secondary">
            <IconArrowNarrowLeft />
            Back
          </Button>
        </LinkComponent>

        <Stack spacing={1} direction="row">
          <Button
            variant="contained"
            color="warning"
            startIcon={<IconAffiliate size="17px" />}
            onClick={handleOpenBulkAssign}
          >
            Bulk Assign
          </Button>

          <Button
            variant="contained"
            color="secondary"
            startIcon={<IconUserPlus size="17px" />}
            onClick={handleOpen}
          >
            Assign Scholarship
          </Button>
        </Stack>
      </Stack>

      <AssignScholarship open={open} close={handleClose} />
      {openBulkAssign && (
        <BulkAssignScholarship
          open={openBulkAssign}
          close={handleCloseBulkAssign}
        />
      )}

      {isFetchingStudentScholarships ? (
        <LoadingData />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Student No.</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Claim Status</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentScholarships
                ?.filter((data) => data?.scholarship_id?._id === id)
                ?.map((data) => (
                  <TableRow key={data._id}>
                    <TableCell>{data?.student?.student_number}</TableCell>
                    <TableCell>{`${data?.student?.student_first_name} ${data?.student?.student_last_name}`}</TableCell>
                    <TableCell>
                      {DateTime.fromISO(data?.date_assigned).toFormat(
                        'MMMM dd, yyyy'
                      )}
                    </TableCell>
                    <TableCell>
                      {data?.claimed ? 'Claimed' : 'Pending Claim'}
                    </TableCell>
                    <TableCell>{data?.status}</TableCell>
                    <TableCell>
                      <Stack
                        direction={{
                          xs: 'column',
                          sm: 'row',
                        }}
                        spacing={1}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          size="small"
                          onClick={() => {
                            dispatch(toggleEditStudentScholarship());
                            dispatch(
                              setDynamicData({
                                student_id: data?.student?._id,
                                scholarship_id: data?._id,
                                scholarship_status: data?.status,
                                date_assigned: data?.date_assigned,
                                studentScholarship_id: data?._id,
                                studentScholarship: data,
                                scholarship_description: data?.description,
                              })
                            );
                            dispatch(
                              setRegistrarData({
                                academic_year_id: data.academic_year._id,
                                semester_id: data?.semester_id?._id || '',
                              })
                            );
                          }}
                        >
                          Edit
                        </Button>

                        <Button
                          variant="outlined"
                          color="secondary"
                          size="small"
                          onClick={() =>
                            dispatch(deleteStudentScholarship(data?._id))
                          }
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Stack>
  );
};
export default StudentScholarships;
