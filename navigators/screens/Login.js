import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import SyncStorage from 'sync-storage';
import { Formik } from 'formik';
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
import { View, ActivityIndicator } from 'react-native';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper';
//colors
const { darkLight, brand, primary } = Colors;
// API client
import axios from 'axios';
const Login = ({ navigation }) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState();
  const [messageType, setMessageType] = useState();
  const [googleSubmitting, setGoogleSubmitting] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.setParams({ hideTabs: true });
    });

    return unsubscribe;
  }, [navigation]);
  const handleLogin = (credentials, setSubmitting) => {
    handleMessage(null);
    const url = 'http://54.161.133.43:5001/api/users/login';
    axios
      .post(url, {username: credentials.email, password: credentials.password})
      .then((response) => {
        const result = response.data;
        console.log(response.data)
        if(response.status === 204)
          handleMessage('البريد الالكتروني أو كلمة المرور خاطئين');
        else
        {
        SyncStorage.set('token', result.token);
        SyncStorage.set('name', result.name);

        navigation.navigate('Customer');
        }
        setSubmitting(false);
      })
      .catch((error) => {
        console.log(error)
        setSubmitting(false);
        handleMessage('An error occurred. Check your network and try again');
      });
  };

  const handleMessage = (message, type = '') => {
    setMessage(message);
    setMessageType(type);
  };
  

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <StatusBar style="dark" />
        <InnerContainer>
          <PageLogo resizeMode="cover" source={require('./../../assets/logo.png')} />
          <PageTitle>كله مترتب في مكان واحد!</PageTitle>
          <SubTitle>تسجيل الدخول</SubTitle>
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, { setSubmitting }) => {
              if (values.email == '' || values.password == '') {
                handleMessage('Please fill in all fields');
                setSubmitting(false);
              } else {
                handleLogin(values, setSubmitting);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
              <StyledFormArea>
                <MyTextInput
                  label="الايميل الاكتروني"
                  placeholder="ahmed@gmail.com"
                  placeholderTextColor={Colors.darkLight}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="email-address"
                  icon="mail"
                />
                <MyTextInput
                  label="باسوورد"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={Colors.darkLight}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={hidePassword}
                  icon="lock"
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>تسجيل الدخول</ButtonText>
                  </StyledButton>
                )}
                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}

               
                

                <ExtraView>
                <TextLink onPress={() => navigation.navigate('Signup')}>
                    <TextLinkContent>انشيء حساب</TextLinkContent>
                  </TextLink>
                  <ExtraText>ليس لديك حساب بعد؟ </ExtraText>
                  
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, ...props }) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={Colors.brand} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons name={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={Colors.brand} />
        </RightIcon>
      )}
    </View>
  );
};

export default Login;
