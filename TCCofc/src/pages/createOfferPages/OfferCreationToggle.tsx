import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateOffer from "./CreateOffer";
import CadeiraRodasOffer from "./CaderiaRodasOffer";
import BengalaOffer from "./BengalaOffer";
import MuletaOffer from "./MuletaOffer";
import AndadorOffer from "./AndadorOffer";
import OtherOffer from "./OtherOffer";

const OfferCreationToggle = () => {
    const {type} = useParams();
    const [comp, setComp] = useState<React.ReactElement>()
    
    useEffect(() => {
        if(type) switch (type) {
            case "cadeira-rodas":
                setComp(<CadeiraRodasOffer/>)
            break;
            case "bengala":
                setComp(<BengalaOffer/>)
            break;
            case "andador":
                setComp(<AndadorOffer/>)
            break;
            case "muleta":
                setComp(<MuletaOffer/>)
            break;
            case "other":
                setComp(<OtherOffer/>)
            break;
            default:
                setComp(<CreateOffer/>)
            break;
        }
    }, [type]);
   
    return (
        <div>
            {comp}
        </div>
    )
}

export default OfferCreationToggle;