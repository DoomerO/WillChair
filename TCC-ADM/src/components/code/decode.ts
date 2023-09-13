import jwt from 'jwt-decode';

function decode(token:string) {
    const adm = jwt(token);
    return adm;
}

export default decode;