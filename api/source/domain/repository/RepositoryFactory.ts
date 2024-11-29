import UserRepository from "./UserRepository";

export default interface RepositoryFactory{
    getUserRepository(): UserRepository
}