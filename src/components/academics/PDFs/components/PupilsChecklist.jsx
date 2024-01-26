import { View, Text } from '@react-pdf/renderer';
import { styles } from './LearningAreasSection';

const emptyBox = [1, 2, 3, 4];

const PupilsChecklist = ({ data }) => {
  return (
    <View style={{ marginTop: '15px' }}>
      <View style={[styles.table]}>
        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '80%', borderRight: '1px solid black' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }]}>Pupil's Checklist</Text>
          </View>

          <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>1st</Text>
          </View>

          <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>2nd</Text>
          </View>

          <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>3rd</Text>
          </View>

          <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>4th</Text>
          </View>
        </View>

        {data?.map((item, index) => {
          const { intelligence, checklist: checklists } = item;

          return (
            <View key={index + 1}>
              <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
                <View style={[styles.tableCell, { width: '80%', borderRight: '1px solid black' }]}>
                  <Text style={[{ fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }]}>{intelligence}</Text>
                </View>

                {emptyBox.map((_, index) => (
                  <View key={index} style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
                    <Text></Text>
                  </View>
                ))}
              </View>

              {checklists?.length > 0 &&
                checklists?.map((checklist, index) => {
                  const { description, first_period, second_period, third_period, fourth_period } = checklist;

                  return (
                    <View key={index + 1} style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
                      <View style={[styles.tableCell, { width: '80%', borderRight: '1px solid black' }]}>
                        <Text>{description}</Text>
                      </View>

                      <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
                        <Text style={[{ textAlign: 'center' }]}>{first_period}</Text>
                      </View>

                      <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
                        <Text style={[{ textAlign: 'center' }]}>{second_period}</Text>
                      </View>

                      <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
                        <Text style={[{ textAlign: 'center' }]}>{third_period}</Text>
                      </View>

                      <View style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
                        <Text style={[{ textAlign: 'center' }]}>{fourth_period}</Text>
                      </View>
                    </View>
                  );
                })}
            </View>
          );
        })}
      </View>

      {/* Guide */}
      <View style={{ marginTop: '15px' }}>
        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '10pt', paddingBottom: '10px' }}>GUIDE FOR RATING</Text>

        <View style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
          <Text style={{ fontFamily: 'Helvetica', fontSize: '10pt' }}>O - Outstanding</Text>

          <Text style={{ fontFamily: 'Helvetica', fontSize: '10pt' }}>VS - Very Satisfactory</Text>

          <Text style={{ fontFamily: 'Helvetica', fontSize: '10pt' }}>S - Satisfactory</Text>
        </View>
      </View>
    </View>
  );
};

export default PupilsChecklist;
