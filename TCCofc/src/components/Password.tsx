import { Input, useBoolean, InputRightAddon, InputGroup } from '@chakra-ui/react'
import "../fonts/fonts.css"
import { ChangeEventHandler } from 'react'
import { FiPlus } from 'react-icons/fi'

interface passProps{
    placeholder?: string,
    onChange: ChangeEventHandler<HTMLInputElement>,
    value?: string,
    pattern?: string
}
const Password = ({placeholder, onChange, value, pattern}:passProps) => {
    //Estado do botão de mostrar senha e valor da senha
    const [showPassword, setShowPassword] = useBoolean(false)

    return(
        <InputGroup>
        <Input placeholder={placeholder} type={showPassword ? 'text' : 'password'}
        onChange={onChange} value={value}
        pattern={pattern ? pattern : `(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,}`} fontFamily="outfit"/>
        
        <InputRightAddon bg={showPassword ? '#000' : '#fff'} color={showPassword ? '#fff' : '#000'}
        _dark={showPassword ? {bg:"#F7F9FC", color:"#484A4D"} : {bg:"#2D3748", color:"#1976D2"}}
        onClick={setShowPassword.toggle} onMouseOut={setShowPassword.off} cursor='pointer'>
        <FiPlus/></InputRightAddon>
        </InputGroup>
    )
}

export default Password
