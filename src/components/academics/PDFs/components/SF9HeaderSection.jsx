import { Image, StyleSheet, Text, View } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import logo from 'src/assets/images/logo.png';

const styles = StyleSheet.create({
  section: {
    fontSize: 6,
    fontFamily: 'Helvetica',
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexColumn: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  'pt-2': {
    paddingTop: '2px',
  },
  'pb-2': {
    paddingBottom: '2px',
  },
  'p-10': {
    padding: '10px',
  },
  divider: {
    borderBottom: '0.5px solid #000',
  },
});

const SF9HeaderSection = ({
  student,
  section,
  isGradeSchool,
  isSeniorHighSchool,
}) => {
  return (
    <View style={styles.section}>
      <View style={{ marginBottom: '7px' }}>
        <Text>SCHOOL FORM 9</Text>
      </View>

      {/* Header Text and Logo */}

      <View style={styles.flexRow}>
        <View style={[styles.flexColumn, { width: '45%' }]}>
          <Text style={[styles['pb-2'], { letterSpacing: '1px' }]}>
            REPUBLIC OF THE PHILIPPINES
          </Text>
          <Text
            style={[styles['pt-2'], styles['pb-2'], { letterSpacing: '1px' }]}
          >
            DEPARTMENT OF EDUCATION
          </Text>
          <Text
            style={[styles['pt-2'], styles['pb-2'], { letterSpacing: '1px' }]}
          >
            REGION IV-A (CALABARZON)
          </Text>
          <Text
            style={[styles['pt-2'], styles['pb-2'], { letterSpacing: '1px' }]}
          >
            DIVISION OF BATANGAS
          </Text>
        </View>

        <View
          style={{ display: 'flex', justifyContent: 'center', width: '10%' }}
        >
          <Image
            src={logo}
            style={{ width: '100%', display: 'block', margin: '0 auto' }}
          />
        </View>

        <View
          style={[styles.flexColumn, { alignItems: 'flex-end', width: '45%' }]}
        >
          <Text
            style={[
              styles['pb-2'],
              { fontSize: 7, textAlign: 'right', letterSpacing: '1px' },
            ]}
          >
            BATANGAS EASTERN COLLEGES
          </Text>
          <Text
            style={[styles['pt-2'], styles['pb-2'], { letterSpacing: '1px' }]}
          >
            SAN JUAN, BATANGAS
          </Text>
          <Text
            style={[
              styles['pt-2'],
              styles['pb-2'],
              { letterSpacing: '1px', textTransform: 'uppercase' },
            ]}
          >
            {section?.department?.department_name} LEVEL
          </Text>
          <Text
            style={[styles['pt-2'], styles['pb-2'], { letterSpacing: '1px' }]}
          >
            SCHOOL YEAR: {section?.academic_year?.school_year}
          </Text>
        </View>
      </View>

      <View
        style={[styles.flexRow, { marginTop: '7px', justifyContent: 'center' }]}
      >
        <Text
          style={{
            fontSize: 9,
            letterSpacing: '1.5px',
            fontFamily: 'Helvetica-Bold',
          }}
        >
          PROGRESS REPORT CARD
        </Text>
      </View>

      {/* Divider */}

      <View style={[styles.divider, { padding: '10px 0' }]} />

      {/* Student Information */}

      <View
        style={[
          styles.flexRow,
          { justifyContent: 'space-between', marginTop: '10px' },
        ]}
      >
        {/* 1st Student Data Col */}

        <View style={{ width: '70%' }}>
          <View
            style={[
              styles.flexRow,
              styles['pt-2'],
              styles['pb-2'],
              { justifyContent: 'flex-start', gap: '10px' },
            ]}
          >
            <Text
              style={{
                fontSize: '10pt',
                width: '85px',
                fontFamily: 'Helvetica-Bold',
              }}
            >
              Name:
            </Text>

            <Text style={{ fontSize: '10pt' }}>
              {student?.student_last_name}, {student?.student_first_name}{' '}
              {`${student?.student_middle_name?.charAt(0)}.` ?? ''}
            </Text>
          </View>

          <View
            style={[
              styles.flexRow,
              styles['pt-2'],
              styles['pb-2'],
              { justifyContent: 'flex-start', gap: '10px' },
            ]}
          >
            <Text
              style={{
                fontSize: '10pt',
                width: '85px',
                fontFamily: 'Helvetica-Bold',
              }}
            >
              Grade & Section:
            </Text>
            <Text style={{ fontSize: '10pt' }}>
              {student?.student_yearlevel?.year_level_name} -{' '}
              {student?.section?.section_name}
            </Text>
          </View>

          {!isSeniorHighSchool && (
            <View
              style={[
                styles.flexRow,
                styles['pt-2'],
                styles['pb-2'],
                { justifyContent: 'flex-start', gap: '10px' },
              ]}
            >
              <Text
                style={{
                  fontSize: '10pt',
                  width: '85px',
                  fontFamily: 'Helvetica-Bold',
                }}
              >
                Student Number:
              </Text>
              <Text style={{ fontSize: '10pt' }}>
                {student?.student_number}
              </Text>
            </View>
          )}

          {(isGradeSchool || isSeniorHighSchool) && (
            <View
              style={[
                styles.flexRow,
                styles['pt-2'],
                styles['pb-2'],
                {
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '10px',
                },
              ]}
            >
              <Text
                style={{
                  fontSize: '10pt',
                  width: '85px',
                  fontFamily: 'Helvetica-Bold',
                }}
              >
                Address:
              </Text>
              <Text
                style={{ fontSize: '10pt', width: '265px', marginRight: '5px' }}
              >
                {student?.student_present_address}
              </Text>
            </View>
          )}

          {isSeniorHighSchool && (
            <View
              style={[
                styles.flexRow,
                styles['pt-2'],
                styles['pb-2'],
                {
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: '10px',
                },
              ]}
            >
              <Text
                style={{
                  fontSize: '10pt',
                  width: '85px',
                  fontFamily: 'Helvetica-Bold',
                }}
              >
                Track-Strand:
              </Text>
              <Text
                style={{ fontSize: '10pt', width: '265px', marginRight: '5px' }}
              >
                {student?.student_college_track?.college_track_name} -{' '}
                {student?.student_program?.program_name}
              </Text>
            </View>
          )}
        </View>

        {/* 2nd Data Col */}

        <View
          style={[
            styles.flexColumn,
            { width: '30%', alignItems: 'flex-start' },
          ]}
        >
          <View style={[styles.flexRow, styles['pt-2'], styles['pb-2']]}>
            <Text
              style={{
                fontSize: '10pt',
                fontFamily: 'Helvetica-Bold',
                marginRight: '5px',
              }}
            >
              Age:
            </Text>

            <Text style={{ fontSize: '10pt' }}>
              {Math.round(
                DateTime.now().diff(
                  DateTime.fromISO(student?.student_birthdate),
                  'years'
                ).years
              ) ?? ''}
            </Text>

            {isSeniorHighSchool && (
              <View
                style={[
                  styles.flexRow,
                  styles['pt-2'],
                  styles['pb-2'],
                  { marginLeft: '7px' },
                ]}
              >
                <Text
                  style={{ fontSize: '10pt', fontFamily: 'Helvetica-Bold' }}
                >
                  Gender:
                </Text>
                <Text style={{ fontSize: '10pt', marginLeft: '7px' }}>
                  {student?.student_gender}
                </Text>
              </View>
            )}
          </View>

          {isSeniorHighSchool && (
            <View style={[styles.flexRow, styles['pt-2'], styles['pb-2']]}>
              <Text style={{ fontSize: '10pt', fontFamily: 'Helvetica-Bold' }}>
                Student Number:{' '}
              </Text>
              <Text style={{ fontSize: '10pt' }}>
                {student?.student_number}
              </Text>
            </View>
          )}

          {!isSeniorHighSchool && (
            <View style={[styles.flexRow, styles['pt-2'], styles['pb-2']]}>
              <Text
                style={{
                  fontSize: '10pt',
                  fontFamily: 'Helvetica-Bold',
                  width: '70px',
                }}
              >
                Gender:
              </Text>
              <Text style={{ fontSize: '10pt' }}>
                {student?.student_gender}
              </Text>
            </View>
          )}

          <View style={[styles.flexRow, styles['pt-2'], styles['pb-2']]}>
            <Text
              style={{
                fontSize: '10pt',
                fontFamily: 'Helvetica-Bold',
                width: '70px',
              }}
            >
              LRN:{' '}
            </Text>
            <Text style={{ fontSize: '10pt' }}>
              {student?.student_learners_reference_no}
            </Text>
          </View>

          {(isGradeSchool || isSeniorHighSchool) && (
            <View style={[styles.flexRow, styles['pt-2'], styles['pb-2']]}>
              <Text
                style={{
                  fontSize: '10pt',
                  fontFamily: 'Helvetica-Bold',
                  width: '70px',
                }}
              >
                Curriculum:{' '}
              </Text>
              <Text style={{ fontSize: '10pt' }}>K to 12 BEC</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default SF9HeaderSection;
