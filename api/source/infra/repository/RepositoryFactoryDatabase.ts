import RepositoryFactory from "../../domain/repository/RepositoryFactory";
import UserRepository from "../../domain/repository/UserRepository";
import UserRepositoryDatabase from "./database/UserRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory{

    private userRepository: UserRepository;

    constructor(){
        this.userRepository = new UserRepositoryDatabase()
    }

    getUserRepository(): UserRepository {
        return this.userRepository
    }
}