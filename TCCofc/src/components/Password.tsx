import { Input, useBoolean, InputRightAddon, InputGroup } from '@chakra-ui/react'

interface passProps{
    placeHolder?: string,
    setTo: Function
}
const Password = ({placeHolder, setTo}:passProps) => {
    //Estado do botão de mostrar senha e valor da senha
    const [showPassword, setShowPassword] = useBoolean(false)
    return(
        //Elemento de input
        <InputGroup>
        <Input placeholder={placeHolder ? placeHolder : 'Senha'} type={showPassword ? 'text' : 'password'}
        onChange={e => setTo(e.target.value)}/>
        //Botão de mostrar senha
        <InputRightAddon bg={showPassword ? '#000' : '#fff'} color={showPassword ? '#fff' : '#222'}
        onClick={setShowPassword.toggle} onMouseOut={setShowPassword.off} cursor='pointer'>+</InputRightAddon>
        </InputGroup>
    )
}

export default Password
