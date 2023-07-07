import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import login from "./pages/Loginwip"
import CreateOffer from "./pages/CreateOffer";
import PageToggle from "./components/PageToggle";
import HomeProd from "./pages/HomeProd";

const Router = () => {
    const toggleHome = () => {
        return <PageToggle compError={<Home />} compSucsses={<HomeProd/>}/>
    }

    return (
        <BrowserRouter>
        <Routes>
            <Route Component={toggleHome} path="/"/>
            <Route Component={login} path="/loginw"/>
            <Route Component={Login} path="/login"/>
            <Route Component={Search} path="/search"/>
            <Route Component={About} path="/about"/>
            <Route Component={Contact} path="/contact"/>
            <Route Component={CreateOffer} path="/createoffer"/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router
