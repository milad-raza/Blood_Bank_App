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
} from 'react-native';
import {List,ListItem} from 'native-base';
import {connect} from 'react-redux';
import database from '@react-native-firebase/database';
import Home from './Home';

function Preview(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const name = props.firebase.name;
  const mobile = props.firebase.mobile;
  const email = props.firebase.email;
  const user = props.firebase.user;
  const city = props.firebase.city;
  const blood = props.blood;
  const gender = props.gender;
  const age = props.age;
  const area = props.area;

  const [loading, setLoading] = useState(false);

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

  return (
    <View style={styles.cont}>
      <List>
        <ListItem>
      <Text style={styles.name}>
        Name : <Text>{props.firebase.name}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Age : <Text>{props.age}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Area : <Text>{props.area}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        City : <Text>{props.firebase.city}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Gender : <Text>{props.gender}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Blood Group : <Text>{props.blood}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Mobile : <Text>{props.firebase.mobile}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name}>
        Email : <Text>{props.firebase.email}</Text>
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
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
  },
  donateCont: {
    marginTop: 30,
    borderRadius: 5,
    width: '78%',
    height: 50,
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
});

export default connect(mapStateToProps)(Preview);