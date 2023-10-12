import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import Login from './screens/Login';
import Customers from './screens/Customers';
import Signup from './screens/SignUp';
import Customer from './screens/Customer';
import Benod from './screens/Benod';
import Projects from './screens/Projects';
import Hesabat from './screens/Hesabat';
import Photos from './screens/Photos';
const Tab = createBottomTabNavigator();

function RootStack() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={'Login'}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === 'Customer') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'Customers') {
              iconName = focused ? 'list' : 'list-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },

          headerShown: false, // hide header
          tabBarStyle: {
            backgroundColor: 'black',
            height: 60, // set navigation bar color to black
            display:
              route.name === 'Login' || route.name === 'Signup'
                ? 'none'
                : 'flex', // Hide tabBar on the login and sign-up pages
          },
        })}
        tabBarOptions={{
          activeTintColor: '#10B981',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 100 },
        }}>
        <Tab.Screen
          name={'Login'}
          component={Login}
          options={{
            tabBarLabel: '', // Empty label to hide the tab
            tabBarButton: () => null, // Render an empty component, effectively hiding the tab screen
          }}
        />

        <Tab.Screen
          name={'Signup'}
          component={Signup}
          options={{
            tabBarLabel: '', // Empty label to hide the tab
            tabBarButton: () => null, // Render an empty component, effectively hiding the tab screen
          }}
        />
        <Tab.Screen
          name={'Customer'}
          component={Customer}
          options={{
            tabBarLabel: 'العملاء', // set the label to العملاء
            
          }}
        />
        <Tab.Screen
          name={'Customers'}
          component={Customers}
          options={{
            tabBarLabel: 'المساعدة', // set the label to المساعدة
            
          }}
        />

<Tab.Screen
          name={'Projects'}
          component={Projects}
          options={{
            tabBarLabel: '', // Empty label to hide the tab
            tabBarButton: () => null, // Render an empty component, effectively hiding the tab screen
          }}
        />
        <Tab.Screen
          name={'Benod'}
          component={Benod}
          options={{
            tabBarLabel: '', // Empty label to hide the tab
            tabBarButton: () => null, // Render an empty component, effectively hiding the tab screen
          }}
        />
        <Tab.Screen
          name={'Photos'}
          component={Photos}
          options={{
            tabBarLabel: '', // Empty label to hide the tab
            tabBarButton: () => null, // Render an empty component, effectively hiding the tab screen
          }}
        />
        
        <Tab.Screen
          name={'Hesabat'}
          component={Hesabat}
          options={{
            tabBarLabel: '', // Empty label to hide the tab
            tabBarButton: () => null, // Render an empty component, effectively hiding the tab screen
          }}
        />
        

        
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default RootStack;
