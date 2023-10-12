//Help page
import { View, Text } from 'react-native'
import React from 'react'
import KeyboardAvoidingWrapper from '../../components/KeyboardAvoidingWrapper'
import { StyledContainer } from '../../components/styles';
import { InnerContainer } from '../../components/styles';
import { PageTitle } from '../../components/styles';
import { SubTitle } from '../../components/styles';
export default function Customers() {
  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        
        <InnerContainer>
          
          <PageTitle>المساعدة و الحاجات دي</PageTitle>
          <SubTitle>كلم رقم 512121545</SubTitle>
          
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
}

//صفحة الاعدادات