import React,{useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialIcons"
import auth from '@react-native-firebase/auth'
import Home from '../screens/Home';
import Signup from '../screens/CreateAccount';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Donate from '../screens/Donate';
import AllDonors from '../screens/AllDonors';
import Profile from '../screens/Profile';
import FindDonor from '../screens/FindDonor';

const Stack = createStackNavigator();

function AppNavigation() {

  const [login, setLogin] = useState(false);
  auth().onAuthStateChanged(function (user) {
    if (user) {
      setLogin(true)
    }
    else{
      setLogin(false)
    }
  });

  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User Logout'))
      .catch(()=> alert('Logout Error'))
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Home}
          options=
          {login?
            {
              headerTintColor: '#ffffff',
              headerRight: () => (
                <Icon
                  name="logout"
                  size={30}
                  style={{marginRight: 10}}
                  color="#fff"
                  onPress={() => {
                    logout();
                  }}
                />
              ),
              headerStyle: {
                backgroundColor: '#E6233F',
              },
            }
            :
            {headerShown: false}
          }
        />
        <Stack.Screen
          name="Create Account"
          component={Signup}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#E6233F',
            },
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTintColor: '#ffffff',
            headerStyle: {
              backgroundColor: '#E6233F',
            },
          }}
        />
        <Stack.Screen
          name="Donate"
          component={Donate}
          options={{
            headerTintColor: '#ffffff',
            headerRight: () => (
              <Icon
                name="logout"
                size={30}
                style={{marginRight: 10}}
                color="#fff"
                onPress={() => {
                  logout();
                }}
              />
            ),
            headerStyle: {
              backgroundColor: '#E6233F',
            },
          }}
        />
         <Stack.Screen
          name="Find A Donor"
          component={FindDonor}
          options={{
            headerTintColor: '#ffffff',
            headerRight: () => (
              <Icon
                name="logout"
                size={30}
                style={{marginRight: 10}}
                color="#fff"
                onPress={() => {
                  logout();
                }}
              />
            ),
            headerStyle: {
              backgroundColor: '#E6233F',
            },
          }}
        />
        <Stack.Screen
          name="All Donors"
          component={AllDonors}
          options={{
            headerTintColor: '#ffffff',
            headerRight: () => (
              <Icon
                name="logout"
                size={30}
                style={{marginRight: 10}}
                color="#fff"
                onPress={() => {
                  logout();
                }}
              />
            ),
            headerStyle: {
              backgroundColor: '#E6233F',
            },
          }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerTintColor: '#ffffff',
            headerRight: () => (
              <Icon
                name="logout"
                size={30}
                style={{marginRight: 10}}
                color="#fff"
                onPress={() => {
                  logout();
                }}
              />
            ),
            headerStyle: {
              backgroundColor: '#E6233F',
            },
          }}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;
