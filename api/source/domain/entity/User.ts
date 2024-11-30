import { v4 as uuidv4 } from "uuid";

export default class User{
    constructor(readonly name: string, readonly email: string, readonly password: string, readonly id?: string){
        if(!id) id = uuidv4();
        this.id = id;
    }
}