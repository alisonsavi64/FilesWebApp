import User from "../../../domain/entity/User";
import UserRepository from "../../../domain/repository/UserRepository";

export default class UserRepositoryMemory implements UserRepository{

    private users: User[];

    constructor(){
        this.users = [];
    }

    async findByEmail(email: string): Promise<User> {
        throw new Error('Not implemented');
    }

    async save(user: User): Promise<void> {
        this.users.push(user);
    }

    async findById(id: string): Promise<User> {
        const user = this.users.find((userData) => userData?.id === id);
        if(!user) throw new Error('User not found');
        return user;
    }
}