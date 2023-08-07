import { Avatar, Divider, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import colors from "../../colors/colors";

interface commentProps {
    userId : number,
    content : string,
    date : string,
}

const Comment = ({userId, content, date} : commentProps) => {

    const [userEnv, setEnv] = useState([]);

    async function getUser() {
        await axios.get(`http://localhost:3344/users/id/${userId}`).then((res) => {
            setEnv(res.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        if(userId) {
            getUser();
        }
    }, [userId]);
    
    return (
        <Stack pt="2.5%" w="30vw" pb="5%" align="center" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} borderRadius="10px">
            <Flex direction="row" w="90%" align="center">
                <Avatar size="sm" name={userEnv.user_name} src={""} mr="2px"/>
                <Text fontWeight="bold" noOfLines={1}>{userEnv.user_name}</Text>
                <Spacer/>
                <Text noOfLines={1}>{date}</Text>
            </Flex>
            <Divider orientation="horizontal"/>
            <Text w="95%" ml="2.5%" mr="2.5%" textAlign="justify">
                {content}
            </Text>
        </Stack>
    )
}

export default Comment;