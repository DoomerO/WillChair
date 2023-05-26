import {Link} from 'react-router-dom';
import {useState} from 'react';
import PropTypes from 'prop-types';

async function LoginUser(credentials: any) {
    return fetch('localhost:3344/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(data => data.json())
}

const Login = (setToken: Function) => {
    const [name, setName] = useState('');
    const [email, setMail] = useState('');
    const [passWord, setPass] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        const token = await LoginUser({
            name,
            passWord,
            email
        })
        setToken(token)
    }

    return (
        <div>
            <h1>LogIn Willchair</h1>
            <div>
                <form onSubmit={handleSubmit}>
                    <p>Nome:<input type="text" onChange={e => {setName(e.target.value)}}/></p>
                    <p>Email:<input type="email" onChange={e => {setMail(e.target.value)}}/></p>
                    <p>Senha:<input type="password" onChange={e => {setPass(e.target.value)}}/></p>
                    <button type="submit">Acessar</button>
                </form>
                
                
            </div>
            <Link to="/">Home</Link>
        </div>
    )
};

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Login;