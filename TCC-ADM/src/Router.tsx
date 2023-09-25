import { Routes, Route, BrowserRouter } from "react-router-dom";

import Login from "./pages/Login";
import PageToggle from "./components/toggles/PageToggle";
import Home from "./pages/Home";
import OtherReports from "./pages/OtherReports";
import ReportPage from "./pages/ReportPage";
import SetResponsability from "./pages/SetResponsability";
import UpdateAdm from "./pages/UpdateAdm";
import CreateAdm from "./pages/CreateAdm";

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
    const toggleResponsability = () => {
        return <PageToggle compSuccess={<SetResponsability/>}/>
    }
    const toggleUpdate = () => {
        return <PageToggle compSuccess={<UpdateAdm/>}/>
    }
    const toggleCreate = () => {
        return <PageToggle compSuccess={<CreateAdm/>}/>
    }


    return (
        <BrowserRouter>
            <Routes>
                <Route Component={toggleHome} path="/"/>
                <Route Component={toggleOtherReports} path="/other"/>
                <Route Component={Login} path="/login"/>
                <Route Component={toggleReportPage} path="/report/:id"/>
                <Route Component={toggleResponsability} path="/responsability"/>
                <Route Component={toggleUpdate} path="/adm-update"/>
                <Route component={toggleCreateadm} path="/adm-create"/>
            </Routes>
        </BrowserRouter>
    )
}

export default Router;
