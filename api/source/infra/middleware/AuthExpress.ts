import { verify } from 'jsonwebtoken';
import Auth from './Auth';
import {readFileSync} from 'fs';
import { NextFunction, Request, Response } from 'express';

export default class ExpressAuth implements Auth{
    constructor(){}

    async execute(request: Request, response: Response, next: NextFunction) {
        if(!request.headers || !request.headers['acess-token']) return response.status(403).json({message: 'Token is required'});
        const token = request.headers['acess-token'];
        try{
            const publicKey = readFileSync('./public.pem', 'utf8')
            let data;
            try{
                // @ts-ignore
                data = verify(token, publicKey, {algorithms: ["RS256"]}); 
            } catch(e){
                throw new Error('Invalid token');
            }
            return next();
        } catch (e){
            return response.status(401).json({ // @ts-ignore
                error: e.errorCode,
                message: (e as Error).message
            })
        }
    }
}