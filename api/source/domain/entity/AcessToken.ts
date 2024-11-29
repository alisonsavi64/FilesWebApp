import { readFileSync } from "fs";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import User from "./User";


export default class AcessToken{
    readonly id: string;
    readonly token: string;

    constructor(user: User, id?: string, token?: string){
        if(!id) id = uuidv4();
        this.id = id;
        if(token){
            this.token = token;
            return;
        };
        const privateKey = readFileSync('./private.pem', 'utf-8');
        const paylod = {
            userId: user.id,
            userName: user.name,
            id: this.id
        };

        this.token = sign(paylod,  privateKey, {
            expiresIn: '10d',
            algorithm: 'RS256'
        });
    }
}