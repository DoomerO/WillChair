import { Link } from "react-router-dom";
import Category from "../components/Category";

const Home = () => {
    return (
        <div id="Home"> 
            <header>
                <div id="title"></div>
                <nav></nav>
            </header>

            <section id="Presentation">
                <div id="title">

                </div>
                <div id="text">

                </div>
                <div id="logibButton">
                    <Link to="/login"/>
                </div>
                
                <img src=""></img>
            </section>

            <section id="Client">
                <div id="title">

                </div>
                <div id="text">

                </div>
                <div id="loginButton">
                    <Link to="/login"/>
                </div>

                <img src=""></img>
            </section>

            <section id="Offerer">
                <div id="title">

                </div>
                <div id="text">

                </div>
                <div id="loginButton">
                    <Link to="/login"/>
                </div>

                <img src=""></img>
            </section>

            <section id="Categories">
                <div id="title">

                </div>
                <div id="Category">
                    <Category imgPath="" name=""></Category>
                </div>
            </section>

            <footer>

            </footer>
        </div>
    )
}

export default Home;