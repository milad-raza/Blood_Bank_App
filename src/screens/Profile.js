import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
} from 'react-native';
import {List, ListItem, Right, Thumbnail} from 'native-base';
import auth from '@react-native-firebase/auth';
import Home from './Home';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/MaterialIcons';
import database from '@react-native-firebase/database';
import changeDonated from '../store/Actions/DonatedAction';
import changeFirebase from '../store/Actions/FirebaseAction';

function Profile(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const fire = props.firebase.name


  if (fire === undefined || fire === null) {
    return <ActivityIndicator size="large" color="#214151" style={{flex: 1}} />;
  }

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [blood, setBlood] = useState('');
  const [area, setArea] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [src, setSrc] = useState('');

  const [ageInput, setAgeInput] = useState(false);

  useEffect(() => {
    if (props.donorProfile !== {} && props.age !== null) {
      setName(props.firebase.name);
      setCity(props.firebase.city);
      setMobile(props.firebase.mobile);
      setEmail(props.firebase.email);
      setSrc(props.src);
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
      setSrc(props.firebase.src);
    }
  }, []);

  const del = () => {
    database()
      .ref(`Blood_Bank_Donors/${props.user}`)
      .remove()
      .then(() => {
        console.log('delrted');
        props.ChangeDonated(false);
      });
  };

  useEffect(() => {
    database()
      .ref(`Blood_Bank_Donors/${props.user}`)
      .once('value')
      .then((data) => {
        if (data.val() !== null) {
          if (data.val().user === props.user) {
            props.ChangeDonated(true);
          }
        }
      });
  }, []);

  useEffect(() => {
    database()
      .ref(`Blood_Bank_Users/${props.user}`)
      .once('value')
      .then((data) => {
        props.ChangeFirebase(data.val());
      });
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
  //         <Text>

  // <Icons name="edit" size={30} color="#214151" />
  // </Text>

  //     </TouchableOpacity>
  //   </>
  // )}

  const edit = () => {
    props.navigation.navigate('Update')
  }

  return (
    <View style={styles.cont}>
      <List>
        {((props.firebase.src !== undefined) || props.src !== undefined )? (
          <ListItem>
            <Thumbnail
              avatar
              source={src}
              style={{width: 50, height: 50, borderRadius: 100}}
            />
             {/* <TouchableOpacity style={{marginLeft: 100}} activeOpacity={0.4} onPress={()=>{edit()}}>
            <Icons name="edit" size={28} color="#214151" />
          </TouchableOpacity> */}
          </ListItem>
        ) : (
          <></>
        )}
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
            Blood Group : <Text style={styles.blood}>{blood}</Text>
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
        {props.donated ? (
          <ListItem style={{justifyContent: 'space-between'}}>
            <Text style={styles.name}>Posted : Yes</Text>
            <TouchableOpacity
              onPress={() => {
                del();
              }}>
              <Icon
                name="delete-outline"
                size={30}
                style={styles.icon}
                color={'red'}
              />
            </TouchableOpacity>
          </ListItem>
        ) : (
          <ListItem>
            <Text style={styles.name}>Posted : No</Text>
          </ListItem>
        )}
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
    fontSize: 16,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
    textTransform: 'capitalize',
  },
  email: {
    fontSize: 16,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
    textTransform: 'lowercase',
  },
  blood: {
    fontSize: 16,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
    textTransform: 'uppercase',
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
  del: {
    height: 30,
  },
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
  src: state.RandomImage.randomImage,
  donated: state.Donated.donated,
});

const mapDispatchToProp = (dispatch) => ({
  ChangeDonated: (donated) => dispatch(changeDonated(donated)),
  ChangeFirebase: (firebase) => dispatch(changeFirebase(firebase)),
});

export default connect(mapStateToProps, mapDispatchToProp)(Profile);