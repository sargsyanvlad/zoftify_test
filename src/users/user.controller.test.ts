import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';

const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };

const mockUserRepository = {
  findOne: jest.fn().mockResolvedValue(mockUser),
  findManyWithPagination: jest.fn().mockResolvedValue([mockUser]),
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const mockUser = {
        id: 1,
        email: 'email@mail.com',
        provider: 'email',
        firstName: 'f',
        lastName: 'l',
      };
      jest
        .spyOn(usersService, 'findOne')
        .mockImplementation(() => Promise.resolve(mockUser as User));
      const result = await usersController.findOne('1');
      expect(result).toMatchObject(mockUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockResult = {
        data: [
          {
            id: 1,
            email: 'email@mail.com',
            provider: 'email',
            firstName: 'f',
            lastName: 'l',
          },
          {
            id: 2,
            email: 'email2@mail.com',
            provider: 'email',
            firstName: 'f1',
            lastName: 'l2',
          },
        ],
        hasNextPage: false,
      };
      jest
        .spyOn(usersService, 'findManyWithPagination')
        .mockImplementation(() => Promise.resolve(mockResult.data as User[]));
      const result = await usersController.findAll(0, 19);
      expect(result).toMatchObject(mockResult);
    });
  });
});
