import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { Repository } from 'typeorm';

describe('AppModule', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('should be defined', () => {
    const appModule = app.get<AppModule>(AppModule);
    expect(appModule).toBeDefined();
  });

  it('AppService should be defined', () => {
    const appService = app.get<AppService>(AppService);
    expect(appService).toBeDefined();
  });

  it('should load environment variables', () => {
    const configService = app.get<ConfigService>(ConfigService);
    expect(configService.get('DATABASE_HOST')).toBeDefined();
  });

  it('should connect to the database', async () => {
    const userRepository = app.get<Repository<User>>(getRepositoryToken(User));
    expect(userRepository).toBeDefined();
  });
});
