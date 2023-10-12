import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
import { StyledContainer, PageTitle, SubTitle, Colors } from './../../components/styles';

const { darkLight } = Colors;

export default function Photos() {
  const [imageUri, setImageUri] = useState(null);
  const [imageList, setImageList] = useState([]);
  const [checkedImages, setCheckedImages] = useState([]); // Array to manage checkboxes
  const navigation = useNavigation();

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageList([...imageList, result.uri]);
      setCheckedImages([...checkedImages, false]); // Add a new checkbox state
    }
  };

  const renderImageItem = ({ item, index }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
      <TouchableOpacity onPress={() => handleImageCheckboxToggle(index)}>
        <View
          style={{
            width: 20,
            height: 20,
            borderWidth: 1,
            borderColor: 'black',
            marginRight: 10,
            backgroundColor: checkedImages[index] ? 'black' : 'white',
          }}
        />
      </TouchableOpacity>
      <Image source={{ uri: item }} style={{ width: 300, height: 300 }} />
    </View>
  );

  const handleImageCheckboxToggle = (index) => {
    const updatedCheckedImages = [...checkedImages];
    updatedCheckedImages[index] = !updatedCheckedImages[index];
    setCheckedImages(updatedCheckedImages);
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <PageTitle style={{ textAlign: 'right' }}>محمد سامح | شقة الساحل</PageTitle>
        <SubTitle style={{ textAlign: 'right' }}>بند الكهرباء</SubTitle>

        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <TouchableOpacity
            onPress={handleSelectImage}
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

          <View style={{ marginTop: 20 }}>
            <FlatList
              data={imageList}
              renderItem={renderImageItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </View>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}
