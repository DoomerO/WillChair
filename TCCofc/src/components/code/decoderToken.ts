import jwt from 'jwt-decode';
import { UserToken } from './interfaces';

function decode(token:string) {
    try {
        const user : UserToken = jwt(token);
        return user;
    }
    catch(error) {
        const err : UserToken = {};
        return err;
    }
}

export default decode;