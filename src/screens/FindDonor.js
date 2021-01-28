import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import {connect} from 'react-redux';

function FindDonor(props) {

  if ((props.login === false)) {
    return <Home navigation={props.navigation} />;
  }

  return (
    <View>
      <Text>FindDonor</Text>
    </View>
  );
}

const mapStateToProps = (state) => ({
  login: state.Login.login,
})

// const mapDispatchToProp = (dispatch) => ({
//   BloodDonate: (bloodDonate) => dispatch(changeBloodDonate(bloodDonate)),
// })

export default connect(mapStateToProps)(FindDonor);
