import React,{useEffect,useRef,useState} from 'react';
import {View, Text, StyleSheet,TouchableOpacity,ToastAndroid,Keyboard,Alert,TextInput,ScrollView,KeyboardAvoidingView} from 'react-native';
import Home from './Home';
import {connect} from 'react-redux';
import {
  Container,
  Form,
  Item,
  Label,
  Button,
} from 'native-base';
import changeGender from '../store/Actions/GenderAction';
import changeAge from '../store/Actions/AgeAction';
import changeArea from '../store/Actions/AreaAction';
import changeRandomImage from '../store/Actions/RandomImageAction'

const boys = [require('../assets/images/boy1.png'), require('../assets/images/boy2.png'), require('../assets/images/boy3.png'), require('../assets/images/boy4.png'), require('../assets/images/boy5.png'), require('../assets/images/boy6.png'), require('../assets/images/boy7.png'),  require('../assets/images/boy8.png'),]
const girls = [require('../assets/images/girl1.png'), require('../assets/images/girl2.png'), require('../assets/images/girl3.png'), require('../assets/images/girl4.png'), require('../assets/images/girl5.png'), require('../assets/images/girl6.png'), require('../assets/images/girl7.png'), require('../assets/images/girl8.png'),]



function Details(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const areaInput = useRef();
  const [age,setAge] = useState("")
  const [area,setArea] = useState("")
  const [gender,setGender] = useState("")
  const [image,setImage] = useState("")

  useEffect(()=>{
    if(gender === "Male"){
      var randomBoy = Math.floor(Math.random() * boys.length)
      setImage(boys[randomBoy])

    }
    else if(gender === "Female"){
      var randomGirl = Math.floor(Math.random() * girls.length)
      setImage(girls[randomGirl])
    }
  },[gender])

  const preview = () => {
    Keyboard.dismiss();
    if(gender === "" ){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Select Your Gender!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Select Your Gender!");
      }
    }
    else if(age.length !== 2){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Age!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Age!");
      }
    }
    else if(area === "" || area === " "){
      if (Platform.OS === 'android') {
        ToastAndroid.show("Please Enter Valid Area!", ToastAndroid.SHORT)
      } else {
        Alert.alert("Error","Please Enter Valid Area!");
      }
    }
    else{
      props.Image(image)
      props.Gender(gender)
      props.Age(age)
      props.Area(area)
      props.navigation.navigate('Preview')
    }
  }

  return (

    <Container style={{justifyContent:"center"}}>
    <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={-170}>
      <ScrollView keyboardShouldPersistTaps='handled'>
      <Form>
        <View style={styles.AllCards}> 
        <Text style={styles.select}>Select Your Gender</Text>
        </View>
        <Item >
        <View style={styles.AllCards}>
              <TouchableOpacity activeOpacity={0.6} 
              style={(gender === "Male") ? styles.touch : styles.card}
                onPress={()=>{setGender("Male")}}>
                <Text 
                style={(gender === "Male") ? styles.genderTouch : styles.gender}
                >Male</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.6} 
              style={(gender === "Female") ? styles.touch : styles.card}
                onPress={()=>{setGender("Female")}}>
                <Text 
                style={(gender === "Female") ? styles.genderTouch : styles.gender}
                >Female</Text>
              </TouchableOpacity>
        </View> 
        </Item>
        <View style={styles.AllCards}> 
        <Text style={styles.select}>Enter Your Age</Text>
        </View>
        <Item style={styles.AllCards}>
              <View style={styles.card}>
              <TextInput style={styles.input}
              keyboardType="numeric"
              selectionColor='rgba(0, 0, 0, 0.5)'
              underlineColorAndroid="transparent"
              returnKeyType="next"
              blurOnSubmit={false}
              placeholder="18"
              placeholderTextColor="grey"
              onChangeText={(e)=>{setAge(e)}}
              value={age}
              onSubmitEditing={() => areaInput.current.focus()}
              />
            </View>
      </Item>
      <View style={styles.AllCards}> 
        <Text style={styles.select}>Enter Your Area</Text>
        </View>
        <Item style={styles.AllCards} stackedLabel last>
              <View style={styles.card}>
              <TextInput style={styles.input}
              keyboardType="default"
              selectionColor='rgba(0, 0, 0, 0.5)'
              underlineColorAndroid="transparent"
              ref={areaInput}
              placeholder="Area"
              placeholderTextColor="grey"
              onChangeText={(e)=>{setArea(e)}}
              value={area}
              onSubmitEditing={() => {preview()}}
              />
            </View>
      </Item>
      </Form>
      <Text></Text>
      <Text></Text>
      <View style={styles.cont}>
       <TouchableOpacity
          style={styles.previewCont}
          activeOpacity={0.5}
          onPress={()=>{preview()}}
        >
          <Text style={styles.preview}>
          Preview
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
    justifyContent:"center",
    alignItems: "center",
  },
  select: {
    color: '#E6233F',
    fontSize: 25,
    fontFamily: 'sans',
    color: '#214151',
    fontWeight: 'bold',
    marginBottom: 5,
    alignItems:"center"
  },
  AllCards: {
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginBottom: 10,
  },
  card: {
    width: 128,
    height: 50,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#E6233F',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  touch: {
    width: 128,
    height: 50,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#214151',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#E6233F",
    margin: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  input:{
    fontSize: 24,
    color: '#214151',
    fontWeight: 'bold',
    fontFamily: 'sans',
    width: 130,
    height: 48,
    textAlign: "center",
  },
  gender: {
    fontSize: 24,
    color: '#214151',
    fontWeight: 'bold',
    fontFamily: 'sans',
    textAlign: "center",
  },
  genderTouch:{
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'sans',
    textAlign: "center",
  },
  preview: {
    color: '#ffffff',
    fontSize: 24,
  },
  previewCont: {
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#E6233F',
    width: '76%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6233F',
  },
})

const mapStateToProps = (state) => ({
  login: state.Login.login,
  blood: state.BloodDonate.bloodDonate,
  gender: state.Gender.gender,
  age: state.Age.age,
  area: state.Area.area,
  image: state.RandomImage.randomImage

});

const mapDispatchToProp = (dispatch) => ({
  Gender: (gender) => dispatch(changeGender(gender)),
  Age: (age) => dispatch(changeAge(age)),
  Area: (area) => dispatch(changeArea(area)),
  Image: (image) => dispatch(changeRandomImage(image))

})

export default connect(mapStateToProps,mapDispatchToProp)(Details);
