import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import SignInInput from "./SignInInput";
import SignInOutput from "./SignInOutput";
import UserRepository from "../../../domain/repository/UserRepository";
import { compare, hash } from "bcrypt";
import AcessToken from "../../../domain/entity/AcessToken";

export default class SignIn{

    private userRepository: UserRepository;

    constructor(repositoryFactory: RepositoryFactory){
        this.userRepository = repositoryFactory.getUserRepository();
    }

    async execute(input: SignInInput): Promise<SignInOutput> {        

        const user = await this.userRepository.findByEmail(input.email);
        const isEqual = await compare(input.password, user.password)
        if (!isEqual) throw new Error("Invalid credential");
        const jsonToken = new AcessToken(user);
        return {
            token: jsonToken.token
        }
    }
}