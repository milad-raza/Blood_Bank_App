import React, {useEffect} from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from "./src/config/navigation";
import SplashScreen from 'react-native-splash-screen'

const App: () => React$Node = () => {

  useEffect(()=>{
    SplashScreen.hide();
  })

  return (
    <>
      <AppNavigation />
    </>
  );
};

export default App;
