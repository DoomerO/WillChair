import { Input, useBoolean, InputRightAddon, InputGroup } from '@chakra-ui/react'
import "../fonts/fonts.css"
import { ChangeEvent } from 'react'

interface passProps{
    placeholder?: string,
    setTo: Function,
    value?: string,
    pattern?: string
}
const Password = ({placeholder, setTo, value, pattern}:passProps) => {
    //Estado do botão de mostrar senha e valor da senha
    const [showPassword, setShowPassword] = useBoolean(false)

    return(
        <InputGroup>
        <Input placeholder={placeholder} type={showPassword ? 'text' : 'password'}
        onChange={(e:ChangeEvent<HTMLInputElement>) => setTo(e.target.value)} value={value}
        pattern={pattern ? pattern : "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"} fontFamily="outfit"/>
        
        <InputRightAddon bg={showPassword ? '#000' : '#fff'} color={showPassword ? '#fff' : '#000'}
        _dark={showPassword ? {bg:"#F7F9FC", color:"#484A4D"} : {bg:"#2D3748", color:"#1976D2"}}
        onClick={setShowPassword.toggle} onMouseOut={setShowPassword.off} cursor='pointer'>+</InputRightAddon>
        </InputGroup>
    )
}

export default Password
