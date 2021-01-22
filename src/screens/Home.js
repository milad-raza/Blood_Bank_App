import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
const blood_bank = require('../assets/images/blood-bank.png');

function Home(props) {
  const {login, setLogin} = useState(false);

  if (login) {
    return <Text>Dashboard</Text>;
  }

  return (
    <ImageBackground source={blood_bank} style={styles.container}>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.loginCont}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('Login');
          }}>
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
        <Text></Text>
        <Text style={styles.or}>OR</Text>
        <Text></Text>
        <TouchableOpacity
          style={styles.createCont}
          activeOpacity={0.5}
          onPress={() => {
            props.navigation.navigate('Create Account');
          }}>
          <Text style={styles.create}>Create Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain',
  },
  buttons: {
    marginTop: '120%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginCont: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#f5f6f7',
    width: '76%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  login: {
    color: '#ffffff',
    fontSize: 24,
  },
  or: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  createCont: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#f5f6f7',
    width: '76%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  create: {
    color: '#ffffff',
    fontSize: 24,
  },
});

export default Home;
