import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import DashBoard from "./pages/DashBoard";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route Component = {Home} path="/"/>
                <Route Component = {DashBoard} path="/login"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;