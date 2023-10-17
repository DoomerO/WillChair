import decode from "../code/decode";

import React, {useState, useEffect} from 'react';
import axios from "axios";
import ErrorPage from "../../pages/intersections/ErrorPage";
import serverUrl from "../code/serverUrl";

interface toggleProps {
    compSuccess: React.ReactElement
}

const PageToggle = ({compSuccess}: toggleProps) => {

    const [comp, setComp] = useState<React.ReactElement>();

    useEffect(() => {
        checkTokenLocalStorage();
    }, []);

    async function checkTokenLocalStorage() {
        const test = localStorage.getItem("token");
        if (!test) {
            setComp(<ErrorPage/>);
        }
        else {

            const token = decode(test);
            const email = token.email;

            await axios.get(`${serverUrl}/adm/email/${"validation"}/${email}`, {headers: {
                authorization : "Bearer " + localStorage.getItem("token")
            }}).then(() => {
                setComp(compSuccess)
            }).catch(error => {
               console.log(error);
               setComp(<ErrorPage/>);
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
