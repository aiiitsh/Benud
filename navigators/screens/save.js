import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'
import SyncStorage from 'sync-storage'
import {  ActivityIndicator  } from 'react-native';
import React, { useEffect, useState } from 'react';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { PageTitle2 } from '../../components/styles';
import { SubTitle2 } from '../../components/styles';
import { GreyNumber } from '../../components/styles';
import { StyledButtonSmall2 } from '../../components/styles';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

import {
  StyledContainer,
  PageLogo,
  PageTitle,
  SubTitle,
  StyledInputLabel,
  StyledFormArea,
  StyledButton,
  StyledTextInput,
  LeftIcon,
  RightIcon,
  InnerContainer,
  ButtonText,
  MsgBox,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
  Colors,
} from './../../components/styles';



export default function Customer() {
const customersData = [  { id: '1', name: 'مهندس محمود', phone: '01024204493', location: 'مصر الجديدة' }]
// Add more customer data as needed]
  const token = SyncStorage.getItem("token")
  useEffect(() => {
    axios.get('http://54.161.133.43:5001/api/client',{headers: {Authorization: `Bearer ${token}`}})
    .then(res => {
      console.log('asasda')
    }).catch(err => console.log('sss'))
  }, [])
  
  const [tableData, setTableData] = useState(customersData);
  const numOfCustomers = tableData.length;
  
  const navigation = useNavigation();

  const handleRowPress = (item) => {
    navigation.navigate('Projects', { customerId: item.id });
  };

  const handleInputChange = (text, index, field) => {
    const updatedTableData = tableData.map((item, i) => {
      if (index === i) {
        return { ...item, [field]: text };
      }
      return item;
    });
    setTableData(updatedTableData);
  };

  const renderTableRow = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleRowPress(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
          alignItems: 'center',
        }}
      >
        <TextInput
          style={{ textAlign: 'right', flex: 2 }}
          placeholder="الموقع"
          value={item.location}
          onChangeText={(text) => handleInputChange(text, index, 'location')}
        />
        <TextInput
          style={{ textAlign: 'right', flex: 2 }}
          placeholder="رقم الهاتف"
          value={item.phone}
          onChangeText={(text) => handleInputChange(text, index, 'phone')}
        />
        <TextInput
          style={{ textAlign: 'right', flex: 2 }}
          placeholder="الاسم"
          value={item.name}
          onChangeText={(text) => handleInputChange(text, index, 'name')}
        />
        <Text style={{ textAlign: 'right', flex: 1 }}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 10, // Adjust this value to add more spacing between rows
        backgroundColor: 'transparent', // Use any color you want for the separator
      }}
    />
  );

  const handlePlusButtonPress = () => {
    const newId = (Math.random() * 10000).toString();
    const newRow = { id: newId, name: '', phone: '', location: '' };
    setTableData([...tableData, newRow]);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <PageTitle2 style={{ textAlign: 'right' }}>أهلا محمود</PageTitle2>
        <InnerContainer style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <SubTitle2 style={{ marginRight: 10 }}>العملاء</SubTitle2>
          <GreyNumber>({numOfCustomers})</GreyNumber>
        </InnerContainer>

        {/* Table Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: 'grey',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text style={{ textAlign: 'right', flex: 2 }}>الموقع</Text>
          <Text style={{ textAlign: 'right', flex: 2 }}>رقم الهاتف</Text>
          <Text style={{ textAlign: 'right', flex: 2 }}>الاسم</Text>
          <Text style={{ textAlign: 'right', flex: 1 }}></Text>
        </View>

        {/* Table Data */}
        <View style={{ flex: 1, marginBottom: 80 /* Adjust this value as needed */ }}>
          <FlatList
            data={tableData}
            renderItem={renderTableRow}
            keyExtractor={(item) => item.id}
            style={{ width: '100%' }}
            ItemSeparatorComponent={renderSeparator} // Add the separator component
          />
        </View>

        {/* Plus Button Container */}
        <View
          style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
          }}
        >
          {/* Plus Button */}
          <TouchableOpacity
            onPress={handlePlusButtonPress}
            style={{
              backgroundColor: 'black',
              width: 60,
              height: 60,
              borderRadius: 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 36 }}>+</Text>
          </TouchableOpacity>
        </View>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}