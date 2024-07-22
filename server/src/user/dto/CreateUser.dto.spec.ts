import { validate } from 'class-validator';
import { CreateUserDto } from './CreateUser.dto';

describe('CreateUserDto', () => {
  it('should validate email correctly', async () => {
    const dto = new CreateUserDto();
    dto.email = 'invalid-email';
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isEmail).toBeDefined();

    dto.email = 'valid@example.com';
    dto.password = 'validPassword';
    dto.name = 'John Doe';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate password correctly', async () => {
    const dto = new CreateUserDto();
    dto.password = 'short';
    dto.email = 'valid@example.com';
    dto.name = 'John Doe';
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.minLength).toBeDefined();

    dto.password = 'validPassword';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate name correctly', async () => {
    const dto = new CreateUserDto();
    dto.name = '';
    dto.email = 'valid@example.com';
    dto.password = 'validPassword';
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isNotEmpty).toBeDefined();

    dto.name = 'John Doe';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
