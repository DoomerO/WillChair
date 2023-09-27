import {Tabs, Stack, TabPanel, TabPanels} from '@chakra-ui/react';
import CreateOfferCard from './AddOfferCard';
interface listProps {
    component: React.ReactElement,
    canMdNew? : boolean
}

const OfferList = ({component, canMdNew = false}: listProps) => {

    return (
        <Tabs alignContent="center">
            <TabPanels>
                <TabPanel overflowX="scroll" maxWidth="98vw" css={{
                        '&::-webkit-scrollbar': {
                        height: '4px',
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
                    <Stack direction="row" w="fit-content" spacing={2} justifyContent="center" align="center" mb="5vh">
                        {(canMdNew) ? <CreateOfferCard/> : null}
                        {component}
                    </Stack>  
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}

export default OfferList;