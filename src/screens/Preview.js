import React from 'react';
import {View,Text} from 'react-native';
import {connect} from 'react-redux';
import Home from './Home'

function Preview(props) {
    if (props.login === false) {
        return <Home navigation={props.navigation} />;
      }
      
      // console.log(props.login)
      // console.log(props.user)
      // console.log(props.blood)
      // console.log(props.gender)
      // console.log(props.age)
      // console.log(props.area)

    return (
        <View>
            <Text>Preview</Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    login: state.Login.login,
    user: state.User.user,
    blood: state.BloodDonate.bloodDonate,
    gender: state.Gender.gender,
    age: state.Age.age,
    area: state.Area.area,
  
  });
  
//   const mapDispatchToProp = (dispatch) => ({
//     Gender: (gender) => dispatch(changeGender(gender)),
//     Age: (age) => dispatch(changeAge(age)),
//     Area: (area) => dispatch(changeArea(area)),
//   })
  
export default connect(mapStateToProps)(Preview);

