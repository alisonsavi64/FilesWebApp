import Http from "./Http";
import express, {Application, Request, Response, NextFunction} from 'express';

export default class ExpressHttp implements Http{

    private app: any;

    constructor(){
        this.app = express()
    }

    privateRoutes(method: string, url: string, callback: Function){
        this.app[method](url, async function (req: Request, res: Response) {
            try{
                const result = await callback(req.params, req.body)
                return res.json(result);
            }catch(error: any){
            }
        })
    }

    publicRoutes(method: string, url: string, callback: Function){
        this.app[method](url, async function (req: Request, res: Response) {
            try{
                const result = await callback(req.params, req.body)
                return res.json(result);
            }catch(error: any){
            }
        })
    }

    route(method: string, url: string, auth: boolean, callback: Function): void {
        if(auth) this.privateRoutes(method, url, callback)
        else this.publicRoutes(method, url, callback)
    }

    listen(port: number): void {
        this.app.listen(port);
        console.log(`Listening ${port}`)
    }
}