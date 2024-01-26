import { Document, Page, Text, View } from '@react-pdf/renderer';
import { formatDate, formatNumber } from 'src/utils/helperFunctions';
import styles from '../pdfStyles';

const YearlyCashReceipts = ({ academic_year, data, accumulatedData }) => {
  return (
    <Document author="Bridge360" title="Yearly Cash Receipts">
      <Page size="A4" style={[styles.page, { fontSize: 9 }]}>
        {/* Header */}

        <View
          style={[styles.flexCenter, { marginBottom: '30px', gap: '5px' }]}
          fixed
        >
          <Text>BATANGAS EASTERN COLLEGES</Text>
          <Text>San Juan, Batangas</Text>
          <Text>S.Y. {academic_year} Cash Receipts</Text>
        </View>

        {/* End of Header */}

        {/* Payment List */}

        {accumulatedData?.map((data, index) => (
          <View
            key={index}
            style={[styles.flex, { justifyContent: 'space-between' }]}
          >
            <Text>{data.description}</Text>

            <Text style={{ textAlign: 'right' }}>
              {formatNumber(data.accumulated_amount)}
            </Text>
          </View>
        ))}
        {/* End of Payment List */}

        {/* Total */}

        <View style={styles.flexColumn}>
          <View style={{ borderTop: '2px solid black', width: '100%' }}></View>
          <View
            style={[
              styles.flex,
              { justifyContent: 'space-between', padding: '3px 0' },
            ]}
          >
            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              TOTAL - S.Y. {academic_year} Cash Receipts
            </Text>

            <Text style={{ fontFamily: 'Helvetica-Bold' }}>
              {formatNumber(
                accumulatedData?.reduce(
                  (acc, curr) => acc + curr.accumulated_amount,
                  0
                )
              )}
            </Text>
          </View>
          <View style={{ borderTop: '2px solid black', width: '100%' }}></View>
          <View
            style={{
              marginTop: '1px',
              borderTop: '2px solid black',
              width: '100%',
            }}
          ></View>
        </View>

        <View fixed style={[styles.flexCenter, { bottom: 0, marginTop: 10 }]}>
          <Text render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
        </View>
      </Page>

      <Page size="A4" style={[styles.page, { fontSize: 9 }]}>
        <View style={styles.table}>
          <View
            style={[
              styles.tableRow,
              {
                width: '100%',
                padding: '4px 0',
                display: 'flex',
                justifyContent: 'center',
              },
            ]}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 12,
                fontFamily: 'Helvetica-Bold',
              }}
            >
              Summary of Cash Receipts for S.Y. {academic_year}
            </Text>
          </View>

          <View
            style={[
              styles.tableHeader,
              { borderBottom: 0, borderTop: '2px solid black' },
            ]}
          >
            <View
              style={[
                styles.tableHeaderCell,
                styles.flexCenter,
                {
                  borderLeft: 0,
                  width: '10%',
                  backgroundColor: '#fff',
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 10,
                  textAlign: 'center',
                }}
              >
                OR{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 10,
                  textAlign: 'center',
                }}
              >
                NUMBER
              </Text>
            </View>

            <View
              style={[
                styles.tableHeaderCell,
                styles.flexCenter,
                {
                  width: '10%',
                  padding: '10px 0',
                  backgroundColor: '#fff',
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 10,
                  textAlign: 'center',
                }}
              >
                DATE
              </Text>
            </View>

            <View
              style={[
                styles.tableHeaderCell,
                styles.flexCenter,
                {
                  width: '40%',
                  padding: '10px 0',
                  backgroundColor: '#fff',
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 10,
                  textAlign: 'center',
                }}
              >
                NAME
              </Text>
            </View>

            <View
              style={[
                styles.tableHeaderCell,
                styles.flexCenter,
                {
                  width: '22%',
                  padding: '10px 0',
                  backgroundColor: '#fff',
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 10,
                  textAlign: 'center',
                }}
              >
                YEAR/LEVEL
              </Text>
            </View>

            <View
              style={[
                styles.tableHeaderCell,
                styles.flexCenter,
                {
                  width: '18%',
                  padding: '10px 0',
                  backgroundColor: '#fff',
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  fontSize: 10,
                  textAlign: 'center',
                }}
              >
                CASH/OR AMOUNT
              </Text>
            </View>
          </View>

          {data?.map((item, index) => (
            <View
              style={[styles.tableRow, { borderTop: '2px solid black' }]}
              key={index}
            >
              <View
                style={[
                  styles.tableCell,
                  styles.flexCenter,
                  {
                    borderLeft: 0,
                    width: '10%',
                    padding: '3px 0',
                  },
                ]}
              >
                <Text style={{ textAlign: 'center' }}>{item.receipt_no}</Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  styles.flexCenter,
                  {
                    width: '10%',
                    padding: '3px 0',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                <Text style={{ textAlign: 'center' }}>
                  {formatDate(item.value_date)}
                </Text>
              </View>

              {/* Name */}

              <View
                style={[
                  styles.tableCell,
                  {
                    width: '40%',
                    padding: '3px 0',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                <Text style={{ padding: '0 3px', textTransform: 'uppercase' }}>
                  {item.student?.student_last_name}{' '}
                  {item?.student?.student_first_name}
                </Text>
              </View>

              {/* Year/Level/Strand/Programs */}

              <View
                style={[
                  styles.tableCell,
                  {
                    width: '22%',
                    padding: '3px 0',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                {(item?.student?.student_department?.department_name ===
                  'College' ||
                  item?.student?.student_department?.department_name ===
                    'Technical Education and Skills Development Authority (TESDA)') && (
                  <Text
                    style={{ padding: '0 3px', textTransform: 'uppercase' }}
                  >
                    {item?.student?.student_program?.program_name}
                  </Text>
                )}

                {item?.student?.student_department?.department_name ===
                  'Senior High School' && (
                  <Text
                    style={{ padding: '0 3px', textTransform: 'uppercase' }}
                  >
                    {item?.student?.student_yearlevel?.year_level_name}{' '}
                    {item?.student?.student_program?.program_name}
                  </Text>
                )}

                {(item?.student?.student_department?.department_name ===
                  'Junior High School' ||
                  item?.student?.student_department?.department_name ===
                    'Pre-School & Grade School') && (
                  <Text
                    style={{ padding: '0 3px', textTransform: 'uppercase' }}
                  >
                    {item?.student?.student_yearlevel?.year_level_name}
                  </Text>
                )}
              </View>

              {/* Payment Amount */}

              <View
                style={[
                  styles.tableCell,
                  {
                    width: '18%',
                    padding: '3px 0',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                <Text style={{ textAlign: 'right' }}>
                  {formatNumber(item?.payment_amount)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View fixed style={[styles.flexCenter, { bottom: 0, marginTop: 10 }]}>
          <Text render={({ pageNumber }) => `Page ${pageNumber}`} fixed />
        </View>
      </Page>
    </Document>
  );
};

export default YearlyCashReceipts;
