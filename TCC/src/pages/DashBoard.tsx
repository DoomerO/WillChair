import { useState } from "react";
import Login from "./Login";


const DashBoard = () => {
    const [token, settoken] = useState();

    if (!token) {
        {return <Login setToken={token}/>}
    }

    return (
        <></>
    )
}

export default DashBoard;