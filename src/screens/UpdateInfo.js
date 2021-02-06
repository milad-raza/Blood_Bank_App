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
  KeyboardAvoidingViewComponent,
  ActivityIndicator,
  ToastAndroid,
  Platform,
  Alert
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
import {connect} from 'react-redux';
import changeAge from '../store/Actions/AgeAction';
import changeArea from '../store/Actions/AreaAction';


function UpdateInfo(props) {

  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const areaInput = useRef();
  const ageInput = useRef();
  const mobileInput = useRef();

  const [city,setCity] = useState(props.firebase.city)
  const [area,setArea] = useState(props.firebase.area)
  const [age,setAge] = useState(props.firebase.age)
  const [mobile,setMobile] = useState(props.firebase.mobile)

  const name = props.firebase.name
  const email = props.firebase.email
  const user = props.firebase.user
  const src = props.firebase.src
  const gender = props.firebase.gender
  const blood = props.firebase.blood

  const [loading,setLoading] = useState(false)

  const areaValidation = /([A-Za-z])\w/;
  const cityValidation = /([A-Za-z])\w/;

  const handleUpdate = ()=>{
    Keyboard.dismiss()
   
    if (cityValidation.test(city) === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid City Name!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid City Name!");
      }
    }
    else if (areaValidation.test(area) === false) {
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Area!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Area!");
      }
    }
    else if(age.length !== 2){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Age!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Age!");
      }
    }
    else if(mobile.length < 11){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Mobile Number!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Mobile Number!");
      }
    }
    
    else{
      setLoading(true)
      Keyboard.dismiss()
      update()
    }
  }

  const update = () => {
    database().ref(`Blood_Bank_Users/${user}`).set({
      name,
      email,
      src,
      gender,
      blood,
      user,
      city,
      area,
      age,
      mobile,
    })
    .then(() => {
      props.Age(age)
      props.Area(area)

      if(props.donated === true){
        database().ref(`Blood_Bank_Donors/${user}`).set({
          name,
          email,
          src,
          gender,
          blood,
          user,
          city,
          area,
          age,
          mobile,
        })
        .then(() => {
           props.navigation.navigate('Dashboard')
           if (Platform.OS === 'android') {
            ToastAndroid.show("Profile Updated Successfully!", ToastAndroid.SHORT)
          } else {
            Alert.alert("Success","Profile Updated Successfully!");
          }
        })
      }
      else{
        props.navigation.navigate('Dashboard')
        if (Platform.OS === 'android') {
          ToastAndroid.show("Profile Updated Successfully!", ToastAndroid.SHORT)
        } else {
          Alert.alert("Success","Profile Updated Successfully!");
        }
      }

      
    });
  };

  return (
    <Container style={{justifyContent:"center"}}>
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={50}>
      <ScrollView keyboardShouldPersistTaps='handled'>
      <Form>
        <Item stackedLabel>
          <Label>City</Label>
          <TextInput
            selectionColor='rgba(0, 0, 0, 0.5)'
            keyboardType="default"
            style={styles.inputs}
            underlineColorAndroid="transparent"
            returnKeyType="next"
            blurOnSubmit={false}
            autoCorrect={false}
            onChangeText={(e)=>{setCity(e)}}
            value={city}
            onSubmitEditing={() => areaInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
          <Label>Area</Label>
          <TextInput
            keyboardType="default"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={areaInput}
            returnKeyType="next"
            blurOnSubmit={false}
            autoCorrect={false}
            onChangeText={(e)=>{setArea(e)}}
            value={area}
            onSubmitEditing={() => ageInput.current.focus()}
          />
        </Item>
        <Item stackedLabel>
        <Label>Age</Label>
          <TextInput
            keyboardType="numeric"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={ageInput}
            returnKeyType="next"
            blurOnSubmit={false}
            onChangeText={(e)=>{setAge(e)}}
            value={age}
            onSubmitEditing={() => mobileInput.current.focus()}
          />
        </Item>
        <Item stackedLabel last>
          <Label>Mobile</Label>
          <TextInput
            keyboardType="numeric"
            selectionColor='rgba(0, 0, 0, 0.5)'
            style={styles.inputs}
            underlineColorAndroid="transparent"
            ref={mobileInput}
            returnKeyType="done"
            onChangeText={(e)=>{setMobile(e)}}
            value={mobile}
            onSubmitEditing={() => handleUpdate()}
          />
        </Item>
      </Form>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <View style={styles.cont}>
        <TouchableOpacity
          style={styles.createAccountCont}
          activeOpacity={0.5}
          disabled = {loading ? true : false}
          onPress={()=>{handleUpdate()}}
        >
          <Text style={styles.createAccount}>
            {loading ? <ActivityIndicator size="large" color="#ffffff" /> : "Update"}
            </Text>
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

const mapStateToProps = (state) => ({
  login: state.Login.login,
  user: state.User.user,
  blood: state.BloodDonate.bloodDonate,
  gender: state.Gender.gender,
  age: state.Age.age,
  area: state.Area.area,
  firebase: state.Firebase.firebase,
  src: state.RandomImage.randomImage,
  donated: state.Donated.donated,
});

const mapDispatchToProp = (dispatch) => ({
  Age: (age) => dispatch(changeAge(age)),
  Area: (area) => dispatch(changeArea(area)),
});

export default connect(mapStateToProps,mapDispatchToProp)(UpdateInfo);
