import { View, Text } from '@react-pdf/renderer';
import { styles } from './LearningAreasSection';

const values = [
  { value: 'Love', description: 'Demonstrates genuine love for others' },
  { value: 'Obedience', description: 'Is a model of obedience' },
  { value: 'Respect', description: 'Is respectable and knows how to respect' },
  { value: 'Humility', description: 'Always puts the interest of others above self' },
  { value: 'Honesty', description: 'Values integrity and truth' },
  { value: 'Commitment', description: 'Is responsible and diligent in accomplishing his/her duties on time' },
  { value: 'Servant Leadership', description: 'Is a servant leader who leads by serving others out of love' }
];

const StudentValues = ({ data }) => {
  const refinedData = values.map((item) => {
    const { value, description } = item;

    const first_period = data?.find((item) => item.value === value)?.first_period;
    const second_period = data?.find((item) => item.value === value)?.second_period;
    const third_period = data?.find((item) => item.value === value)?.third_period;
    const fourth_period = data?.find((item) => item.value === value)?.fourth_period;

    return { value, description, first_period, second_period, third_period, fourth_period };
  });

  return (
    <View style={{ marginTop: '10px' }}>
      <View style={[styles.table]}>
        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '29%', borderRight: '1px solid black' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }]}>SCHOOL VALUES</Text>
          </View>

          <View style={[styles.tableCell, { width: '50%', borderRight: '1px solid black' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' }]}>Behavior Statements</Text>
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

          <View style={[styles.tableCell, { width: '5%' }]}>
            <Text style={[{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }]}>4th</Text>
          </View>
        </View>

        {refinedData?.map((item, index) => {
          const { value, first_period, second_period, third_period, fourth_period, description } = item;

          return (
            <View key={index + 1} style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
              <View style={[styles.tableCell, { width: '29%', borderRight: '1px solid black' }]}>
                <Text style={{ fontSize: '10pt', textTransform: 'uppercase' }}>{value}</Text>
              </View>

              <View style={[styles.tableCell, { width: '50%', borderRight: '1px solid black' }]}>
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

              <View style={[styles.tableCell, { width: '5%' }]}>
                <Text style={[{ textAlign: 'center' }]}>{fourth_period}</Text>
              </View>
            </View>
          );
        })}
      </View>

      {/* Guide */}
      <View style={{ marginTop: '10px' }}>
        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '10pt', paddingBottom: '10px' }}>GUIDE FOR RATING</Text>

        <View style={{ display: 'flex', flexDirection: 'row', gap: '30px' }}>
          <Text style={{ fontFamily: 'Helvetica', fontSize: '10pt' }}>AO - Always Observed</Text>

          <Text style={{ fontFamily: 'Helvetica', fontSize: '10pt' }}>SO - Sometimes Observed</Text>

          <Text style={{ fontFamily: 'Helvetica', fontSize: '10pt' }}>RO - Rarely Observed</Text>

          <Text style={{ fontFamily: 'Helvetica', fontSize: '10pt' }}>NO - Not Observed</Text>
        </View>
      </View>
    </View>
  );
};
export default StudentValues;
