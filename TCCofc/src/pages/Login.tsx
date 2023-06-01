const Login = () => {
    return (
        <div>
            <div id="Register-Section">
                <form action="#">
                    <h1>Cadastre-se aqui</h1>
                    <input type="text" name="name"/>
                    <input type="email" name="mail" pattern=""/>
                    <input type="password" name="password"/>
                    <input type="submit" value="Registrar"/>
                    <span>Ou registre-se pelo google</span>
                </form>
            </div>

            <div id="Login-Section">
                <form action="#">
                    <h1>Login aqui</h1>
                    <input type="email" name="mail" pattern=""/>
                    <input type="password" name="password"/>
                    <input type="submit" value="Login"/>
                    <input type="checkbox"></input>
                    <span>Ou entre pelo google</span>
                </form>
            </div>

            <div id="overlay-container">
                <div id="overlay">
                    <div id="overlay-Left">
                        <h1>Olá</h1>
                        <p>Se não possui uma conta pode criá-la aqui!</p>
                        <button>Cadastrar</button>
                    </div>
                    <div id="overlay-Right">
                        <h1>Já tem uma Conta?</h1>
                        <p>Clique aqui para realizar o login!</p>
                        <button>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;