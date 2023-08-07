import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Search from "./pages/Search";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login"
import CreateOffer from "./pages/CreateOffer";
import wcOffer from "./pages/wcOffer";
import crOffer from "./pages/crOffer";
import PageToggle from "./components/toggles/PageToggle";
import HomeProd from "./pages/HomeProd";
import ConfirmLogOut from "./pages/intersections/ConfirmLogOut";
import OfferPageLogged from "./pages/offerPages/OfferPageLogged";
import OfferPage from "./pages/offerPages/OfferPage";
import Report from "./pages/Report";
import ProfileToggle from "./pages/profilePages/ProfileToggle";

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
            <Route Component={CreateOffer} path="/createoffer"/>
            <Route Component={wcOffer} path="/wcoffer"/>
            <Route Component={crOffer} path="/croffer"/>
            <Route Component={ConfirmLogOut} path="/logout"/>
            <Route Component={Report} path="/report/:offer"/>
            <Route Component={toggleProfile} path="/profile/:email/view"/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router
