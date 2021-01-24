import React from 'react';
import {View, Text, TouchableOpacity,StatusBar,StyleSheet} from 'react-native';
import { Container, Content, Card, CardItem, Body } from "native-base";
import auth from '@react-native-firebase/auth';
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

export default function Dashboard(props) {

  const Donate = () => {
    props.data.navigate("Donate")
  }
  const FindDonor = () => {
    props.data.navigate("Find A Donor")
  }
  const AllDonors = () => {
    props.data.navigate("All Donors")
  }
  const Profile = () => {
    props.data.navigate("Profile")
  }

  return (
    <>
    <View style={styles.top}>
      <Text style={styles.avail}>Available Donors</Text>
      <Text></Text>
      <Text style={styles.avail}>0</Text>
    </View>
    <View style={styles.dashboard}>
      <View style={styles.pair}>
      <TouchableOpacity style={styles.card} onPress={()=>{Donate()}}>
      <Fontisto name="blood-drop" size = {40} color={"#E6233F"} />
      <Text></Text>
        <Text style={styles.cardText}>
         DONATE
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={()=>{FindDonor()}}>
      <MaterialCommunityIcons name="account-search" size = {45} color={"#E6233F"} />
      <Text></Text>
        <Text style={styles.cardText}>
        FIND A DONOR
        </Text>
      </TouchableOpacity>
      </View>
      <View style={styles.pair}>
      <TouchableOpacity style={styles.card} onPress={()=>{AllDonors()}}>
      <MaterialCommunityIcons name="blood-bag" size = {40} color={"#E6233F"} />
      <Text></Text>
        <Text style={styles.cardText}>
        ALL DONORS
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={()=>{Profile()}}>
      <MaterialCommunityIcons name="account" size = {45} color={"#E6233F"} />
      <Text></Text>
        <Text style={styles.cardText}>
        PROFILE
        </Text>
      </TouchableOpacity>
      </View>
    </View>
    
      </>
  );
}

const styles = StyleSheet.create({
  top:{
    width: "100%",
    height: "36%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d6b0b1"
  },
  avail:{
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "georgia",
    color: "#214151",
  },

  dashboard:{
    width: "100%",
    height: "64%",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    flexDirection:"row",
    marginTop: 30,  
  },
  pair:{
    flexDirection: "row",
  },
  card:{
    width: 144,
    height: 140,
    borderWidth: 2,
    borderRadius: 6,
    borderColor: "#E6233F",
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
  },
  cardText:{
    fontSize: 16,
    fontFamily: "georgia",
    fontWeight: "bold",
    color: "#214151",
  },

})