import { Input, useBoolean, InputRightAddon, InputGroup } from '@chakra-ui/react'

interface passProps{
    placeholder?: string,
    setTo: Function,
    value?: string
}
const Password = ({placeholder, setTo, value}:passProps) => {
    //Estado do botão de mostrar senha e valor da senha
    const [showPassword, setShowPassword] = useBoolean(false)

    return(
        <InputGroup>
        <Input placeholder={placeholder} type={showPassword ? 'text' : 'password'}
        onChange={e => setTo(e.target.value)} value={value}/>
        
        <InputRightAddon bg={showPassword ? '#000' : '#fff'} color={showPassword ? '#fff' : '#222'}
        onClick={setShowPassword.toggle} onMouseOut={setShowPassword.off} cursor='pointer'>+</InputRightAddon>
        </InputGroup>
    )
}

export default Password
