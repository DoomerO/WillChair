import Router from './Router'
import "./styles/App.css";
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <ChakraProvider>
        <Router/>
    </ChakraProvider>
  )
}

export default App
