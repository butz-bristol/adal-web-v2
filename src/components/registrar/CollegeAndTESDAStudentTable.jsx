import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { PDFDownloadLink } from '@react-pdf/renderer';
import {
  IconBackspaceFilled,
  IconSquareRoundedPlusFilled,
} from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import ProgramCurriculum from 'src/components/ProgramCurriculum';
import styles from 'src/components/accounting/modalBoxStyle';
import AntSwitchComponent from 'src/components/utilities/AntSwitch';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  getAllCollegeSubjects,
  getAllTesdaCourses,
  getCollegeSubjectsByProgram,
  getTESDACoursesByProgram,
  handleChange as handleAcademicChange,
} from 'src/features/academicFeatures/academicSlice';
import {
  createCollegeQuarterlyPaymentScheme,
  createStudentLedger,
  createTESDAQuarterlyPaymentScheme,
  updateStudentLedger,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  fetchFeesForEnrollmentByProgram,
  handleChange as handleFinanceChange,
} from 'src/features/financeFeatures/financeSlice';
import {
  createCollegeEnrollment,
  createTESDAEnrollment,
  getStudent,
  handleChange,
  updateStudent,
} from 'src/features/registrarFeatures/registrarSlice';
import {
  divideByFour,
  formatSalary,
  formatUnit,
} from 'src/utils/helperFunctions';
import CollegeEnrollmentPDF from './CollegeEnrollmentPDF';

const CollegeAndTESDAStudentTable = ({
  studentProfile,
  academic_year,
  semester,
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openShowFees, setOpenShowFees] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const { studentFees } = useSelector((state) => state.finance);
  const [isRegular, setIsRegular] = useState(false);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [collegeTrackId, setCollegeTrackId] = useState('');
  const {
    collegeSubjectsByProgram,
    tesdaCoursesByProgram,
    tesdaCourses,
    collegeSubjects,
    programs,
    program_id,
  } = useSelector((state) => state.academics);
  const [page, setPage] = useState(0);
  const rowsPerPageOptions = [5, 10, 25];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { studentLedger } = useSelector((state) => state.cashier);
  const {
    year_levels,
    student_yearlevel: year,
    student_id,
    semesters,
    academic_years,
    enlistedSubjects,
    checked_full_payment,
    college_tracks,
  } = useSelector((state) => state.registrar);

  const {
    _id,
    student_number,
    student_first_name,
    student_last_name,
    student_middle_name,
    student_college_track: { college_track_name },
    student_program,
    student_department: { department_name },
    student_yearlevel,
    irregular_status,
  } = studentProfile;

  const handleOpenShowFees = () => {
    setOpenShowFees(true);
  };

  const handleCloseShowFees = () => {
    setOpenShowFees(false);
  };

  const currentSemester = semesters?.find((sem) => sem?._id === semester);
  const currentAcademicYear = academic_years?.find(
    (ay) => ay?._id === academic_year
  );

  // *** Update Student Year Level ***
  const handleUpdateStudent = (e) => {
    e.preventDefault();

    if (student_yearlevel?._id === year) return;

    dispatch(
      updateStudent({
        _id,
        student_yearlevel: year,
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getStudent(_id));
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const tuitionFee = studentFees?.find((fee) =>
    fee?.fee_label.includes('Tuition')
  );
  const totalTuition = enlistedSubjects?.reduce(
    (acc, curr) => acc + curr.fee,
    0
  );
  let totalFees = 0;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'checked_full_payment') {
      dispatch(
        handleChange({ name: 'checked_full_payment', value: e.target.checked })
      );
      return;
    }
    dispatch(handleChange({ name, value }));
  };

  const handleCloseConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleAddSubject = (subject) => {
    const isSubjectAdded = enlistedSubjects?.some(
      (s) => s.subject_id === subject._id
    );

    if (isSubjectAdded) {
      toast.error('Subject is already added');
      return;
    }

    dispatch(
      handleChange({
        name: 'enlistedSubjects',
        value: [
          ...enlistedSubjects,
          {
            subject_id: subject._id,
            subject_code: subject.course_code,
            subject_name: subject.course_name,
            subject_units: subject.course_unit || 0,
            fee: parseInt(subject.course_unit || 0) * tuitionFee?.fee,
          },
        ],
      })
    );

    toast.success('Subject added');
  };

  const handleAddCourse = (course) => {
    const isCourseAdded = enlistedSubjects?.some(
      (c) => c.subject_id === course._id
    );

    if (isCourseAdded) {
      toast.error('Course is already added');
      return;
    }

    dispatch(
      handleChange({
        name: 'enlistedSubjects',
        value: [
          ...enlistedSubjects,
          {
            subject_id: course._id,
            subject_code: course.course_code,
            subject_name: course.course_name,
            subject_units: course.course_total_hours || 0,
            fee: parseInt(course.course_total_hours || 0) * tuitionFee?.fee,
          },
        ],
      })
    );

    toast.success('Course added');
  };

  const handleAddAllSubjects = () => {
    const isAllSubjectsAdded = collegeSubjectsByProgram?.every((subject) => {
      return enlistedSubjects?.some((s) => s.subject_id === subject._id);
    });

    if (isAllSubjectsAdded) {
      toast.error('All subjects are already added');
      return;
    }

    const filteredSubjects = collegeSubjectsByProgram?.filter((subject) => {
      return !enlistedSubjects?.some((s) => s.subject_id === subject._id);
    });

    const subjects = filteredSubjects?.map((subject) => {
      return {
        subject_id: subject._id,
        subject_code: subject.course_code,
        subject_name: subject.course_name,
        subject_units: subject.course_unit || 0,
        fee: parseInt(subject.course_unit || 0) * tuitionFee?.fee,
      };
    });

    dispatch(
      handleChange({
        name: 'enlistedSubjects',
        value: [...enlistedSubjects, ...subjects],
      })
    );

    toast.success('All subjects added');
  };

  const handleAddAllCourses = () => {
    const isAllCoursesAdded = tesdaCoursesByProgram?.every((subject) => {
      return enlistedSubjects?.some((s) => s.subject_id === subject._id);
    });

    if (isAllCoursesAdded) {
      toast.error('All courses are already added');
      return;
    }

    const filteredSubjects = tesdaCoursesByProgram?.filter((course) => {
      return !enlistedSubjects?.some((s) => s.subject_id === course._id);
    });

    const subjects = filteredSubjects?.map((course) => {
      return {
        subject_id: course._id,
        subject_code: course.course_code,
        subject_name: course.course_name,
        subject_units: course.course_total_hours || 0,
        fee: parseInt(course.course_total_hours || 0) * tuitionFee?.fee,
      };
    });

    dispatch(
      handleChange({
        name: 'enlistedSubjects',
        value: [...enlistedSubjects, ...subjects],
      })
    );

    toast.success('All courses added');
  };

  const handleRemoveSubject = (id) => {
    const filteredSubjects = enlistedSubjects.filter(
      (subject) => subject.subject_id !== id
    );

    dispatch(
      handleChange({ name: 'enlistedSubjects', value: filteredSubjects })
    );
    toast.success(
      `${department_name === 'College' ? 'Subject' : 'Course'} removed`
    );
  };

  const totalSubjectFees = enlistedSubjects.reduce(
    (acc, subject) => acc + subject.fee,
    0
  );
  const totalMiscFees = studentFees
    ?.filter((fee) => fee?.fee_type?.fee_type === 'Miscellaneous')
    ?.reduce((acc, curr) => acc + curr?.fee, 0);
  const totalOtherFees = studentFees
    ?.filter((fee) => fee?.fee_type?.fee_type === 'Other Fees')
    ?.reduce((acc, curr) => acc + curr?.fee, 0);

  totalFees =
    (totalSubjectFees || 0) +
    (totalMiscFees || 0) +
    (totalOtherFees || 0) +
    (studentLedger?.ledger_balance || 0);

  const handleGenerateStudentLoad = (e) => {
    e.preventDefault();

    if (!academic_year || !semester) {
      toast.error('Please select academic year and semester');
      return;
    }

    if (department_name === 'College') {
      dispatch(
        getCollegeSubjectsByProgram({
          year_level: student_yearlevel?._id,
          semester,
          program: studentProfile?.student_program?._id,
        })
      );
    } else {
      dispatch(
        getTESDACoursesByProgram({
          program: studentProfile?.student_program?._id,
        })
      );
    }

    dispatch(
      fetchFeesForEnrollmentByProgram({
        academic_year,
        program: studentProfile?.student_program?._id,
      })
    ).then((res) => {
      if (res.meta.requestStatus === 'fulfilled') {
        toast.success('Student load generated');
      }
    });
  };

  // filter by course remarks === Active and also if collegeTrackId exist also filter by that course.college_track._id === collegeTrackId

  const tesdaTakeable = tesdaCourses.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const collegeTakeable = collegeSubjects
    ?.filter((course) => course.remarks === 'Active')
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - collegeSubjects.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const clearEnrollmentInfo = () => {
    dispatch(
      handleAcademicChange({ name: 'collegeSubjectsByProgram', value: [] })
    );
    dispatch(handleFinanceChange({ name: 'studentFees', value: [] }));
    dispatch(handleChange({ name: 'student_id', value: '' }));
    dispatch(handleChange({ name: 'enlistedSubjects', value: [] }));
    dispatch(handleChange({ name: 'checked_full_payment', value: false }));
  };

  // *** Save Load ***

  const handleSaveStudentLoad = async (e) => {
    e.preventDefault();

    if (studentFees.length < 1 || enlistedSubjects.length < 1) return;

    const data = [
      {
        student: _id,
        academic_year,
        description: 'Tuition Fee',
        payment_amount: totalSubjectFees,
        payment_type: 'Debit',
        payment_date: new Date(),
      },
      {
        student: _id,
        academic_year,
        description: 'Miscellaneous Fee',
        payment_amount: totalMiscFees,
        payment_type: 'Debit',
        payment_date: new Date(),
      },
      {
        student: _id,
        academic_year,
        description: 'Other Fee',
        payment_amount: totalOtherFees,
        payment_type: 'Debit',
        payment_date: new Date(),
      },
    ];

    const paymentSchemeData = {
      total: totalFees,
      academic_year,
      student: _id,
      semester,
      checked_full_payment,
      payment_scheme: [
        { month: 'jan', tag: 'upon enrollment' },
        { month: 'feb', tag: 'prelim' },
        { month: 'apr', tag: 'midterm' },
        { month: 'may', tag: 'finals' },
      ].map((scheme) => ({
        ...scheme,
        balance: divideByFour(totalFees),
        to_pay: divideByFour(totalFees),
      })),
    };

    if (student_yearlevel?._id) {
      paymentSchemeData.year_level = student_yearlevel?._id;
    }

    try {
      if (
        department_name ===
        'Technical Education and Skills Development Authority (TESDA)'
      ) {
        const tesdaEnrollment = await dispatch(
          createTESDAEnrollment({
            academic_year,
            student: _id,
            student_fees: studentFees.map((fee) => fee._id),
            total_amount: totalFees,
            subjects: enlistedSubjects.map((subject) => ({
              subject: subject.subject_id,
            })),
            semester,
            checked_full_payment,
            department: studentProfile?.student_department?._id,
            paymentScheme: paymentSchemeData,
            discount:
              studentFees?.reduce((acc, curr) => {
                return acc + curr.fee;
              }, 0) +
              (studentLedger?.ledger_balance < 0
                ? studentLedger?.ledger_balance
                : 0),
          })
        );

        if (tesdaEnrollment.meta.requestStatus === 'fulfilled') {
          // Update student enrollment status

          dispatch(
            updateStudent({
              _id: student_id,
              student_enrollment_status: 'enlisted',
            })
          );

          const tesdaPaymentScheme = await dispatch(
            createTESDAQuarterlyPaymentScheme({ ...paymentSchemeData })
          );

          if (tesdaPaymentScheme.meta.requestStatus === 'fulfilled') {
            toast.success('Student load saved');
            const updatedLedger = studentLedger
              ? {
                  id: studentLedger._id,
                  student: _id,
                  ledger_balance: studentLedger.ledger_balance + totalFees,
                  semester,
                  payments: [...studentLedger.payments, ...data],
                }
              : {
                  student: _id,
                  academic_year,
                  ledger_balance: totalFees,
                  semester,
                  payments: [...data],
                };

            await dispatch(
              studentLedger
                ? updateStudentLedger(updatedLedger)
                : createStudentLedger(updatedLedger)
            );
          }
        }
      } else {
        const collegeEnrollment = await dispatch(
          createCollegeEnrollment({
            academic_year,
            year_level: student_yearlevel?._id,
            semester,
            student: _id,
            student_fees: studentFees.map((fee) => fee._id),
            checked_full_payment,
            total_amount: totalFees,
            subjects: enlistedSubjects.map((subject) => ({
              subject: subject.subject_id,
            })),
            department: studentProfile?.student_department?._id,
            paymentScheme: paymentSchemeData,
            discount:
              studentLedger?.ledger_balance < 0
                ? studentLedger?.ledger_balance
                : 0,
          })
        );

        if (collegeEnrollment.meta.requestStatus === 'fulfilled') {
          // Update student enrollment status

          dispatch(
            updateStudent({
              _id: student_id,
              student_enrollment_status: 'enlisted',
            })
          );

          const collegePaymentScheme = await dispatch(
            createCollegeQuarterlyPaymentScheme({ ...paymentSchemeData })
          );

          if (collegePaymentScheme.meta.requestStatus === 'fulfilled') {
            toast.success('Student load saved');
            const updatedLedger = studentLedger
              ? {
                  id: studentLedger._id,
                  student: _id,
                  ledger_balance: studentLedger.ledger_balance + totalFees,
                  semester,
                  payments: [...studentLedger.payments, ...data],
                }
              : {
                  student: _id,
                  academic_year,
                  ledger_balance: totalFees,
                  semester,
                  payments: [...data],
                };

            await dispatch(
              studentLedger
                ? updateStudentLedger(updatedLedger)
                : createStudentLedger(updatedLedger)
            );
          }
        }
      }
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  useEffect(() => {
    setOpen(false);
    dispatch(
      handleChange({ name: 'student_yearlevel', value: student_yearlevel?._id })
    );
    dispatch(
      handleAcademicChange({
        name: 'program_id',
        value: studentProfile?.student_program?._id,
      })
    );
    dispatch(
      handleChange({ name: 'irregular_status', value: irregular_status })
    );
  }, [
    dispatch,
    irregular_status,
    studentProfile?.student_program?._id,
    student_yearlevel?._id,
  ]);

  useEffect(() => {
    dispatch(getAllCollegeSubjects());
    dispatch(getAllTesdaCourses());
  }, [dispatch]);

  useEffect(() => {
    setPage(0);
    setRowsPerPage(rowsPerPageOptions[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [department_name]);

  return (
    <Stack>
      <ConfirmationModal
        title={'Confirm Update'}
        message={'Are you sure you want to update student data?'}
        isOpen={showConfirmationModal}
        onCancel={handleCloseConfirmationModal}
        onConfirm={(e) => {
          handleUpdateStudent(e);
          handleCloseConfirmationModal();
        }}
      />

      <ConfirmationModal
        title={'Save Student Load'}
        message={'Are you sure you want to process student enrollment?'}
        isOpen={saveLoad}
        onCancel={() => setSaveLoad(false)}
        onConfirm={(e) => {
          handleSaveStudentLoad(e);
          setSaveLoad(false);
        }}
      />

      <ConfirmationModal
        title={'Update Student'}
        message={'Are you sure you want to update student program?'}
        isOpen={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          dispatch(
            handleAcademicChange({
              name: 'program_id',
              value: studentProfile?.student_program?._id,
            })
          );
        }}
        onConfirm={(e) => {
          e.preventDefault();
          dispatch(
            updateStudent({
              _id,
              student_program: program_id,
            })
          )
            .then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                dispatch(getStudent(_id));
                setOpen(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          setModalOpen(false);
        }}
      />

      <ConfirmationModal
        title={'Confirm Update'}
        message={'Are you sure you want to update student data?'}
        isOpen={isRegular}
        onCancel={() => setIsRegular(false)}
        onConfirm={() => {
          if (irregular_status) {
            dispatch(
              updateStudent({
                _id,
                irregular_status: false,
              })
            );
          } else {
            dispatch(
              updateStudent({
                _id,
                irregular_status: true,
              })
            );
          }
          dispatch(getStudent(_id));
          setIsRegular(false);
        }}
      />

      {/* Curriculum Modal */}

      <ProgramCurriculum
        open={showCurriculum}
        close={() => setShowCurriculum(false)}
      />

      <TableContainer component={Paper}>
        <Table
          size={department_name === 'College' ? 'small' : ''}
          sx={{ minWidth: 650 }}
          aria-label="student-data-table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year Level</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Program</TableCell>
              {open && student_yearlevel?._id !== year && (
                <TableCell>Action</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            <>
              {student_id && (
                <TableRow>
                  <TableCell>{student_number}</TableCell>
                  <TableCell>{`${student_first_name} ${
                    student_middle_name ?? ''
                  } ${student_last_name}`}</TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id="select-year-level">Year</InputLabel>
                      <Select
                        label="Year"
                        name="student_yearlevel"
                        labelId="select-year-level"
                        value={year ?? ''}
                        onChange={(e) => {
                          setOpen(true);
                          handleInputChange(e);
                        }}
                        size="small"
                      >
                        {year_levels
                          .filter(
                            (year_level) =>
                              year_level?.department?.department_name ===
                              studentProfile?.student_department
                                ?.department_name
                          )
                          .map((year_level) => (
                            <MenuItem
                              key={year_level._id}
                              value={year_level?._id}
                            >
                              {year_level.year_level_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell sx={{ maxWidth: '150px' }}>
                    {college_track_name}
                  </TableCell>
                  <TableCell>
                    <FormControl fullWidth>
                      <InputLabel id="select-program">Program</InputLabel>
                      <Select
                        label="Program"
                        name="program_id"
                        labelId="select-program"
                        value={program_id ?? ''}
                        onChange={(e) => {
                          dispatch(
                            handleAcademicChange({
                              name: 'program_id',
                              value: e.target.value,
                            })
                          );
                          setModalOpen(true);
                        }}
                        size="small"
                      >
                        {programs
                          .filter(
                            (program) =>
                              program?.college_track?.college_track_name ===
                              studentProfile?.student_college_track
                                ?.college_track_name
                          )
                          .map((program) => (
                            <MenuItem key={program._id} value={program?._id}>
                              {program.program_name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  </TableCell>

                  {open && student_yearlevel?._id !== year && (
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setShowConfirmationModal(true);
                        }}
                      >
                        Update
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              )}
            </>
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          mt={1}
          spacing={1}
        >
          <Button
            size="small"
            variant="contained"
            type="button"
            color="secondary"
            onClick={handleGenerateStudentLoad}
          >
            Generate Assessment
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={() => setSaveLoad(true)}
            disabled={enlistedSubjects?.length === 0}
          >
            Save
          </Button>

          <PDFDownloadLink
            document={
              <CollegeEnrollmentPDF
                student_first_name={student_first_name}
                student_last_name={student_last_name}
                student_middle_name={student_middle_name}
                student_number={student_number}
                student_year_level={student_yearlevel?.year_level_name}
                studentFees={studentFees}
                subjects={enlistedSubjects}
                semester={currentSemester?.semester_term}
                student_program={studentProfile?.student_program?.program_name}
                school_year={currentAcademicYear?.school_year}
                studentLedger={studentLedger}
              />
            }
            fileName={`${student_number}_${student_first_name}_${student_last_name}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <Button size="small">Loading document...</Button>
              ) : (
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  disabled={enlistedSubjects.length < 1}
                >
                  Download PDF
                </Button>
              )
            }
          </PDFDownloadLink>

          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => clearEnrollmentInfo()}
            disabled={!academic_year || !_id}
          >
            Clear Form
          </Button>
        </Stack>

        <Stack direction={'row'} alignItems={'center'} spacing={1} mt={1}>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => setShowCurriculum(true)}
          >
            Course Checklist
          </Button>

          <Box>
            <AntSwitchComponent
              start="Regular"
              end="Irregular"
              value={irregular_status}
              onClick={() => setIsRegular(true)}
            />
          </Box>
        </Stack>
      </Stack>

      {department_name === 'College' && studentFees.length > 0 && (
        <Card component={Stack} mt={1}>
          <CardContent>
            <Typography variant="h4" mb={2}>
              Assessment
            </Typography>

            <Stack
              p={1}
              direction={'row'}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Typography variant="subtitle2">List of Subjects</Typography>

              <Button
                variant="contained"
                size="small"
                disabled={collegeSubjectsByProgram?.length < 1}
                color="secondary"
                onClick={handleAddAllSubjects}
              >
                Add All Subjects
              </Button>
            </Stack>

            <TableContainer>
              <Table
                size="small"
                sx={{ minWidth: 650 }}
                aria-label="student-subjects-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>CODE</TableCell>
                    <TableCell>SUBJECT NAME</TableCell>
                    <TableCell>UNITS</TableCell>
                    <TableCell>TYPE</TableCell>
                    <TableCell>ADD</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {collegeSubjectsByProgram
                    ?.filter(
                      (subject) =>
                        subject?.program?.program_name ===
                        student_program?.program_name
                    )
                    .map((subject) => (
                      <TableRow key={subject._id}>
                        <TableCell>{subject.course_code}</TableCell>
                        <TableCell>{subject.course_name}</TableCell>
                        <TableCell>{formatUnit(subject.course_unit)}</TableCell>
                        <TableCell>{subject.course_type}</TableCell>
                        <TableCell>
                          <IconButton
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddSubject(subject)}
                            disabled={
                              enlistedSubjects.length === 0
                                ? false
                                : enlistedSubjects.some(
                                    (s) => s.subject_id === subject._id
                                  )
                            }
                          >
                            <IconSquareRoundedPlusFilled />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}

                  <TableRow>
                    <TableCell colSpan={2} align="right">
                      Total Units
                    </TableCell>
                    <TableCell colSpan={3} align="left">
                      {formatUnit(
                        collegeSubjectsByProgram.reduce((acc, subject) => {
                          return acc + subject?.course_unit;
                        }, 0)
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            {/* COLLEGE TAKEABLE(S) */}

            <Stack mt={2}>
              <Typography variant="h4" mb={2}>
                Takeable(s)
              </Typography>

              <Stack
                p={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography variant="subtitle2">List of Subjects</Typography>
              </Stack>

              <TableContainer>
                <Table
                  size="small"
                  sx={{ minWidth: 650 }}
                  aria-label="student-subjects-table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>CODE</TableCell>
                      <TableCell>SUBJECT NAME</TableCell>
                      <TableCell>YEAR/SEMESTER</TableCell>
                      <TableCell>UNITS</TableCell>
                      <TableCell>TYPE</TableCell>
                      <TableCell>ADD</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {(rowsPerPage > 0 ? collegeTakeable : collegeSubjects).map(
                      (subject) => (
                        <TableRow key={subject._id}>
                          <TableCell>{subject.course_code}</TableCell>
                          <TableCell>{subject.course_name}</TableCell>
                          <TableCell>
                            <Typography>
                              {subject?.year_level?.year_level_name}
                            </Typography>
                            <Typography variant="caption">
                              {subject?.semester?.semester_term}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {formatUnit(subject.course_unit)}
                          </TableCell>
                          <TableCell>{subject.course_type}</TableCell>
                          <TableCell>
                            <IconButton
                              variant="contained"
                              color="primary"
                              onClick={() => handleAddSubject(subject)}
                            >
                              <IconSquareRoundedPlusFilled />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>

                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={
                    collegeSubjects?.filter(
                      (subject) =>
                        subject.remarks === 'Active' &&
                        subject?.program?.program_name ===
                          student_program?.program_name
                    ).length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </TableContainer>
            </Stack>

            <Typography variant="h4" mt={3}>
              Enlisted Subjects
            </Typography>

            <TableContainer>
              <Table
                size="small"
                sx={{ minWidth: 650 }}
                aria-label="student-enlisted-subjects-table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>CODE</TableCell>
                    <TableCell>DESC</TableCell>
                    <TableCell>UNITS</TableCell>
                    <TableCell>FEE</TableCell>
                    <TableCell>REMOVE</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {enlistedSubjects?.map((subject) => (
                    <TableRow key={subject.subject_id}>
                      <TableCell>{subject.subject_code}</TableCell>
                      <TableCell>{subject.subject_name}</TableCell>
                      <TableCell>{formatUnit(subject.subject_units)}</TableCell>
                      <TableCell>{formatSalary(subject.fee || 0)}</TableCell>
                      <TableCell>
                        <IconButton
                          variant="contained"
                          color="error"
                          onClick={() =>
                            handleRemoveSubject(subject.subject_id)
                          }
                        >
                          <IconBackspaceFilled />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}

                  <TableRow>
                    <TableCell colSpan={3} align="right">
                      <Typography variant="h5">Total:</Typography>
                    </TableCell>

                    <TableCell align="left">
                      <Typography variant="h5">
                        {formatUnit(
                          enlistedSubjects.reduce((acc, subject) => {
                            return acc + subject?.subject_units;
                          }, 0)
                        )}
                      </Typography>
                    </TableCell>

                    <TableCell colSpan={2}>
                      <Typography variant="h5">
                        {formatSalary(
                          enlistedSubjects?.reduce(
                            (acc, curr) => acc + curr?.fee,
                            0
                          ) || 0
                        )}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <StudentFeesModal
              open={openShowFees}
              handleClose={handleCloseShowFees}
              studentFees={studentFees}
              totalFees={totalFees}
              tuition={totalTuition}
            />

            {studentFees.length > 0 && (
              <Stack
                direction={'row'}
                mt={2}
                spacing={2}
                justifyContent={'space-between'}
              >
                <Button
                  size="small"
                  variant="contained"
                  type="button"
                  color="secondary"
                  onClick={handleOpenShowFees}
                >
                  View Fees
                </Button>

                <Stack>
                  <FormControl fullWidth>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked_full_payment}
                          onChange={handleInputChange}
                          name="checked_full_payment"
                          color="primary"
                          disabled={
                            studentFees.length < 1 ||
                            enlistedSubjects.length < 1
                          }
                        />
                      }
                      label="Full Payment"
                    />
                  </FormControl>
                </Stack>
              </Stack>
            )}
          </CardContent>
        </Card>
      )}

      {/* TESDA ENROLLMENT BLOCK */}

      {department_name ===
        'Technical Education and Skills Development Authority (TESDA)' &&
        studentFees.length > 0 && (
          <Card component={Stack} mt={1}>
            <CardContent>
              <Typography variant="h4" mb={2}>
                Assessment
              </Typography>

              <Stack
                p={1}
                direction={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
              >
                <Typography variant="subtitle2">List of Courses</Typography>

                <Button
                  variant="contained"
                  size="small"
                  disabled={tesdaCoursesByProgram?.length < 1}
                  color="secondary"
                  onClick={handleAddAllCourses}
                >
                  Add All Courses
                </Button>
              </Stack>

              <TableContainer>
                <Table
                  size="small"
                  sx={{ minWidth: 650 }}
                  aria-label="student-subjects-table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>COURSE</TableCell>
                      <TableCell>SEMESTER</TableCell>
                      <TableCell>HOURS</TableCell>
                      <TableCell>TYPE</TableCell>
                      <TableCell>ADD</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {tesdaCoursesByProgram
                      ?.filter((course) => course.remarks === 'Active')
                      .map((course) => (
                        <TableRow key={course._id}>
                          <TableCell>
                            <Typography>{course.course_name}</Typography>
                            <Typography variant="caption" fontWeight={600}>
                              {course.course_code}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            {course?.semester?.semester_term}
                          </TableCell>
                          <TableCell>{course.course_total_hours}</TableCell>
                          <TableCell>{course.course_type}</TableCell>
                          <TableCell>
                            <IconButton
                              variant="contained"
                              color="primary"
                              onClick={() => handleAddCourse(course)}
                              disabled={
                                enlistedSubjects.length ===
                                tesdaCoursesByProgram?.length
                              }
                            >
                              <IconSquareRoundedPlusFilled />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}

                    <TableRow>
                      <TableCell colSpan={2} align="right">
                        Total Hours
                      </TableCell>
                      <TableCell colSpan={3} align="left">
                        {formatUnit(
                          tesdaCoursesByProgram?.reduce((acc, subject) => {
                            return acc + subject?.course_total_hours;
                          }, 0) || 0
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* TAKEABLE SUBJECTS/COURSES */}

              <Stack mt={2}>
                <Typography variant="h4" mb={2}>
                  Takeable(s)
                </Typography>

                <Stack
                  p={1}
                  direction={'row'}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                >
                  <Typography variant="subtitle2">List of Subjects</Typography>
                </Stack>

                <Stack alignItems={'flex-end'}>
                  <FormControl fullWidth sx={{ maxWidth: 200 }}>
                    <InputLabel id="select-college-track-id">
                      College
                    </InputLabel>
                    <Select
                      label="College"
                      name="collegeTrackId"
                      value={collegeTrackId ?? ''}
                      onChange={(e) => {
                        setCollegeTrackId(e.target.value);
                      }}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {college_tracks
                        ?.filter(
                          (college_track) =>
                            college_track.department?.department_name ===
                            'Technical Education and Skills Development Authority (TESDA)'
                        )
                        .map((track) => (
                          <MenuItem key={track._id} value={track?._id}>
                            {track.college_track_name}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </Stack>

                <TableContainer sx={{ mb: 2, mt: 2 }}>
                  <Table
                    size="small"
                    sx={{ minWidth: 650 }}
                    aria-label="student-takeable-subjects-table"
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>CODE/DESC</TableCell>
                        <TableCell>LEVEL/SEMESTER</TableCell>
                        <TableCell>HOURS</TableCell>
                        <TableCell>TYPE</TableCell>
                        <TableCell>ADD</TableCell>
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {(rowsPerPage > 0 ? tesdaTakeable : tesdaCourses)
                        ?.filter((course) => {
                          if (collegeTrackId) {
                            return (
                              course.college_track?._id === collegeTrackId &&
                              course.remarks === 'Active'
                            );
                          } else {
                            return course.remarks === 'Active';
                          }
                        })
                        .map((course) => (
                          <TableRow key={course._id}>
                            <TableCell>
                              <Typography>{course.course_name}</Typography>
                              <Typography variant="caption" fontWeight={600}>
                                {course.course_code}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Typography>
                                {course?.year_level?.year_level_name}
                              </Typography>
                              <Typography variant="caption" fontWeight={600}>
                                {course?.semester?.semester_term}
                              </Typography>
                            </TableCell>
                            <TableCell>{course.course_total_hours}</TableCell>
                            <TableCell>{course.course_type}</TableCell>
                            <TableCell>
                              <IconButton
                                variant="contained"
                                color="primary"
                                onClick={() => handleAddCourse(course)}
                              >
                                <IconSquareRoundedPlusFilled />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={rowsPerPageOptions}
                  component="div"
                  count={
                    tesdaCourses?.filter((course) => {
                      if (collegeTrackId) {
                        return (
                          course.college_track?._id === collegeTrackId &&
                          course.remarks === 'Active'
                        );
                      } else {
                        return course.remarks === 'Active';
                      }
                    }).length
                  }
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Stack>

              <Typography variant="h4" mt={3}>
                Enlisted Course(s)
              </Typography>

              <TableContainer>
                <Table
                  size="small"
                  sx={{ minWidth: 650 }}
                  aria-label="student-enlisted-subjects-table"
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>CODE</TableCell>
                      <TableCell>DESC</TableCell>
                      <TableCell>HOURS</TableCell>
                      <TableCell>FEE</TableCell>
                      <TableCell>REMOVE</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {enlistedSubjects?.map((course) => (
                      <TableRow key={course.subject_id}>
                        <TableCell>{course.subject_code}</TableCell>
                        <TableCell>{course.subject_name}</TableCell>
                        <TableCell>{course.subject_units}</TableCell>
                        <TableCell>{formatSalary(course.fee || 0)}</TableCell>
                        <TableCell>
                          <IconButton
                            variant="contained"
                            color="error"
                            onClick={() =>
                              handleRemoveSubject(course.subject_id)
                            }
                          >
                            <IconBackspaceFilled />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}

                    <TableRow>
                      <TableCell colSpan={2} align="right">
                        <Typography variant="h5">Total:</Typography>
                      </TableCell>

                      <TableCell align="left">
                        <Typography variant="h5">
                          {formatUnit(
                            enlistedSubjects.reduce((acc, course) => {
                              return acc + course?.subject_units;
                            }, 0)
                          )}
                        </Typography>
                      </TableCell>

                      <TableCell colSpan={2}>
                        <Typography variant="h5">
                          {formatSalary(
                            enlistedSubjects?.reduce(
                              (acc, curr) => acc + curr?.fee,
                              0
                            ) || 0
                          )}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              <StudentFeesModal
                open={openShowFees}
                handleClose={handleCloseShowFees}
                studentFees={studentFees}
                totalFees={totalFees}
                tuition={totalTuition}
              />

              {studentFees.length > 0 && (
                <Stack
                  direction={'row'}
                  mt={2}
                  spacing={2}
                  justifyContent={'space-between'}
                >
                  <Button
                    size="small"
                    variant="contained"
                    type="button"
                    color="secondary"
                    onClick={handleOpenShowFees}
                  >
                    View Fees
                  </Button>

                  <Stack>
                    <FormControl fullWidth>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={checked_full_payment}
                            onChange={handleInputChange}
                            name="checked_full_payment"
                            color="primary"
                            disabled={
                              studentFees.length < 1 ||
                              enlistedSubjects.length < 1
                            }
                          />
                        }
                        label="Full Payment"
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              )}
            </CardContent>
          </Card>
        )}
    </Stack>
  );
};

const StudentFeesModal = ({
  open,
  handleClose,
  studentFees,
  totalFees,
  tuition,
}) => {
  const { studentLedger } = useSelector((state) => state.cashier);

  return (
    <Modal open={open} onClose={handleClose}>
      <Paper
        sx={{
          ...styles,
          p: 2,
          maxWidth: 500,
        }}
      >
        <Typography variant="h4" mb={2} textAlign={'center'}>
          Fee Breakdown
        </Typography>

        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Tuition Fee
          </Typography>

          <Typography variant="h5">{formatSalary(tuition || 0)}</Typography>
        </Stack>

        <Typography variant="h5" mt={1} gutterBottom fontWeight={600}>
          Miscellaneous Fees:
        </Typography>

        {studentFees
          ?.filter((fee) => fee?.fee_type?.fee_type === 'Miscellaneous')
          .map((fee) => (
            <Stack
              key={fee._id}
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
            >
              <Typography variant="body2" fontSize={'13px'} gutterBottom>
                {fee?.fee_label}
              </Typography>

              <Typography variant="h5" textAlign={'right'}>
                {formatSalary(fee?.fee || 0)}
              </Typography>
            </Stack>
          ))}

        <Typography variant="h5" mt={1} gutterBottom fontWeight={600}>
          Other Fees:
        </Typography>

        {studentFees
          ?.filter((fee) => fee?.fee_type?.fee_type === 'Other Fees')
          .map((fee) => (
            <Stack
              key={fee._id}
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
            >
              <Typography variant="body2" fontSize={'13px'} gutterBottom>
                {fee?.fee_label}
              </Typography>

              <Typography variant="h5" textAlign={'right'}>
                {formatSalary(fee?.fee || 0)}
              </Typography>
            </Stack>
          ))}

        {studentFees
          ?.filter(
            (fee) =>
              fee?.fee_type?.fee_type !== 'Other Fees' &&
              fee?.fee_type?.fee_type !== 'Miscellaneous' &&
              fee?.fee_type?.fee_type !== 'Matriculation Fee' &&
              !fee?.fee_label.includes('Tuition')
          )
          .map((fee) => (
            <Stack
              key={fee._id}
              direction={'row'}
              spacing={2}
              justifyContent={'space-between'}
            >
              <Typography variant="h5" fontWeight={600} gutterBottom>
                {fee?.fee_label}
              </Typography>

              <Typography variant="h5" fontWeight={600} textAlign={'right'}>
                {formatSalary(fee?.fee || 0)}
              </Typography>
            </Stack>
          ))}

        <Stack direction="row" justifyContent={'space-between'} mt={2}>
          <Typography variant="h5" gutterBottom fontWeight={600}>
            Discounts/Scholarships/Grants
          </Typography>

          <Typography variant="h5" textAlign={'right'}>
            {formatSalary(
              studentLedger?.ledger_balance < 0
                ? studentLedger?.ledger_balance
                : 0
            )}
          </Typography>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Stack direction={'row'} spacing={2} justifyContent={'flex-end'}>
          <Typography variant="h5" fontWeight={600} textAlign={'right'}>
            Total Fees:
          </Typography>

          <Typography variant="h5" fontWeight={600} textAlign={'right'}>
            {formatSalary(totalFees)}
          </Typography>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default CollegeAndTESDAStudentTable;
