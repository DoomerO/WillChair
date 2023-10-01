import React from "react";
import { NativeBaseProvider, Box } from "native-base";
import About from './src/pages/About';
import Home from './src/pages/Home';

export default function App() {
  return (
    <NativeBaseProvider>
      <Home/>
    </NativeBaseProvider>
  );
}
