import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  KeyboardAvoidingViewComponent
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Label,
  Button,
} from 'native-base';
import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";

export default function Signup() {
  const cityInput = useRef();
  const emailInput = useRef();
  const mobileInput = useRef();
  const passwordInput = useRef();
  const confirmInput = useRef();
  const createAccount = useRef();

  const [name,setName] = useState("")
  const [city,setCity] = useState("")
  const [email,setEmail] = useState("")
  const [mobile,setMobile] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")

  const nameValidation = /([A-Za-z])\w/;
  const cityValidation = /([A-Za-z])\w/;
  const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const passwordValidation = /^[A-Za-z[0-9]\w{7,}$/;

  const handleSubmit = ()=>{
    if (nameValidation.test(name) === false) {
      alert("Enter Valid Name")
    }
    else if (cityValidation.test(city) === false) {
      alert("Enter Valid City Name")
    }
    else if (emailValidation.test(email) === false) {
      alert("Enter Valid Email Address")
    }
    else if(mobile.length < 11){
      alert("Enter Valid Mobile Number")
    }
    else if (passwordValidation.test(password) === false){
      alert("Invalid Password")
    }
    else if (confirmPassword !== password){
      alert("Password did not match")
    }
    else{
      Keyboard.dismiss()
      createUser()
    }
  }

  const createUser = () => {
    auth().createUserWithEmailAndPassword(email, password)
      .then((e) => {
        let user = e.user.uid
        database().ref('Blood_Bank_Users/' + user).set({
          name,
          city,
          email,
          mobile,
          user,
        })
          .then(function () {
            setName("")
            setCity("")
            setEmail("")
            setMobile("")
            setPassword("")
            setConfirmPassword("")
          })
          .catch(function (error) {
            console.log(error.message);
          });

      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <Container style={{justifyContent:"center"}}>
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={26}>
      <ScrollView>
      <Form>
        <Item stackedLabel>
          <Label>Name</Label>
          <TextInput
            selectionColor='rgba(0, 0, 0, 0.5)'
            keyboardType="default"
            style={styles.inputs}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setName(e)}}
            value={name}
            onSubmitEditing={() => cityInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>City</Label>
          <TextInput
            keyboardType="default"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={cityInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setCity(e)}}
            value={city}
            onSubmitEditing={() => emailInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
          <TextInput
            keyboardType="email-address"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={emailInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setEmail(e)}}
            value={email}
            onSubmitEditing={() => mobileInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Mobile</Label>
          <TextInput
            keyboardType="numeric"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={mobileInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setMobile(e)}}
            value={mobile}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <TextInput
            secureTextEntry={true}
            style={styles.inputs}
            selectionColor='rgba(0, 0, 0, 0.5)'
            underlineColorAndroid="transparent"
            ref={passwordInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setPassword(e)}}
            value={password}
            onSubmitEditing={() => confirmInput.current.focus()}
          />
        </Item>
        <Item stackedLabel last>
          <Label>Confirm Password</Label>
          <TextInput
            secureTextEntry={true}
            selectionColor='rgba(0, 0, 0, 0.5)'
            underlineColorAndroid="transparent"
            ref={confirmInput}
            style={styles.inputs}
            onChangeText={(e)=>{setConfirmPassword(e)}}
            value={confirmPassword}
            onSubmitEditing={() => createAccount.current.focus()}
          />
        </Item>
      </Form>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.cont}>
        <TouchableOpacity
          style={styles.createAccountCont}
          activeOpacity={0.5}
          ref={createAccount}
          onPress={()=>{handleSubmit()}}
        >
          <Text style={styles.createAccount}>Create Account</Text>
        </TouchableOpacity>
      </View>
      <Text></Text>

      </ScrollView>
    </KeyboardAvoidingView>
    </Container>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  createAccount: {
    color: '#ffffff',
    fontSize: 24,
  },
  createAccountCont: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#E6233F',
    width: '76%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6233F',
  },
  inputs:{
    width: '100%',
    height: 40
  },
});
