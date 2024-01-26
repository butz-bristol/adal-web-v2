import { Document, Font, Page, Text, View } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import styles from 'src/components/pdfStyles';

Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/opensans/v18/mem8YaGs126MiZpBA-UFVZ0e.ttf',
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v18/mem5YaGs126MiZpBA-UN7rgOUuhs.ttf',
      fontWeight: 700,
    },
  ],
});

function formatDate(dateString) {
  if (!dateString) {
    return null;
  }

  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, '0');
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
    date
  );
  const year = date.getFullYear().toString().slice(-2);

  return `${day}-${month}-${year}`;
}

const EnrollmentSummaryPDF = ({ data, showList, list }) => {
  return (
    <Document>
      <Page
        size={'A4'}
        style={{ padding: '15px 20px', fontSize: 8, fontFamily: 'Open Sans' }}
      >
        <View style={[styles.flex, { justifyContent: 'space-between' }]}>
          <View>
            <Text style={{ fontSize: 8, paddingBottom: '3px' }}>
              BATANGAS EASTERN COLLEGES
            </Text>
            <Text style={{ fontSize: 8, paddingBottom: '3px' }}>
              2 Javier St., Poblacion, San Juan, Batangas!
            </Text>
          </View>

          <View>
            <Text
              style={{ fontSize: 8, textAlign: 'right', paddingBottom: '3px' }}
              render={({ pageNumber, totalPages }) =>
                `Page: ${pageNumber} of ${totalPages}`
              }
            />
            <Text
              style={{ fontSize: 8, textAlign: 'right', paddingBottom: '3px' }}
            >
              {DateTime.now().toLocaleString(DateTime.DATE_MED)}
            </Text>
            <Text
              style={{ fontSize: 8, textAlign: 'right', paddingBottom: '3px' }}
            >
              {DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS)}
            </Text>
          </View>
        </View>

        <View style={{ fontSize: 8, marginTop: '3px' }}>
          <Text style={{ fontSize: 8, marginBottom: '3px' }}>
            STUDENT POPULATION SUMMARY PER ACADEMIC YEAR
          </Text>
          <Text>{data?.academic_year}</Text>
        </View>

        <View style={{ marginTop: '10px' }}>
          {/* COLLEGE AND TESDA ENROLLMENT LIST */}

          {(data?.department === 'college' || data?.department === 'tesda') && (
            <View>
              <View style={{ marginBottom: '10px' }}>
                <Text>{data?.department?.toUpperCase()} DEPARTMENT</Text>
              </View>

              <View
                style={[
                  styles.flex,
                  { justifyContent: 'space-between', width: '250px' },
                ]}
              >
                <Text
                  style={{ fontSize: 8, marginBottom: '3px', fontWeight: 900 }}
                >
                  Year Level
                </Text>
                <Text
                  style={{ fontSize: 8, marginBottom: '3px', fontWeight: 900 }}
                >
                  Total
                </Text>
              </View>

              {data?.yearLevelAccumulation?.map((item, index) => (
                <View key={index + 1}>
                  <View
                    style={[
                      styles.flex,
                      { justifyContent: 'space-between', width: '250px' },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        marginBottom: '3px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item?.year_level}
                    </Text>
                    <Text>-------------------</Text>
                    <Text style={{ fontSize: 8, marginBottom: '3px' }}>
                      {item?.total}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.flex,
                      { justifyContent: 'center', width: '250px' },
                    ]}
                  >
                    <View
                      style={[
                        styles.flex,
                        { width: '83.3px', justifyContent: 'space-between' },
                      ]}
                    >
                      <View>
                        <Text>M</Text>
                      </View>
                      <View>
                        <Text>{item.males ? item.males : 0}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.flex,
                      { justifyContent: 'center', width: '250px' },
                    ]}
                  >
                    <View
                      style={[
                        styles.flex,
                        { width: '83.3px', justifyContent: 'space-between' },
                      ]}
                    >
                      <View>
                        <Text>F</Text>
                      </View>
                      <View>
                        <Text>{item.females ? item.females : 0}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* K-12 ENROLLMENT LIST */}

          {list?.department === 'k-12' && showList && (
            <View>
              <View
                style={[
                  styles.flex,
                  { justifyContent: 'space-between', width: '250px' },
                ]}
              >
                <Text
                  style={{ fontSize: 8, marginBottom: '3px', fontWeight: 900 }}
                >
                  Year Level
                </Text>
                <Text
                  style={{ fontSize: 8, marginBottom: '3px', fontWeight: 900 }}
                >
                  Total
                </Text>
              </View>

              {list?.yearLevelAccumulation?.map((item, index) => (
                <View key={index + 1}>
                  <View
                    style={[
                      styles.flex,
                      { justifyContent: 'space-between', width: '250px' },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: 8,
                        marginBottom: '3px',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item?.year_level}
                    </Text>
                    <Text>-------------------</Text>
                    <Text style={{ fontSize: 8, marginBottom: '3px' }}>
                      {item?.total}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.flex,
                      { justifyContent: 'center', width: '250px' },
                    ]}
                  >
                    <View
                      style={[
                        styles.flex,
                        { width: '83.3px', justifyContent: 'space-between' },
                      ]}
                    >
                      <View>
                        <Text>M</Text>
                      </View>
                      <View>
                        <Text>{item.males ? item.males : 0}</Text>
                      </View>
                    </View>
                  </View>

                  <View
                    style={[
                      styles.flex,
                      { justifyContent: 'center', width: '250px' },
                    ]}
                  >
                    <View
                      style={[
                        styles.flex,
                        { width: '83.3px', justifyContent: 'space-between' },
                      ]}
                    >
                      <View>
                        <Text>F</Text>
                      </View>
                      <View>
                        <Text>{item.females ? item.females : 0}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* K-12 ENROLLMENT SUMMARY*/}

          {data?.department === 'k-12' &&
            !showList &&
            data?.studentsByGradeLevel
              ?.filter((item) => item.students.length !== 0)
              .map((item, index) => (
                <View key={index + 1} style={{ marginBottom: '10px' }}>
                  <View style={[styles.flex, { marginBottom: '10px' }]}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 9,
                        marginRight: '70px',
                        minWidth: '70px',
                      }}
                    >
                      {item.grade_level}
                    </Text>
                    <Text style={{ fontWeight: 900 }}>
                      {item.students.length}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableHeader,
                      { borderTop: '2px solid black' },
                    ]}
                  >
                    <View
                      style={[
                        styles.tableHeaderCell,
                        {
                          borderLeft: 'none',
                          width: '15%',
                          backgroundColor: '#fff',
                        },
                      ]}
                    >
                      <Text>Enrollment Date</Text>
                    </View>

                    <View
                      style={[
                        styles.tableHeaderCell,
                        {
                          borderLeft: 'none',
                          width: '15%',
                          backgroundColor: '#fff',
                        },
                      ]}
                    >
                      <Text>SN #</Text>
                    </View>

                    <View
                      style={[
                        styles.tableHeaderCell,
                        {
                          borderLeft: 'none',
                          width: '70%',
                          backgroundColor: '#fff',
                        },
                      ]}
                    >
                      <Text>Student Name</Text>
                    </View>
                  </View>

                  {item?.students?.map((student, index) => (
                    <View
                      key={index + 1}
                      style={[
                        styles.tableRow,
                        { borderTop: 'none', padding: '5px 0' },
                      ]}
                    >
                      <View
                        style={[
                          styles.tableCell,
                          { borderLeft: 'none', width: '15%' },
                        ]}
                      >
                        <Text style={{ fontWeight: 'medium' }}>
                          {formatDate(student?.student_date_enrolled)}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.tableCell,
                          { borderLeft: 'none', width: '15%' },
                        ]}
                      >
                        <Text style={{ fontWeight: 'medium' }}>
                          {student?.student_number}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.tableCell,
                          { borderLeft: 'none', width: '23.5%' },
                        ]}
                      >
                        <Text style={{ fontWeight: 'medium' }}>
                          {student?.student_last_name?.toUpperCase()}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.tableCell,
                          { borderLeft: 'none', width: '23.5%' },
                        ]}
                      >
                        <Text style={{ fontWeight: 'medium' }}>
                          {student?.student_first_name?.toUpperCase()}
                        </Text>
                      </View>

                      <View
                        style={[
                          styles.tableCell,
                          { borderLeft: 'none', width: '23%' },
                        ]}
                      >
                        <Text style={{ fontWeight: 'medium' }}>
                          {student?.student_middle_name?.toUpperCase() ?? '-'}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ))}
        </View>
      </Page>
    </Document>
  );
};

export default EnrollmentSummaryPDF;
