import decode from "../code/decoderToken";

import Header from "../Header";
import HeaderLogged from "../HeaderLogged";

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
                setComp(<HeaderLogged name={token.name} img={(res.data.user_img) ? String.fromCharCode(...new Uint8Array(res.data.user_img.data)) : ""}/>)
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
