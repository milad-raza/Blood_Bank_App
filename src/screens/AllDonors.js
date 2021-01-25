import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import Home from './Home';

export default function AllDonors(props) {
  const [notLogin, setNotLogin] = useState(false); 

  useEffect(() => {
      return(
    auth().onAuthStateChanged(function (user) {
        if (user) {
          setNotLogin(false);

        } else {
          setNotLogin(true);
        }
      }))
  }, [auth])

  if (notLogin) {
    return <Home navigation={props.navigation} />;
  }

  return (
    <View>
      <Text>ALL Donors</Text>
    </View>
  );
}
