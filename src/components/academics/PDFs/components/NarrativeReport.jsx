import { View, Text } from '@react-pdf/renderer';
import { styles } from './LearningAreasSection';

const NarrativeReport = ({ data }) => {
  return (
    <View style={{ marginTop: '15px' }}>
      <View style={[styles.table]}>
        <View
          style={[
            styles.tableRow,
            {
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottom: '1px solid black',
              padding: '7px 0'
            }
          ]}
        >
          <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '10pt', textAlign: 'center' }}>NARRATIVE REPORT</Text>
        </View>

        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '35%', borderRight: '1px solid black' }]}>
            <Text>1st Grading</Text>
          </View>

          <View style={[styles.tableCell, { width: '65%', borderRight: '1px solid black' }]}>
            <Text>{data?.first_period}</Text>
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '35%', borderRight: '1px solid black' }]}>
            <Text>2nd Grading</Text>
          </View>

          <View style={[styles.tableCell, { width: '65%', borderRight: '1px solid black' }]}>
            <Text>{data?.second_period}</Text>
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '35%', borderRight: '1px solid black' }]}>
            <Text>3rd Grading</Text>
          </View>

          <View style={[styles.tableCell, { width: '65%', borderRight: '1px solid black' }]}>
            <Text>{data?.third_period}</Text>
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '35%', borderRight: '1px solid black' }]}>
            <Text>4th Grading</Text>
          </View>

          <View style={[styles.tableCell, { width: '65%', borderRight: '1px solid black' }]}>
            <Text>{data?.fourth_period}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
export default NarrativeReport;
