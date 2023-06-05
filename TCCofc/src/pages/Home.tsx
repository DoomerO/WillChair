import { Link } from "react-router-dom";
import Category from "../components/Category";
import "../styles/pages/Home.css";
import {CgProfile} from "react-icons/cg";

const Home = () => {
    return (
        <div id="Home"> 
            <header>
                <div className="centralize">
                    <input type="checkbox"></input>
                    <img id="logoTitle"></img>
                    <ul>
                        <li>Home</li>
                        <li>Produtos</li>
                        <li>Sobre</li>
                    </ul>
                    <div id="registerButton">
                        <p style={{marginTop: '1px'}}>Cadastrar</p>
                        <Link to="/login"><CgProfile color="#fff" size="40px" /></Link>
                    </div>
                </div>
            </header>

            <section id="Presentation">
                <div id="textDiv">
                    <div id="title">
                        <h1>O seu sonho</h1>
                        <h1>acessível perto de você!</h1>
                        
                    </div>
                    <div id="text">
                        <p>Compre ou negocie equipamentos de acessibilidade!</p>
                    </div>
                </div>
                <div id="imageDiv">
                    <img src=""></img>
                </div>                
            </section>

            <section id="Abstratic">
                <div id="textDiv">
                    <div id="title">
                        <h1>O que você pode encontrar aqui</h1>
                    </div>
                    <div id="text">
                        <p>Aluguéis, vendas ou doações temos de tudo aqui.</p>
                        <p>Crie ou acesse várias ofertas de equipamentos.</p>
                    </div>
                </div>
                <div id="imageDiv">
                    <img src=""></img>
                </div>
            </section>

            <section id="Categories">
                <div id="title">
                    <h1>Confira abaixo algumas das nossas categorias</h1>
                </div>
                <div id="categoriesDiv">
                    <Category imgPath="/login" name="Cadeira de Rodas"></Category>
                    <Category imgPath="/login" name="Muletas"></Category>
                    <Category imgPath="/login" name="Andadores"></Category>
                    <Category imgPath="/login" name="Bengalas"></Category>
                    <Category imgPath="/login" name="Todas"></Category>
                </div>
            </section>

            <footer>                
                <div id="Logo"><img id="logoImg"></img></div>
                <div id="Links">
                    <div id="partners">
                        <h3>Empresa</h3>
                        <ul>
                            <li>Willchair</li>
                        </ul>
                    </div>
                    <div id="usefull">
                        <h3>Links Úteis</h3>
                        <ul>
                            <li><a href="localhost:5173/login">hihihiha</a></li>
                        </ul>
                    </div>
                    <div id="contacts">
                        <h3>Contatos</h3>
                        <ul>
                            <li><a href="#"></a></li>
                        </ul>
                    </div>
                    <div id="socialMedias">
                        <ul>
                            <li><a href="https://www.instagram.com"><img src="/l"></img></a></li>
                            <li><a href="https://www.whatsapp.com"><img src="/l"></img></a></li>
                            <li><a href="https://www.facebook.com"><img src="/l"></img></a></li>
                        </ul>
                    </div>
                    <div id="mobileLinks">
                        <ul>
                            <li id="AppleStore"><a><img src="/l"></img></a></li>
                            <li id="PlayStore"><a><img src="/l"></img></a></li>
                        </ul>
                    </div>
                    <div id="info">
                        <ul>
                            <li><i></i>Brasil Portugues</li>
                            <li><i></i>2023 WillChair</li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Home;