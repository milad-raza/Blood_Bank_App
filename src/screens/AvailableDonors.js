import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Platform,
  ToastAndroid,
  Alert,
  Keyboard,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Item,
  Right,
} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import Home from './Home';
import {connect} from 'react-redux';
import changeDonorProfile from '../store/Actions/DonorProfileAction';

const boy = require('../assets/images/boy.png');
const girl = require('../assets/images/girl.png');

function AvailableDonors(props) {
  if (props.login === false) {
    return <Home navigation={props.navigation} />;
  }

  const donors = props.donors;

  const [filter, setFilter] = useState([]);
  const [city, setCity] = useState('');
  const [oldData, setOldData] = useState([]);

  useEffect(() => {
    const recipient = props.recipient;
    setFilter([]);
    donors.map((value, index) => {
      const blood = value.blood;

      if (recipient === 'AB +') {
        setFilter(donors);
        setOldData(donors);
      } else if (recipient === 'AB -') {
        const data = ['O -', 'A -', 'B -', 'AB -'];
        data.map((check) => {
          if (check === blood) {
            setFilter((old) => [...old, value]);
            setOldData((old) => [...old, value]);
          }
        });
      } else if (recipient === 'B +') {
        const data = ['O -', 'O +', 'B -', 'B +'];
        data.map((check) => {
          if (check === blood) {
            setFilter((old) => [...old, value]);
            setOldData((old) => [...old, value]);
          }
        });
      } else if (recipient === 'B -') {
        const data = ['O -', 'B -'];
        data.map((check) => {
          if (check === blood) {
            setFilter((old) => [...old, value]);
            setOldData((old) => [...old, value]);
          }
        });
      } else if (recipient === 'A +') {
        const data = ['O -', 'A -', 'O +', 'A +'];
        data.map((check) => {
          if (check === blood) {
            setFilter((old) => [...old, value]);
            setOldData((old) => [...old, value]);
          }
        });
      } else if (recipient === 'A -') {
        const data = ['O -', 'A -'];
        data.map((check) => {
          if (check === blood) {
            setFilter((old) => [...old, value]);
            setOldData((old) => [...old, value]);
          }
        });
      } else if (recipient === 'O +') {
        const data = ['O -', 'O +'];
        data.map((check) => {
          if (check === blood) {
            setFilter((old) => [...old, value]);
            setOldData((old) => [...old, value]);
          }
        });
      } else if (recipient === 'O -') {
        const data = ['O -'];
        data.map((check) => {
          if (check === blood) {
            setFilter((old) => [...old, value]);
            setOldData((old) => [...old, value]);
          }
        });
      }
    });
  }, []);

  const search = () => {
    Keyboard.dismiss();
    if (city === ' ') {
      if (Platform.OS === 'android') {
        ToastAndroid.show('Please Enter Valid City Name!', ToastAndroid.LONG);
      } else {
        Alert.alert('Error', 'Please Enter Valid City Name!');
      }
    } else if (city === '') {
      setFilter([]);
      setFilter(oldData);
    } else {
      setFilter([]);
      filter.map((value) => {
        const cityname = value.city;
        if (typeof cityname !== 'undefined') {
          const lowername = cityname.toLowerCase();
          const lowercity = city.toLowerCase();
          if (lowername === lowercity) {
            setFilter((old) => [...old, value]);
          }
        } else {
          setFilter(null);
        }
      });
    }
  };

  const change = (e) => {
    if (e === '') {
      setFilter(oldData);
      setCity(e);
    } else {
      setCity(e);
    }
  };

  if (donors.length < 1) {
    return <ActivityIndicator size="large" color="#214151" style={{flex: 1}} />;
  }

  if (filter.length < 1) {
    return <ActivityIndicator size="large" color="#214151" style={{flex: 1}} />;
  }

  const view = (name, age, city, area, blood, mobile, email, gender) => {
    props.DonorProfile({name, age, city, area, blood, mobile, email, gender});
    props.navigation.navigate('Donor Profile');
  };

  if (filter === null) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 26,
            color: '#214151',
            fontWeight: 'bold',
            fontFamily: 'georgia',
          }}>
          No Donor Found In {city}
        </Text>
      </View>
    );
  }

  return (
    <Container>
      <Item style={styles.upp}>
        <TextInput
          keyboardType="default"
          selectionColor="rgba(0, 0, 0, 0.5)"
          style={styles.inputs}
          underlineColorAndroid="transparent"
          placeholder="Search By City"
          placeholderTextColor={'grey'}
          onChangeText={(e) => {
            change(e);
          }}
          value={city}
          returnKeyType="search"
          onSubmitEditing={() => {
            search();
          }}
        />
        <TouchableOpacity
          style={styles.icon}
          activeOpacity={0.5}
          onPress={() => {
            search();
          }}>
          <Icon name="magnifying-glass" size={28} color="#ffffff" />
        </TouchableOpacity>
      </Item>
      <ScrollView>
        {filter.map((donor, index) => {
          return (
            <Content key={index}>
              <List>
                <ListItem thumbnail>
                  <Left>
                    <Thumbnail
                      square
                      source={donor.gender === 'Male' ? boy : girl}
                    />
                  </Left>
                  <Body>
                    <Text style={styles.name}>{donor.name}</Text>
                    <Text note numberOfLines={1} style={styles.blood}>
                      Blood Group :{' '}
                      <Text style={{fontWeight: 'bold', color: '#214151'}}>
                        {donor.blood}
                      </Text>
                    </Text>
                  </Body>
                  <Right>
                    <TouchableOpacity
                      style={styles.view}
                      activeOpacity={0.4}
                      onPress={() => {
                        view(
                          donor.name,
                          donor.age,
                          donor.city,
                          donor.area,
                          donor.blood,
                          donor.mobile,
                          donor.email,
                          donor.gender,
                        );
                      }}>
                      <Text style={{fontSize: 18, color: '#214151'}}>View</Text>
                    </TouchableOpacity>
                  </Right>
                </ListItem>
              </List>
            </Content>
          );
        })}
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  name: {
    fontSize: 18,
    fontFamily: 'sans',
    fontWeight: 'bold',
    color: '#214151',
    textTransform: "capitalize",
  },
  blood: {
    fontSize: 18,
    fontFamily: 'sans',
    color: '#214151',
  },
  view: {
    borderColor: '#E6233F',
    borderWidth: 1.6,
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
  },
  inputs: {
    width: '82%',
    height: 40,
    borderColor: '#214151',
    borderWidth: 2,
    borderRadius: 5,
    color: '#214151',
    margin: 10,
    marginRight: 0,
    padding: 10,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    fontSize: 18,
    fontWeight: 'bold',
  },
  icon: {
    backgroundColor: '#214151',
    height: 40,
    borderRadius: 5,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  upp: {
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  login: state.Login.login,
  recipient: state.Recipient.recipient,
  donors: state.AllDonors.allDonors,
});

const mapDispatchToProp = (dispatch) => ({
  DonorProfile: (donorProfile) => dispatch(changeDonorProfile(donorProfile)),
});

export default connect(mapStateToProps, mapDispatchToProp)(AvailableDonors);
