import decode from "./decoderToken";

import Loginwip from "../pages/Loginwip";
import HomeProd from "../pages/HomeProd";
import Home from "../pages/Home";

import React, {useState, useEffect, Component} from 'react';
import axios from "axios";

interface toggleProps {
    compError: React.ReactElement,
    compSucsses: React.ReactElement
}

const PageToggle = ({compError, compSucsses}: toggleProps) => {

    const [comp, setComp] = useState<React.ReactElement>();

    useEffect(() => {
        checkTokenLocalStorage();
    }, []);

    async function checkTokenLocalStorage() {
        if (!localStorage.getItem("token")) {
            setComp(compError);
        }
        else {
            const token = decode(localStorage.getItem("token"));
            const email = token.email;

            await axios.get(`http://localhost:3344/users/email/${email}`, {headers: {
                authorization : "Bearer " + localStorage.getItem("token")
            }}).then(res => {
                setComp(compSucsses)
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

export default PageToggle;
