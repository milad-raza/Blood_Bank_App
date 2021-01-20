import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppNavigation from "./src/config/navigation";

const App: () => React$Node = () => {
  return (
    <>
      <AppNavigation />
    </>
  );
};

const styles = StyleSheet.create({
  
});

export default App;
