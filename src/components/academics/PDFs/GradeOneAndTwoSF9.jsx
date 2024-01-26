import { Document, Page, View } from '@react-pdf/renderer';
import styles from 'src/components/pdfStyles';
import AttendanceRecord from './components/AttendanceRecord';
import FooterSignatory from './components/FooterSignatory';
import LearningAreasSection from './components/LearningAreasSection';
import NarrativeReport from './components/NarrativeReport';
import SF9HeaderSection from './components/SF9HeaderSection';
import StudentValues from './components/StudentValues';

const GradeOneAndTwoSF9 = ({
  data,
  student,
  section,
  principal,
  gradeSevenToTen,
  isGradeSchool,
}) => {
  return (
    <Document
      title={`${student?.student_last_name}-${student?.student_number ?? ''}-${
        student?.student_yearlevel?.year_level_name
      }`}
    >
      <Page
        size={'A4'}
        style={[styles.page, { paddingRight: '0.3in', paddingLeft: '0.3in' }]}
        wrap
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {/* Header */}

          <SF9HeaderSection
            student={student}
            section={section}
            isGradeSchool={gradeSevenToTen}
          />

          {/* Learning Areas */}

          <LearningAreasSection
            isGradeSchool={isGradeSchool}
            isJHS={true}
            data={data}
          />

          {/* Student Values */}

          <StudentValues data={data?.behaviors ?? []} />
        </View>
      </Page>

      <Page
        size={'A4'}
        style={[styles.page, { paddingRight: '0.3in', paddingLeft: '0.3in' }]}
        wrap
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Attendance Record */}

          <AttendanceRecord data={data?.attendance ?? []} />

          {/* Narrative Report */}

          <NarrativeReport data={data?.narrative_report ?? []} />

          {/* Footer and Signatory */}

          <FooterSignatory
            data={data}
            section={section}
            principal={principal}
            isJHS={gradeSevenToTen}
          />
        </View>
      </Page>
    </Document>
  );
};
export default GradeOneAndTwoSF9;
