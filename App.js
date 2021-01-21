import React from 'react';
import { StatusBar } from 'react-native';
import AppNavigation from "./src/config/navigation";

const App: () => React$Node = () => {
  return (
    <>
      <AppNavigation />
    </>
  );
};

export default App;
