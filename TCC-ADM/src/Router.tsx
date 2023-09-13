import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import PageToggle from "./components/toggles/PageToggle";
import Home from "./pages/Home";

const Router = () => {
    const toggleHome = () => {
        return <PageToggle compSuccess={<Home/>}/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route Component={toggleHome} path="/"/>
                <Route Component={Login} path="/login"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;