import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import { DateTime } from 'luxon';
import { formatDate, formatNumber } from 'src/utils/helperFunctions';
import logo from '../../assets/images/logo.png';
import styles from '../pdfStyles';

const DailyCashReceiptsPDF = ({
  date,
  data = [],
  accumulatedPayments = [],
  filteredPayments,
  account_nos,
  clerk,
}) => {
  return (
    <Document author="Bridge360" title="Daily Cash Reports">
      <Page
        size="A4"
        style={[styles.page, { fontSize: 9, paddingBottom: 15 }]}
        author="Bridge360"
        title={'DCR'}
        wrap
      >
        {/* Header */}
        <View
          style={[
            styles.flex,
            { justifyContent: 'space-between', marginBottom: '30px' },
          ]}
          fixed
        >
          <View style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <Text>BEC-FO-CAS-01</Text>
            <View
              style={[
                styles.flex,
                { justifyContent: 'space-between', padding: 0, gap: '50px' },
              ]}
            >
              <Text>Rev. No. 01</Text>
              <Text>
                Rev. Date: {DateTime.now().toLocaleString(DateTime.DATE_FULL)}
              </Text>
            </View>
            <Text
              render={({ pageNumber, totalPages }) =>
                `Page ${pageNumber} of ${totalPages}`
              }
              fixed
            />
          </View>
          <Image src={logo} style={[{ width: 85, height: 65 }]} />
        </View>

        {/* Document Title */}

        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 12 }}>
          DAILY COLLECTION REPORT
        </Text>

        {/* Selected Date */}

        <View
          style={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            marginTop: '20px',
            marginBottom: '12px',
          }}
        >
          <View style={{ width: '250px', borderBottom: '1px solid black' }}>
            <Text style={{ textAlign: 'center', fontSize: 10 }}>
              {date
                ? DateTime.fromISO(date).toLocaleString(DateTime.DATE_HUGE)
                : DateTime.now().toLocaleString(DateTime.DATE_FULL)}
            </Text>
          </View>
          <View
            style={{
              width: '250px',
              borderBottom: '1px solid black',
              marginTop: '1px',
            }}
          ></View>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <View
              style={[
                styles.tableHeaderCell,
                {
                  borderLeft: 0,
                  backgroundColor: 'white',
                  paddingTop: '20px',
                  paddingBottom: 0,
                  width: '13%',
                },
              ]}
            >
              <Text
                style={[styles.smallBoldText, { textAlign: 'center' }]}
              ></Text>
            </View>

            <View
              style={[
                styles.tableHeaderCell,
                {
                  backgroundColor: 'white',
                  paddingTop: '20px',
                  paddingBottom: 0,
                  width: '10%',
                },
              ]}
            >
              <Text style={[styles.smallBoldText, { textAlign: 'center' }]}>
                Pad No.
              </Text>
            </View>

            <View
              style={[
                styles.tableHeaderCell,
                {
                  backgroundColor: 'white',
                  paddingTop: '20px',
                  paddingBottom: 0,
                  width: '35%',
                },
              ]}
            >
              <Text style={[styles.smallBoldText, { textAlign: 'center' }]}>
                Series
              </Text>
            </View>

            <View
              style={[
                styles.tableHeaderCell,
                {
                  backgroundColor: 'white',
                  paddingTop: '20px',
                  paddingBottom: 0,
                  width: '21%',
                },
              ]}
            ></View>

            <View
              style={[
                styles.tableHeaderCell,
                {
                  backgroundColor: 'white',
                  paddingTop: '20px',
                  paddingBottom: 0,
                  width: '21%',
                },
              ]}
            ></View>
          </View>

          {data?.map((item, index) => (
            <View style={styles.tableRow} key={index}>
              <View
                style={[styles.tableCell, { padding: '3px 0', width: '13%' }]}
              >
                <Text style={{ textAlign: 'center' }}>{item?.date}</Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '10%',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                <Text style={{ textAlign: 'center' }}>{item?.pad_no}</Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '35%',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                <Text style={{ textAlign: 'center' }}>
                  {item?.receipt_no_range}
                </Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '21%',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                <Text style={{ textAlign: 'center' }}>
                  {formatNumber(item?.accumulated_amount)}
                </Text>
              </View>

              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '21%',
                    borderLeft: '2px solid black',
                  },
                ]}
              >
                <Text></Text>
              </View>
            </View>
          ))}

          {/*  Show Total */}

          <View style={[styles.tableRow, { borderTop: '2px solid black' }]}>
            <View
              style={[styles.tableCell, { padding: '3px 0', width: '13%' }]}
            ></View>

            <View
              style={[
                styles.tableCell,
                {
                  padding: '3px 0',
                  width: '10%',
                  borderLeft: '2px solid black',
                },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                {
                  padding: '3px 0',
                  width: '35%',
                  borderLeft: '2px solid black',
                },
              ]}
            ></View>

            <View
              style={[
                styles.tableCell,
                {
                  padding: '3px 0',
                  width: '21%',
                  borderLeft: '2px solid black',
                },
              ]}
            >
              <Text style={{ textAlign: 'center' }}>
                Php
                {formatNumber(
                  data?.reduce((acc, item) => {
                    return acc + Number(item?.accumulated_amount);
                  }, 0)
                )}
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  padding: '3px 0',
                  width: '21%',
                  borderLeft: '2px solid black',
                },
              ]}
            >
              <Text style={{ textAlign: 'center' }}></Text>
            </View>
          </View>
        </View>

        {/* Breakdown Section */}

        <View style={{ marginTop: 12, marginBottom: 10 }}>
          <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: 10 }}>
            Breakdown of Collections:
          </Text>
        </View>

        <View style={[styles.flex, { padding: 0, alignItems: 'flex-start' }]}>
          <View style={{ width: '58%' }}>
            <Text style={{ paddingBottom: '3px' }}>Cash Collection</Text>
            <Text style={{ padding: '3px 0' }}>Online Collection</Text>
            <Text style={{ padding: '3px 0' }}>Salary Deduction</Text>
            <Text></Text>
            <Text style={{ fontFamily: 'Helvetica-Bold', marginTop: 24 }}>
              Total
            </Text>
          </View>

          <View style={[styles.table, { width: '42%' }]}>
            <View style={styles.tableRow}>
              <View
                style={[styles.tableCell, { padding: '3px 0', width: '50%' }]}
              >
                <Text style={{ textAlign: 'right', marginRight: 4 }}>
                  {formatNumber(
                    filteredPayments
                      ?.filter((item) => item.payment_mode === 'Cash')
                      .reduce((acc, item) => {
                        return acc + item?.payment_amount;
                      }, 0)
                  )}
                </Text>
              </View>
              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '50%',
                    borderLeft: '2px solid black',
                  },
                ]}
              ></View>
            </View>

            <View style={styles.tableRow}>
              <View
                style={[styles.tableCell, { padding: '3px 0', width: '50%' }]}
              >
                <Text style={{ textAlign: 'right', marginRight: 4 }}>
                  {formatNumber(
                    filteredPayments
                      ?.filter(
                        (item) =>
                          item.payment_mode === 'Bank Deposit' ||
                          item.payment_mode === 'Online Bank Transfer'
                      )
                      .reduce((acc, item) => {
                        return acc + item?.payment_amount;
                      }, 0)
                  )}
                </Text>
              </View>
              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '50%',
                    borderLeft: '2px solid black',
                  },
                ]}
              ></View>
            </View>

            <View style={styles.tableRow}>
              <View
                style={[styles.tableCell, { padding: '3px 0', width: '50%' }]}
              >
                <Text style={{ textAlign: 'right', marginRight: 12 }}>
                  {' - '}
                </Text>
              </View>
              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '50%',
                    borderLeft: '2px solid black',
                  },
                ]}
              ></View>
            </View>

            <View style={styles.tableRow}>
              <View
                style={[styles.tableCell, { padding: '3px 0', width: '50%' }]}
              >
                <Text style={{ textAlign: 'right', marginRight: 12 }}>
                  {' - '}
                </Text>
              </View>
              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '50%',
                    borderLeft: '2px solid black',
                  },
                ]}
              ></View>
            </View>

            <View style={[styles.tableRow, { borderTop: '2px solid black' }]}>
              <View
                style={[styles.tableCell, { padding: '3px 0', width: '50%' }]}
              >
                <Text
                  style={{
                    textAlign: 'right',
                    marginRight: 4,
                    fontFamily: 'Helvetica-Bold',
                  }}
                >
                  {formatNumber(
                    data?.reduce((acc, item) => {
                      return acc + Number(item?.accumulated_amount);
                    }, 0)
                  )}
                </Text>
              </View>
              <View
                style={[
                  styles.tableCell,
                  {
                    padding: '3px 0',
                    width: '50%',
                    borderLeft: '2px solid black',
                  },
                ]}
              ></View>
            </View>
          </View>
        </View>

        {/* End of Breakdown Section */}

        {/* Accumulated Payment List */}

        <View
          style={[
            styles.flex,
            { padding: 0, alignItems: 'flex-start', marginTop: '20px' },
          ]}
        >
          <View style={[styles.flexColumn, { width: '58%', gap: 3 }]}>
            {accumulatedPayments?.map((item, index) => (
              <Text key={index}>{item?.description}</Text>
            ))}
          </View>

          <View style={{ width: '42%' }}>
            <View style={[styles.flexColumn, { width: '50%', gap: 3 }]}>
              {accumulatedPayments?.map((item, index) => (
                <Text
                  key={index + 1}
                  style={{ textAlign: 'right', paddingRight: '3px' }}
                >
                  {formatNumber(item?.accumulated_amount)}
                </Text>
              ))}
            </View>
            <View style={{ width: '50%' }}></View>
          </View>
        </View>

        {/* End of Accumulated Payment List */}

        {/* Accumulated Total Calculation */}

        <View style={[styles.table, { marginTop: '8px' }]}>
          <View style={[styles.tableRow]}>
            <View
              style={[styles.tableCell, { width: '58%', padding: '3px 0' }]}
            >
              <Text style={{ fontFamily: 'Helvetica-Bold' }}> Total</Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  width: '21%',
                  borderLeft: '2px solid black',
                  padding: '3px 0',
                },
              ]}
            >
              <Text
                style={{
                  textAlign: 'right',
                  fontFamily: 'Helvetica-Bold',
                  paddingRight: '3px',
                }}
              >
                {formatNumber(
                  data?.reduce((acc, item) => {
                    return acc + Number(item?.accumulated_amount);
                  }, 0)
                )}
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  width: '21%',
                  borderLeft: '2px solid black',
                  padding: '3px 0',
                },
              ]}
            ></View>
          </View>
        </View>

        {/* End Accumulated Total Calculation */}

        {/* Bank Nos. Table */}

        <View style={[styles.table, { marginTop: '35px' }]}>
          <View style={[styles.tableRow]}>
            <View
              style={[styles.tableCell, { padding: '3px 0', width: '13%' }]}
            >
              <Text style={{ fontFamily: 'Helvetica-Bold' }}>
                Validation Date
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  padding: '3px 0',
                  borderLeft: '2px solid black',
                  width: '45%',
                },
              ]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                Bank Account Nos.
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  padding: '3px 0',
                  borderLeft: '2px solid black',
                  width: '21%',
                },
              ]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                Amount
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  padding: '3px 0',
                  borderLeft: '2px solid black',
                  width: '21%',
                },
              ]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                Remarks
              </Text>
            </View>
          </View>

          {/* Second Row */}

          {account_nos
            ?.filter((item) => item?.account_no)
            .map((item, index) => (
              <View
                key={index}
                style={[styles.tableRow, { borderTop: '2px solid black' }]}
              >
                <View
                  style={[styles.tableCell, { width: '13%', padding: '3px 0' }]}
                >
                  <Text>
                    {item?.date
                      ? DateTime.fromISO(item.date).toLocaleString({
                          month: 'long',
                          year: 'numeric',
                        })
                      : ''}
                  </Text>
                </View>

                <View
                  style={[
                    styles.tableCell,
                    {
                      width: '45%',
                      padding: '3px 0',
                      borderLeft: '2px solid black',
                    },
                  ]}
                >
                  <Text style={{ textAlign: 'center' }}>{item.account_no}</Text>
                </View>

                <View
                  style={[
                    styles.tableCell,
                    {
                      width: '21%',
                      padding: '3px 0',
                      borderLeft: '2px solid black',
                    },
                  ]}
                >
                  <Text style={{ textAlign: 'center' }}>
                    {item.amount && formatNumber(item.amount)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.tableCell,
                    {
                      width: '21%',
                      padding: '3px 0',
                      borderLeft: '2px solid black',
                    },
                  ]}
                >
                  <Text>{item.remarks}</Text>
                </View>
              </View>
            ))}

          {/* Total Row */}

          <View style={[styles.tableRow, { borderTop: '2px solid black' }]}>
            <View
              style={[styles.tableCell, { width: '13%', padding: '3px 0' }]}
            >
              <Text></Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  width: '45%',
                  padding: '3px 0',
                  borderLeft: '2px solid black',
                },
              ]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                TOTAL DEPOSITS
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  width: '21%',
                  padding: '3px 0',
                  borderLeft: '2px solid black',
                },
              ]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                {formatNumber(
                  account_nos?.reduce((acc, item) => {
                    return acc + Number(item?.amount);
                  }, 0)
                )}
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  width: '21%',
                  padding: '3px 0',
                  borderLeft: '2px solid black',
                },
              ]}
            >
              <Text></Text>
            </View>
          </View>
        </View>

        {/* End of Bank Nos. Table */}

        {/* Signatories Table */}

        <View wrap={false} style={[styles.table, { marginTop: '35px' }]}>
          <View style={styles.tableRow}>
            <View
              style={[styles.tableCell, { width: '30%', padding: '3px 0' }]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                Prepared By:
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '3px 0',
                },
              ]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                Checked and Verified By:
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '3px 0',
                },
              ]}
            >
              <Text
                style={{ fontFamily: 'Helvetica-Bold', textAlign: 'center' }}
              >
                Noted By:
              </Text>
            </View>
          </View>

          {/* Second Row */}

          <View style={[styles.tableRow, { borderTop: '2px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '30%', padding: '25px 0 2px 0' },
              ]}
            >
              <Text style={{ textAlign: 'center' }}>{clerk}</Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '25px 0 2px 0',
                },
              ]}
            >
              <Text style={{ textAlign: 'center' }}>
                Luis Arabello C. Malik
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '25px 0 2px 0',
                },
              ]}
            >
              <Text style={{ textAlign: 'center' }}>Bridge360</Text>
            </View>
          </View>

          {/* Third Row */}

          <View style={[styles.tableRow, { borderTop: '2px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '30%', padding: '3px 0 0 3px' },
              ]}
            >
              <Text>Cashier</Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '3px 0 0 3px',
                },
              ]}
            >
              <Text>Head Cashier</Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '3px 0 0 3px',
                },
              ]}
            >
              <Text>Chief Finance Officer</Text>
            </View>
          </View>

          {/* Fourth Row */}

          <View style={[styles.tableRow, { borderTop: '2px solid black' }]}>
            <View
              style={[
                styles.tableCell,
                { width: '30%', padding: '3px 0 0 3px' },
              ]}
            >
              <Text>Date Signed: __________________</Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '3px 0 0 3px',
                },
              ]}
            >
              <Text>Date Signed: __________________</Text>
            </View>

            <View
              style={[
                styles.tableCell,
                {
                  borderLeft: '2px solid black',
                  width: '35%',
                  padding: '3px 0 0 3px',
                },
              ]}
            >
              <Text>Date Signed: __________________</Text>
            </View>
          </View>
        </View>

        {/* End of Signatories Table */}
      </Page>

      <Page
        size="A4"
        style={[styles.page, { fontSize: 9 }]}
        author="Bridge360"
        title={'DCR'}
      >
        {/* Header */}

        <View style={styles.table} fixed>
          <View style={[styles.tableRow]}>
            <View
              style={[
                styles.tableCell,
                {
                  width: '30%',
                  padding: '10px 0',
                  borderRight: '2px solid black',
                },
              ]}
            >
              <Text></Text>
            </View>

            <View
              style={[
                styles.tableCell,
                styles.flexCenter,
                {
                  width: '45%',
                  padding: '10px 0',
                  borderRight: '2px solid black',
                },
              ]}
            >
              <Text
                style={{
                  fontFamily: 'Helvetica-Bold',
                  textAlign: 'center',
                  fontSize: 11,
                }}
              >
                DAILY COLLECTION REPORT
              </Text>
            </View>

            <View
              style={[
                styles.tableCell,
                styles.flexCenter,
                {
                  width: '25%',
                  padding: '10px 0',
                  borderRight: '2px solid black',
                },
              ]}
            >
              <Image src={logo} style={{ width: '70px', height: '70px' }} />
            </View>
          </View>
        </View>

        {/* End of Header */}

        {/* Payments Table */}

        <View style={[styles.table, { marginTop: '20px' }]}>
          <View style={[styles.tableHeader, { borderBottom: 0 }]}>
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
                AMOUNT PAID
              </Text>
            </View>
          </View>

          {filteredPayments?.map((item, index) => (
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

        {/* End of Payments Table */}
      </Page>
    </Document>
  );
};

export default DailyCashReceiptsPDF;
