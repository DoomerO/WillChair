import decode from "../code/decoderToken";

import TokenErrorPage from "../../pages/intersections/TokenErrorPage";

import React, {useState, useEffect} from 'react';
import axios from "axios";

interface toggleProps {
    compError: React.ReactElement,
    compSuccess: React.ReactElement
}

const PageToggle = ({compError, compSuccess}: toggleProps) => {

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
            }}).then(() => {
                setComp(compSuccess)
            }).catch(error => {
               console.log(error);
               setComp(<TokenErrorPage/>);
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
