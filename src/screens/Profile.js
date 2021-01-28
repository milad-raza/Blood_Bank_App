import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {List, ListItem, Right} from 'native-base';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons'

function Profile(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [blood, setBlood] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');

  const [ageInput, setAgeInput] = useState(false);

  useEffect(() => {
    if (props.donorProfile !== {} && props.age !== null) {
      setName(props.firebase.name);
      setCity(props.firebase.city);
      setMobile(props.firebase.mobile);
      setEmail(props.firebase.email);
      setAge(props.age);
      setArea(props.area);
      setGender(props.gender);
      setBlood(props.blood);
    } else {
      setName(props.firebase.name);
      setCity(props.firebase.city);
      setMobile(props.firebase.mobile);
      setEmail(props.firebase.email);
      setAge(props.firebase.age);
      setArea(props.firebase.area);
      setGender(props.firebase.gender);
      setBlood(props.firebase.blood);
    }
  }, []);

  // const handleChange = () => {
  //   setAgeInput(false)
  // }

  // {ageInput ? (
  //   <>
  //     <Text style={styles.name}>Age :</Text>
  //     <TextInput
  //       underlineColorAndroid="transparent"
  //       selectionColor="rgba(0, 0, 0, 0.5)"
  //       style={styles.inputs}
  //       autoCapitalize="none"
  //       autoCorrect={false}
  //     />
  //     <TouchableOpacity activeOpacity={0.5} onPress={()=>{handleChange()}}>
  //       <Icon name="check" size={30} style={styles.icon} />
  //     </TouchableOpacity>
  //   </>
  // ) : (
  //   <>
  //     <Text style={styles.name}>
  //       Age : <Text>{age}</Text>
  //     </Text>
  //     <TouchableOpacity
  //       onPress={() => {
  //         setAgeInput(true);
  //       }}>
  //         <Text>                             <Icons name="edit" size={30} color="#214151" /></Text>
        
  //     </TouchableOpacity>
  //   </>
  // )}

  return (
    <View style={styles.cont}>
      <List>
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
            Email : <Text>{email}</Text>
          </Text>
        </ListItem>
      </List>
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
  // inputs: {
  //   width: 150,
  //   height: 30,
  //   marginLeft: 10,
  //   borderColor: '#214151',
  //   borderWidth: 2,
  //   borderBottomRightRadius: 0,
  //   borderTopRightRadius: 0,
  //   borderRadius: 5,
  //   padding: 0,
  //   paddingLeft: 10,
  //   paddingRight: 10,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: '#214151',
  // },
  // icon: {
  //   backgroundColor: '#214151',
  //   height: 30,
  //   borderWidth: 2,
  //   borderRadius: 5,
  //   borderTopLeftRadius: 0,
  //   borderColor: '#214151',
  //   borderBottomLeftRadius: 0,
  //   color: '#ffffff'
  // },
});

const mapStateToProps = (state) => ({
  donorProfile: state.DonorProfile.donorProfile,
  login: state.Login.login,
  user: state.User.user,
  blood: state.BloodDonate.bloodDonate,
  gender: state.Gender.gender,
  age: state.Age.age,
  area: state.Area.area,
  firebase: state.Firebase.firebase,
});

// const mapDispatchToProp = (dispatch) => ({
//   BloodDonate: (bloodDonate) => dispatch(changeBloodDonate(bloodDonate)),
// })

export default connect(mapStateToProps)(Profile);
