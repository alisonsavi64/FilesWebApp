import RepositoryFactory from "../../domain/repository/RepositoryFactory";
import UserRepository from "../../domain/repository/UserRepository";
import UserRepositoryMemory from "./memory/UserRepositoryMemory";

export default class RepositoryFactoryMemory implements RepositoryFactory{
 
    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepositoryMemory()
    }

    getUserRepository(): UserRepository {
        return this.userRepository
    }
}