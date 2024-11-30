import User from "../../../domain/entity/User";
import UserRepository from "../../../domain/repository/UserRepository";

export default class UserRepositoryMemory implements UserRepository{

    private users: User[];

    constructor(){
        this.users = [
            new User('admin', 'admin@test.com', '$2b$10$NMpYw4yNFHDUW43/Eh5QpuuW7SH0I4vzzF217UJ7o4K2yVBFuXSvS')
        ];
    }

    async findByEmail(email: string): Promise<User> {
        const user = this.users.find((userData) => userData?.email === email);
        if(!user) throw new Error('User not found');
        return user;
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