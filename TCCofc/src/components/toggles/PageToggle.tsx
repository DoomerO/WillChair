import decode from "../code/decoderToken";

import TokenErrorPage from "../../pages/intersections/TokenErrorPage";

import React, { useState, useEffect } from 'react';
import axios from "axios";
import serverUrl from "../code/serverUrl";
import Loading from "./Loading";

interface toggleProps {
    compError: React.ReactElement,
    compSuccess: React.ReactElement
}

const PageToggle = ({ compError, compSuccess }: toggleProps) => {

    const [comp, setComp] = useState<React.ReactElement>();
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        checkTokenLocalStorage();
    }, []);

    async function checkTokenLocalStorage() {
        const test = localStorage.getItem("token");
        if (!test) {
            setComp(compError);
            isLoading(false);
        }
        else {
            const token = decode(test);
            const email = token.email;
            if (email) {
                await axios.get(`${serverUrl}/users/email/${email}`, {
                    headers: {
                        authorization: "Bearer " + localStorage.getItem("token")
                    }
                }).then(() => {
                    setComp(compSuccess);
                    isLoading(false);
                }).catch(error => {
                    console.log(error);
                    isLoading(false)
                    setComp(<TokenErrorPage />);
                });
            }
            else {
                isLoading(false);
                setComp(<TokenErrorPage />);
            }

        }
    }

    return (
        (loading) ? <Loading /> : <div>
            {comp}
        </div>
    );

}

export default PageToggle;
