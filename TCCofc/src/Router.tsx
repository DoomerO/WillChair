import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login"
import PageToggle from "./components/toggles/PageToggle";
import HomeProd from "./pages/HomeProd";
import ConfirmLogOut from "./pages/intersections/ConfirmLogOut";
import OfferPageLogged from "./pages/offerPages/OfferPageLogged";
import OfferPage from "./pages/offerPages/OfferPage";
import Report from "./pages/Report";
import ProfileToggle from "./pages/profilePages/ProfileToggle";
import CurrentChats from "./pages/CurrentChats";
import NotLogged from "./pages/intersections/NotLogged";
import OfferCreationToggle from "./pages/createOfferPages/OfferCreationToggle";
import EmailConfirmation from "./pages/intersections/EmailConfirmation";
import PasswordChange from "./pages/intersections/PasswordChange";

const Router = () => {
    const toggleHome = () => {
        return <PageToggle compError={<Home />} compSuccess={<HomeProd/>}/>
    }
    const toggleOffer = () => {
        return <PageToggle compError={<OfferPage />} compSuccess={<OfferPageLogged/>}/>
    }
    const toggleProfile = () => {
        return <ProfileToggle/>
    }
    const toggleCretionOffer = () => {
        return <PageToggle compSuccess={<OfferCreationToggle/>} compError={<NotLogged/>}/>
    }
    const toggleCurchats = () => {
        return <PageToggle compError={<NotLogged/>} compSuccess={<CurrentChats/>}/>
    }
    const togglePasswordUpdate =() => {
        return <PageToggle compError={<NotLogged/>} compSuccess={<PasswordChange/>}/>
    }

    return (
        <BrowserRouter>
        <Routes>
            <Route Component={toggleHome} path="/"/>
            <Route Component={Login} path="/login"/>
            <Route Component={Login} path="/login/:screen"/>
            <Route Component={Search} path="/search/:query/:value"/>
            <Route Component={About} path="/about"/>
            <Route Component={Contact} path="/contact"/>
            <Route Component={toggleOffer} path="/offer/:id"/>
            <Route Component={toggleCretionOffer} path="/create-offer/:type"/>
            <Route Component={ConfirmLogOut} path="/logout"/>
            <Route Component={Report} path="/report/:offer"/>
            <Route Component={toggleProfile} path="/profile/:email/view"/>
            <Route Component={toggleCurchats} path="/current-chats"/>
            <Route Component={EmailConfirmation} path="/confirmation/:email/:path"/>
            <Route Component={togglePasswordUpdate} path="/pass-change"/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router
