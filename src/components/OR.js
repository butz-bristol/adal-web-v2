import {
  Document,
  Font,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import { formatNumber, numberToWords } from 'src/utils/helperFunctions';

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.ttf',
      fontWeight: 400,
    },
    {
      src: 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4.woff',
      fontWeight: 700,
    },
  ],
});

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontFamily: 'Roboto',
  },
  nameSection: {
    marginTop: '1.4cm',
    fontSize: 10,
    marginLeft: '3.1cm',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: '6cm',
  },
  boldText: {
    fontWeight: 'heavy',
  },
  particulars: {
    marginLeft: '1.5cm',
    marginTop: '1cm',
    marginRight: '6cm',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  mb: {
    marginBottom: '0.2cm',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

const OR = ({
  amount,
  student,
  clerk,
  desc,
  year_level,
  payments,
  total_payment_amount,
  change,
}) => {
  return (
    <Document>
      <Page size={'A4'}>
        <View style={styles.nameSection}>
          <View>
            <Text style={[styles.boldText, { marginBottom: '0.4cm' }]}>
              {student}
            </Text>
            <Text style={styles.boldText}>{year_level}</Text>
          </View>

          <View>
            <Text style={{ marginBottom: '0.4cm', textAlign: 'right' }}>
              {DateTime.now().toLocaleString(DateTime.DATE_SHORT)}
            </Text>
            <Text style={{ textAlign: 'right' }}>
              {DateTime.now().toLocaleString(DateTime.TIME_WITH_SECONDS)}
            </Text>
          </View>
        </View>

        <View style={styles.particulars}>
          <View style={{ minHeight: '3.5cm', width: '100%' }}>
            {desc?.map(({ item, note }, index) => (
              <View key={index} style={[styles.flex]}>
                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: 'light',
                    marginBottom: '2px',
                  }}
                >
                  {item}
                </Text>

                <Text
                  style={{
                    fontSize: 9,
                    fontWeight: 'light',
                    marginBottom: '2px',
                  }}
                >
                  {note}
                </Text>
              </View>
            ))}
          </View>

          <View style={{ fontSize: 10, height: '2.2cm', width: '70px' }}>
            {payments?.map((payment, index) => (
              <Text key={index} style={{ textAlign: 'right' }}>
                {formatNumber(payment)}
              </Text>
            ))}
          </View>
        </View>

        <View
          style={[styles.flex, { marginLeft: '2.7cm', marginRight: '6cm' }]}
        >
          <View>
            <Text style={[styles.boldText, { fontSize: 9 }]}>
              RECEIVED PAYMENT {formatNumber(total_payment_amount || 0)}
            </Text>
          </View>

          <View>
            <Text style={[styles.boldText, { fontSize: 9 }]}>
              CHANGE {formatNumber(change || 0)}
            </Text>
          </View>

          <View>
            <Text style={[styles.boldText, { fontSize: 10, fontWeight: 900 }]}>
              {formatNumber(amount)}
            </Text>
          </View>
        </View>

        <View style={{ marginLeft: '3cm', marginTop: '0.5cm' }}>
          <Text style={{ fontSize: 9.5, fontWeight: 'light' }}>
            {numberToWords(amount)}
          </Text>
        </View>

        <View
          style={{
            marginTop: '0.5cm',
            marginLeft: '10.5cm',
            marginRight: '5.7cm',
          }}
        >
          <Text style={{ fontSize: 9, textAlign: 'right' }}>by: {clerk}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OR;
