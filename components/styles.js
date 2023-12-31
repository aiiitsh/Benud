import styled from 'styled-components';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#d1d1d1',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#3EB489',
  green: '#10B981',
  red: '#A020F0',
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${Colors.primary};
`;

export const InnerContainer = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageLogo = styled.Image`
  width: 250px;
  height: 200px;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  margin: auto;
  border-radius: 50px;
  border-width: 2px;
  border-color: ${secondary};
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const WelcomeImage = styled.Image`
  height: 50%;
  min-width: 100%;
`;

export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${Colors.brand};
  padding: 10px;

  ${(props) =>
    props.welcome &&
    `
    font-size: 35px;
  `}
`;
export const PageTitle2 = styled.Text`
  font-size: 30px;
  text-align: right;
  font-weight: bold;
  color: 'black';
  padding: 10px;
  margin-left: 200px;  

 
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 10px;
  margin-right: 11px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;
export const SubTitle2 = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
  letter-spacing: 1px;
  font-weight: normal;
  color: ${red};
  margin-left: 270px;  
`;
export const SubTitle3 = styled.Text`
  font-size: 16px;
  margin-bottom: 10px;
  letter-spacing: 1px;
  font-weight: normal;
  color: ${tertiary};
  margin-right: 12px;  
`;
export const GreyNumber = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: normal;
  color: 'grey';
  margin-right: -260px;  
`;
export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: right;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${(props) => (props.google ? '#1877F2' : brand)};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;
export const StyledButtonSmall = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${(props) => (props.google ? '#1877F2' : brand)};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 60px;
`;
export const StyledButtonSmall2 = styled.TouchableOpacity`
padding: 15px;
background-color: ${(props) => (props.google ? '#1877F2' : brand)};
justify-content: center;
align-items: center;
flex-direction: row;
border-radius: 5px;
margin-vertical: 8px;
height: 55px;
align-self: flex-start;
`;



export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
  margin-left: 10px;

  ${(props) =>
    props.google &&
    `
    color: ${primary};
    padding: 0 25px;
  `}
`;



export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${props => props.type == "SUCCESS" ? green : red};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 10px;
`;

export const StyledFormArea = styled.View`
  width: 90%;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding: 10px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-content: center;
  color: ${tertiary};
  font-size: 15px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const TextLinkContent = styled.Text`
  color: ${brand};
  font-size: 15px;
`;