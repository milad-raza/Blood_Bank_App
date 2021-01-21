import React, {useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
} from 'native-base';

export default function Signup() {
  const emailInput = useRef();
  const mobileInput = useRef();
  const passwordInput = useRef();
  const confirmInput = useRef();
  const signup = useRef();

  return (
    <Container>
      <Form>
        <Item stackedLabel>
          <Label>Name</Label>
          <TextInput
            style={{backgroundColor: 'red', width: '100%'}}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => emailInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Email</Label>
          <TextInput
            keyboardType="email-address"
            ref={emailInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => mobileInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Mobile</Label>
          <Input
            keyboardType="numeric"
            ref={mobileInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            ref={passwordInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onSubmitEditing={() => confirmInput.current.focus()}
          />
        </Item>
        <Item stackedLabel last>
          <Label>Confirm Password</Label>
          <Input
            secureTextEntry={true}
            ref={confirmInput}
            onSubmitEditing={() => signup.current.focus()}
          />
        </Item>
      </Form>
      <Text></Text>
      <View style={styles.cont}>
        <TouchableOpacity
          style={styles.signupCont}
          activeOpacity={0.5}
          ref={singup}>
          <Text style={styles.signup}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  cont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup: {
    color: '#ffffff',
    fontSize: 24,
  },
  signupCont: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#E6233F',
    width: '76%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6233F',
  },
});
