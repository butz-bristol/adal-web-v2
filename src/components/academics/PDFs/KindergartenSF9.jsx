import { Document, Page, View } from '@react-pdf/renderer';
import styles from 'src/components/pdfStyles';
import AttendanceRecord from './components/AttendanceRecord';
import FooterSignatory from './components/FooterSignatory';
import LearningAreasSection from './components/LearningAreasSection';
import NarrativeReport from './components/NarrativeReport';
import PupilsChecklist from './components/PupilsChecklist';
import SF9HeaderSection from './components/SF9HeaderSection';
import StudentValues from './components/StudentValues';

const KindergartenSF9 = ({ data, student, section, principal }) => {
  return (
    <Document
      title={`${student?.student_last_name}-${student?.student_number ?? ''}-${
        student?.student_yearlevel?.year_level_name
      }`}
    >
      {!(
        student?.student_yearlevel?.year_level_name === 'Nursery 1' ||
        student?.student_yearlevel?.year_level_name === 'Nursery 2'
      ) && (
        <Page
          size={'A4'}
          style={[styles.page, { paddingRight: '0.7in', paddingLeft: '0.3in' }]}
          wrap
        >
          <View
            style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}
          >
            {/* Header */}

            <SF9HeaderSection student={student} section={section} />

            {/* Learning Areas */}

            <LearningAreasSection data={data} />

            {/* Pupils Checklist */}

            <PupilsChecklist data={data?.intelligences ?? []} />
          </View>
        </Page>
      )}

      <Page
        size={'A4'}
        style={[styles.page, { paddingRight: '0.7in', paddingLeft: '0.3in' }]}
        wrap
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Student Values */}

          <StudentValues data={data?.behaviors ?? []} />

          {/* Attendance Record */}

          <AttendanceRecord data={data?.attendance ?? []} />

          {/* Narrative Report */}

          <NarrativeReport data={data?.narrative_report ?? []} />

          {/* Footer and Signatory */}

          <FooterSignatory
            data={data}
            section={section}
            principal={principal}
          />
        </View>
      </Page>
    </Document>
  );
};

export default KindergartenSF9;
