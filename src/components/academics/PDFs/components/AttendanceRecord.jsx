import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { styles } from './LearningAreasSection';

const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

const AttendanceRecord = ({ data }) => {
  return (
    <View style={{ marginTop: '20px' }}>
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
          <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: '10pt', textAlign: 'center' }}>ATTENDANCE RECORD</Text>
        </View>

        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '40%', borderRight: '1px solid black' }]}>
            <Text style={[{ textAlign: 'center' }]}></Text>
          </View>

          {months.map((month, index) => (
            <View key={index} style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
              <Text style={[{ textAlign: 'center' }]}>{month}</Text>
            </View>
          ))}

          <View style={[styles.tableCell, { width: '9%' }]}>
            <Text style={[{ textAlign: 'center' }]}>Total</Text>
          </View>
        </View>

        {/* No. of Days Row */}
        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '40%', borderRight: '1px solid black' }]}>
            <Text>No. of Days</Text>
          </View>

          {months.map((month, index) => (
            <View key={index} style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
              <Text style={[{ textAlign: 'center' }]}>{data[index]?.school_days}</Text>
            </View>
          ))}

          <View style={[styles.tableCell, { width: '9%' }]}>
            <Text style={[{ textAlign: 'center' }]}>{data?.reduce((acc, cur) => acc + cur?.school_days, 0)}</Text>
          </View>
        </View>

        {/* No. of Days Present Row */}
        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '40%', borderRight: '1px solid black' }]}>
            <Text>No. of Days Present</Text>
          </View>

          {months.map((month, index) => (
            <View key={index} style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
              <Text style={[{ textAlign: 'center' }]}>{data[index]?.present}</Text>
            </View>
          ))}

          <View style={[styles.tableCell, { width: '9%' }]}>
            <Text style={[{ textAlign: 'center' }]}>{data?.reduce((acc, cur) => acc + cur?.present, 0)}</Text>
          </View>
        </View>

        {/* No. of Days Absent Row */}
        <View style={[styles.tableRow, { borderBottom: '1px solid black' }]}>
          <View style={[styles.tableCell, { width: '40%', borderRight: '1px solid black' }]}>
            <Text>No. of Absent</Text>
          </View>

          {months.map((month, index) => (
            <View key={index} style={[styles.tableCell, { width: '5%', borderRight: '1px solid black' }]}>
              <Text style={[{ textAlign: 'center' }]}>{data[index]?.absent}</Text>
            </View>
          ))}

          <View style={[styles.tableCell, { width: '9%' }]}>
            <Text style={[{ textAlign: 'center' }]}>{data.reduce((acc, cur) => acc + cur?.absent, 0)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AttendanceRecord;
