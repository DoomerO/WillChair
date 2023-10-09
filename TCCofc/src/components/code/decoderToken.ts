import jwt from 'jwt-decode';
import { UserToken } from './interfaces';

function decode(token:string) {
    const user : UserToken = jwt(token);
    return user;
}

export default decode;