import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateOffer from "./CreateOffer";
import WcOffer from "./wcOffer";
import WaOffer from "./waOffer";
import CrOffer from "./crOffer";
import BeOffer from "./BeOffer";

const OfferCreationToggle = () => {
    const {type} = useParams();
    const [comp, setComp] = useState<React.ReactElement>()
    
    useEffect(() => {
        if(type) switch (type) {
            case "cadeira-rodas":
                setComp(<WcOffer/>)
            break;
            case "bengala":
                setComp(<WaOffer/>)
            break;
            case "andador":
                setComp(<BeOffer/>)
            break;
            case "muleta":
                setComp(<CrOffer/>)
            break;
            case "other":
                setComp(<div>Teste</div>)
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