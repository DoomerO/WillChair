import decode from "./decoderToken";

import Loginwip from "../pages/Loginwip";
import HomeProd from "../pages/HomeProd";
import Home from "../pages/Home";

import {useState, useEffect} from 'react';
import axios from "axios";

const HomeToggle = () => {

    const [comp, setComp] = useState(<p/>);

    useEffect(() => {
        checkTokenLocalStorage();
    }, []);

    async function checkTokenLocalStorage() {
        if (!localStorage.getItem("token")) {
            setComp(<Home/>);
        }
        else {
            const token = decode(localStorage.getItem("token"));
            const email = token.email;

            await axios.get(`http://localhost:3344/users/email/${email}`, {headers: {
                authorization : "Bearer " + localStorage.getItem("token")
            }}).then(res => {
                setComp(<HomeProd/>)
            }).catch(error => {
               console.log(error);
               setComp(<Loginwip/>);
            });
        }
    }

    return (
        <div>
            {comp}
        </div>
    );

}

export default HomeToggle;