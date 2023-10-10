import OfferPageChat from "./OfferPageChat";
import { useEffect, useState } from "react";
import axios from "axios";
import decode from "../../components/code/decoderToken";
import { useParams } from "react-router-dom";
import OfferPageOwner from "./OfferPageOwner";
import { User, UserToken, Offer } from "../../components/code/interfaces";
import serverUrl from "../../components/code/serverUrl";
import Loading from "../../components/toggles/Loading";

const OfferPageLogged = () => {
    const {id} = useParams();
    
    const [user, setUser] = useState<UserToken>({});
    const [userQuery, setUserQuery] = useState<User>({});
    const [offer, setOffer] = useState<Offer>({});
    const [loading, isLoading] = useState(true);

    useEffect(() => {
        const test = localStorage.getItem("token");
        if(test) {
            const token = decode(test);

            setUser(token);
        } 
    }, [])

    async function getUser() {
        await axios.get(`${serverUrl}/users/email/${user.email}`, {
            headers : {authorization : "Bearer " + localStorage.getItem("token")}
        }).then(res => {
            setUserQuery(res.data);
            isLoading(false);
        }).catch(error => {
            console.log(error);
        });
    }

    async function queryOffer() { 
        await axios.get(`${serverUrl}/offers/id/${id}`).then(res => {
            setOffer(res.data[0]);
        }).catch(error => {
            console.log(error);
        })
    };

    useEffect(() => {
        if (user.email) queryOffer();
    }, [user]);

    useEffect(() => {
        getUser();
    }, [offer]);

   
    return (
        (loading) ? <Loading/> : <div>
            {(offer.User_user_id === userQuery.user_id) ? <OfferPageOwner offer={offer} user={userQuery}/> : <OfferPageChat offer={offer} user={userQuery}/>}
        </div>
    )
}

export default OfferPageLogged;
