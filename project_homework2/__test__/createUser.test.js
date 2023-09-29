import '../config.js';
import dataSource, { initDB } from '../dist/db/dataSource.js';
import { insertUser } from '../controllers/user.js'


beforeAll(async () => {
    await initDB();
});

afterAll(async () => {
    await dataSource.destroy();
});



describe('Create User API', () => {
    it('should create a new user', async () => {
        // Define the user object based on the NSUser.Item interface
        const newUser = {
            userName: "Safa",
            email: "ahmad@email.com",
            password: "123456",
            type: "admin",
            roles: ["cd82e975-703c-417c-808e-542780a1050d"]
        };


        await insertUser(newUser);

        const createdUser = await User.findOne({ id: newUser.id });
        expect(createdUser).to.exist;
        expect(createdUser.userName).to.equal('Safa');
    });
});