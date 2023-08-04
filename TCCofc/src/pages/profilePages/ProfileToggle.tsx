import { useEffect, useState } from "react";
import axios from "axios";
import decode from "../../components/decoderToken";
import { useParams } from "react-router-dom";
import Profile from "./Profile"
import ProfileOwn from "./ProfileOwn"

const ProfileToggle = () => {
    const {email} = useParams();
    const [comp, setComp] = useState<React.ReactElement>()
    const [user, setUser] = useState(decode(localStorage.getItem("token")));
    const [profile, setProfile] = useState([]);

    async function getUser() {
        await axios.get(`http://localhost:3344/users/profile/${email}`).then(res => {
            setProfile(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    useEffect(() => {
        if(email) getUser();
    }, [email]);

    useEffect(() => {
        if(user)setComp(profile.user_email === user.email ? <ProfileOwn user={profile}/> : <Profile user={profile}/>)
        else setComp(<Profile user={profile}/>)
    }, [profile])
   
    return (
        <div>
            {comp}
        </div>
    )
}

export default ProfileToggle;
