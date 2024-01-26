import { Document, Image, Page, Text, View } from '@react-pdf/renderer';
import styles from 'src/components/pdfStyles';
import {
  formatNumber,
  formatPercent,
  formatUnit,
} from 'src/utils/helperFunctions';
import logo from '../../assets/images/logo.png';

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

const getTwentyFivePercent = (total) => {
  return total * 0.25;
};

const CollegeEnrollmentPDF = ({
  student_first_name,
  student_middle_name,
  student_last_name,
  student_number,
  student_year_level,
  student_program,
  studentFees,
  semester,
  subjects,
  school_year,
  department,
  studentLedger,
}) => {
  return (
    <Document>
      <Page size={'A4'} style={styles.page}>
        {/* Header */}
        <View style={{ height: '15%' }}>
          <View
            style={[styles.header, { borderBottom: 'none', marginBottom: 10 }]}
            fixed
          >
            <View style={styles.headerTextContainer} fixed>
              <Text style={styles.smallBoldText}>BEC-FO-REG-21</Text>
              <Text
                style={[styles.smallBoldText, { marginBottom: '15px' }]}
              >{`Rev.No       01       Rev.Date       June 02, 2021`}</Text>

              <Text
                style={[styles.smallBoldText, { marginBottom: '5px' }]}
                render={({ pageNumber, totalPages }) =>
                  `Page ${pageNumber} of ${totalPages}`
                }
              />
              <Text style={[styles.boldText, { marginTop: 1 }]}>
                REGISTRATION FORM
              </Text>
            </View>

            <Image src={logo} style={styles.logo} />
          </View>
        </View>

        {/* Content */}
        <View style={{ height: '75%' }}>
          <View style={[styles.content, { paddingTop: 0 }]}>
            <View style={styles.flexColumn}>
              <View
                style={{
                  display: 'block',
                  padding: 0,
                  margin: 0,
                }}
              >
                <Text
                  style={[
                    styles.smallBoldText,
                    {
                      margin: 0,
                      padding: 0,
                    },
                  ]}
                >
                  {`Student:
                [${student_number}] ${
                  student_first_name?.toUpperCase() ?? 'JOHN'
                }, ${student_last_name?.toUpperCase() ?? 'DOE'} ${
                  student_middle_name?.toUpperCase() ?? 'N/A'
                }
                ${student_program}
                `}
                </Text>
              </View>
            </View>

            <View style={styles.flexColumn}>
              <View
                style={{
                  display: 'block',
                  padding: 0,
                  margin: 0,
                }}
              >
                <Text
                  style={[styles.smallBoldText, , { margin: 0, padding: 0 }]}
                >
                  {`Date: ${new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                Year Level: ${student_year_level}
                Sem: S.Y. ${school_year} ${semester} Sem
                `}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ paddingLeft: 10, paddingTop: 1, paddingBottom: 1 }}>
            <Text style={styles.smallBoldText}>Subjects</Text>
          </View>

          {/* Subjects Card */}

          <View>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <View
                  style={[
                    styles.tableHeaderCell,
                    { borderLeft: 0, width: '20%' },
                  ]}
                >
                  <Text style={[styles.smallBoldText, { textAlign: 'center' }]}>
                    Code
                  </Text>
                </View>
                <View style={[styles.tableHeaderCell, { width: '45%' }]}>
                  <Text style={[styles.smallBoldText, { textAlign: 'center' }]}>
                    Description
                  </Text>
                </View>
                <View style={[styles.tableHeaderCell, { width: '15%' }]}>
                  <Text style={[styles.smallBoldText, { textAlign: 'center' }]}>
                    {department === 'College' ? 'Units' : 'Hours'}
                  </Text>
                </View>
                <View style={[styles.tableHeaderCell, { width: '20%' }]}>
                  <Text style={[styles.smallBoldText, { textAlign: 'right' }]}>
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
                <View style={[styles.tableCell, { width: '20%' }]}></View>
                <View style={[styles.tableCell, { width: '45%' }]}></View>
                <View style={[styles.tableCell, { width: '15%' }]}>
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
                <View style={[styles.tableCell, { width: '20%' }]}></View>
              </View>

              {subjects?.map((subject, index) => (
                <View
                  style={[
                    styles.tableRow,
                    { marginBottom: '1px', marginTop: '1px' },
                  ]}
                  key={index}
                >
                  <View style={[styles.tableCell, { width: '20%' }]}>
                    <Text style={styles.smallBoldText}>
                      {subject.subject_code}
                    </Text>
                  </View>
                  <View style={[styles.tableCell, { width: '45%' }]}>
                    <Text style={styles.smallBoldText}>
                      {subject.subject_name}
                    </Text>
                    <Text style={styles.smallBoldText}>TBA</Text>
                  </View>
                  <View style={[styles.tableCell, , { width: '15%' }]}>
                    <Text style={styles.smallBoldText}>
                      {formatUnit(subject.subject_units)}
                    </Text>
                  </View>
                  <View style={[styles.tableCell, { width: '20%' }]}>
                    <Text
                      style={[styles.smallBoldText, { textAlign: 'right' }]}
                    >
                      {formatNumber(subject.fee)}
                    </Text>
                  </View>
                </View>
              ))}

              <View
                style={[
                  styles.tableRow,
                  { marginBottom: '0px', marginTop: '0px' },
                ]}
              >
                <View style={[styles.tableCell, { width: '20%' }]}></View>
                <View style={[styles.tableCell, { width: '45%' }]}>
                  <Text style={[styles.smallBoldText, { textAlign: 'right' }]}>
                    Total:
                  </Text>
                </View>
                <View style={[styles.tableCell, { width: '15%' }]}>
                  <Text style={styles.smallBoldText}>
                    {formatUnit(
                      subjects.reduce(
                        (acc, subject) => acc + subject.subject_units,
                        0
                      )
                    )}
                  </Text>
                </View>
                <View style={[styles.tableCell, { width: '20%' }]}>
                  <Text style={[styles.smallBoldText, { textAlign: 'right' }]}>
                    {formatNumber(
                      subjects.reduce((acc, subject) => acc + subject.fee, 0)
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Payment Cards */}

          <View style={{ paddingLeft: 10, paddingRight: 10 }}>
            <View style={[styles.cards, { marginTop: 7, columnGap: 7 }]}>
              {/* Left Card */}
              <View style={[styles.flexColumn, { width: '28%' }]}>
                <Text style={{ margin: 0 }}>Payment Summary</Text>
                <View style={styles.card}>
                  <View
                    style={[
                      styles.cardTitle,
                      { borderBottom: '1.5px solid #000', padding: 4 },
                    ]}
                  ></View>

                  <View>
                    {/* Tuition */}
                    <View style={[styles.cardContent, { padding: '1px 5px' }]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Tuition Fee:{' '}
                      </Text>
                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          subjects?.reduce((acc, curr) => acc + curr?.fee, 0) ||
                            0
                        )}
                      </Text>
                    </View>

                    <View style={[styles.cardContent, { padding: '1px 5px' }]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Laboratory:{' '}
                      </Text>
                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          studentFees?.filter(
                            (fee) => fee?.fee_type?.fee_type === 'Laboratory'
                          ).fee || 0
                        )}
                      </Text>
                    </View>

                    {/* Miscellaneous */}
                    <View style={[styles.cardContent, { padding: '1px 5px' }]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Miscellaneous:{' '}
                      </Text>
                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          studentFees
                            ?.filter(
                              (fee) =>
                                fee?.fee_type?.fee_type === 'Miscellaneous'
                            )
                            ?.reduce((acc, curr) => acc + curr.fee, 0) || 0
                        )}
                      </Text>
                    </View>

                    {/* Other Fees */}

                    <View style={[styles.cardContent, { padding: '1px 5px' }]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Other Fees:{' '}
                      </Text>
                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          studentFees
                            ?.filter(
                              (fee) => fee?.fee_type?.fee_type === 'Other Fees'
                            )
                            ?.reduce((acc, curr) => acc + curr.fee, 0) || 0
                        )}
                      </Text>
                    </View>

                    {/* Other Fee Types */}

                    {studentFees
                      ?.filter(
                        (fee) =>
                          fee?.fee_type?.fee_type !== 'Other Fees' &&
                          fee?.fee_type?.fee_type !== 'Miscellaneous' &&
                          fee?.fee_type?.fee_type !== 'Matriculation Fee' &&
                          !fee?.fee_label.includes('Tuition')
                      )
                      .map((fee) => (
                        <View
                          key={fee._id}
                          style={[styles.cardContent, { padding: '1px 5px' }]}
                        >
                          <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                            {fee?.fee_label}:{' '}
                          </Text>
                          <Text
                            style={[styles.minusLeftMargin, { fontSize: 8 }]}
                          >
                            {formatNumber(fee?.fee || 0)}
                          </Text>
                        </View>
                      ))}

                    {/* Payment Scheme */}
                    <View style={[styles.cardContent, { padding: '1px 5px' }]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Payment Scheme:{' '}
                      </Text>
                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(0)}
                      </Text>
                    </View>

                    {/* Addition Charge */}
                    <View style={[styles.cardContent, { padding: '1px 5px' }]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Addition Charge:{' '}
                      </Text>
                      <Text
                        style={[styles.minusLeftMargin, { fontSize: 8 }]}
                      ></Text>
                    </View>

                    {/* Penalty */}
                    <View style={[styles.cardContent, { padding: '1px 5px' }]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Penalty:{' '}
                      </Text>
                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(0)}
                      </Text>
                    </View>

                    {/* Divider */}

                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        },
                      ]}
                    >
                      <View
                        style={{
                          width: 1.5,
                          marginRight: 0,
                          width: '50%',
                          border: '1px solid #000',
                        }}
                      ></View>
                    </View>

                    {/* Total */}

                    <View style={styles.cardContent}>
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          paddingLeft: 7,
                        }}
                      >
                        Total Amount + Other:{' '}
                      </Text>

                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          studentFees
                            ?.filter(
                              (fee) =>
                                fee?.fee_type?.fee_type === 'Miscellaneous' ||
                                fee?.fee_type?.fee_type === 'Other Fees'
                            )
                            .reduce((acc, curr) => acc + curr.fee, 0) +
                            subjects?.reduce(
                              (acc, curr) => acc + curr?.fee,
                              0
                            ) || 0
                        )}
                      </Text>
                    </View>

                    {/* Deductions */}

                    <View style={[styles.cardContent]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Deductions:{' '}
                      </Text>

                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(0)}
                      </Text>
                    </View>

                    {/* Payment Scheme */}

                    <View style={[styles.cardContent]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Payment Scheme:{' '}
                      </Text>

                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(0)}
                      </Text>
                    </View>

                    {/* Discount */}

                    <View style={[styles.cardContent]}>
                      <Text style={{ fontSize: 8, margin: 0, padding: 0 }}>
                        Discount:{' '}
                      </Text>

                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          studentLedger?.ledger_balance < 0
                            ? Math.abs(
                                studentLedger?.ledger_balance || 0
                              ).toString()
                            : 0
                        )}
                      </Text>
                    </View>

                    {/* Divider */}

                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        },
                      ]}
                    >
                      <View
                        style={{
                          width: 1.5,
                          marginRight: 0,
                          width: '50%',
                          border: '1px solid #000',
                        }}
                      ></View>
                    </View>

                    {/* Total Due */}

                    <View style={[styles.cardContent]}>
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          paddingLeft: 7,
                        }}
                      >
                        Total Amount Due:{' '}
                      </Text>

                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          studentFees
                            ?.filter(
                              (fee) =>
                                fee?.fee_type?.fee_type === 'Miscellaneous' ||
                                fee?.fee_type?.fee_type === 'Other Fees'
                            )
                            .reduce((acc, curr) => acc + curr.fee, 0) +
                            subjects?.reduce(
                              (acc, curr) => acc + curr?.fee,
                              0
                            ) || 0
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Middle Card */}

              <View style={[styles.flexColumn, { width: '39%' }]}>
                <Text
                  style={{ margin: 0 }}
                >{`${school_year} Installment(${semester} Semester)`}</Text>
                <View style={styles.card}>
                  <View
                    style={[
                      styles.cardTitle,
                      { borderBottom: '1.5px solid #000', padding: 4 },
                    ]}
                  ></View>

                  <View style={{ display: 'grid', rowGap: 2 }}>
                    {/* Line 1 */}
                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          paddingLeft: 1,
                          alignItems: 'flex-start',
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          maxWidth: '65%',
                        }}
                      >
                        Upon Enrollment (25%) - Jan 04, 2023{' '}
                      </Text>

                      <Text style={{ fontSize: 8 }}>
                        {formatPercent(
                          getTwentyFivePercent(
                            (subjects?.reduce(
                              (acc, curr) => acc + curr?.fee,
                              0
                            ) || 0) +
                              (studentFees
                                ?.filter(
                                  (fee) => !fee?.fee_label.includes('Tuition')
                                )
                                .reduce((acc, curr) => acc + curr?.fee, 0) || 0)
                          )
                        )}
                      </Text>
                    </View>

                    {/* Line 2 */}
                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          paddingLeft: 1,
                          alignItems: 'flex-start',
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          maxWidth: '65%',
                        }}
                      >
                        Prelim (25%) - Feb 20, 2023{' '}
                      </Text>

                      <Text style={{ fontSize: 8 }}>
                        {formatPercent(
                          getTwentyFivePercent(
                            (subjects?.reduce(
                              (acc, curr) => acc + curr?.fee,
                              0
                            ) || 0) +
                              (studentFees
                                ?.filter(
                                  (fee) => !fee?.fee_label.includes('Tuition')
                                )
                                .reduce((acc, curr) => acc + curr?.fee, 0) || 0)
                          )
                        )}
                      </Text>
                    </View>

                    {/* Line 3 */}
                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          paddingLeft: 1,
                          alignItems: 'flex-start',
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          maxWidth: '65%',
                        }}
                      >
                        Midterms (25%) - April 01, 2023
                      </Text>

                      <Text style={{ fontSize: 8 }}>
                        {formatPercent(
                          getTwentyFivePercent(
                            (subjects?.reduce(
                              (acc, curr) => acc + curr?.fee,
                              0
                            ) || 0) +
                              (studentFees
                                ?.filter(
                                  (fee) => !fee?.fee_label.includes('Tuition')
                                )
                                .reduce((acc, curr) => acc + curr?.fee, 0) || 0)
                          )
                        )}
                      </Text>
                    </View>

                    {/* Line 4 */}
                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          paddingLeft: 1,
                          alignItems: 'flex-start',
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          maxWidth: '65%',
                        }}
                      >
                        Finals (25%) - May 16, 2023
                      </Text>

                      <Text style={{ fontSize: 8 }}>
                        {formatPercent(
                          getTwentyFivePercent(
                            (subjects?.reduce(
                              (acc, curr) => acc + curr?.fee,
                              0
                            ) || 0) +
                              (studentFees
                                ?.filter(
                                  (fee) => !fee?.fee_label.includes('Tuition')
                                )
                                .reduce((acc, curr) => acc + curr?.fee, 0) || 0)
                          )
                        )}
                      </Text>
                    </View>

                    {/* Line 5 */}
                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          paddingLeft: 1,
                          alignItems: 'flex-start',
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          maxWidth: '65%',
                        }}
                      >
                        Added penalties
                      </Text>

                      <Text style={{ fontSize: 8 }}>{formatNumber(0)}</Text>
                    </View>

                    {/* Line 6 */}
                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          paddingLeft: 1,
                          alignItems: 'flex-start',
                        },
                      ]}
                    >
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          maxWidth: '65%',
                        }}
                      >
                        Additional Charges
                      </Text>

                      <Text style={{ fontSize: 8 }}>{formatNumber(0)}</Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Right Card */}

              <View style={[styles.flexColumn, { width: '33%' }]}>
                <Text style={{ margin: 0 }}>Fees Breakdown</Text>
                <View style={styles.card}>
                  <View
                    style={[
                      styles.cardTitle,
                      {
                        borderBottom: '1.5px solid #000',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        padding: 0,
                      },
                    ]}
                  >
                    <Text style={{ width: '60%', fontSize: 8 }}>
                      Particulars
                    </Text>
                    <View
                      style={{ borderLeft: '1.5px solid #000', width: '40%' }}
                    >
                      <Text style={{ textAlign: 'right', fontSize: 8 }}>
                        Amount
                      </Text>
                    </View>
                  </View>

                  <View>
                    {studentFees
                      ?.filter(
                        (fee) => fee?.fee_type?.fee_type === 'Miscellaneous'
                      )
                      ?.map((fee, index) => (
                        <View style={styles.cardContent} key={index}>
                          <Text
                            style={{
                              fontSize: 8,
                              margin: 0,
                              padding: 0,
                              maxWidth: '60%',
                            }}
                          >
                            {fee?.fee_label}
                          </Text>

                          <Text style={{ fontSize: 8, textAlign: 'right' }}>
                            {formatNumber(fee?.fee)}
                          </Text>
                        </View>
                      ))}

                    {/* Divider */}

                    <View
                      style={[
                        styles.cardContent,
                        {
                          padding: 0,
                          justifyContent: 'flex-end',
                          alignItems: 'flex-end',
                        },
                      ]}
                    >
                      <View
                        style={{
                          width: 1.5,
                          marginRight: 0,
                          width: '50%',
                          border: '1px solid #000',
                        }}
                      ></View>
                    </View>

                    {/* Miscellaneous */}
                    <View style={styles.cardContent}>
                      <Text
                        style={{
                          fontSize: 8,
                          margin: 0,
                          padding: 0,
                          paddingLeft: 55,
                          fontWeight: 'bold',
                        }}
                      >
                        Total:{' '}
                      </Text>
                      <Text style={[styles.minusLeftMargin, { fontSize: 8 }]}>
                        {formatNumber(
                          studentFees
                            ?.filter(
                              (fee) =>
                                fee?.fee_type?.fee_type === 'Miscellaneous'
                            )
                            ?.reduce((acc, curr) => acc + curr.fee, 0) || 0
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
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

export default CollegeEnrollmentPDF;
