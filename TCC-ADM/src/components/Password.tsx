import { Input, useBoolean, InputRightAddon, InputGroup } from '@chakra-ui/react'
import "../fonts/fonts.css"
import { ChangeEventHandler } from 'react'
import { FiEye, FiEyeOff } from 'react-icons/fi'

interface passProps{
    onChange: ChangeEventHandler<HTMLInputElement>,
    placeholder?: string,
    value?: string,
    validity?: boolean,
    pattern?: string
}
const Password = ({placeholder, onChange, value, pattern, validity}:passProps) => {
    //Estado do botão de mostrar senha e valor da senha
    const [showPassword, setShowPassword] = useBoolean(false)

    return(
        <InputGroup mt="1%" onMouseLeave={setShowPassword.off}>
        <Input placeholder={placeholder} type={showPassword ? 'text' : 'password'}
        onChange={onChange} value={value} isInvalid={validity ? validity : false}
        pattern={pattern ? pattern : `(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}`} fontFamily="outfit"/>
        
        <InputRightAddon bg={showPassword ? '#000' : '#fff'} color={showPassword ? '#fff' : '#000'}
        _dark={showPassword ? {bg:"#F7F9FC", color:"#093B69"} : {bg:"#1A202C", color:"#1976D2"}}
        onClick={setShowPassword.toggle} cursor='pointer'>
        {showPassword ? <FiEye/> : <FiEyeOff/>}</InputRightAddon>
        </InputGroup>
    )
}

export default Password
