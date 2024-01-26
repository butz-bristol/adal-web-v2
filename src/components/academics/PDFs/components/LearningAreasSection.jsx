import { StyleSheet, Text, View } from '@react-pdf/renderer';
import {
  getFourPeriodsGeneralAverage,
  getPeriodicRatingString,
} from 'src/utils/helperFunctions';

export const styles = StyleSheet.create({
  table: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '1px solid black',
    fontSize: '10pt',
  },
  tableRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableCell: {
    width: '5%',
    border: 'none',
    margin: 0,
    padding: '4px 3px',
  },
});

const LearningAreasSection = ({ data, isJHS, isGradeSchool, student }) => {
  return (
    <View style={{ marginTop: '5px' }}>
      {/* Learning Areas Table */}
      <View style={[styles.table]}>
        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View
            style={[
              styles.tableCell,
              { width: '55%', borderRight: '1px solid black' },
            ]}
          >
            <Text style={[{ fontFamily: 'Helvetica-Bold' }]}>
              Learning Areas
            </Text>
          </View>

          <View
            style={[
              styles.tableCell,
              { width: '5%', borderRight: '1px solid black' },
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
              { width: '5%', borderRight: '1px solid black' },
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
              { width: '5%', borderRight: '1px solid black' },
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
              { width: '5%', borderRight: '1px solid black' },
            ]}
          >
            <Text
              style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
            >
              4th
            </Text>
          </View>

          <View
            style={[
              styles.tableCell,
              { width: '12.5%', borderRight: '1px solid black' },
            ]}
          >
            <Text
              style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
            >
              Final Rating
            </Text>
          </View>

          <View
            style={[
              styles.tableCell,
              { width: '12.5%', borderRight: '1px solid black' },
            ]}
          >
            <Text
              style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}
            >
              Remarks
            </Text>
          </View>
        </View>

        {data?.subjects?.length > 0 &&
          data?.subjects
            ?.filter((subject) => subject.subject !== null)
            ?.map((item, index) => {
              const {
                subject,
                first_period,
                second_period,
                third_period,
                fourth_period,
              } = item;
              let final_rating = '';

              if (!subject) return null;

              const first_period_rating = parseInt(first_period || 0);
              const second_period_rating = parseInt(second_period || 0);
              const third_period_rating = parseInt(third_period || 0);
              const fourth_period_rating = parseInt(fourth_period || 0);

              if (
                first_period &&
                second_period &&
                third_period &&
                fourth_period
              ) {
                final_rating = Math.ceil(
                  (first_period_rating +
                    second_period_rating +
                    third_period_rating +
                    fourth_period_rating) /
                    4
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
                      { width: '55%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          fontFamily: 'Helvetica',
                          paddingLeft: `${
                            (subject && subject?.subject_name === 'Music') ||
                            (subject && subject?.subject_name === 'Arts') ||
                            (subject &&
                              subject?.subject_name === 'Physical Education') ||
                            (subject && subject?.subject_name === 'Health')
                              ? '20px'
                              : '0'
                          }`,
                        },
                      ]}
                    >
                      {subject.subject_name}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {isJHS
                        ? first_period
                        : getPeriodicRatingString(first_period_rating)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {isJHS
                        ? second_period
                        : getPeriodicRatingString(second_period_rating)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {isJHS
                        ? third_period
                        : getPeriodicRatingString(third_period_rating)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {isJHS
                        ? fourth_period
                        : getPeriodicRatingString(fourth_period_rating)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '12.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      {isJHS
                        ? final_rating
                        : getPeriodicRatingString(final_rating)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.tableCell,
                      { width: '12.5%', borderRight: '1px solid black' },
                    ]}
                  >
                    <Text
                      style={[{ fontFamily: 'Helvetica', textAlign: 'center' }]}
                    >
                      Passed
                    </Text>
                  </View>
                </View>
              );
            })}
      </View>

      {/* General Average */}
      <View
        style={[
          {
            display: 'block',
            marginLeft: 'auto',
            marginRight: '100px',
            marginTop: '15px',
          },
        ]}
      >
        <View style={{ display: 'flex', flexDirection: 'row', width: '140px' }}>
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
            {isJHS
              ? 0
              : getPeriodicRatingString(getFourPeriodsGeneralAverage(data))}
          </Text>
        </View>
      </View>

      {/* Rating Guide */}

      {!isJHS && (
        <View
          style={[
            {
              width: '300px',
              display: 'flex',
              flexDirection: 'column',
              rowGap: '10pt',
            },
          ]}
        >
          <Text style={{ fontSize: '10pt', fontFamily: 'Helvetica-Bold' }}>
            GUIDE FOR RATING:
          </Text>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: '50px',
            }}
          >
            <Text style={{ fontSize: '10pt', width: '110px' }}>
              O - Outstanding
            </Text>
            <Text style={{ fontSize: '10pt' }}>90 - 100</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: '50px',
            }}
          >
            <Text style={{ fontSize: '10pt', width: '110px' }}>
              VS - Very Satisfactory
            </Text>
            <Text style={{ fontSize: '10pt' }}>85 - 89</Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              columnGap: '50px',
            }}
          >
            <Text style={{ fontSize: '10pt', width: '110px' }}>
              S - Satisfactory
            </Text>
            <Text style={{ fontSize: '10pt' }}>80 - 84</Text>
          </View>
        </View>
      )}
    </View>
  );
};
export default LearningAreasSection;
