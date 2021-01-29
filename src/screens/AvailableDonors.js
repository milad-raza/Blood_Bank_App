import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
  Right,
} from 'native-base';
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

  useEffect(() => {
    const recipient = props.recipient;
    setFilter([])
    donors.map((value, index) => {
      const blood = value.blood;

      if(recipient === 'AB +'){
          return setFilter(donors)
      }

      else if(recipient === 'AB -'){
        const data = ["O -", "A -", "B -", "AB -"]
        data.map((check)=>{
          if(check === blood) {
            setFilter(old => [...old, value])
          }
        })
      }

      else if(recipient === 'B +'){
        const data = ["O -", "O +", "B -", "B +"]
        data.map((check)=>{
          if(check === blood) {
            setFilter(old => [...old, value])
          }
        })
      }

      else if(recipient === 'B -'){
        const data = ["O -", "B -",]
        data.map((check)=>{
          if(check === blood) {
            setFilter(old => [...old, value])
          }
        })
      }

      else if(recipient === 'A +'){
        const data = ["O -", "A -", "O +", "A +"]
        data.map((check)=>{
          if(check === blood) {
            setFilter(old => [...old, value])
          }
        })
      }

      else if(recipient === 'A -'){
        const data = ["O -", "A -"]
        data.map((check)=>{
          if(check === blood) {
            setFilter(old => [...old, value])
          }
        })
      }

      else if(recipient === 'O +'){
        const data = ["O -", "O +"]
        data.map((check)=>{
          if(check === blood) {
            setFilter(old => [...old, value])
          }
        })
      }

      else if(recipient === 'O -'){
        const data = ["O -"]
        data.map((check)=>{
          if(check === blood) {
            setFilter(old => [...old, value])
          }
        })
      }

      

    });
  }, []);

  console.log(filter)

  if (donors.length < 1) {
    return <ActivityIndicator size="large" color="#214151" style={{flex: 1}} />;
  }

  const view = (name, age, city, area, blood, mobile, email, gender) => {
    props.DonorProfile({name, age, city, area, blood, mobile, email, gender});
    props.navigation.navigate('Donor Profile');
  };

  return (
    <Container>
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
  },
  blood: {
    fontSize: 18,
    fontFamily: 'sans',
    color: '#214151',
  },
  view: {
    borderColor: 'red',
    borderWidth: 1.6,
    padding: 8,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
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
