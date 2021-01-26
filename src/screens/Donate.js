import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Alert,ToastAndroid,Platform} from 'react-native';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import { connect } from 'react-redux';
import changeBloodDonate from '../store/Actions/BloodDonateAction';

function Donate(props) {
  const bloodGroups = [
    {
      group: 'O +',
    },
    {
      group: 'O -',
    },
    {
      group: 'A +',
    },
    {
      group: 'A -',
    },
    {
      group: 'B +',
    },
    {
      group: 'B -',
    },
    {
      group: 'AB +',
    },
    {
      group: 'AB -',
    },
  ];

  const [bloodGroup,setBloodGroup]=useState(null)

  const nextScreen = () => {
    if(bloodGroup === null){
      if (Platform.OS === 'android') {
        ToastAndroid.show(
          'Please Select Your Blood Group!',
          ToastAndroid.LONG,
        );
      } else {
        Alert.alert("Error",'Please Select Your Blood Group!');
      }
    }
    else{
      props.BloodDonate(bloodGroup)
      props.navigation.navigate('Select Location');
    }    
  }

  if ((props.login === false)) {
    return <Home navigation={props.navigation} />;
  }

  return (
    <View style={styles.allCont}>
      <Text style={styles.select}>Select Your Blood Group</Text>
      <View style={styles.AllCards}>
        {bloodGroups.map((blood, value) => {
          return (
            <TouchableOpacity activeOpacity={0.6} style={(blood.group === bloodGroup) ? styles.touch : styles.card} key={value} onPress={()=>{setBloodGroup(blood.group)}}>
              <Text style= {(blood.group === bloodGroup) ? styles.bloodTouch : styles.blood}>{blood.group}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <TouchableOpacity
      onPress={()=>nextScreen()}
        style={styles.nextCount}
        activeOpacity={0.5}
      >
        <Text style={styles.next}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    color: '#E6233F',
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'sans',
    color: '#214151',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  AllCards: {
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  card: {
    width: 110,
    height: 60,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#E6233F',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 26,
    marginTop: 10,
    marginBottom: 10,
  },
  blood: {
    fontSize: 30,
    color: '#214151',
    fontWeight: 'bold',
    fontFamily: 'sans',
  },
  next: {
    color: '#ffffff',
    fontSize: 24,
  },
  nextCount: {
    marginTop: 30,
    borderRadius: 5,
    width: '78%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6233F',
  },
  touch: {
    width: 110,
    height: 60,
    borderWidth: 3,
    borderRadius: 5,
    borderColor: '#E6233F',
    backgroundColor: '#E6233F',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 26,
    marginTop: 10,
    marginBottom: 10,
  },
  bloodTouch:{
    fontSize: 30,
    color: '#ffffff',
    fontWeight: 'bold',
    fontFamily: 'sans',    
  }
});


const mapStateToProps = (state) => ({
  login: state.Login.login,
  blood: state.BloodDonate.bloodDonate
})

const mapDispatchToProp = (dispatch) => ({
  BloodDonate: (bloodDonate) => dispatch(changeBloodDonate(bloodDonate)),
})

export default connect(mapStateToProps, mapDispatchToProp)(Donate);
