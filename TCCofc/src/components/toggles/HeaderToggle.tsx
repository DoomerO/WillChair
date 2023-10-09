import decode from "../code/decoderToken";

import Header from "../Header";
import HeaderLogged from "../HeaderLogged";

import React, {useState, useEffect} from 'react';
import axios from "axios";
import serverUrl from "../code/serverUrl";

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
            const test = localStorage.getItem("token");
            if(test) {
                const token = decode(test);

                await axios.get(`${serverUrl}/users/email/${token.email}`, {headers: {
                    authorization : "Bearer " + localStorage.getItem("token")
                }}).then(res => {
                    setComp(<HeaderLogged user={res.data}/>)
                }).catch(error => {
                   console.log(error);
                   setComp(<Header/>);
                });
            }
        }
    }

    return (
        <div>
            {comp}
        </div>  
    )
}

export default HeaderToggle;
