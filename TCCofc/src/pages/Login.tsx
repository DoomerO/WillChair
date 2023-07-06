import '../styles/pages/Login.css';
import { ChangeEvent, useState, useEffect } from 'react';
import decode from '../components/decoderToken';
import axios from 'axios';

const Login = () => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(Object);

    useEffect(() => { //controla acesso ao banco de dados
        axios.get("http://localhost:3344/users", {}).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }, [])

    function handleSubmits (event: React.FormEvent<HTMLFormElement>) { //Controla Envios de Formulários
        event.preventDefault();
        axios.post('http://localhost:3344/users', {
            user_email: email, 
            user_name: name,
            password: password,
            user_level: 0}).then(res => {
                localStorage.setItem("token", res.data.token);
                console.log(res.data);
        }).catch(error => {
            console.log(error)
        });
    }

    const handleChangeEmail = (e:ChangeEvent<HTMLInputElement>) => { //Controla Mudança de inputs Email
       setEmail(e.target.value);
    }
    const handleChangeName = (e:ChangeEvent<HTMLInputElement>) => { //Controla Mudança de inputs Nome
       setName(e.target.value);
    }
    const handleChangePassword = (e:ChangeEvent<HTMLInputElement>) => { //Controla Mudança de inputs Senha
        setPassword(e.target.value);
    }

    const [rightShow, setShow] = useState('')

    function activateRight() {
        if (rightShow == "") {setShow("show-right")} else {setShow("")};
    }

    return (
        <div id="logPage">
            <div id="container" className={rightShow}>
                <div id="Register-Section" className='formSection'>
                    <form action="#" onSubmit={handleSubmits}>
                        <h1>Cadastre-se aqui</h1>
                        <input type="text" name="name" placeholder='Nome' onChange={handleChangeName}/>
                        <input type="email" name="mail" placeholder='Email' onChange={handleChangeEmail}/>
                        <input type="password" name="password" placeholder='Senha' onChange={handleChangePassword}/>
                        <button type='submit'>Registrar</button>
                        <span>Ou registre-se pelo google</span>
                    </form>
                </div>

                <div id="Login-Section" className='formSection'>
                    <form action="#">
                        <h1>Login aqui</h1>
                        <input type="email" name="mail" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" placeholder='Email'/>
                        <input type="password" name="password" placeholder='Senha'/>
                        <button type='submit'>Login</button>
                        <div id="content">
                            <input type="checkbox" id="checkbox"></input>
                            <label>Remember me</label>
                            <span>Ou entre pelo google</span>
                        </div>
                    </form>
                </div>

                <div id="overlay-container">
                    <div id="overlay">
                        <div id="overlay-Right" className='overlay-panel'>
                            <h1 className="title">Olá!</h1>
                            <p>Se não possui uma conta pode criá-la aqui!</p>
                            <button className="ghost" onClick={activateRight}>Cadastrar</button>
                        </div>
                        <div id="overlay-Left" className='overlay-panel'>
                            <h1 className="title">Já tem uma Conta?</h1>
                            <p>Clique aqui para realizar o login!</p>
                            <button className="ghost" onClick={() => {activateRight(); setUser(decode(localStorage.getItem("token"))), console.log(user)}}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;