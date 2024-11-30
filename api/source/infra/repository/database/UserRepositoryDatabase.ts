import User from "../../../domain/entity/User";
import UserRepository from "../../../domain/repository/UserRepository";

export default class UserRepositoryDatabase implements UserRepository{


    async findByEmail(email: string): Promise<User> {
        throw new Error("Not Implemented");
        
    }

    async save(user: User): Promise<void> {
        throw new Error("Not Implemented");
        
    }

    async findById(id: string): Promise<User> {
        throw new Error("Not Implemented");
    }
}