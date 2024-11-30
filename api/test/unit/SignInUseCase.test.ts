import SignIn from "../../source/application/usecases/signIn/SignIn";
import RepositoryFactory from "../../source/domain/repository/RepositoryFactory";
import RepositoryFactoryMemory from "../../source/infra/repository/RepositoryFactoryMemory";

let signIn: SignIn;
let repositoryFactory: RepositoryFactory;


beforeAll(async function (){
    repositoryFactory = new RepositoryFactoryMemory();
    signIn = new SignIn(repositoryFactory);
});

test('Must login a user', async function () {
    const token = await signIn.execute({email: 'admin@test.com', password: 'password'});
    expect(token.token).toBeTruthy();
});