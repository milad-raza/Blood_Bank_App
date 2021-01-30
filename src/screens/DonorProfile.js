import React from 'react';
import {View, Text, StyleSheet,Linking,Image} from 'react-native';
import {List,ListItem} from 'native-base';
import {connect} from 'react-redux';
import Home from '../screens/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TouchableOpacity } from 'react-native-gesture-handler';

function DonorProfile(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const name = props.donorProfile.name;
  const age = props.donorProfile.age;
  const area = props.donorProfile.area;
  const city = props.donorProfile.city;
  const email = props.donorProfile.email;
  const mobile = props.donorProfile.mobile;
  const gender = props.donorProfile.gender;
  const blood = props.donorProfile.blood;
  const src = props.donorProfile.src

  return (
    <View style={styles.cont}>
        <List>
          <ListItem>
          <Image source={src} style={{width: 50, height: 50, borderRadius: 100}}/>
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
        Blood Group : <Text style={styles.blood}>{blood}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name} onPress={()=>{Linking.openURL(`tel:${mobile}`);}}>
        Mobile : <Text>{mobile}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text style={styles.name} onPress={()=>{Linking.openURL(`mailto:${email}`);}}>
        Email : <Text style={styles.email}>{email}</Text>
      </Text>
      </ListItem>
      <ListItem>
      <Text >
        <TouchableOpacity onPress={()=>{Linking.openURL(`tel:${mobile}`);}} activeOpacity={0.6}>
        <Icon name="phone" size={34} color="#214151" />
        </TouchableOpacity>
        <Text>       </Text>
        <TouchableOpacity onPress={()=>{Linking.openURL(`sms:${mobile}`);}} activeOpacity={0.6}>
        <Icon name="message-text" size={34} color="#214151" />
        </TouchableOpacity>
        <Text>       </Text>
        <TouchableOpacity onPress={()=>{Linking.openURL(`mailto:${email}`);}} activeOpacity={0.6}>
        <Icon name="email" size={34} color="#214151" />
        </TouchableOpacity>
      </Text>
      </ListItem>
      </List>
    </View>
  )
}

const styles = StyleSheet.create({
    cont: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    name:{
      fontSize: 18,
      fontFamily: 'sans',
      fontWeight: 'bold',
      color: '#214151',
      textTransform : "capitalize",
    },
    email:{
      fontSize: 18,
      fontFamily: 'sans',
      fontWeight: 'bold',
      color: '#214151',
      textTransform: "lowercase"
    },
    blood:{
      fontSize: 18,
      fontFamily: 'sans',
      fontWeight: 'bold',
      color: '#214151',
      textTransform: "uppercase",
    }
  });

const mapStateToProps = (state) => ({
  login: state.Login.login,
  donorProfile: state.DonorProfile.donorProfile
});

export default connect(mapStateToProps)(DonorProfile);
