import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";

describe('AuthService', () => {
    let service: AuthService;
    let fakeUserService: Partial<UsersService>;

    beforeEach(async () => {
        //Create a fake copy of the user service 
    
        fakeUserService = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User)
        };
        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUserService
                }
            ],
        }).compile();
    
        service = module.get(AuthService);
    })
    
    it('Can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    });

    it('creates a new use with a salted and hashed password', async() => {
        const user = await service.signup('ymulikuza@gmail.com', '123456');

        expect(user.password).not.toEqual('123456');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });

    it('throws an error if user signs up with an email already in use', async (done) => {
        fakeUserService.find = () => Promise.resolve([{ id: 1, email: 'a', password: '1'} as User])
        try {
            await service.signup('ymulikuza@gmail.com', '123456')
        } catch (error) {
            done();
        }
    })
    
})

