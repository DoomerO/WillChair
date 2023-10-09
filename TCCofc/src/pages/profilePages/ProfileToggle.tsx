import { useEffect, useState } from "react";
import axios from "axios";
import decode from "../../components/code/decoderToken";
import { useParams } from "react-router-dom";
import Profile from "./Profile"
import ProfileOwn from "./ProfileOwn"
import Loading from "../../components/toggles/Loading";
import serverUrl from "../../components/code/serverUrl";
import {User, UserToken} from "../../components/code/interfaces";

const ProfileToggle = () => {
    const {email} = useParams();
    const [comp, setComp] = useState<React.ReactElement>()
    const [user, setUser] = useState<UserToken>({});
    const [profile, setProfile] = useState<User>({});
    const [loading, isLoading] = useState(true);

    async function getUser() {
        await axios.get(`${serverUrl}/users/profile/${email}`).then(res => {
            setProfile(res.data);
        }).catch(error => {
            console.log(error);
        });
    }

    async function getProfImage() {
        await axios.get(`${serverUrl}/users/profile/photo/${profile?.user_img ?? null}`, {responseType : "arraybuffer"}).then(res => {
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
        const test = localStorage.getItem("token");
        const token = (test) ? decode(test) : null;
        
        if(token) setUser(token); else setUser({});

        if(email) getUser();
    }, [email]);

    useEffect(() => {
        if(profile.user_img) {
            getProfImage();
        }
        if(profile.user_id) {
            isLoading(false);
        }
    }, [profile])

    useEffect(() => {
        if(user)setComp(profile?.user_email === user?.email ? <ProfileOwn user={profile}/> : <Profile user={profile}/>)
        else setComp(<Profile user={profile}/>)
    }, [profile])
   
    return (
        (loading) ? <Loading/> : <div>
            {comp}
        </div>
    )
}

export default ProfileToggle;
