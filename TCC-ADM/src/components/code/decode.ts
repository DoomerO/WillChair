import jwt from 'jwt-decode';
import { AdmToken } from './interfaces';

function decode(token:string) {
    const adm : AdmToken = jwt(token);
    return adm;
}

export default decode;