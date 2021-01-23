import React, {useRef,useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  Container,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';
import auth from "@react-native-firebase/auth";

export default function Signup() {
  const passwordInput = useRef();
  const loginBtn = useRef();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const emailValidation = /^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
  const passwordValidation = /^[A-Za-z[0-9]\w{7,}$/;

  const handleSubmit = ()=>{
    if (emailValidation.test(email) === false) {
      alert("Enter Valid Email")
    }
    else if (passwordValidation.test(password) === false){
      alert("Enter Valid Password")
    }
    else{
      Keyboard.dismiss()
      loginUser()
    }
  }

  const loginUser = () => {
    auth().signInWithEmailAndPassword(email, password)
    .then(function(e){
      auth.user
      setEmail("")
      setPassword("")
      console.log(e)
    })
    .catch((error) => {
      alert(error.message);
    });
  }

  return (
    <Container style={{justifyContent:"center"}}>
      
      <Form>
        <Item stackedLabel>
          <Label>Email</Label>
          <TextInput
            value={email}
            style={styles.inputs}
            underlineColorAndroid="transparent"
            selectionColor='rgba(0, 0, 0, 0.5)'
            keyboardType="email-address"
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setEmail(e)}}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
        </Item>
        <Item stackedLabel last>
          <Label>Password</Label>
          <TextInput
            value={password}
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            ref={passwordInput}
            onChangeText={(e)=>{setPassword(e)}}
            onSubmitEditing={() => loginBtn.current.focus()}
          />
        </Item>
        </Form>
        <Text></Text>
        <Text></Text>

      <View style={styles.cont}>
        <TouchableOpacity
          style={styles.loginCont}
          activeOpacity={0.5}
          ref={loginBtn}
          onPress={()=>{handleSubmit()}}  
        >
          <Text style={styles.login}>Login</Text>
        </TouchableOpacity>
      </View>
        </Container>
        )
    }

    const styles = StyleSheet.create({
        cont: {
            justifyContent: 'center',
            alignItems: 'center',
          },
          login: {
            color: '#ffffff',
            fontSize: 24,
          },
          loginCont: {
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
    })