import { Document, Page, Text, View } from '@react-pdf/renderer';
import styles from 'src/components/pdfStyles';
import { getSemesterAverage } from 'src/utils/helperFunctions';
import AttendanceRecord from './components/AttendanceRecord';
import FooterSignatory from './components/FooterSignatory';
import { styles as tableStyles } from './components/LearningAreasSection';
import SF9HeaderSection from './components/SF9HeaderSection';

const SeniorHighSchoolSF9 = ({
  data,
  student,
  section,
  isSeniorHighSchool,
}) => {
  return (
    <Document
      title={`${student?.student_last_name}-${student?.student_number ?? ''}-${
        student?.student_yearlevel?.year_level_name
      }`}
    >
      <Page
        size={'A4'}
        style={[styles.page, { paddingRight: '0.7in', paddingLeft: '0.3in' }]}
        wrap
      >
        <SF9HeaderSection
          student={student}
          section={section}
          isSeniorHighSchool={isSeniorHighSchool}
        />

        {/* 1st Semester Reports */}

        <View style={[tableStyles.table, { margin: '20px 0' }]}>
          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                1ST SEMESTER
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            >
              <Text
                style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
              >
                1st
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            >
              <Text
                style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
              >
                2nd
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '15%', borderRight: '1px solid black' },
              ]}
            >
              <Text
                style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
              >
                Final Rating
              </Text>
            </View>
          </View>

          {/* CORE SUBJECTS */}

          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                Core Subjects
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '15%', borderRight: '1px solid black' },
              ]}
            ></View>
          </View>

          {data?.subjects
            ?.filter(
              (item) =>
                item?.subject?.semester?.semester_term === '1st Semester' &&
                item?.subject?.subject_type?.subject_type === 'Core Subjects'
            )
            ?.map((item, index) => {
              const { first_period, second_period } = item;
              const { subject_name } = item?.subject;
              const first_period_rating = parseInt(first_period);
              const second_period_rating = parseInt(second_period);
              let final_rating = 0;

              if (first_period_rating && !second_period_rating) {
                final_rating = first_period_rating;
              } else {
                final_rating = Math.ceil(
                  (first_period_rating + second_period_rating) / 2
                );
              }

              return (
                <View
                  key={index + 1}
                  style={[styles.tableRow, { borderBottom: '1px solid black' }]}
                >
                  <View
                    style={[
                      styles.tableCell,
                      { width: '70%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text style={[{ fontFamily: 'Helvetica' }]}>
                      {subject_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {first_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {second_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '15%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {final_rating || ''}
                    </Text>
                  </View>
                </View>
              );
            })}

          {/* APPLIED SUBJECTS */}

          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                Applied Subjects
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '15%', borderRight: '1px solid black' },
              ]}
            ></View>
          </View>

          {data?.subjects
            ?.filter(
              (item) =>
                item?.subject?.semester?.semester_term === '1st Semester' &&
                item?.subject?.subject_type?.subject_type === 'Applied Subjects'
            )
            ?.map((item, index) => {
              const { first_period, second_period } = item;
              const { subject_name } = item?.subject;
              const first_period_rating = parseInt(first_period);
              const second_period_rating = parseInt(second_period);
              let final_rating = 0;

              if (first_period_rating && !second_period_rating) {
                final_rating = first_period_rating;
              } else {
                final_rating = Math.ceil(
                  (first_period_rating + second_period_rating) / 2
                );
              }

              return (
                <View
                  key={index + 1}
                  style={[styles.tableRow, { borderBottom: '1px solid black' }]}
                >
                  <View
                    style={[
                      styles.tableCell,
                      { width: '70%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text style={[{ fontFamily: 'Helvetica' }]}>
                      {subject_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {first_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {second_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '15%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {final_rating || ''}
                    </Text>
                  </View>
                </View>
              );
            })}

          {/* SPECIALIZED SUBJECTS */}

          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                Specialized Subjects
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '15%', borderRight: '1px solid black' },
              ]}
            ></View>
          </View>

          {data?.subjects
            ?.filter(
              (item) =>
                item?.subject?.semester?.semester_term === '1st Semester' &&
                item?.subject?.subject_type?.subject_type ===
                  'Specialized Subjects'
            )
            ?.map((item, index) => {
              const { first_period, second_period } = item;
              const { subject_name } = item?.subject;
              const first_period_rating = parseInt(first_period);
              const second_period_rating = parseInt(second_period);
              let final_rating = 0;

              if (first_period_rating && !second_period_rating) {
                final_rating = first_period_rating;
              } else {
                final_rating = Math.ceil(
                  (first_period_rating + second_period_rating) / 2
                );
              }

              return (
                <View
                  key={index + 1}
                  style={[styles.tableRow, { borderBottom: '1px solid black' }]}
                >
                  <View
                    style={[
                      styles.tableCell,
                      { width: '70%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text style={[{ fontFamily: 'Helvetica' }]}>
                      {subject_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {first_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {second_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '15%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {final_rating || ''}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View style={[{ display: 'block', marginLeft: 'auto' }]}>
          <View
            style={{ display: 'flex', flexDirection: 'row', width: '140px' }}
          >
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                fontSize: '10pt',
                marginRight: '10px',
              }}
            >
              FIRST SEM AVERAGE:
            </Text>

            <Text style={{ fontSize: '10pt', marginLeft: '10px' }}>
              {/* data?.subjects?.filter((subject) => subject?.subject?.semester?.semester_term === '1st Semester')?.length */}
              {getSemesterAverage(
                data?.subjects?.filter(
                  (item) =>
                    item?.subject?.semester?.semester_term === '1st Semester'
                ),
                '1st Semester'
              )}
            </Text>
          </View>
        </View>

        {/* 2nd Semester Reports */}

        <View style={[tableStyles.table, { margin: '20px 0' }]}>
          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                2ND SEMESTER
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            >
              <Text
                style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
              >
                3rd
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            >
              <Text
                style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
              >
                4th
              </Text>
            </View>

            <View style={[styles.tableCell, { width: '15%' }]}>
              <Text
                style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
              >
                Final Rating
              </Text>
            </View>
          </View>

          {/* CORE SUBJECTS */}

          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                Core Subjects
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '15%', borderRight: '1px solid black' },
              ]}
            ></View>
          </View>

          {data?.subjects
            ?.filter(
              (item) =>
                item?.subject?.semester?.semester_term === '2nd Semester' &&
                item?.subject?.subject_type?.subject_type === 'Core Subjects'
            )
            ?.map((item, index) => {
              const { third_period, fourth } = item;
              const { subject_name } = item?.subject;
              const third_period_rating = parseInt(third_period);
              const fourth_rating = parseInt(fourth);
              let final_rating = 0;

              if (third_period_rating && !fourth_rating) {
                final_rating = third_period_rating;
              } else {
                final_rating = Math.ceil(
                  (third_period_rating + fourth_rating) / 2
                );
              }

              return (
                <View
                  key={index + 1}
                  style={[styles.tableRow, { borderBottom: '1px solid black' }]}
                >
                  <View
                    style={[
                      styles.tableCell,
                      { width: '70%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text style={[{ fontFamily: 'Helvetica' }]}>
                      {subject_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {third_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {fourth_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '15%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {final_rating || ''}
                    </Text>
                  </View>
                </View>
              );
            })}

          {/* APPLIED SUBJECTS */}

          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                Applied Subjects
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '15%', borderRight: '1px solid black' },
              ]}
            ></View>
          </View>

          {data?.subjects
            ?.filter(
              (item) =>
                item?.subject?.semester?.semester_term === '2nd Semester' &&
                item?.subject?.subject_type?.subject_type === 'Applied Subjects'
            )
            ?.map((item, index) => {
              const { third_period, fourth } = item;
              const { subject_name } = item?.subject;
              const third_period_rating = parseInt(third_period);
              const fourth_rating = parseInt(fourth);
              let final_rating = 0;

              if (third_period_rating && !fourth_rating) {
                final_rating = third_period_rating;
              } else {
                final_rating = Math.ceil(
                  (third_period_rating + fourth_rating) / 2
                );
              }

              return (
                <View
                  key={index + 1}
                  style={[styles.tableRow, { borderBottom: '1px solid black' }]}
                >
                  <View
                    style={[
                      styles.tableCell,
                      { width: '70%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text style={[{ fontFamily: 'Helvetica' }]}>
                      {subject_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {third_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {fourth_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '15%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {final_rating || ''}
                    </Text>
                  </View>
                </View>
              );
            })}

          {/* SPECIALIZED SUBJECTS */}

          <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '70%', borderRight: '1px solid black' },
              ]}
            >
              <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
                Specialized Subjects
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '7.5%', borderRight: '1px solid black' },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                { width: '15%', borderRight: '1px solid black' },
              ]}
            ></View>
          </View>

          {data?.subjects
            ?.filter(
              (item) =>
                item?.subject?.semester?.semester_term === '2nd Semester' &&
                item?.subject?.subject_type?.subject_type ===
                  'Specialized Subjects'
            )
            ?.map((item, index) => {
              const { third_period, fourth } = item;
              const { subject_name } = item?.subject;
              const third_period_rating = parseInt(third_period);
              const fourth_rating = parseInt(fourth);
              let final_rating = 0;

              if (third_period_rating && !fourth_rating) {
                final_rating = third_period_rating;
              } else {
                final_rating = Math.ceil(
                  (third_period_rating + fourth_rating) / 2
                );
              }

              return (
                <View
                  key={index + 1}
                  style={[styles.tableRow, { borderBottom: '1px solid black' }]}
                >
                  <View
                    style={[
                      styles.tableCell,
                      { width: '70%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text style={[{ fontFamily: 'Helvetica' }]}>
                      {subject_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {third_period_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '7.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {fourth_rating || ''}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '15%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {final_rating || ''}
                    </Text>
                  </View>
                </View>
              );
            })}
        </View>

        <View style={[{ display: 'block', marginLeft: 'auto' }]}>
          <View
            style={{ display: 'flex', flexDirection: 'row', width: '140px' }}
          >
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                fontSize: '10pt',
                marginRight: '10px',
              }}
            >
              SECOND SEM AVERAGE:
            </Text>

            <Text style={{ fontSize: '10pt', marginLeft: '10px' }}>
              {getSemesterAverage(
                data?.subjects?.filter(
                  (item) =>
                    item?.subject?.semester?.semester_term === '2nd Semester'
                ),
                '2nd Semester'
              )}
            </Text>
          </View>
        </View>

        <View
          style={[{ display: 'block', marginLeft: 'auto', marginTop: '10px' }]}
        >
          <View
            style={{ display: 'flex', flexDirection: 'row', width: '140px' }}
          >
            <Text
              style={{
                fontFamily: 'Helvetica-Bold',
                fontSize: '10pt',
                marginRight: '10px',
              }}
            >
              GENERAL AVERAGE:
            </Text>

            <Text style={{ fontSize: '10pt', marginLeft: '10px' }}>
              {getSemesterAverage(
                data?.subjects?.filter(
                  (item) =>
                    item?.subject?.semester?.semester_term === '2nd Semester'
                ),
                '2nd Semester'
              ) &&
                getSemesterAverage(
                  data?.subjects?.filter(
                    (item) =>
                      item?.subject?.semester?.semester_term === '1st Semester'
                  ),
                  '1st Semester'
                ) +
                  getSemesterAverage(
                    data?.subjects?.filter(
                      (item) =>
                        item?.subject?.semester?.semester_term ===
                        '2nd Semester'
                    ),
                    '2nd Semester'
                  )}
            </Text>
          </View>
        </View>
      </Page>

      <Page
        size={'A4'}
        style={[styles.page, { paddingRight: '0.3in', paddingLeft: '0.3in' }]}
        wrap
      >
        <View style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          {/* Student Values */}

          <StudentValues data={data?.behaviors ?? []} />

          {/* Attendance Record */}

          <AttendanceRecord data={data?.attendance ?? []} />

          <FooterSignatory
            data={data}
            section={section}
            isJHS={false}
            isSHS={true}
          />
        </View>
      </Page>
    </Document>
  );
};
export default SeniorHighSchoolSF9;
