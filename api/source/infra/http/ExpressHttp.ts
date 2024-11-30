import Auth from "../middleware/Auth";
import Http from "./Http";
import express, {Application, Request, Response, NextFunction} from 'express';
import cors from 'cors';

export default class ExpressHttp implements Http{

    private app: any;
    private auth: Auth;

    constructor(auth: Auth){
        this.app = express()
        this.app.use(cors());
        this.app.all('*', function(req: Request, res: Response, next: NextFunction){
            res.header('Access-Control-Allow-Origin', '*');
			res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Headers', 'Content-Type, access-token');
			next();

        })
        this.app.options('*', function (req: Request, res: Response, next: NextFunction) {
			res.end();
		});

        this.auth = auth;
    }

    privateRoutes(method: string, url: string, callback: Function){
        this.app[method](url, this.auth.execute.bind(this.auth),  async function (req: Request, res: Response) {
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