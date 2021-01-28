import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
const blood_bank = require('../assets/images/blood-bank.png');
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Dashboard from './Dashboard';
import { connect } from 'react-redux';
import changeLogin from '../store/Actions/LoginAction';
import changeUser from '../store/Actions/UserAction';
import changeFirebase from '../store/Actions/FirebaseAction';

function Home(props) {

    useEffect(()=>{
    return(
    auth().onAuthStateChanged(function (user) {
      if (user) {
        props.ChangeLogin(true)
        props.ChangeUser(user.uid)

        database()
        .ref(`Blood_Bank_Users/${user.uid}`)
        .once('value')
        .then(data => {
          props.ChangeFirebase(data.val())
        });

      } 
      else {
        props.ChangeLogin(false)
        props.ChangeUser(null)
        props.ChangeFirebase([])
      }
    }));
  },[auth])
  
      // console.log(props.login)
      // console.log(props.user)
      // console.log(props.blood)
      // console.log(props.gender)
      // console.log(props.age)
      // console.log(props.area)

  if ((props.login)) {
    return (<Dashboard data={props.navigation} />);
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
    marginTop: '110%',
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

const mapStateToProps = (state) => ({
  login: state.Login.login,
  user: state.User.user,
  blood: state.BloodDonate.bloodDonate,
  gender: state.Gender.gender,
  age: state.Age.age,
  area: state.Area.area,
})

const mapDispatchToProp = (dispatch) => ({
  ChangeLogin: (login) => dispatch(changeLogin(login)),
  ChangeUser: (user) => dispatch(changeUser(user)),
  ChangeFirebase: (firebase) => dispatch(changeFirebase(firebase))
})

export default connect(mapStateToProps,mapDispatchToProp)(Home);
