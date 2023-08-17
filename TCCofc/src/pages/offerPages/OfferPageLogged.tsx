import OfferPageChat from "./OfferPageChat";
import { ReactElement, useEffect, useState } from "react";
import axios from "axios";
import decode from "../../components/code/decoderToken";
import { useParams } from "react-router-dom";
import OfferPageOwner from "./OfferPageOwner";

const OfferPageLogged = () => {
    const {id} = useParams();
    
    const [user, setUser] = useState(decode(localStorage.getItem("token")));
    const [userQuery, setUserQuery] = useState([]);
    const [offer, setOffer] = useState([]);

    async function getUser() {
        await axios.get(`http://localhost:3344/users/email/${user.email}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then(res => {
            setUserQuery(res.data);
        }).catch(error => {
            
            console.log(error);
        });
    }

    async function queryOffer() { 
        await axios.get(`http://localhost:3344/offers/id/${id}`).then(res => {
            setOffer(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        queryOffer();
    }, []);

    useEffect(() => {
        getUser();
    }, [offer]);

   
    return (
        <div>
            {(offer.User_user_id === userQuery.user_id) ? <OfferPageOwner offer={offer} user={userQuery}/> : <OfferPageChat offer={offer} user={userQuery}/>}
        </div>
    )
}

export default OfferPageLogged;
