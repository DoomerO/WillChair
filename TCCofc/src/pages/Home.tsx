import { Link } from "react-router-dom";
import Category from "../components/Category";
import "../styles/pages/Home.css";
import {CgProfile} from "react-icons/cg";


//images
import andador from '../img/categories/andador.png';
import muleta from '../img/categories/muleta.png';
import cadeira from '../img/categories/cadeira-de-rodas.png';
import bengala from '../img/categories/bengala.png';
import diversidade from '../img/categories/diversidade.png';
import logo from '../img/home/logo.png';
import middleImage from '../img/home/imgHomeMiddle.png';

const Home = () => {
    return (
        <div id="Home"> 
            <header>
                <input type="checkbox"></input>
                <img id="logoTitle"></img>
                <ul>
                    <li>Home</li>
                    <li>Produtos</li>
                    <li>Sobre</li>
                </ul>
                <div id="registerButton">
                    <p style={{marginTop: '1px'}}>Cadastrar</p>                        <Link to="/login"><CgProfile color="#fff" size="40px"/></Link>
                </div>
            </header>

            <section id="Presentation">
                <div id="textDiv">
                    <div id="text">
                        <h1>O seu sonho <br></br>acessível perto de você!</h1>
                   
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
                    <img src={middleImage}></img>
                </div>
            </section>

            <section id="Categories">
                <div id="title">
                    <h1>Confira abaixo algumas das nossas categorias</h1>
                </div>
                <div id="categoriesDiv">
                    <Category imgPath={cadeira} name="Cadeira de Rodas"></Category>
                    <Category imgPath={muleta} name="Muletas"></Category>
                    <Category imgPath={andador} name="Andadores"></Category>
                    <Category imgPath={bengala} name="Bengalas"></Category>
                    <Category imgPath={diversidade} name="Todas"></Category>
                </div>
            </section>

            <footer>                
            <div className="container2">
            <div className="iten1">
                <ul>
                    <li><img src={logo} className="logo"/></li>
                </ul>
            </div>
            <div className="iten2">
                <ul>
                    <li className="first">Empresa</li>
                    <li><a href="#">Sobre</a></li>
                    <li><a href="#">Marca</a></li>
                </ul>
            </div>
            <div className="iten3">
                <ul>
                    <li className="first">Links úteis</li>
                </ul>
            </div>
                <div className="iten4">
                <ul>
                    <li className="first">Contatos</li>
                </ul>
            </div>
        </div>
            </footer>
        </div>
    )
}

export default Home;