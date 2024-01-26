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
import LoadingScreen from 'src/components/LoadingScreen';
import styles from 'src/components/modalBoxStyle';
import AntSwitchComponent from 'src/components/utilities/AntSwitch';
import ConfirmationModal from 'src/components/utilities/ConfirmationModal';
import {
  getK12SubjectsByProgram,
  getK12SubjectsByYearLevel,
  handleChange as handleAcademicChange,
} from 'src/features/academicFeatures/academicSlice';
import {
  createK12MonthlyPaymentScheme,
  createStudentLedger,
  updateStudentLedger,
} from 'src/features/cashierFeatures/cashierSlice';
import {
  clearStudentFees,
  fetchFeesForEnrollment,
  fetchPaymentSchemeByYearLevel,
} from 'src/features/financeFeatures/financeSlice';
import {
  createK12Enrollment,
  getStudent,
  handleChange,
  updateStudent,
} from 'src/features/registrarFeatures/registrarSlice';
import { divideByTen, formatSalary } from 'src/utils/helperFunctions';
import EnrollmentPDFFile from './PDFDocument';

const K12StudentTable = ({ studentProfile, academic_year, semester }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [openProgramModal, setOpenProgramModal] = useState(false);
  const [isRegular, setIsRegular] = useState(false);
  const [subjectPage, setSubjectPage] = useState(0);
  const rowsPerPageOptions = [20, 50, 100];
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const { studentFees, isFetchingStudentFees, k12PaymentScheme } = useSelector(
    (state) => state.finance
  );
  const {
    _id: student_id,
    student_first_name,
    student_last_name,
    student_middle_name,
    student_number,
    student_college_track,
    student_yearlevel,
    student_program,
    section,
    student_department,
    irregular_status,
  } = studentProfile;
  const {
    k12StudentLoad,
    year_levels,
    student_yearlevel: year,
    enlistedSubjects,
    checked_full_payment,
  } = useSelector((state) => state.registrar);
  const [openShowFees, setOpenShowFees] = useState(false);
  const { studentLedger } = useSelector((state) => state.cashier);
  const { k12SubjectsByProgram, programs, program_id, k12SubjectsByYearLevel } =
    useSelector((state) => state.academics);

  let isSeniorHighSchool =
    student_department.department_name === 'Senior High School';
  let isPSGSAndJHS =
    student_department?.department_name === 'Junior High School' ||
    student_department?.department_name === 'Pre-School & Grade School';

  const handleOpenShowFees = () => {
    setOpenShowFees(true);
  };

  const handleCloseShowFees = () => {
    setOpenShowFees(false);
  };

  const handleChangeSubjectsPage = (_, newPage) => {
    setSubjectPage(newPage);
  };

  const handleChangeSubjectsRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setSubjectPage(0);
  };

  const tableData = k12SubjectsByProgram.slice(
    subjectPage * rowsPerPage,
    subjectPage * rowsPerPage + rowsPerPage
  );

  const handleGenerateStudentLoad = (e) => {
    e.preventDefault();
    dispatch(
      fetchPaymentSchemeByYearLevel({
        year_level: student_yearlevel?._id,
        academic_year,
      })
    );

    if (isSeniorHighSchool) {
      dispatch(
        getK12SubjectsByProgram({
          level: student_yearlevel?._id,
          program: student_program?._id,
        })
      );
    }

    if (isPSGSAndJHS) {
      dispatch(getK12SubjectsByYearLevel({ level: student_yearlevel?._id }));
    }

    dispatch(
      fetchFeesForEnrollment({ academic_year, level: student_yearlevel?._id })
    );
  };

  const enrollmentExists = k12StudentLoad?.hasOwnProperty('_id');

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

  const tuitionFee = studentFees?.find((fee) =>
    fee?.fee_label.includes('Tuition')
  );
  const totalTuition = enlistedSubjects?.reduce(
    (acc, curr) => acc + curr.fee,
    0
  );
  let totalFees = 0;
  let shsPaymentScheme = [];
  let otherPaymentScheme = [];
  let shsTotalFees = 0;

  // *** Add SHS Subject ***
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
            subject_name: subject.subject_name,
            units: 1,
            fee: 1 * tuitionFee?.fee,
          },
        ],
      })
    );

    toast.success('Subject added');
  };

  const handleAddAllSubjects = () => {
    const isAllSubjectsAdded = k12SubjectsByProgram?.every((subject) => {
      return enlistedSubjects?.some((s) => s.subject_id === subject._id);
    });

    if (isAllSubjectsAdded) {
      toast.error('All subjects are already added');
      return;
    }

    const subjectsToAdd = k12SubjectsByProgram?.filter((subject) => {
      return !enlistedSubjects?.some((s) => s.subject_id === subject._id);
    });

    const subjects = subjectsToAdd?.map((subject) => {
      return {
        subject_id: subject._id,
        subject_name: subject.subject_name,
        units: 1,
        fee: 1 * tuitionFee?.fee,
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

  // *** Remove SHS Subject ***
  const handleRemoveSubject = (id) => {
    const filteredSubjects = enlistedSubjects.filter(
      (subject) => subject.subject_id !== id
    );

    dispatch(
      handleChange({ name: 'enlistedSubjects', value: filteredSubjects })
    );
    toast.success('Subject removed');
  };

  // *** SHS Fees ***

  const totalSubjectFees = enlistedSubjects.reduce(
    (acc, subject) => acc + subject.fee,
    0
  );
  const totalMiscFees = studentFees
    ?.filter((fee) => fee?.fee_type?.fee_type === 'Miscellaneous')
    ?.reduce((acc, curr) => acc + curr?.fee, 0);
  const totalMatriculationFees = studentFees
    ?.filter((fee) => fee?.fee_type?.fee_type === 'Matriculation Fee')
    ?.reduce((acc, curr) => acc + curr?.fee, 0);
  const totalOtherFees = studentFees
    ?.filter((fee) => fee?.fee_type?.fee_type === 'Other Fees')
    ?.reduce((acc, curr) => acc + curr?.fee, 0);
  const totalOtherTypeFees = studentFees
    ?.filter(
      (fee) =>
        fee?.fee_type?.fee_type !== 'Other Fees' &&
        fee?.fee_type?.fee_type !== 'Miscellaneous' &&
        fee?.fee_type?.fee_type !== 'Matriculation Fee' &&
        fee?.fee_type?.fee_type !== 'Tuition Fee' &&
        fee?.fee_type?.fee_type !== 'Tuition Fee Per Subject'
    )
    .reduce((acc, curr) => acc + curr?.fee, 0);

  totalFees =
    totalSubjectFees +
    totalMiscFees +
    totalOtherFees +
    totalOtherTypeFees +
    totalMatriculationFees +
    (studentLedger?.ledger_balance || 0);

  // deduct miscellaneous from total fees
  shsTotalFees =
    totalFees -
    k12PaymentScheme?.payment_scheme?.find(
      (scheme) => scheme.month === 'miscellaneous-1'
    )?.to_pay -
    k12PaymentScheme?.payment_scheme?.find(
      (scheme) => scheme.month === 'miscellaneous-2'
    )?.to_pay;

  shsPaymentScheme = k12PaymentScheme?.payment_scheme
    ?.map((scheme) => {
      if (
        scheme.month === 'miscellaneous-1' ||
        scheme.month === 'miscellaneous-2'
      ) {
        return scheme;
      } else {
        return {
          ...scheme,
          to_pay: divideByTen(shsTotalFees),
          balance: divideByTen(shsTotalFees),
        };
      }
    })
    .filter((scheme) => scheme !== undefined);

  const total =
    studentFees?.reduce((acc, fee) => {
      return acc + fee.fee;
    }, 0) + (studentLedger?.ledger_balance || 0);

  // deduct miscellaneous from total fees
  const totalBalance =
    total -
    k12PaymentScheme?.payment_scheme?.find(
      (scheme) => scheme.month === 'miscellaneous-1'
    )?.to_pay -
    (k12PaymentScheme?.payment_scheme?.find(
      (scheme) => scheme.month === 'miscellaneous-2'
    )?.to_pay || 0);

  otherPaymentScheme = k12PaymentScheme?.payment_scheme
    ?.map((scheme) => {
      if (
        scheme.month === 'miscellaneous-1' ||
        scheme.month === 'miscellaneous-2'
      ) {
        return scheme;
      } else {
        return {
          ...scheme,
          to_pay: divideByTen(totalBalance),
          balance: divideByTen(totalBalance),
        };
      }
    })
    .filter((scheme) => scheme !== undefined);

  // *** Update student year level ***
  const handleUpdateStudent = (e) => {
    e.preventDefault();

    if (student_yearlevel?._id === year) return;

    dispatch(
      updateStudent({
        _id: student_id,
        student_yearlevel: year,
      })
    )
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(getStudent(student_id));
          setOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // *** Save Load ***
  const handleSaveStudentLoad = (e) => {
    e.preventDefault();

    if (studentFees.length < 1) return;

    if (!k12PaymentScheme?._id) {
      return toast.error('No payment scheme found!');
    }

    const data = {
      academic_year,
      year_level: student_yearlevel?._id,
      student: student_id,
      department: student_department?._id,
      student_fees: studentFees?.map((fee) => {
        return fee._id;
      }),
      discount:
        studentLedger?.ledger_balance < 0 ? studentLedger?.ledger_balance : 0,
      paymentScheme: {
        student: student_id,
        academic_year,
        payment_scheme:
          student_department?.department_name === 'Senior High School'
            ? shsPaymentScheme
            : otherPaymentScheme,

        year_level: student_yearlevel?._id,
        total:
          student_department?.department_name === 'Senior High School'
            ? totalFees
            : total,
        checked_full_payment,
      },
    };

    if (student_department?.department_name === 'Senior High School') {
      data.total_amount = totalFees;
      data.subjects = enlistedSubjects?.map((subject) => {
        return { subject: subject?.subject_id };
      });
    } else {
      data.total_amount = total;
      data.subjects = [...k12SubjectsByYearLevel]
        ?.sort((a, b) => a?.position - b?.position)
        .map((subject) => {
          return { subject: subject._id };
        });
    }

    dispatch(createK12Enrollment({ ...data, checked_full_payment }))
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(
            updateStudent({
              _id: student_id,
              student_enrollment_status: 'enlisted',
            })
          );

          if (studentLedger?._id) {
            return dispatch(
              updateStudentLedger({
                id: studentLedger?._id,
                student: student_id,
                ledger_balance:
                  studentLedger?.ledger_balance +
                    student_department?.department_name ===
                  'Senior High School'
                    ? totalFees
                    : total,
                payments: [
                  ...studentLedger?.payments,
                  {
                    student: student_id,
                    academic_year,
                    description: 'Tuition Fee',
                    payment_amount:
                      student_department?.department_name ===
                      'Senior High School'
                        ? totalSubjectFees
                        : studentFees
                            ?.filter(
                              (fee) => fee.fee_type?.fee_type === 'Tuition Fee'
                            )
                            ?.reduce((acc, curr) => acc + curr.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                  {
                    student: student_id,
                    academic_year,
                    description: 'Miscellaneous Fee',
                    payment_amount: studentFees
                      ?.filter(
                        (fee) => fee?.fee_type?.fee_type === 'Miscellaneous'
                      )
                      ?.reduce((acc, curr) => acc + curr?.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                  {
                    student: student_id,
                    academic_year,
                    description: 'Matriculation Fee',
                    payment_amount: studentFees
                      ?.filter(
                        (fee) => fee?.fee_type?.fee_type === 'Matriculation Fee'
                      )
                      ?.reduce((acc, curr) => acc + curr?.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                  {
                    student: student_id,
                    academic_year,
                    description: 'Other Fee',
                    payment_amount: studentFees
                      ?.filter(
                        (fee) => fee?.fee_type?.fee_type === 'Other Fees'
                      )
                      ?.reduce((acc, curr) => acc + curr.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                ],
              })
            );
          } else {
            return dispatch(
              createStudentLedger({
                student: student_id,
                academic_year,
                ledger_balance:
                  student_department?.department_name === 'Senior High School'
                    ? totalFees
                    : studentFees?.reduce((acc, fee) => {
                        return acc + fee.fee;
                      }, 0),
                payments: [
                  {
                    student: student_id,
                    academic_year,
                    description: 'Tuition Fee',
                    payment_amount:
                      student_department?.department_name ===
                      'Senior High School'
                        ? totalSubjectFees
                        : studentFees
                            ?.filter(
                              (fee) => fee.fee_type?.fee_type === 'Tuition Fee'
                            )
                            ?.reduce((acc, curr) => acc + curr.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                  {
                    student: student_id,
                    academic_year,
                    description: 'Miscellaneous Fee',
                    payment_amount: studentFees
                      ?.filter(
                        (fee) => fee?.fee_type?.fee_type === 'Miscellaneous'
                      )
                      ?.reduce((acc, curr) => acc + curr?.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                  {
                    student: student_id,
                    academic_year,
                    description: 'Matriculation Fee',
                    payment_amount: studentFees
                      ?.filter(
                        (fee) => fee?.fee_type?.fee_type === 'Matriculation Fee'
                      )
                      ?.reduce((acc, curr) => acc + curr?.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                  {
                    student: student_id,
                    academic_year,
                    description: 'Other Fee',
                    payment_amount: studentFees
                      ?.filter(
                        (fee) => fee?.fee_type?.fee_type === 'Other Fees'
                      )
                      ?.reduce((acc, curr) => acc + curr.fee, 0),
                    payment_type: 'Debit',
                    payment_date: new Date(),
                  },
                ],
              })
            );
          }
        } else {
          throw new Error('Failed to create K12 enrollment');
        }
      })
      .then((res) => {
        if (res.meta.requestStatus === 'fulfilled') {
          dispatch(
            createK12MonthlyPaymentScheme({
              student: student_id,
              academic_year,
              payment_scheme:
                student_department?.department_name === 'Senior High School'
                  ? shsPaymentScheme
                  : otherPaymentScheme,

              year_level: student_yearlevel?._id,
              total:
                student_department?.department_name === 'Senior High School'
                  ? totalFees
                  : total,
              checked_full_payment,
            })
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // *** Clear Enrollment Data ***

  const clearEnrollmentData = () => {
    dispatch(handleChange({ name: 'enlistedSubjects', value: [] }));
    dispatch(handleChange({ name: 'studentFees', value: [] }));
    dispatch(handleChange({ name: 'k12StudentLoad', value: {} }));
    dispatch(handleChange({ name: 'student_id', value: '' }));
  };

  useEffect(() => {
    dispatch(clearStudentFees());
  }, [dispatch, student_id, academic_year]);

  useEffect(() => {
    setOpen(false);
    dispatch(
      handleChange({ name: 'student_yearlevel', value: student_yearlevel?._id })
    );
    dispatch(
      handleAcademicChange({ name: 'program_id', value: student_program?._id })
    );
  }, [dispatch, student_program?._id, student_yearlevel?._id]);

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
        isOpen={openProgramModal}
        onCancel={() => {
          setOpenProgramModal(false);
          dispatch(
            handleAcademicChange({
              name: 'program_id',
              value: student_program?._id,
            })
          );
        }}
        onConfirm={(e) => {
          e.preventDefault();
          dispatch(
            updateStudent({
              _id: student_id,
              student_program: program_id,
            })
          )
            .then((res) => {
              if (res.meta.requestStatus === 'fulfilled') {
                dispatch(getStudent(student_id));
                setOpen(false);
              }
            })
            .catch((err) => {
              console.log(err);
            });
          setOpenProgramModal(false);
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
                _id: student_id,
                irregular_status: false,
              })
            );
          } else {
            dispatch(
              updateStudent({
                _id: student_id,
                irregular_status: true,
              })
            );
          }
          dispatch(getStudent(student_id));
          setIsRegular(false);
        }}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Student No.</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Year Level</TableCell>
              <TableCell>Department</TableCell>
              {isSeniorHighSchool && <TableCell>Program</TableCell>}
              {open && student_yearlevel?._id !== year && (
                <TableCell>Action</TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
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
                    value={year}
                    onChange={(e) => {
                      setOpen(true);
                      handleInputChange(e);
                    }}
                  >
                    {year_levels
                      .filter(
                        (year_level) =>
                          year_level?.department?._id ===
                          student_department?._id
                      )
                      .map((year_level) => (
                        <MenuItem key={year_level._id} value={year_level?._id}>
                          {year_level.year_level_name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>{student_department?.department_name}</TableCell>
              {isSeniorHighSchool && (
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
                        setOpenProgramModal(true);
                      }}
                    >
                      {programs
                        .filter(
                          (program) =>
                            program?.college_track?.college_track_name ===
                            student_college_track?.college_track_name
                        )
                        .map((program) => (
                          <MenuItem key={program._id} value={program?._id}>
                            {program.program_description}
                          </MenuItem>
                        ))}
                    </Select>
                  </FormControl>
                </TableCell>
              )}

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
          </TableBody>
        </Table>
      </TableContainer>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <Stack direction={'row'} spacing={1} mt={2} alignItems={'center'}>
          <Button
            variant="contained"
            type="button"
            color="secondary"
            onClick={handleGenerateStudentLoad}
            disabled={!academic_year || !student_id}
            size="small"
          >
            {student_department?.department_name === 'Senior High School'
              ? 'Generate Student Load'
              : 'Generate Enrollment Form'}
          </Button>

          {studentFees && studentFees.length > 0 && (
            <Stack direction={'row'} spacing={1}>
              <Button
                size="small"
                variant="contained"
                onClick={() => setSaveLoad(true)}
                disabled={
                  !(academic_year || student_id) ||
                  enrollmentExists ||
                  (isSeniorHighSchool && enlistedSubjects.length === 0)
                }
              >
                Save
              </Button>

              <PDFDownloadLink
                document={
                  <EnrollmentPDFFile
                    student_first_name={student_first_name}
                    student_last_name={student_last_name}
                    student_middle_name={student_middle_name}
                    student_number={student_number}
                    student_year_level={student_yearlevel?.year_level_name}
                    studentFees={studentFees}
                    student_section={studentProfile.section?.section_name ?? ''}
                    payment_scheme={
                      student_department?.department_name ===
                      'Senior High School'
                        ? shsPaymentScheme ?? []
                        : otherPaymentScheme ?? []
                    }
                    subjects={enlistedSubjects ?? []}
                    track={student_department?.department_name}
                    totalFees={totalFees}
                    studentLedger={studentLedger}
                  />
                }
                fileName={`${student_number}_${student_last_name}.pdf`}
              >
                {({ loading }) =>
                  loading ? (
                    <Button>Loading document...</Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        display: `${
                          student_department?.department_name ===
                            'Senior High School' &&
                          enlistedSubjects.length < 1 &&
                          'none'
                        }`,
                      }}
                      size="small"
                    >
                      Download PDF
                    </Button>
                  )
                }
              </PDFDownloadLink>
            </Stack>
          )}
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={() => clearEnrollmentData()}
            disabled={!academic_year || !student_id}
          >
            Clear Form
          </Button>
        </Stack>

        <Box>
          <AntSwitchComponent
            start="Regular"
            end="Irregular"
            value={irregular_status}
            onClick={() => setIsRegular(true)}
          />
        </Box>
      </Stack>

      {isFetchingStudentFees && <LoadingScreen />}

      {studentFees && studentFees.length > 0 ? (
        <>
          {student_department?.department_name === 'Senior High School' ? (
            <Stack>
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
                    <Typography variant="subtitle2">
                      List of Subjects
                    </Typography>

                    <Button
                      variant="contained"
                      size="small"
                      disabled={
                        enlistedSubjects.length === k12SubjectsByProgram.length
                      }
                      color="secondary"
                      onClick={handleAddAllSubjects}
                    >
                      Add All Subjects
                    </Button>
                  </Stack>

                  <Stack>
                    <TableContainer>
                      <Table
                        size="small"
                        sx={{ minWidth: 650 }}
                        aria-label="student-subjects-table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Subject Name</TableCell>
                            <TableCell>Program</TableCell>
                            <TableCell>Semester</TableCell>
                            <TableCell>Add Subject</TableCell>
                          </TableRow>
                        </TableHead>

                        <TableBody>
                          {tableData?.map((subject) => (
                            <TableRow key={subject._id}>
                              <TableCell>{subject?.subject_name}</TableCell>
                              <TableCell>
                                {subject?.program?.program_name}
                              </TableCell>
                              <TableCell>
                                <Typography>
                                  {subject?.level?.year_level_name}
                                </Typography>
                                <Typography variant="caption">
                                  {subject?.semester?.semester_term}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <IconButton
                                  variant="contained"
                                  color="primary"
                                  onClick={() => handleAddSubject(subject)}
                                  disabled={
                                    enlistedSubjects.length ===
                                    k12SubjectsByProgram.length
                                  }
                                >
                                  <IconSquareRoundedPlusFilled />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}

                          <TableRow>
                            <TableCell colSpan={10} align="center">
                              Total Subjects: {enlistedSubjects.length}
                            </TableCell>
                          </TableRow>

                          {k12SubjectsByProgram.length < 1 && (
                            <TableRow>
                              <TableCell colSpan={4} align="center">
                                No Subjects Found
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      component={'div'}
                      rowsPerPageOptions={rowsPerPageOptions}
                      count={k12SubjectsByProgram.length}
                      rowsPerPage={rowsPerPage}
                      page={subjectPage}
                      onPageChange={handleChangeSubjectsPage}
                      onRowsPerPageChange={handleChangeSubjectsRowsPerPage}
                    />
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
                          <TableCell>Subject Name</TableCell>
                          <TableCell>Unit</TableCell>
                          <TableCell>Fee</TableCell>
                          <TableCell>Remove</TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {enlistedSubjects?.map((subject) => (
                          <TableRow key={subject.subject_id}>
                            <TableCell>{subject.subject_name}</TableCell>
                            <TableCell>1</TableCell>
                            <TableCell>
                              {formatSalary(subject.fee || 0)}
                            </TableCell>
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
                          <TableCell align="right" colSpan={2}>
                            <Typography variant="h5">Total:</Typography>
                          </TableCell>

                          <TableCell align="left" colSpan={2}>
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
                </CardContent>
              </Card>

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
            </Stack>
          ) : (
            <Stack
              direction={{
                xs: 'column',
                sm: 'column',
                md: 'row',
              }}
              spacing={2}
              mt={2}
              justifyContent={'space-between'}
            >
              <Stack
                component={Paper}
                width={{
                  xs: '100%',
                  sm: '100%',
                  md: '50%',
                }}
                p={2}
              >
                <Typography variant="h4" fontWeight={600}>
                  Student Fees
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Stack
                  direction={'row'}
                  spacing={2}
                  justifyContent={'space-between'}
                >
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Tuition Fee
                  </Typography>
                  <Typography variant="h5" fontWeight={600} textAlign={'right'}>
                    {formatSalary(
                      studentFees
                        ?.filter(
                          (fee) => fee.fee_type?.fee_type === 'Tuition Fee'
                        )
                        ?.reduce((acc, curr) => acc + curr.fee, 0)
                    )}
                  </Typography>
                </Stack>

                <Stack
                  direction={'row'}
                  spacing={2}
                  justifyContent={'space-between'}
                >
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Matriculation Fee
                  </Typography>
                  <Typography variant="h5" fontWeight={600} textAlign={'right'}>
                    {formatSalary(
                      studentFees
                        ?.filter(
                          (fee) =>
                            fee?.fee_type?.fee_type === 'Matriculation Fee'
                        )
                        ?.reduce((acc, curr) => acc + curr?.fee, 0)
                    )}
                  </Typography>
                </Stack>

                <Stack
                  direction={'row'}
                  spacing={2}
                  justifyContent={'space-between'}
                >
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Miscellaneous Fee
                  </Typography>
                  <Typography variant="h5" fontWeight={600} textAlign={'right'}>
                    {formatSalary(
                      studentFees
                        ?.filter(
                          (fee) => fee?.fee_type?.fee_type === 'Miscellaneous'
                        )
                        ?.reduce((acc, curr) => acc + curr?.fee, 0)
                    )}
                  </Typography>
                </Stack>

                {studentFees
                  ?.filter((fee) => fee?.fee_type?.fee_type === 'Other Fees')
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

                      <Typography
                        variant="h5"
                        fontWeight={600}
                        textAlign={'right'}
                      >
                        {formatSalary(fee?.fee)}
                      </Typography>
                    </Stack>
                  ))}

                {studentFees
                  ?.filter(
                    (fee) =>
                      fee?.fee_type?.fee_type !== 'Other Fees' &&
                      fee?.fee_type?.fee_type !== 'Miscellaneous' &&
                      fee?.fee_type?.fee_type !== 'Matriculation Fee' &&
                      fee?.fee_type?.fee_type !== 'Tuition Fee'
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

                      <Typography
                        variant="h5"
                        fontWeight={600}
                        textAlign={'right'}
                      >
                        {formatSalary(fee?.fee || 0)}
                      </Typography>
                    </Stack>
                  ))}

                <Stack
                  direction={'row'}
                  spacing={2}
                  justifyContent={'space-between'}
                >
                  <Typography variant="h5" gutterBottom fontWeight={600}>
                    Discount/Scholarship/Grants
                  </Typography>
                  <Typography variant="h5" fontWeight={600} textAlign={'right'}>
                    {formatSalary(
                      studentLedger?.ledger_balance < 0
                        ? studentLedger?.ledger_balance
                        : 0
                    )}
                  </Typography>
                </Stack>

                <Divider sx={{ my: 1 }} />

                <Stack
                  direction={'row'}
                  mt={2}
                  spacing={2}
                  justifyContent={'space-between'}
                >
                  <Typography variant="h5" fontWeight={600}>
                    Total
                  </Typography>
                  <Typography variant="h5" fontWeight={600} textAlign={'right'}>
                    {formatSalary(
                      studentFees?.reduce((acc, curr) => acc + curr?.fee, 0) +
                        (studentLedger?.ledger_balance < 0
                          ? studentLedger?.ledger_balance
                          : 0)
                    )}
                  </Typography>
                </Stack>
              </Stack>

              {/* Fee Breakdown */}

              <Stack
                component={Paper}
                width={{
                  xs: '100%',
                  sm: '100%',
                  md: '50%',
                }}
                p={2}
              >
                <Typography variant="h4" fontWeight={600}>
                  Fee Breakdown
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography variant="h5" gutterBottom fontWeight={600}>
                  Miscellaneous Fees
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
                      <Typography variant="h5" gutterBottom>
                        {fee?.fee_label}
                      </Typography>

                      <Typography variant="h5" textAlign={'right'}>
                        {formatSalary(fee?.fee)}
                      </Typography>
                    </Stack>
                  ))}

                <Typography variant="h5" mt={2} gutterBottom fontWeight={600}>
                  Matriculation Fees
                </Typography>

                {studentFees
                  ?.filter(
                    (fee) => fee?.fee_type?.fee_type === 'Matriculation Fee'
                  )
                  .map((fee) => (
                    <Stack
                      key={fee._id}
                      direction={'row'}
                      spacing={2}
                      justifyContent={'space-between'}
                    >
                      <Typography variant="h5" gutterBottom>
                        {fee?.fee_label}
                      </Typography>

                      <Typography variant="h5" textAlign={'right'}>
                        {formatSalary(fee?.fee)}
                      </Typography>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          )}
        </>
      ) : (
        <Paper sx={{ mt: 2 }}>
          <Typography variant="h4" py={2} textAlign={'center'}>
            No Student Fees
          </Typography>
        </Paper>
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

          <Typography variant="h5">{formatSalary(tuition)}</Typography>
        </Stack>

        <Typography variant="h5" mt={1} gutterBottom fontWeight={600}>
          Miscellaneous Fees
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
                {formatSalary(fee?.fee)}
              </Typography>
            </Stack>
          ))}

        <Typography variant="h5" mt={1} gutterBottom fontWeight={600}>
          Matriculation Fees
        </Typography>

        {studentFees
          ?.filter((fee) => fee?.fee_type?.fee_type === 'Matriculation Fee')
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
                {formatSalary(fee?.fee)}
              </Typography>
            </Stack>
          ))}

        <Typography variant="h5" mt={1} gutterBottom fontWeight={600}>
          Other Fees
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
                {formatSalary(fee?.fee)}
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

export default K12StudentTable;
