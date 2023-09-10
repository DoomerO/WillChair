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
import PreConfig from "./pages/intersections/PreConfig";
import Policy from "./pages/intersections/Policy";
import Terms from "./pages/intersections/Terms";
import EmailChange from "./pages/intersections/EmailChange";

const Router = () => {
    const toggleHome = () => {
        return <PageToggle compError={<Home />} compSuccess={<HomeProd/>}/>
    }
    const toggleOffer = () => {
        return <PageToggle compError={<OfferPage />} compSuccess={<OfferPageLogged/>}/>
    }
    const toggleReport = () => {
        return <PageToggle compError={<NotLogged />} compSuccess={<Report/>}/>
    }
    const togglePreConfig = () => {
        return <PageToggle compError={<NotLogged/>} compSuccess={<PreConfig/>}/>
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
    const toggleEmailUpdate =() => {
        return <PageToggle compError={<NotLogged/>} compSuccess={<EmailChange/>}/>
    }

    return (
        <BrowserRouter>
        <Routes>
            <Route Component={toggleHome} path="/"/>
            <Route Component={Login} path="/login"/>
            <Route Component={Login} path="/login/:screen"/>
            <Route Component={togglePreConfig} path="/preconfig"/>
            <Route Component={Policy} path="/policy"/>
            <Route Component={Terms} path="/terms"/>
            <Route Component={Search} path="/search/:query/:value"/>
            <Route Component={About} path="/about"/>
            <Route Component={Contact} path="/contact"/>
            <Route Component={toggleOffer} path="/offer/:id"/>
            <Route Component={toggleCretionOffer} path="/create-offer/:type"/>
            <Route Component={ConfirmLogOut} path="/logout"/>
            <Route Component={toggleReport} path="/report/:type/:id"/>
            <Route Component={toggleProfile} path="/profile/:email/view"/>
            <Route Component={toggleCurchats} path="/current-chats"/>
            <Route Component={EmailConfirmation} path="/confirmation/:email/:path"/>
            <Route Component={togglePasswordUpdate} path="/pass-change"/>
            <Route Component={toggleEmailUpdate} path="/email-update/:id"/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router
