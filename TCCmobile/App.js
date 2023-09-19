import React from "react";
import {  NativeBaseProvider, Box, Menu, Pressable, HamburgerIcon, Flex, Heading, Text} from "native-base";



function Example() {
  return <NativeBaseProvider>
    <Flex direction="column" w="100%" h="60%" bg="#F7F9FC" >
      <Box w="50%" ml="85%" mt="7%"> 
        <Menu closeOnSelect={false} w="295" onOpen={() => console.log("opened")} onClose={() => console.log("closed")} trigger={triggerProps => {
      return <Pressable {...triggerProps}>
              <HamburgerIcon size="8"/>
            </Pressable>;
    }}>
          <Menu.ItemOption value="Contato">Home</Menu.ItemOption>
          <Menu.ItemOption value="Pesquisa">Pesquisar equipamentos</Menu.ItemOption>
          <Menu.ItemOption value="Contato">Contato</Menu.ItemOption>
          <Menu.ItemOption value="Sobre">Sobre nós</Menu.ItemOption>
          <Menu.ItemOption value="Entrar">Entrar</Menu.ItemOption>
          <Menu.ItemOption value="Cadastrar">Cadastrar</Menu.ItemOption>
      </Menu>
    </Box>
    
    <Flex align='center' direction='column' mt="23%">
      <Heading size="xl" color='#2D3748'>O seu sonho acessível</Heading>
      <Heading color='#1976D2' size="xl">perto de você!</Heading>
      <Text fontSize="14.5" noOfLines={2} mt='20px' textAlign="center">
      Compre, negocie ou anuncie equipamentos de acessibilidade</Text>
    </Flex>
    </Flex>
    
    <Flex direction="column" w="100%">
    <Heading as='h1' noOfLines={2} color="#2D3748" textAlign="center" mt="7%">
    O que você pode encontrar por aqui</Heading>
   
      
    </Flex>

    <Flex w='100%' h='fit-content' bg='#F7F9FC' align='center' direction='column' _dark={{bg:'#484A4D'}}>
                <Box h='20%' alignContent='center'>
                <Heading fontFamily="outfit" as='h2' noOfLines={{base: 2, md: 1}}>
                    Confira abaixo algumas de nossas categorias
                </Heading>
                </Box>
    </Flex>

    </NativeBaseProvider>;
}

export default Example;
