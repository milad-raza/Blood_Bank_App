import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Image
} from 'react-native';
import {List,ListItem} from 'native-base';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import Home from './Home';
import changeFirebase from '../store/Actions/FirebaseAction';
import Icons from 'react-native-vector-icons/MaterialIcons';

function Preview(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const name = props.firebase.name;
  const mobile = props.firebase.mobile;
  const email = props.firebase.email;
  const user = props.firebase.user;
  const city = props.firebase.city;

  const [blood,setBlood] = useState(props.blood)
  const [gender,setGender] = useState(props.gender)
  const [age,setAge] = useState(props.age)
  const [area,setArea] = useState(props.area)
  const [src,setSrc] = useState( props.image)

  const [loading, setLoading] = useState(false);
  const [loadingActive,setLoadingActive] = useState(true)

  if (name === undefined || name === null) {
    return <ActivityIndicator size="large" color="#214151" style={{flex: 1}} />;
  }

  // const edit = () => {
  //   props.navigation.navigate('Donate')
  // }

  const donate = () => {
    setLoading(true);
    database()
      .ref(`Blood_Bank_Donors/${user}`)
      .set({
        name,
        mobile,
        email,
        user,
        city,
        blood,
        gender,
        age,
        area,
        src
      })
      .then(function () {
        database()
          .ref(`Blood_Bank_Users/${user}`)
          .set({
            name,
            mobile,
            email,
            user,
            city,
            blood,
            gender,
            age,
            area,
            src
          })
          .then(function () {
            setLoading(false);
            if (Platform.OS === 'android') {
              ToastAndroid.show('Posted Successfully', ToastAndroid.LONG);
            } else {
              Alert.alert('Error', 'Posted Successfully');
            }
            props.navigation.navigate('Dashboard');
          })
          .catch(function (error) {
            setLoading(false);

            if (Platform.OS === 'android') {
              ToastAndroid.show(error.message, ToastAndroid.LONG);
            } else {
              Alert.alert('Error', error.message);
            }
          });
      })
      .catch(function (error) {
        setLoading(false);

        if (Platform.OS === 'android') {
          ToastAndroid.show(error.message, ToastAndroid.LONG);
        } else {
          Alert.alert('Error', error.message);
        }
      });
  };


  useEffect(() => {
    if(props.user !== null){
      
     database()
      .ref(`Blood_Bank_Users/${props.user}`)
      .once('value')
      .then((snapshot) => {
        if ((snapshot.val().area !== undefined) && (props.area === null)) {
          setArea(snapshot.val().area)
          setAge(snapshot.val().age)
          setBlood(snapshot.val().blood)
          setGender(snapshot.val().gender)
          setSrc(snapshot.val().src)
          setLoadingActive(false)
        }
        else{
          setArea(props.area)
          setAge(props.age)
          setBlood(props.blood)
          setGender(props.gender)
          setSrc(props.image)
          setLoadingActive(false)
        }
      })}
  }, [props.user,props.blood,props.area,props.image,props.gender]);

  return (
    <>
    {loadingActive 
    ?
    (
      <ActivityIndicator size="large" color="#214151" style={{flex: 1}} />
    )
    :
    (
      <View style={styles.cont}>
      <List>
        <ListItem>
          <Image source={src} style={{width: 50, height: 50, borderRadius: 100}}/>
          {/* <TouchableOpacity style={{marginLeft: 100}} activeOpacity={0.4} onPress={()=>{edit()}}>
            <Icons name="edit" size={28} color="#214151" />
          </TouchableOpacity> */}
        </ListItem>
        <ListItem>
      <Text style={styles.name}>
        Name : <Text>{name}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Age : <Text>{age}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Area : <Text>{area}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        City : <Text>{city}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Gender : <Text>{gender}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Blood Group : <Text>{blood}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Mobile : <Text>{mobile}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Email : <Text style={styles.email}>{email}</Text>
      </Text>
      </ListItem>
      </List>

      <TouchableOpacity
        onPress={() => donate()}
        style={styles.donateCont}
        activeOpacity={0.5}>
        <Text style={styles.donate}>
          {loading ? (
            <ActivityIndicator size="large" color="#ffffff" />
          ) : (
            'Donate'
          )}
        </Text>
      </TouchableOpacity>
    </View>
    )
  }
    
    </>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
    textTransform: "capitalize"
  },
  email:{
    fontSize: 15,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
    textTransform: "lowercase"
  },
  blood:{
    fontSize: 15,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
    textTransform: "uppercase",
  },
  donateCont: {
    marginTop: 10,
    borderRadius: 5,
    width: '70%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6233F',
  },
  donate: {
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
  firebase: state.Firebase.firebase,
  image: state.RandomImage.randomImage
});

export default connect(mapStateToProps)(Preview);
