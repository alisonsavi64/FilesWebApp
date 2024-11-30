import SignIn from "../../application/usecases/signIn/SignIn";
import SignInInput from "../../application/usecases/signIn/SignInInput";
import SignInOutput from "../../application/usecases/signIn/SignInOutput";
import RepositoryFactory from "../../domain/repository/RepositoryFactory";

export default class AuthController{
    constructor(private repositoryFactory: RepositoryFactory){}

    async singIn(input: SignInInput): Promise<SignInOutput>{
        validateInputControllers(input, {email: "string", password: "string"});
        const signIn = new SignIn(this.repositoryFactory);

        return await signIn.execute(input);
    }
}