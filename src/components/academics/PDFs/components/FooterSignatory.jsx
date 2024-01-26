import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import { DateTime } from 'luxon';

const FooterSignatory = ({ data, section, principal, isJHS, isSHS }) => {
  return (
    <View style={{ marginTop: '20px' }}>
      <View style={{ backgroundColor: '#F4CCCC', padding: '7px 0' }}>
        <Text style={{ textAlign: 'center', fontFamily: 'Helvetica-Bold', fontSize: '10pt' }}>CERTIFICATE OF TRANSFER</Text>
      </View>

      <View style={{ marginTop: '40px' }}>
        <Text style={{ fontSize: '9.5pt' }}>Eligible or transfer and admission to ________________________________________</Text>
      </View>

      {isJHS && (
        <View>
          <View style={{ marginTop: '5px' }}>
            <Text style={{ fontSize: '9.5pt' }}>Has advanced credits in ________________________________________</Text>
          </View>
          <View style={{ marginTop: '5px' }}>
            <Text style={{ fontSize: '9.5pt' }}>Lacks credits in ________________________________________</Text>
          </View>
        </View>
      )}

      {/* Class Adviser */}

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '40px 0' }}>
        <View style={{ width: '50%' }}>
          <View style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: '9.5pt',
                fontFamily: 'Helvetica-Bold',
                textTransform: 'uppercase',
                marginBottom: '3px'
              }}
            >
              {section?.adviser?.first_name ?? ''} {section?.adviser?.middle_name ? section?.adviser?.middle_name.charAt(0) : ''}
              {section?.adviser?.last_name ?? ''}
              {!section?.adviser && 'No Adviser'}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: '9.5pt' }}>Class Adviser</Text>
          </View>
        </View>

        {/* Principal */}

        <View style={{ width: '50%' }}>
          <View style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: '9.5pt',
                fontFamily: 'Helvetica-Bold',
                textTransform: 'uppercase',
                marginBottom: '3px'
              }}
            >
              {!isJHS && !isSHS && 'Sharon Ann A. Alday, LPT'}
              {(isJHS || isSHS) && 'Edna C. Espiritu'}
            </Text>
            <Text style={{ textAlign: 'center', fontSize: '9.5pt' }}>Principal</Text>
          </View>
        </View>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <Text style={{ fontSize: '9.5pt' }}>Date:</Text>

        <Text style={{ fontSize: '9.5pt' }}></Text>
      </View>

      {/*  Cancellation of Transfer Eligibility  */}

      <View style={{ marginTop: '20px', backgroundColor: '#F4CCCC', padding: '7px 0' }}>
        <Text style={{ textAlign: 'center', fontFamily: 'Helvetica-Bold', fontSize: '10pt' }}>CANCELLATION OF ELIGIBILITY TO TRANSFER</Text>
      </View>

      <View style={{ marginTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: '9.5pt', width: '20%' }}>Admitted In:</Text>

        <Text style={{ fontSize: '9.5pt', width: '90%' }}>___________________________________________________________________________</Text>
      </View>

      <View style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: '9.5pt', width: '20%' }}>Grade:</Text>

        <Text style={{ fontSize: '9.5pt', width: '90%' }}>___________________</Text>
      </View>

      <View style={{ marginTop: '10px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: '9.5pt', width: '20%' }}>Date:</Text>

        <Text style={{ fontSize: '9.5pt', width: '90%' }}>___________________</Text>
      </View>

      <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', marginTop: '40px' }}>
        <View style={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ borderBottom: '1px solid black', width: '150px' }}></View>
          <Text style={{ textAlign: 'center', fontSize: '9.5pt', marginTop: '3px' }}>Principal</Text>
        </View>
      </View>
    </View>
  );
};
export default FooterSignatory;
