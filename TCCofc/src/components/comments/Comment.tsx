import { Avatar, Divider, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import colors from "../../colors/colors";
import { Link } from "react-router-dom";
import { RiStarSFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import axios from "axios";
import dateDisplayer from "../code/dataDisplayer";
import serverUrl from "../code/serverUrl";

interface commentProps {
    user_img : object,
    user_name : string,
    user_email : string,
    content : string,
    date : string,
    points : number
}

const Comment = ({user_img, user_name, user_email, content, date, points} : commentProps) => {
    const [img, setImg] = useState<any>();

    async function getImg() {
        await axios.get(`${serverUrl}/users/profile/photo/${user_img}`, {responseType : "arraybuffer"}).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setImg(reader.result);
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    
    useEffect(() => {
        if(user_img) getImg();
    }, [user_img]);

    return (
        <Stack pt="2.5%" w={{base:"80vw" , md:"30vw"}} pb="5%" align="center" bg={colors.bgWhite} _dark={{bg : colors.bgWhite_Dark}} borderRadius="10px">
             <Stack spacing={0.5} direction="row" align="center" w="90%">
                <RiStarSFill color={(points >= 1) ? colors.colorFontBlue : "#0003"} size="4%"/>  
                   
                <RiStarSFill color={(points >= 2) ? colors.colorFontBlue : "#0003"} size="4%"/>  
                    
                <RiStarSFill color={(points >= 3) ? colors.colorFontBlue : "#0003"} size="4%"/>  
                    
                <RiStarSFill color={(points >= 4) ? colors.colorFontBlue : "#0003"} size="4%"/>  
                    
                <RiStarSFill color={(points >= 5) ? colors.colorFontBlue : "#0003"} size="4%"/>    
            </Stack>
            <Flex direction="row" w="90%" align="center">
                <Link to={`/profile/${user_email}/view`}>
                    <Avatar size="sm" name={user_name} src={(user_img) ? img : ""} mr="2px" _hover={{border : `2px solid ${colors.colorFontBlue}`, _dark : {border : "2px solid #fff"}}}/>
                </Link>
                <Text fontWeight="bold" noOfLines={1}>{user_name}</Text>
                <Spacer/>
                <Text noOfLines={1}>{dateDisplayer(date)}</Text>
            </Flex>
            <Divider orientation="horizontal"/>
            <Text w="95%" ml="2.5%" mr="2.5%" textAlign="justify">
                {content}
            </Text>
        </Stack>
    )
}

export default Comment;