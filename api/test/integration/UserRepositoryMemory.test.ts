import User from "../../source/domain/entity/User";
import RepositoryFactory from "../../source/domain/repository/RepositoryFactory";
import RepositoryFactoryMemory from "../../source/infra/repository/RepositoryFactoryMemory";

let repositoryFactory: RepositoryFactory;

beforeAll(async function () {
    repositoryFactory = new RepositoryFactoryMemory();
})

test('Must save a user search it for id', async function () {
    const user = new User('Test', 'test@gmail.com', 'password');
    await repositoryFactory.getUserRepository().save(user);
    const foundedUser = await repositoryFactory.getUserRepository().findById(user.id!);
    expect(foundedUser.email).toBe('test@gmail.com');
    expect(foundedUser.name).toBe('Test');
    expect(foundedUser.password).toBe('password');
});

test('Must save a user search it for e-mail', async function () {
    const user = new User('Test2', 'test2@gmail.com', 'password2');
    await repositoryFactory.getUserRepository().save(user);
    const foundedUser = await repositoryFactory.getUserRepository().findByEmail(user.email);
    expect(foundedUser.email).toBe('test2@gmail.com');
    expect(foundedUser.name).toBe('Test2');
    expect(foundedUser.password).toBe('password2');
});

test('Must throw an error of user not found when searching for id', async function () {
    await expect(repositoryFactory.getUserRepository().findById('1')).rejects.toThrow('User not found');
  });
  
  test('Must throw an error of user not found when searching for email', async function () {
    await expect(repositoryFactory.getUserRepository().findByEmail('notexistingemail@gmail.com')).rejects.toThrow('User not found');
  });
  