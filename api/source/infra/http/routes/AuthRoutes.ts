import SignIn from "../../../application/usecases/signIn/SignIn";
import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import AuthController from "../../controller/AuthController";
import Http from "../Http";

export default class AuthRoutes{
    
    private authController: AuthController

    constructor(private http: Http, private repositoryFactory: RepositoryFactory){
        this.authController = new AuthController(repositoryFactory)
    }

    init(){
        this.http.route('/signin', 'post', false, async (params: any, body: any) => {
            return await this.authController.singIn(body);
        });       
    }
}