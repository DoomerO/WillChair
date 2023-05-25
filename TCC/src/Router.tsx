import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component = {Home} path="/"/>
                <Route Component = {Login} path="/login"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;