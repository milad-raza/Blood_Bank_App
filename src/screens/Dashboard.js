import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {Container, Content, Card, CardItem, Body} from 'native-base';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import {connect} from 'react-redux';
import changeAllDonors from '../store/Actions/AllDonorsAction';
import changeDonated from '../store/Actions/DonatedAction';

function Dashboard(props) {
  const [Donate, setDonate] = useState(false);
  const [Find, setFind] = useState(false);
  const [All, setAll] = useState(false);
  const [Profile, setProfile] = useState(false);
  const [move, setMove] = useState('Donate')

  const go = (name, press) => {
    press(true);
    setTimeout(() => {
      props.data.navigate(name);
      press(false);
    }, 100);
  };

  const allData = [
    {
      name: 'Donate',
      touch: Donate,
      going: move,
      setTouch: setDonate,
      icon: 'water',
    },
    {
      name: 'Find A Donor',
      touch: Find,
      going: 'Find A Donor',
      setTouch: setFind,
      icon: 'account-search',
    },
    {
      name: 'All Donors',
      touch: All,
      going: 'All Donors',
      setTouch: setAll,
      icon: 'blood-bag',
    },
    {
      name: 'Profile',
      touch: Profile,
      going: 'Profile',
      setTouch: setProfile,
      icon: 'account',
    },
  ];

  const [donors, setDonors] = useState([]);
  const [donated, setDonated] = useState(false);

  useEffect(() => {
    database()
      .ref('Blood_Bank_Donors')
      .on('value', function (snapshot) {
        setDonors([]);
        snapshot.forEach(function (childSnapshot) {
          let data = childSnapshot.val();
          setDonors((donors) => [...donors, data]);
          if (data.user === props.user) {
            setDonated(true);
          }
        });
      });
  }, []);

  useEffect(() => {
    props.ChangeAllDonors(donors);
    props.ChangeDonated(donated);
  }, [donors]);

  useEffect(() => {
    if(props.user !== null){
    database()
      .ref(`Blood_Bank_Users/${props.user}`)

      .on('value', snapshot => {
        if (snapshot.val().area !== undefined) {
          setMove('Preview')
        }
      });
    }
  }, [props.user]);

  return (
    <>
      <View style={styles.allcards}>
        {allData.map((data, index) => {
          return (
            <TouchableOpacity
              onPress={() => go(data.going, data.setTouch)}
              key={index}
              activeOpacity={0.6}
              style={data.touch ? styles.cardTouch : styles.card}>
              <MaterialCommunityIcons
                name={data.icon}
                size={30}
                color={data.touch ? '#ffffff' : '#E6233F'}
              />
              <Text
                name="name"
                style={data.touch ? styles.cardTextTouch : styles.cardText}>
                {data.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  allcards: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#dddddd',
  },
  card: {
    width: '75%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#214151',
    borderWidth: 4,
    borderRadius: 50,
    margin: 20,
    backgroundColor: '#E5E5E5',
    paddingBottom: 2,
  },
  cardText: {
    fontSize: 24,
    color: '#E6233F',
    fontWeight: 'bold',
    fontFamily: 'georgia',
  },
  cardTouch: {
    width: '75%',
    height: 75,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#E6233F',
    borderWidth: 4,
    borderRadius: 50,
    backgroundColor: '#214151',
    margin: 20,
    paddingBottom: 2,
  },
  cardTextTouch: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'georgia',
  },
});

const mapStateToProps = (state) => ({
  login: state.Login.login,
  user: state.User.user,
  blood: state.BloodDonate.bloodDonate,
  gender: state.Gender.gender,
  age: state.Age.age,
  area: state.Area.area,
  donors: state.AllDonors.allDonors,
  donated: state.Donated.donated,
});

const mapDispatchToProp = (dispatch) => ({
  ChangeAllDonors: (allDonors) => dispatch(changeAllDonors(allDonors)),
  ChangeDonated: (donated) => dispatch(changeDonated(donated)),
});

export default connect(mapStateToProps, mapDispatchToProp)(Dashboard);