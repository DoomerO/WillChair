import React from "react";
import {  NativeBaseProvider, Box, Menu, Pressable, Divider, HamburgerIcon} from "native-base";

function Example() {
  return <NativeBaseProvider><Box w="90%" alignItems="center" h="50%" marginTop="20%"> 
      <Menu closeOnSelect={false} w="190" onOpen={() => console.log("opened")} onClose={() => console.log("closed")} trigger={triggerProps => {
      return <Pressable {...triggerProps}>
              <HamburgerIcon />
            </Pressable>;
    }}>
        <Menu.OptionGroup defaultValue="Arial" title="free" type="radio">
          <Menu.ItemOption value="Arial">Arial</Menu.ItemOption>
          <Menu.ItemOption value="Nunito Sans">Nunito Sans</Menu.ItemOption>
          <Menu.ItemOption value="Roboto">Roboto</Menu.ItemOption>
        </Menu.OptionGroup>
        <Divider mt="3" w="100%" />
        <Menu.OptionGroup title="paid" type="checkbox">
          <Menu.ItemOption value="SF Pro">SF Pro</Menu.ItemOption>
          <Menu.ItemOption value="Helvetica">Helvetica</Menu.ItemOption>
        </Menu.OptionGroup>
      </Menu>
    </Box>
    </NativeBaseProvider>;
}

export default Example;