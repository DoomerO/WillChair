import { useEffect, useState } from "react";
import axios from "axios";
import decode from "../../components/code/decoderToken";
import { useParams } from "react-router-dom";
import Profile from "./Profile"
import ProfileOwn from "./ProfileOwn"

const ProfileToggle = () => {
    const {email} = useParams();
    const [comp, setComp] = useState<React.ReactElement>()
    const [user, setUser] = useState({});
    const [profile, setProfile] = useState([]);

    async function getUser() {
        await axios.get(`http://localhost:3344/users/profile/${email}`).then(res => {
            setProfile(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    async function getProfImage() {
        await axios.get(`http://localhost:3344/users/profile/photo/${profile.user_img}`, {responseType : "arraybuffer"}).then(res => {
            const buffer = new Uint8Array(res.data);
            const blob = new Blob([buffer], { type: res.headers.contentType });
            let reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = () => {
                setProfile(prev => ({...prev, user_img : reader.result}));
            }
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        try{
            setUser(decode(localStorage.getItem("token")))
        }catch{
            setUser({})
        }
        if(email) getUser();
    }, [email]);

    useEffect(() => {
        if(profile.user_img) {
            getProfImage();
        }
    }, [profile])

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
