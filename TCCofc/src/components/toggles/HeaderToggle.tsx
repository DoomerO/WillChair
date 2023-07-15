import decode from "../decoderToken";

import Header from "../Header";
import HeaderLoged from "../HeaderLoged";

import React, {useState, useEffect} from 'react';
import axios from "axios";

const HeaderToggle = () => {
    const [comp, setComp] = useState<React.ReactElement>();

    useEffect(() => {
        checkTokenLocalStorage();
    }, []);

    async function checkTokenLocalStorage() {
        if (!localStorage.getItem("token")) {
            setComp(<Header/>);
        }
        else {
            const token = decode(localStorage.getItem("token"));
            const email = token.email;

            await axios.get(`http://localhost:3344/users/email/${email}`, {headers: {
                authorization : "Bearer " + localStorage.getItem("token")
            }}).then(res => {
                setComp(<HeaderLoged name={token.name} img=""/>)
            }).catch(error => {
               console.log(error);
               setComp(<Header/>);
            });
        }
    }

    return (
        <div>
            {comp}
        </div>  
    )
}

export default HeaderToggle;