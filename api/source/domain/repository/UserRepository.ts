import User from "../entity/User";

export default interface UserRepository{
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    save(user: User): Promise<void>;
}