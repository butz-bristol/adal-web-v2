import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 40,
    paddingHorizontal: 10,
    fontSize: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  headerTextContainer: {
    width: '50%',
    fontSize: 10,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
  boldText: {
    fontWeight: 'extrabold',
    fontSize: 13,
    marginTop: 10,
  },
  smallBoldText: {
    fontWeight: 600,
    fontSize: 9,
  },
  logo: {
    width: 85,
    height: 85,
    display: 'block',
  },
  content: {
    padding: 10,
    fontSize: 10,
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  'p-3': {
    padding: 3,
  },
  'p-10': {
    padding: 10,
  },
  'mt-3': {
    marginTop: 3,
  },
  'mr-3': {
    marginRight: 3,
  },
  'ml-3': {
    marginLeft: 3,
  },
  'ml-8': {
    marginLeft: 8,
  },
  'ml-5': {
    marginLeft: 5,
  },
  'ml-10': {
    marginLeft: 10,
  },
  'ml-30': {
    marginLeft: 30,
  },
  'ml-35': {
    marginLeft: 35,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    padding: 3,
    alignItems: 'center',
  },
  flexCenter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  minusLeftMarginSeven: {
    marginLeft: -7,
  },
  minusLeftMargin: {
    marginLeft: -10,
  },
  textAlignRight: {
    textAlign: 'right',
  },
  cards: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 10,
    width: '100%',
    justifyContent: 'space-between',
  },
  card: {
    border: '2px solid #000',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 900,
    backgroundColor: '#c0c0c0',
    padding: 3,
  },
  cardContent: {
    fontSize: 10,
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTotalFooter: {
    fontWeight: 900,
    textAlign: 'right',
    fontSize: 10,
    padding: 5,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  'w-50': {
    width: '50%',
  },
  table: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '2px solid black',
  },
  tableHeader: {
    width: '100%',
    borderBottom: '2px solid black',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableHeaderCell: {
    borderLeft: '2px solid black',
    padding: 3,
    backgroundColor: '#c0c0c0',
  },
  tableRow: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tableCell: {
    width: '25%',
    border: 'none',
    padding: '0 3px',
    margin: 0,
  },
  signatureContainer: {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    // marginTop: 320,
    marginBottom: 30,
  },
  signature: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signatureText: {
    fontSize: 10,
    textAlign: 'center',
    width: '100%',
    fontWeight: 600,
  },
  signatureLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginBottom: 7,
  },
  footer: {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 10,
    width: '100%',
    padding: 7,
    border: '1px solid #000',
  },
  footerContent: {
    fontSize: 10,
    textAlign: 'center',
    // width: '100%',
    fontWeight: 600,
  },
});

export default styles;
