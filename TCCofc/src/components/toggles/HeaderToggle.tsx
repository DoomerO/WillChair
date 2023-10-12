import decode from "../code/decoderToken";

import Header from "../Header";
import HeaderLogged from "../HeaderLogged";

import React, {useState, useEffect} from 'react';
import axios from "axios";
import serverUrl from "../code/serverUrl";
import ComponentLoading from "./ComponentLoading";

const HeaderToggle = () => {
    const [comp, setComp] = useState<React.ReactElement>();
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        checkTokenLocalStorage();
    }, []);

    async function checkTokenLocalStorage() {
        if (!localStorage.getItem("token")) {
            setComp(<Header/>);
            isLoading(false);
        }
        else {
            const test = localStorage.getItem("token");
            if(test) {
                const token = decode(test);

                await axios.get(`${serverUrl}/users/email/${token.email}`, {headers: {
                    authorization : "Bearer " + localStorage.getItem("token")
                }}).then(res => {
                    setComp(<HeaderLogged user={res.data}/>)
                    isLoading(false);
                }).catch(error => {
                   console.log(error);
                   setComp(<Header/>);
                   isLoading(false);
                });
            }
        }
    }

    return (
        <div>
            {(loading) ? <ComponentLoading type="skeleton" width="100%" height="8.5vh"/> : comp}
        </div>  
    )
}

export default HeaderToggle;
