import AcessToken from "../../../domain/entity/AcessToken";
import User from "../../../domain/entity/User";
import RepositoryFactory from "../../../domain/repository/RepositoryFactory";
import UserRepository from "../../../domain/repository/UserRepository";
import CreateUserInput from "./CreateUserInput";
import CreateUserOutput from "./CreateUserOutput";
import {hash} from 'bcrypt';

export default class CreateUser{
    private userRepository: UserRepository;
    constructor(private repositoryFactory: RepositoryFactory){
        this.userRepository = repositoryFactory.getUserRepository();
    }

    async execute(input: CreateUserInput): Promise<CreateUserOutput>{
        const encryptPassword = await hash(input.password, 10);
        
        const newUser = new User(input.name, input.email, encryptPassword);

        await this.userRepository.save(newUser);

        const jsonToken = new AcessToken(newUser);

        return {
            token: jsonToken.token
        }
    }
}