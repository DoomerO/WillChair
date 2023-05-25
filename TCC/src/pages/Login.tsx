import {Link} from 'react-router-dom';
import {useState} from 'react';
const Login = () => {
    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [passWord, setPass] = useState('');

    return (
        <div>
            <h1>LogIn Willchair</h1>
            <div>
                <p>Nome:<input type="text" onChange={e => {setName(e.target.value)}}></input></p>
                <p>Email:<input type="email" onChange={e => {setMail(e.target.value)}}></input></p>
                <p>Senha:<input type="email" onChange={e => {setPass(e.target.value)}}></input></p>
            </div>
            <Link to="/">Home</Link>
        </div>
    )
};

export default Login;