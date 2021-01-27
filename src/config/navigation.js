import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import auth from '@react-native-firebase/auth';
import Home from '../screens/Home';
import Signup from '../screens/CreateAccount';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import Donate from '../screens/Donate';
import AllDonors from '../screens/AllDonors';
import Profile from '../screens/Profile';
import FindDonor from '../screens/FindDonor';
import Details from '../screens/Details';
import DonorProfile from '../screens/DonorProfile';
import Preview from '../screens/Preview';
import {connect} from 'react-redux';

const Stack = createStackNavigator();

function AppNavigation(props) {
  
  const logout = () => {
    auth().signOut().then(null).catch(null);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Dashboard"
          component={Home}
          options={
            props.login
              ? {
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
              : {headerShown: false}
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
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
        />
        <Stack.Screen
          name="Find A Donor"
          component={FindDonor}
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
        />
        <Stack.Screen
          name="All Donors"
          component={AllDonors}
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
        />
        <Stack.Screen
          name="Preview"
          component={Preview}
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
        />
        <Stack.Screen
          name="Donor Profile"
          component={DonorProfile}
          options={
            props.login
              ? {
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
              : {headerShown: false}
          }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => ({
  login: state.Login.login,
});

export default connect(mapStateToProps)(AppNavigation);
