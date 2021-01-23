import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function Dashboard() {
  const logout = () => {
    auth()
      .signOut()
      .then(() => console.log('User Logout'))
      .catch(()=> alert('Logout Error'))
  };

  return (
    <View>
      <Text>Dashboard</Text>
      <TouchableOpacity
        onPress={() => {
          logout();
        }}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
