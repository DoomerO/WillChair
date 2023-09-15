import { Stack, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

interface ReportListProps {
    component : React.ReactElement
}

const ReportCardList = ({component} : ReportListProps) => {

    return (
        <Tabs alignContent="center" w="100%" h="100%">
            <TabPanels>
                <TabPanel overflowY="scroll" maxHeight="80vh" css={{
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
                    <Stack direction="column" align="center" h="fit-content" spacing={6}>
                        {component}
                    </Stack>  
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default ReportCardList;