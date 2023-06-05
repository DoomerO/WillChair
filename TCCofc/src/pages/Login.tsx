import '../styles/pages/Login.css';
import { useState } from 'react';

const Login = () => {

    const [rightShow, setShow] = useState('')

    function activateRight() {
        if (rightShow == "") {setShow("show-right")} else {setShow("")};
    }

    return (
        <div id="logPage">
            <div id="container" className={rightShow}>
                <div id="Register-Section" className='formSection'>
                    <form action="#">
                        <h1>Cadastre-se aqui</h1>
                        <input type="text" name="name" placeholder='Nome'/>
                        <input type="email" name="mail" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" placeholder='Email'/>
                        <input type="password" name="password" placeholder='Senha'/>
                        <input type="submit" className='btn' value="Registrar"/>
                        <span>Ou registre-se pelo google</span>
                    </form>
                </div>

                <div id="Login-Section" className='formSection'>
                    <form action="#">
                        <h1>Login aqui</h1>
                        <input type="email" name="mail" pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/" placeholder='Email'/>
                        <input type="password" name="password" placeholder='Senha'/>
                        <input className='btn' type="submit" value="Login"/>
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
                            <button className="ghost" onClick={activateRight}>Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;