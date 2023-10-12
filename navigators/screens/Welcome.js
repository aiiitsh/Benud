import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from './../../components/styles';



const Welcome = ({navigation, route}) => {
  const{ name , email} = route.params;
 

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        <WelcomeImage resizeMode="cover" source={require('./../../assets/expo-bg2.png')} />

        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! </PageTitle>
          <SubTitle welcome={true}>{ name || 'Ahmed Hesham'}</SubTitle>
          <SubTitle welcome={true}>{ email || 'ahmed@gmail.com'}</SubTitle>

          <StyledFormArea>
            <Avatar resizeMode="cover" source={require('./../../assets/logo.png')} />

            
            <StyledButton onPress={()=>{}}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default Welcome;