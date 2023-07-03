import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import login from "./pages/Loginwip"

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route Component={Home} path="/"/>
            <Route Component={login} path="/loginw"/>
            <Route Component={Login} path="/login"/>
            <Route Component={Search} path="/search"/>
            <Route Component={About} path="/about"/>
            <Route Component={Contact} path="/contact"/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router
