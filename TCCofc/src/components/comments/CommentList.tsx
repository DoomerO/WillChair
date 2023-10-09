import { Stack, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

interface commentListProps {
    component : JSX.Element[]
}

const CommentList = ({component} : commentListProps) => {

    return (
        <Tabs alignContent="center">
            <TabPanels>
                <TabPanel overflowY="scroll" maxHeight="40vh" css={{
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
                    <Stack direction="column" h="fit-content" spacing={25}>
                        {component}
                    </Stack>  
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default CommentList;