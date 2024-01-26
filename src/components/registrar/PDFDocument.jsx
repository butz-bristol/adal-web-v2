import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import logo from 'src/assets/images/logo.png';
import styles from 'src/components/pdfStyles';
import { formatNumber, formatUnit } from 'src/utils/helperFunctions';

const Footer = () => (
  <View style={styles.footer}>
    <Text
      style={[
        styles.smallBoldText,
        styles.footerContent,
        { textAlign: 'left' },
      ]}
    >
      This REGISTRATION FORM is valid as proof that you have undergone academic
      advising and that you are officially enrolled and fully understood the
      fees as stated above.
    </Text>
  </View>
);

const EnrollmentPDFFile = ({
  student_first_name,
  student_middle_name,
  student_last_name,
  student_number,
  student_year_level,
  studentFees,
  student_section,
  payment_scheme,
  track,
  subjects,
  totalFees,
  studentLedger,
}) => {
  return (
    <Document>
      <Page size={'A3'} style={styles.page}>
        {/* Header */}
        <View style={{ height: '10%' }}>
          <View style={styles.header} fixed>
            <View style={styles.headerTextContainer} fixed>
              <Text style={styles['p-3']}>BEC-FO-REG-22</Text>
              <Text style={styles['p-3']}>Rev. No. 01</Text>
              <Text style={styles['p-3']}>Rev Date: June 07, 2021</Text>
              <Text
                style={styles['p-3']}
                render={({ pageNumber, totalPages }) =>
                  `Page: ${pageNumber} of ${totalPages}`
                }
              />
              <Text style={styles.boldText}>REGISTRATION FORM</Text>
            </View>

            <Image src={logo} style={styles.logo} />
          </View>
        </View>

        {/* Body */}
        <View style={{ height: '80%' }}>
          <View style={[styles.content, { paddingTop: 0 }]}>
            <View style={styles.flexColumn}>
              <View style={[styles.flex, { columnGap: 30 }]}>
                <Text style={styles.smallBoldText}>Last Name: </Text>
                <Text>{student_last_name?.toUpperCase() ?? 'PASCAL'}</Text>
              </View>
              <View style={[styles.flex, { columnGap: 30 }]}>
                <Text style={styles.smallBoldText}>First Name: </Text>
                <Text>{student_first_name?.toUpperCase() ?? 'GENERIC'}</Text>
              </View>
              <View style={[styles.flex, { columnGap: 30 }]}>
                <Text style={styles.smallBoldText}>Middle Name: </Text>
                <Text style={styles.minusLeftMargin}>
                  {student_middle_name?.toUpperCase() ?? ''}
                </Text>
              </View>
            </View>

            <View style={styles.flexColumn}>
              <View style={styles.flex}>
                <Text style={[styles.smallBoldText, { textAlign: 'right' }]}>
                  Date:{' '}
                </Text>
                <Text style={styles['ml-35']}>
                  {new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </View>

              <View style={styles.flex}>
                <Text style={[styles.smallBoldText, { textAlign: 'right' }]}>
                  Year Level:{' '}
                </Text>
                <Text style={styles['ml-10']}>
                  {`${student_year_level} ${student_section}` ?? 'Grade 5'}
                </Text>
              </View>

              <View style={styles.flex}>
                <Text style={[styles.smallBoldText, { textAlign: 'right' }]}>
                  Student No:{' '}
                </Text>
                <Text style={styles['ml-8']}>
                  {student_number ?? '2023021-92121'}
                </Text>
              </View>
            </View>
          </View>

          {track === 'Senior High School' && (
            <View style={styles['p-10']}>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <View
                    style={[
                      styles.tableHeaderCell,
                      { borderLeft: 0, width: '45%' },
                    ]}
                  >
                    <Text
                      style={[styles.smallBoldText, { textAlign: 'center' }]}
                    >
                      Description
                    </Text>
                  </View>
                  <View style={[styles.tableHeaderCell, { width: '25%' }]}>
                    <Text
                      style={[styles.smallBoldText, { textAlign: 'center' }]}
                    >
                      Units
                    </Text>
                  </View>
                  <View style={[styles.tableHeaderCell, { width: '30%' }]}>
                    <Text
                      style={[styles.smallBoldText, { textAlign: 'right' }]}
                    >
                      Fee
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.tableRow,
                    { marginBottom: '5px', marginTop: '5px' },
                  ]}
                >
                  <View style={[styles.tableCell, { width: '45%' }]}></View>
                  <View style={[styles.tableCell, { width: '25%' }]}>
                    <View
                      style={[
                        styles.flex,
                        { justifyContent: 'space-between', padding: 0 },
                      ]}
                    >
                      <Text style={styles.smallBoldText}>Total</Text>
                      <Text style={styles.smallBoldText}>Lec</Text>
                      <Text style={styles.smallBoldText}>Lab</Text>
                    </View>
                  </View>
                  <View style={[styles.tableCell, { width: '30%' }]}></View>
                </View>

                {subjects?.map((subject, index) => (
                  <View
                    style={[styles.tableRow, { paddingBottom: '3px' }]}
                    key={index}
                  >
                    <View style={[styles.tableCell, { width: '45%' }]}>
                      <Text style={{ fontSize: 9.5 }}>
                        {subject.subject_name}
                      </Text>
                    </View>
                    <View style={[styles.tableCell, , { width: '25%' }]}>
                      <Text style={{ fontSize: 9.5 }}>
                        {formatUnit(subject.units)}
                      </Text>
                    </View>
                    <View style={[styles.tableCell, { width: '30%' }]}>
                      <Text style={{ fontSize: 9.5, textAlign: 'right' }}>
                        {formatNumber(subject.fee)}
                      </Text>
                    </View>
                  </View>
                ))}

                <View style={styles.tableRow}>
                  <View style={[styles.tableCell, { width: '45%' }]}>
                    <Text
                      style={[styles.smallBoldText, { textAlign: 'right' }]}
                    >
                      Total:
                    </Text>
                  </View>
                  <View style={[styles.tableCell, { width: '25%' }]}>
                    <Text style={styles.smallBoldText}>
                      {formatUnit(
                        subjects.reduce(
                          (acc, subject) => acc + subject.units,
                          0
                        )
                      )}
                    </Text>
                  </View>
                  <View style={[styles.tableCell, { width: '30%' }]}>
                    <Text
                      style={[styles.smallBoldText, { textAlign: 'right' }]}
                    >
                      {formatNumber(
                        subjects.reduce((acc, subject) => acc + subject.fee, 0)
                      )}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          {/* Student Fee Cards */}

          <View style={[styles.cards, styles['p-10'], { marginTop: 10 }]}>
            <View style={[styles.card, { width: '35%' }]}>
              <Text style={styles.cardTitle}>Payment Summary</Text>

              <View style={styles['p-3']}>
                <View style={styles.cardContent}>
                  <Text>Tuition Fee: </Text>
                  <Text style={styles.minusLeftMargin}>
                    {track === 'Senior High School' &&
                      'Php' +
                        formatNumber(
                          subjects.reduce(
                            (acc, subject) => acc + subject.fee,
                            0
                          )
                        )}

                    {(!track || track !== 'Senior High School') &&
                      'Php' +
                        formatNumber(
                          studentFees?.find(
                            (fee) => fee?.fee_type?.fee_type === 'Tuition Fee'
                          )?.fee || 0
                        )}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>Matriculations Fee: </Text>
                  <Text style={styles.minusLeftMargin}>
                    {'Php' +
                      formatNumber(
                        studentFees
                          ?.filter(
                            (fee) =>
                              fee?.fee_type?.fee_type === 'Matriculation Fee'
                          )
                          ?.reduce((acc, curr) => acc + curr?.fee, 0) || 0
                      )}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>Miscellaneous Fee: </Text>
                  <Text style={styles.minusLeftMargin}>
                    {'Php' +
                      formatNumber(
                        studentFees
                          ?.filter(
                            (fee) => fee?.fee_type?.fee_type === 'Miscellaneous'
                          )
                          ?.reduce((acc, curr) => acc + curr?.fee, 0) || 0
                      )}
                  </Text>
                </View>

                {studentFees
                  ?.filter((fee) => fee?.fee_type?.fee_type === 'Other Fees')
                  .map((fee) => (
                    <View style={styles.cardContent} key={fee?._id}>
                      <Text>{fee?.fee_label}: </Text>
                      <Text style={styles.minusLeftMargin}>
                        {'Php' + formatNumber(fee?.fee)}
                      </Text>
                    </View>
                  ))}

                {studentFees
                  ?.filter(
                    (fee) =>
                      fee?.fee_type?.fee_type !== 'Other Fees' &&
                      fee?.fee_type?.fee_type !== 'Miscellaneous' &&
                      fee?.fee_type?.fee_type !== 'Matriculation Fee' &&
                      fee?.fee_type?.fee_type !== 'Tuition Fee' &&
                      fee?.fee_type?.fee_type !== 'Tuition Fee Per Subject'
                  )
                  .map((fee) => (
                    <View style={styles.cardContent} key={fee?._id}>
                      <Text>{fee?.fee_label}: </Text>
                      <Text style={styles.minusLeftMargin}>
                        {'Php' + formatNumber(fee?.fee)}
                      </Text>
                    </View>
                  ))}

                <View style={styles.cardContent}>
                  <Text>Discount/Scholarship/Grants: </Text>
                  <Text style={styles.minusLeftMargin}>
                    {'Php' +
                      formatNumber(
                        studentLedger?.ledger_balance < 0
                          ? Math.abs(
                              studentLedger?.ledger_balance || 0
                            ).toString()
                          : 0
                      )}
                  </Text>
                </View>

                {/* Total */}

                <View style={[styles.cardTotalFooter, { marginTop: 15 }]}>
                  <View style={styles['w-50']}>
                    <Text>Total Amount Due: </Text>
                  </View>

                  <View style={styles['w-50']}>
                    <Text>
                      {track === 'Senior High School' &&
                        'Php' + formatNumber(totalFees)}

                      {(!track || track !== 'Senior High School') &&
                        'Php' +
                          formatNumber(
                            studentFees
                              ?.filter(
                                (fee) =>
                                  fee?.fee_type?.fee_type !== 'Tuition Fee' &&
                                  fee?.fee_type?.fee_type !==
                                    'Tuition Fee Per Subject'
                              )
                              ?.reduce((acc, curr) => {
                                return acc + curr.fee;
                              }, 0) +
                              (studentLedger?.ledger_balance < 0
                                ? studentLedger?.ledger_balance
                                : 0)
                          )}
                    </Text>
                  </View>
                </View>

                <View style={styles.cardTotalFooter}>
                  <View style={styles['w-50']}>
                    <Text>Subsidy: </Text>
                  </View>

                  <View style={styles['w-50']}>
                    <Text>{'Php' + formatNumber(0)}</Text>
                  </View>
                </View>

                <View style={[styles.cardTotalFooter, { marginLeft: 0 }]}>
                  <View style={styles['w-50']}>
                    <Text>Downpayment: </Text>
                  </View>

                  <View style={styles['w-50']}>
                    <Text>
                      {'Php' + formatNumber(payment_scheme[0]?.to_pay ?? 0)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Payment Scheme */}

            <View style={[styles.card, { width: '30%' }]}>
              <Text style={styles.cardTitle}>Payment Scheme</Text>

              <View style={styles['p-3']}>
                <View style={styles.cardContent}>
                  <Text>Downpayment </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[0]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>August </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[1]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>September </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[2]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>October </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[3]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>November </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[4]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>December </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[5]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>January </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[6]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>February </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[7]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>March </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[8]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>April </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[9]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  <Text>May </Text>
                  <Text>
                    {'Php' + formatNumber(payment_scheme[10]?.to_pay ?? 0)}
                  </Text>
                </View>

                <View style={styles.cardContent}>
                  {/* <Text style={styles.smallBoldText}>Payment Method</Text>
                  <Text style={[styles.smallBoldText, { textAlign: 'right' }]}>Monthly</Text> */}
                </View>

                <View style={styles.cardContent}>
                  <Text>Total Monthly Payments</Text>
                  <Text>
                    Php
                    {(!track || track !== 'Senior High School') &&
                      formatNumber(
                        (studentFees?.reduce((acc, curr) => {
                          return acc + curr.fee;
                        }, 0) || 0) +
                          (studentLedger?.ledger_balance < 0
                            ? studentLedger?.ledger_balance
                            : 0)
                      )}
                    {track === 'Senior High School' && formatNumber(totalFees)}
                  </Text>
                </View>
              </View>
            </View>

            <View style={[styles.card, { width: '35%' }]}>
              <Text style={styles.cardTitle}>Fees Breakdown</Text>

              <View style={styles['p-3']}>
                <View style={styles.cardContent}>
                  <Text>Matriculation Fees</Text>
                </View>

                {studentFees
                  ?.filter(
                    (fee) => fee?.fee_type?.fee_type === 'Matriculation Fee'
                  )
                  .map((fee) => (
                    <View style={styles.cardContent} key={fee?._id}>
                      <Text>{fee?.fee_label} </Text>
                      <Text style={styles.minusLeftMargin}>
                        {'Php' + formatNumber(fee?.fee)}
                      </Text>
                    </View>
                  ))}

                <View style={[styles.cardContent, { marginTop: 10 }]}>
                  <Text>Miscellaneous Fees</Text>
                </View>

                {studentFees
                  ?.filter((fee) => fee?.fee_type?.fee_type === 'Miscellaneous')
                  .map((fee) => (
                    <View style={styles.cardContent} key={fee?._id}>
                      <Text>{fee?.fee_label} </Text>
                      <Text style={styles.minusLeftMargin}>
                        {'Php' + formatNumber(fee?.fee)}
                      </Text>
                    </View>
                  ))}
              </View>
            </View>
          </View>
        </View>

        {/* Footer Section */}
        <View
          style={{
            position: 'fixed',
            bottom: 0,
            height: '10%',
            display: 'grid',
            gap: '1rem',
          }}
        >
          <View style={styles.signatureContainer}>
            <View style={styles.signature}>
              <View style={[styles.signatureLine, { width: '22%' }]}></View>
              <View style={[styles.signatureLine, { width: '22%' }]}></View>
              <View style={[styles.signatureLine, { width: '22%' }]}></View>
              <View style={[styles.signatureLine, { width: '22%' }]}></View>
            </View>

            <View style={styles.signature}>
              <Text style={[styles.signatureText, styles.minusLeftMarginSeven]}>
                Student
              </Text>
              <Text style={styles.signatureText}>Registrar</Text>
              <Text style={styles.signatureText}>Cashier</Text>
              <Text style={styles.signatureText}>Accounting</Text>
            </View>
          </View>
          {/* Footer */}

          <Footer />
        </View>
      </Page>
    </Document>
  );
};

export default EnrollmentPDFFile;
