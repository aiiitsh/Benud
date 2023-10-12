import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { PageTitle2 } from '../../components/styles';
import { SubTitle2 } from '../../components/styles';
import { GreyNumber } from '../../components/styles';
import axios from 'axios';
import SyncStorage from 'sync-storage'
import { StyledButtonSmall2 } from '../../components/styles';
import { Octicons, Fontisto, Ionicons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import Constants from 'expo-constants'; // Import Constants from Expo
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message";

const downloadFile = async (url) => {
  if (Constants.platform.ios) {
    const { status } = await MediaLibrary.requestPermissionsAsync();

    if (status !== 'granted') {
      console.error('Permission to access media library denied');
      return;
    }
  }

  let path = url.split('/');
  const file_name = path[path.length - 1];

  FileSystem.downloadAsync(
    url,
    FileSystem.documentDirectory + file_name
  )
    .then(({ uri }) => {
      console.log('Finished downloading to ', uri);
      MediaLibrary.createAssetAsync(uri)
        .then((asset) => {
          console.log('asset', asset);
          MediaLibrary.createAlbumAsync('myfolder', asset)
            .then(() => {
              showMessage({
                message: ('general.success'),
                description: ('download.success'),
                type: 'success',
              });
            })
            .catch((error) => {
              showMessage({
                message: ('general.success'),
                description: ('download.failed'),
                type: 'danger',
              });
            });
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};

import {
  StyledContainer,
  PageTitle,
  SubTitle,
  InnerContainer,
  Colors,
  SubTitle3
} from './../../components/styles';

// Colors
const { darkLight, brand, primary } = Colors;

export default function Benod(props) {
  const [downloadProgress, setDownloadProgress] = React.useState();
  const downloadPath = FileSystem.documentDirectory + (Platform.OS == 'android' ? '' : '');

  const [tableData, setTableData] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [receivedValue, setReceivedValue] = useState('0'); // Initialize with the default value
  const [change, setChange] = useState(false);
  const [projectLocation, setProjectLocation] = useState();

  console.log(props.route.params.customerId);

  useEffect(() => {
    const token = SyncStorage.get('token');
    axios.get(`http://54.161.133.43:5001/api/client/benod/${props.route.params.projectId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setTableData(res.data.benod);
      })
      .catch(err => console.log('error'));

    axios.get(`http://54.161.133.43:5001/api/client/project/${props.route.params.projectId}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setProjectLocation(res.data.project.clientData[0].projectLocation);
        setReceivedValue(res.data.project.clientData[0].projectReceieved);
      })
      .catch(err => console.log('error'));
  }, [props, change]);

  const navigation = useNavigation();

  const handleRowPress = (item) => {
    navigation.navigate('Hesabat', {
      change,
      setChange,
      customerId: props.route.params.customerId,
      bandId: item._id,
      customerName: props.route.params.customerName,
      customerPhone: props.route.params.customerPhone,
      bandInfo: projectLocation + '| ' + item.bandName
    });
  };

  const handleBackButtonPress = () => {
    navigation.navigate('Projects', {
      customerId: props.route.params.customerId,
      customerName: props.route.params.customerName,
      customerPhone: props.route.params.customerPhone,
    });
  };

  const handleReceivedChange = (text) => {
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };

    axios
      .put('http://54.161.133.43:5001/api/client/project/updateReceieved', { projectReceieved: text, _id: props.route.params.projectId }, { headers })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setReceivedValue(text);
  };

  const renderTableRow = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleRowPress(item)}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'grey',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            console.log('طباعة button pressed!');
          }}
          style={{
            alignItems: 'center',
            flex: 2,
          }}
        >
          <Ionicons name="print" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Photos');
          }}
          style={{
            alignItems: 'center',
            flex: 4,
          }}
        >
          <Ionicons name="image" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ textAlign: 'right', flex: 4 }}>{Array.isArray(item.bandHesabat) ? item.bandHesabat.reduce((accumulator, currentValue) => { return accumulator + parseFloat(currentValue.paid) }, 0) : 0} </Text>
        <TextInput
          style={{ textAlign: 'right', flex: 4 }}
          value={item.bandName}
          onChangeText={(text) => handleTextChange(item._id, 'bandName', text)}
        />
        <Text style={{ textAlign: 'right', flex: 1 }}>{index + 1}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => (
    <View
      style={{
        height: 10,
        backgroundColor: 'transparent',
      }}
    />
  );

  const handlePlusButtonPress = () => {
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };

    axios
      .post('http://54.161.133.43:5001/api/client/benod/addBand', { projectId: props.route.params.projectId }, { headers })
      .then((res) => {
        const newRow = { _id: res.data.band._id, bandName: '', paid: 0 };
        setTableData([...tableData, newRow]);
      })
      .catch((err) => console.log(err));
  };

  const handleTextChange = (itemId, field, text) => {
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };
    axios
      .put('http://54.161.133.43:5001/api/client/benod/update', { bandName: text, _id: itemId }, { headers })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    setTableData((prevData) =>
      prevData.map((item) => {
        if (item._id === itemId) {
          return { ...item, [field]: text };
        }
        return item;
      })
    );
  };

  // Add state variables for the sum of "صرفت" and "متبقي"
  const [totalSpent, setTotalSpent] = useState(0);
  const [remaining, setRemaining] = useState(0);

  // Create a function to calculate the total "صرفت" value
  const calculateTotalSpent = () => {
    const spent = tableData.reduce((acc, item) => acc + parseFloat(item.bandHesabat.reduce((accumulator, currentValue) => { return accumulator + parseFloat(currentValue.paid) }, 0) || 0), 0);
    setTotalSpent(spent);
  };

  // Create a function to calculate the "متبقي" value
  const calculateRemaining = () => {
    const spent = parseFloat(totalSpent || 0);
    setRemaining(receivedValue - spent);
  };

  // Use useEffect to calculate total "صرفت" and "متبقي" whenever tableData or receivedValue changes
  useEffect(() => {
    calculateTotalSpent();
  }, [change, tableData]);

  useEffect(() => {
    calculateRemaining();
  }, [receivedValue, totalSpent, tableData]);

  const handleEndProject = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    console.log(props.route.params.projectId);
    const token = SyncStorage.get('token');
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json', // Assuming JSON content type, adjust as needed
    };
    console.log(token);
    axios
      .delete('http://54.161.133.43:5001/api/client/project/delete', {
        data: { _id: props.route.params.projectId },
        headers: headers
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
    navigation.navigate('Projects', { customerId: props.route.params.customerId, customerName: props.route.params.customerName, customerPhone: props.route.params.customerPhone });
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

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
            <Ionicons name="arrow-back" size={34} color="black" />
          </TouchableOpacity>
          <PageTitle style={{ textAlign: 'right' }}>{props.route.params.customerName}</PageTitle>
        </View>
        <SubTitle style={{ textAlign: 'right' }}>{props.route.params.customerPhone}</SubTitle>
        <SubTitle3 style={{ textAlign: 'right' }}>{projectLocation}</SubTitle3>
        <InnerContainer style={{ flexDirection: 'row-reverse', alignItems: 'center' }}>
          <SubTitle2 style={{ marginRight: 10 }}>البنود</SubTitle2>
          <GreyNumber>({tableData.length})</GreyNumber>
          <TouchableOpacity
  onPress={async () => {
    try {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.status === 'granted') {
        await downloadFile("http://techslides.com/demos/sample-videos/small.mp4");
      } else {
        console.error('Permission to access media library denied');
      }
    } catch (error) {
      console.error('Error while requesting permission:', error);
    }
  }}
  style={{
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 155,
  }}
>
  <Ionicons name="print" size={24} color="black" style={{ marginRight: 5 }} />
  <Text>طباعة جميع البنود</Text>
</TouchableOpacity>

        </InnerContainer>
        <Ionicons name="md-eye-off" size={24} color="red" style={{ alignSelf: "center" }} />
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
          <Text style={{ textAlign: 'right', flex: 2 }}>طباعة</Text>
          <Text style={{ textAlign: 'right', flex: 4 }}>صور المرحلة</Text>
          <Text style={{ textAlign: 'right', flex: 4 }}>صرفت</Text>
          <Text style={{ textAlign: 'right', flex: 4 }}>البند</Text>
          <Text style={{ textAlign: 'right', flex: 1 }}></Text>
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={tableData}
            renderItem={renderTableRow}
            keyExtractor={(item) => item._id}
            style={{ width: '100%' }}
            ItemSeparatorComponent={renderSeparator}
          />
        </View>
        <View
          style={{
            alignSelf: 'flex-start',
            marginBottom: 20,
            marginLeft: 20,
          }}
        >
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
        <View
          style={{
            backgroundColor: 'green',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            shadowColor: primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop: 20,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>متبقي</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>صرفت</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 24 }}>{remaining}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 24 }}>{totalSpent}</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: 'grey',
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            shadowColor: primary,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold', fontSize: 18 }}>استلمت</Text>
          <TextInput
            style={{ textAlign: 'center', color: 'white', fontSize: 24, fontWeight: 'bold' }}
            value={receivedValue}
            onChangeText={handleReceivedChange}
            keyboardType="numeric"
          />
        </View>
        <View style={{ flex: 1, padding: 20 }}>
          <TouchableOpacity
            onPress={handleEndProject}
            style={{
              backgroundColor: 'red',
              borderRadius: 10,
              paddingVertical: 10,
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>END PROJECT</Text>
          </TouchableOpacity>
          {showConfirmation && (
            <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 10 }}>Are you sure?</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={handleConfirm} style={{ backgroundColor: 'green', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleCancel} style={{ backgroundColor: 'red', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>No</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}
