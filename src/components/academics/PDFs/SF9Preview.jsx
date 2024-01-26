import { Modal, Paper } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import { useSelector } from 'react-redux';
import LoadingData from 'src/components/LoadingData';
import styles from 'src/components/modalBoxStyle';
import GradeOneAndTwoSF9 from './GradeOneAndTwoSF9';
import GradeSchoolAndJHSSF9 from './GradeSchoolAndJHSSF9';
import KindergartenSF9 from './KindergartenSF9';
import NurserySF9 from './NurserySF9';
import SeniorHighSchoolSF9 from './SeniorHighSchoolSF9';

const SF9Preview = ({ open, close, data, student }) => {
  const { isFetchingStudentReportCard, section } = useSelector(
    (state) => state.academics
  );
  const { principal } = useSelector((state) => state.users);
  const isKinder =
    student?.student_yearlevel?.year_level_name === 'Kindergarten';

  const isNursery =
    student?.student_yearlevel?.year_level_name === 'Nursery 1' ||
    student?.student_yearlevel?.year_level_name === 'Nursery 2';

  const isGradeSchool =
    student?.student_yearlevel?.year_level_name === 'Grade 1' ||
    student?.student_yearlevel?.year_level_name === 'Grade 2' ||
    student?.student_yearlevel?.year_level_name === 'Grade 3' ||
    student?.student_yearlevel?.year_level_name === 'Grade 4' ||
    student?.student_yearlevel?.year_level_name === 'Grade 5' ||
    student?.student_yearlevel?.year_level_name === 'Grade 6';

  const isJHS =
    student?.student_department?.department_name === 'Junior High School';

  const isSHS =
    student?.student_department?.department_name === 'Senior High School';

  return (
    <Modal open={open} onClose={close}>
      <Paper sx={{ ...styles, width: '901px', padding: '3px' }}>
        {!isFetchingStudentReportCard ? (
          <PDFViewer width="100%" height="830">
            {/* For Kindergarten */}

            {isKinder && (
              <KindergartenSF9
                principal={principal}
                section={section}
                student={student}
                data={data}
              />
            )}

            {/* For Nursery 1 & 2 */}

            {isNursery && (
              <NurserySF9
                principal={principal}
                section={section}
                student={student}
                data={data}
              />
            )}

            {/* For Grades 1 - 6 */}

            {isGradeSchool && (
              <GradeOneAndTwoSF9
                principal={principal}
                section={section}
                student={student}
                data={data}
              />
            )}

            {/* For Grades 7 - 10 */}

            {isJHS && (
              <GradeSchoolAndJHSSF9
                principal={principal}
                section={section}
                student={student}
                data={data}
                gradeSevenToTen={isJHS}
                isGradeSchool={isGradeSchool}
              />
            )}

            {/* For Grades 11 - 12 */}

            {isSHS && (
              <SeniorHighSchoolSF9
                student={student}
                data={data}
                section={section}
                isSeniorHighSchool={isSHS}
              />
            )}
          </PDFViewer>
        ) : (
          <LoadingData />
        )}
      </Paper>
    </Modal>
  );
};
export default SF9Preview;
