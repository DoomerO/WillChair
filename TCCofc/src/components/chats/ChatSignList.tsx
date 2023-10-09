import { Stack, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

interface chatListProps {
    component : JSX.Element[]
}

const ChatSignList = ({component} : chatListProps) => {

    return (
        <Tabs alignContent="center" h="80%" w="100%">
            <TabPanels>
                <TabPanel overflowY="scroll" maxHeight="100%" w="100%"css={{
                        '&::-webkit-scrollbar': {
                        width: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                        background: '#0000',
                        },
                        '&::-webkit-scrollbar-thumb': {
                        background: '#1976D2',
                        borderRadius: '50px',
                        },
                        '&::-webkit-scrollbar-thumb:hover': {
                            background: '#0946a6',
                            borderRadius: '50px',
                        },
                    }}>
                    <Stack direction="column" h="fit-content" spacing={1}>
                        {component}
                    </Stack>  
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ChatSignList;