import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) =>
        Promise.resolve({ id, email: 'test@mail.com', password: 'qwerty' }),
      findByEmail: (email: string) =>
        Promise.resolve({ id: 1, email: 'test@mail.com', password: 'qwerty' }),
      remove: (id: number) => Promise.resolve(),
      update: (id: number, attrs: Partial<UserDto>) => {
        return Promise.resolve({ id, ...attrs } as User);
      },
    };
    fakeAuthService = {
      // signUp: (email: string, password: string) => {},
      // signIn: (email: string, password: string) => {},
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
