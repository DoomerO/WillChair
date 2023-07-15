import {Tabs, Stack, TabPanel, TabPanels} from '@chakra-ui/react';
interface listProps {
    component: ReactElement
}

const OfferList = ({component}: listProps) => {

    return (
        <Tabs alignContent="center">
            <TabPanels>
                <TabPanel overflowX="scroll" maxWidth="98vw" css={{
                        '&::-webkit-scrollbar': {
                        height: '4px',
                        },
                        '&::-webkit-scrollbar-track': {
                        background: '#aaaaaa',
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
                    <Stack direction="row" w="fit-content" spacing={25} mb="5vh">
                        {component}
                    </Stack>  
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default OfferList;