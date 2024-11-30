import CreateUser from "../../source/application/usecases/createUser/CreateUser";
import User from "../../source/domain/entity/User";
import RepositoryFactory from "../../source/domain/repository/RepositoryFactory";
import RepositoryFactoryMemory from "../../source/infra/repository/RepositoryFactoryMemory";

let repositoryFactory: RepositoryFactory;
let createUser: CreateUser;

beforeAll(async function () {
    repositoryFactory = new RepositoryFactoryMemory();
    createUser = new CreateUser(repositoryFactory);
})

test('Must create a user', async function () {
    const user = new User('Test', 'test@gmail.com', 'password');
    const token = await createUser.execute(user);
    expect(token.token).toBeTruthy();    
});