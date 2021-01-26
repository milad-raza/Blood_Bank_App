import React from 'react';
import {View, Text} from 'react-native';
import Home from './Home';
import {connect} from 'react-redux';

function DonateLocation(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  return (
    <View>
      <Text>DonateLocation</Text>
    </View>
  );
}

const mapStateToProps = (state) => ({
  login: state.Login.login,
  blood: state.BloodDonate.bloodDonate,
});

// const mapDispatchToProp = (dispatch) => ({
//   BloodDonate: (bloodDonate) => dispatch(changeBloodDonate(bloodDonate)),
// })

export default connect(mapStateToProps)(DonateLocation);
