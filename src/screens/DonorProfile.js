import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {List,ListItem} from 'native-base';
import {connect} from 'react-redux';
import Home from '../screens/Home';

function DonorProfile(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const name = props.route.params.name;
  const age = props.route.params.age;
  const area = props.route.params.area;
  const city = props.route.params.city;
  const email = props.route.params.email;
  const mobile = props.route.params.mobile;
  const gender = props.route.params.gender;
  const blood = props.route.params.blood;

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
  )
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
  });

const mapStateToProps = (state) => ({
  login: state.Login.login,
});

export default connect(mapStateToProps)(DonorProfile);
