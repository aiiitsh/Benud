import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import SyncStorage from 'sync-storage';
import axios from 'axios';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { PageTitle2, SubTitle3 } from '../../components/styles';
import { SubTitle2 } from '../../components/styles';
import { GreyNumber } from '../../components/styles';
import { StyledButtonSmall2 } from '../../components/styles';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';

const categoryOptions = ['تشطيب', 'مصنعية', 'اخري'];

import { useNavigation } from '@react-navigation/native';

import {
  StyledContainer,
  PageTitle,
  SubTitle,
  InnerContainer,
  Colors,
} from './../../components/styles';

//colors
const { darkLight, brand, primary } = Colors;

export default function Hesabat(props) {
  const navigation = useNavigation();
  const [change, setChange] = useState(false); // Default to View A

  const [customersDataA, setCustomersDataA] = useState([]);
  const [activeView, setActiveView] = useState('A'); // Default to View A

  const [customersDataB, setCustomersDataB] = useState([]);
  useEffect(() => {
    const token = SyncStorage.get('token');
    axios
      .get(
        `http://54.161.133.43:5001/api/client/hesabat/${props.route.params.bandId}/A`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCustomersDataA(res.data.bandHesabat);
        console.log(res.data.bandHesabat);
      })
      .catch((err) => console.log('error'));
    axios
      .get(
        `http://54.161.133.43:5001/api/client/hesabat/${props.route.params.bandId}/B`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setCustomersDataB(res.data.bandHesabat);
        console.log(res.data.bandHesabat);
      })
      .catch((err) => console.log('error'));
  }, [activeView, props, change]);
  const [filterOption, setFilterOption] = useState('all'); // Initialize filter option state

  const numOfCustomersA = customersDataA.length;
  const numOfCustomersB = customersDataB.length;

  const handleRowPress = (item) => {
    // Implement the action you want to take when a row is pressed
    console.log('Row pressed:', item.date);
  };

  const renderTableRow = ({ item, index }) => {
    // Check if the current item matches the selected filter option
    const isMatchingFilter = filterOption === 'all' || item.type === filterOption;

    return isMatchingFilter ? (
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
          style={{
            textAlign: 'right',
            flex: 1,
            color: item.notes ? 'black' : 'lightgrey',
          }}
          value={item.notes}
          placeholder=".........."
          placeholderTextColor="lightgrey"
          onChangeText={(text) => handleTextChange(item._id, 'notes', text)}
        />

        <TextInput
          style={{
            textAlign: 'right',
            flex: 1,
            color: item.paid ? 'black' : 'lightgrey',
          }}
          value={item.paid}
          placeholder=".........."
          placeholderTextColor="lightgrey"
          keyboardType="numeric" // Add this line
          onChangeText={(text) => handleTextChange(item._id, 'paid', text)}
        />

        <Picker
          selectedValue={item.type}
          style={{
            flex: 1,
            color: item.type ? 'black' : 'lightgrey',
            height: 40,
            minWidth: 100, // Adjust the width as needed
          }}
          itemStyle={{ color: 'black' }}
          onValueChange={(value) => handleTextChange(item._id, 'type', value)}
        >
          <Picker.Item label="اختر" value="" />
          {categoryOptions.map((option) => (
            <Picker.Item key={option} label={option} value={option} />
          ))}
        </Picker>

        <TextInput
          style={{
            textAlign: 'right',
            flex: 2,
            color: selectedDate ? 'black' : 'lightgrey', // Update this line
          }}
          value={item.date}
          placeholder={selectedDate || '..........'} // Update this line
          placeholderTextColor="lightgrey"
          onChangeText={(text) => handleTextChange(item._id, 'date', text)}
        />
      </View>
    ) : null;
  };

  const renderSeparator = () => (
    <View
      style={{
        height: 10,
        backgroundColor: 'transparent',
      }}
    />
  );

  // Step 2: Initialize a state variable for the date
  const [selectedDate, setSelectedDate] = useState('');

  // Step 3: Create a function to update the date when the plus button is pressed
  const handlePlusButtonPress = () => {
    // Implement the action to add a new row with the current date
    const currentDate = new Date(); // Get the current date
    const formattedDate = currentDate.toLocaleDateString(); // Format the date as per your requirements

    // Update the selectedDate state with the formatted date
    setSelectedDate(formattedDate);

    // Rest of your plus button logic
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };

    if (activeView === 'A') {
      axios
        .post(
          'http://54.161.133.43:5001/api/client/hesabat/addHesab',
          { _id: props.route.params.bandId, classType: 'A' },
          { headers }
        )
        .then((res) => {
          console.log(res.data);
          setCustomersDataA((prevData) => [...prevData, res.data.hesab]);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(
          'http://54.161.133.43:5001/api/client/hesabat/addHesab',
          { _id: props.route.params.bandId, classType: 'B' },
          { headers }
        )
        .then((res) => {
          setCustomersDataB((prevData) => [...prevData, res.data.hesab]);
        })
        .catch((err) => console.log(err));
    }
    setChange((prev) => !prev);
  };

  const handleSwitchButtonPress = () => {
    // Toggle between View A and View B
    setActiveView(activeView === 'A' ? 'B' : 'A');
  };

  const handleTextChange = (itemId, field, text) => {
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };
    if (field === 'type')
      axios
        .put(
          'http://54.161.133.43:5001/api/client/hesabat/update',
          { type: text, _id: itemId },
          { headers }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    if (field === 'paid')
      axios
        .put(
          'http://54.161.133.43:5001/api/client/hesabat/update',
          { paid: text, _id: itemId },
          { headers }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    if (field === 'date')
      axios
        .put(
          'http://54.161.133.43:5001/api/client/hesabat/update',
          { date: text, _id: itemId },
          { headers }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    if (field === 'notes')
      axios
        .put(
          'http://54.161.133.43:5001/api/client/hesabat/update',
          { notes: text, _id: itemId },
          { headers }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => console.log(err));
    // Update the data based on the active view
    if (activeView === 'A') {
      setCustomersDataA((prevData) =>
        prevData.map((item) => {
          if (item._id === itemId) {
            return { ...item, [field]: text };
          }
          return item;
        })
      );
    } else {
      setCustomersDataB((prevData) =>
        prevData.map((item) => {
          if (item._id === itemId) {
            return { ...item, [field]: text };
          }
          return item;
        })
      );
    }
  };

  const handleBackButtonPress = () => {
    // Implement the navigation to Benod.js when the back button is pressed
    props.route.params.setChange((prev) => !prev);
    navigation.navigate('Benod', {
      customerId: props.route.params.customerId,
      customerName: props.route.params.customerName,
      customerPhone: props.route.params.customerPhone,
      timestamp: Date.now(),
    });
  };

  // Determine the active data and number of customers based on the active view
  const activeData = activeView === 'A' ? customersDataA : customersDataB;
  const numOfCustomers = activeView === 'A' ? numOfCustomersA : numOfCustomersB;

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 1,
          }}
        >
          <TouchableOpacity onPress={handleBackButtonPress}>
            {/* Replace text with a back arrow icon */}
            <Ionicons name="arrow-back" size={34} color="black" />
          </TouchableOpacity>
          {/* Rest of your header */}
          <PageTitle style={{ textAlign: 'right' }}>
            {props.route.params.customerName}
          </PageTitle>
        </View>
        <SubTitle style={{ textAlign: 'right' }}>
          {props.route.params.bandInfo}
        </SubTitle>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <TouchableOpacity onPress={handleSwitchButtonPress}>
            <View
              style={{
                flexDirection: 'row',
                borderRadius: 15,
                borderWidth: 2,
                borderColor: activeView === 'A' ? 'green' : 'green',
                paddingHorizontal: 25,
                paddingVertical: 10,
                backgroundColor: activeView === 'A' ? 'green' : 'green',
              }}
            >
              <Text
                style={{
                  color: activeView === 'A' ? 'white' : 'grey',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                | تشطيب
              </Text>
              <Text
                style={{
                  color: activeView === 'B' ? 'white' : 'grey',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}
              >
                تأسيس
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <InnerContainer style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <SubTitle2 style={{ marginRight: 10 }}>الحسابات</SubTitle2>
          <GreyNumber>({numOfCustomers})</GreyNumber>

          {/* Picker for filter */}
          <Picker
            selectedValue={filterOption}
            style={{ flex: 1, marginLeft: 10 }}
            onValueChange={(value) => setFilterOption(value)}
          >
            <Picker.Item label="الكل" value="all" />
            {categoryOptions.map((option) => (
              <Picker.Item key={option} label={option} value={option} />
            ))}
          </Picker>
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
          <Text style={{ textAlign: 'right', flex: 1, fontWeight: 'bold' }}>ملاحظات</Text>
          <Text style={{ textAlign: 'right', flex: 1, fontWeight: 'bold' }}>دفعت</Text>
          <Text style={{ textAlign: 'right', flex: 2, fontWeight: 'bold' }}>التصنيف</Text>
          <Text style={{ textAlign: 'right', flex: 2, fontWeight: 'bold' }}>التاريخ</Text>
        </View>

        {/* Table Data */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={activeData}
            renderItem={renderTableRow}
            keyExtractor={(item) => item._id}
            style={{ width: '100%' }}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>

        {/* Plus Button Container */}
        <View
          style={{
            alignSelf: 'flex-start',
            marginBottom: 20,
            marginLeft: 20,
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

        {/* Switch Button */}
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}
