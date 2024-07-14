import { validate } from 'class-validator';
import { GetUserDto } from './GetUser.dto';

describe('GetUserDto', () => {
  it('should validate successfully with correct data', async () => {
    const dto = new GetUserDto();
    dto.id = 1;
    dto.email = 'test@example.com';
    dto.name = 'Test User';
    dto.signupDate = new Date();
    dto.lastLogin = new Date();
    dto.role = 'admin';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when required fields are missing', async () => {
    const dto = new GetUserDto();
    dto.email = 'test@example.com';
    dto.name = 'Test User';
    dto.signupDate = new Date();
    dto.lastLogin = new Date();

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((error) => error.property === 'id')).toBe(true);
    expect(errors.some((error) => error.property === 'role')).toBe(true);
  });

  it('should fail validation with incorrect email', async () => {
    const dto = new GetUserDto();
    dto.id = 1;
    dto.email = 'invalid-email';
    dto.name = 'Test User';
    dto.signupDate = new Date();
    dto.lastLogin = new Date();
    dto.role = 'admin';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((error) => error.property === 'email')).toBe(true);
  });

  it('should fail validation when fields are empty or invalid', async () => {
    const dto = new GetUserDto();
    dto.id = null;
    dto.email = '';
    dto.name = '';
    dto.signupDate = null;
    dto.lastLogin = null;
    dto.role = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((error) => error.property === 'id')).toBe(true);
    expect(errors.some((error) => error.property === 'email')).toBe(true);
    expect(errors.some((error) => error.property === 'name')).toBe(true);
    expect(errors.some((error) => error.property === 'signupDate')).toBe(true);
    expect(errors.some((error) => error.property === 'lastLogin')).toBe(true);
    expect(errors.some((error) => error.property === 'role')).toBe(true);
  });
});
