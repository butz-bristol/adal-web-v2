import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { IconEdit, IconPlus, IconTrashXFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LinkComponent from 'src/components/LinkComponent';
import LoadingData from 'src/components/LoadingData';
import AddScholarship from 'src/components/admissions/AddScholarship';
import {
  archiveScholarship,
  fetchAllScholarships,
  setDynamicData,
  toggleEditScholarship,
} from 'src/features/admissionsFeatures/admissionsSlice';
import {
  getAllAcademicYears,
  getAllSemesters,
  setDynamicData as setRegistrarData,
} from 'src/features/registrarFeatures/registrarSlice';
import { formatSalary } from 'src/utils/helperFunctions';
const Scholarships = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { isFetchingScholarships, scholarships } = useSelector(
    (state) => state.admissions
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(fetchAllScholarships());
    dispatch(getAllAcademicYears());
    dispatch(getAllSemesters());
  }, [dispatch]);

  return (
    <Stack>
      <Stack direction="row" justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleOpen}
          startIcon={<IconPlus />}
        >
          Add New
        </Button>
      </Stack>

      <AddScholarship open={open} handleClose={handleClose} />

      {!isFetchingScholarships ? (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  Grade Requirement
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell>School Year</TableCell>
                <TableCell>Actions</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scholarships
                ?.filter((scholarship) => !scholarship?.isArchived)
                .map((scholarship) => (
                  <TableRow key={scholarship._id}>
                    <TableCell>{scholarship.scholarship_name}</TableCell>
                    <TableCell>
                      {formatSalary(scholarship.scholarship_amount)}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      {scholarship.maintaining_grades_required}%
                    </TableCell>
                    <TableCell>{scholarship.scholarship_status}</TableCell>
                    <TableCell>
                      {scholarship?.academic_year_id?.school_year}
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction={{
                          xs: 'column',
                          sm: 'row',
                        }}
                        spacing={1}
                      >
                        <IconButton
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            dispatch(toggleEditScholarship());
                            dispatch(
                              setDynamicData({
                                scholarship_name: scholarship.scholarship_name,
                                scholarship_amount:
                                  scholarship.scholarship_amount,
                                scholarship_status:
                                  scholarship.scholarship_status,
                                maintaining_grades_required:
                                  scholarship.maintaining_grades_required,
                                scholarship_id: scholarship._id,
                              })
                            );
                            dispatch(
                              setRegistrarData({
                                academic_year_id:
                                  scholarship.academic_year_id._id,
                                semester_id:
                                  scholarship?.semester_id?._id || '',
                              })
                            );
                          }}
                        >
                          <IconEdit />
                        </IconButton>

                        <IconButton
                          variant="outlined"
                          size="small"
                          color="error"
                          onClick={() =>
                            dispatch(archiveScholarship(scholarship?._id))
                          }
                        >
                          <IconTrashXFilled />
                        </IconButton>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      <LinkComponent
                        to={`/admissions/student-scholarship/${scholarship._id}`}
                        style={{ textDecoration: 'none' }}
                      >
                        <Button variant="text" size="small">
                          View Students
                        </Button>
                      </LinkComponent>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <LoadingData />
      )}
    </Stack>
  );
};

export default Scholarships;
