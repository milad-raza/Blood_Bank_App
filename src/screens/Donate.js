import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import auth from '@react-native-firebase/auth';
import Home from './Home';

export default function Donate(props) {
  const bloodGroups = [
    {
      group: 'O',
      type: '+',
    },
    {
      group: 'O',
      type: '-',
    },
    {
      group: 'A',
      type: '+',
    },
    {
      group: 'A',
      type: '-',
    },
    {
      group: 'B',
      type: '+',
    },
    {
      group: 'B',
      type: '-',
    },
    {
      group: 'AB',
      type: '+',
    },
    {
      group: 'AB',
      type: '-',
    },
  ];

  const [notLogin, setNotLogin] = useState(false); 

  useEffect(() => {
      return(
    auth().onAuthStateChanged(function (user) {
        if (user) {
          setNotLogin(false);

        } else {
          setNotLogin(true);
        }
      }))
  }, [auth])

  if (notLogin) {
    return <Home navigation={props.navigation} />;
  }

  return (
    <View style={styles.allCont}>
      <Text style={styles.select}>Select Your Blood Group</Text>
      <Text></Text>
      <View style={styles.AllCards}>
        {bloodGroups.map((blood, value) => {
          return (
            <View style={styles.card} key={value}>
              <Text style={{fontSize: 40, color: 'red', lineHeight: 40}}>
                {blood.group}
                <Text
                  style={{
                    fontSize: 30,
                    color: 'black',
                    fontWeight: 'bold',
                    lineHeight: 70,
                  }}>
                  {blood.type}
                </Text>
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  allCont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  select: {
    color: '#E6233F',
    fontSize: 30,
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  AllCards: {
    alignItems: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  card: {
    width: 120,
    height: 100,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: '#E6233F',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 16,
  },
});
