import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import login from "./pages/Loginwip"
import createOffer from "./pages/createOffer";
import HomeToggle from "./components/HomeToggle";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route Component={HomeToggle} path="/"/>
            <Route Component={login} path="/loginw"/>
            <Route Component={Login} path="/login"/>
            <Route Component={Search} path="/search"/>
            <Route Component={About} path="/about"/>
            <Route Component={Contact} path="/contact"/>
            <Route Component={createOffer} path="/createoffer"/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router
