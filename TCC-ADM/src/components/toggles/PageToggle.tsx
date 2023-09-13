import decode from "../code/decode";

import React, {useState, useEffect} from 'react';
import axios from "axios";
import ErrorPage from "../../pages/intersections/ErrorPage";

interface toggleProps {
    compSuccess: React.ReactElement
}

const PageToggle = ({compSuccess}: toggleProps) => {

    const [comp, setComp] = useState<React.ReactElement>();

    useEffect(() => {
        checkTokenLocalStorage();
    }, []);

    async function checkTokenLocalStorage() {
        if (!localStorage.getItem("token")) {
            setComp(<ErrorPage/>);
        }
        else {
            const token = decode(localStorage.getItem("token"));
            const email = token.email;

            await axios.get(`http://localhost:3344/adm/email/${"validation"}/${email}`, {headers: {
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
