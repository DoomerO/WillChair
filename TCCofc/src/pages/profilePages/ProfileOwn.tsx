interface ProfileOwnProps {
    user: object
}

const ProfileOwn = ({user} : ProfileOwnProps) =>{
    return(
    <div>
        {user.user_email}
    </div>
    )
}
export default ProfileOwn