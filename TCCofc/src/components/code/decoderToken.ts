import jwt from 'jwt-decode';

function decode(token:string) {
    const user = jwt(token);
    return user;
}

export default decode;