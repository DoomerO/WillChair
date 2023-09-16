import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import PageToggle from "./components/toggles/PageToggle";
import Home from "./pages/Home";
import OtherReports from "./pages/OtherReports";
import ReportPage from "./pages/ReportPage";

const Router = () => {
    const toggleHome = () => {
        return <PageToggle compSuccess={<Home/>}/>
    }
    const toggleOtherReports = () => {
        return <PageToggle compSuccess={<OtherReports/>}/>
    }
    const toggleReportPage = () => {
        return <PageToggle compSuccess={<ReportPage/>}/>
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route Component={toggleHome} path="/"/>
                <Route Component={toggleOtherReports} path="/other"/>
                <Route Component={Login} path="/login"/>
                <Route Component={toggleReportPage} path="/report/:id"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;