import { Avatar, Divider, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import colors from "../../colors/colors";
import { Link } from "react-router-dom";

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
        <Stack pt="2.5%" w={{base:"80vw" ,sm:"30vw"}} pb="5%" align="center" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} borderRadius="10px">
            <Flex direction="row" w="90%" align="center">
                <Link to={`/profile/${userEnv.user_email}/view`}>
                    <Avatar size="sm" name={userEnv.user_name} src={(userEnv.user_img) ? String.fromCharCode(...new Uint8Array(userEnv.user_img.data)) : ""} mr="2px" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/>
                </Link>
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