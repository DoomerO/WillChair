import React from "react";
import {  NativeBaseProvider } from "native-base";
import Router from "./Routes";


function App() {
  return <NativeBaseProvider>
    <Router/>
  </NativeBaseProvider>;
}

export default App;
