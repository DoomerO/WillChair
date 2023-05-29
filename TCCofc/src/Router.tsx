import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Search from "./pages/Search";

const Router = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route Component={Home} path="/"/>
            <Route Component={Login} path="/login"/>
            <Route Component={Search} path="/search"/>
        </Routes>
    </BrowserRouter>
    )
}

export default Router