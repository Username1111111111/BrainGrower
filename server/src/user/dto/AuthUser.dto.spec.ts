import { validate } from 'class-validator';
import { AuthUserDto } from './AuthUser.dto';

describe('AuthUserDto', () => {
  it('should validate successfully with correct data', async () => {
    const dto = new AuthUserDto();
    dto.id = 1;
    dto.email = 'test@example.com';
    dto.password = 'password';
    dto.name = 'Test User';
    dto.role = 'admin';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should fail validation when required fields are missing', async () => {
    const dto = new AuthUserDto();
    dto.email = 'test@example.com';
    dto.password = 'password';
    dto.name = 'Test User';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((error) => error.property === 'id')).toBe(true);
    expect(errors.some((error) => error.property === 'role')).toBe(true);
  });

  it('should fail validation with incorrect email', async () => {
    const dto = new AuthUserDto();
    dto.id = 1;
    dto.email = 'invalid-email';
    dto.password = 'password';
    dto.name = 'Test User';
    dto.role = 'admin';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((error) => error.property === 'email')).toBe(true);
  });

  it('should fail validation when fields are empty', async () => {
    const dto = new AuthUserDto();
    dto.id = null;
    dto.email = '';
    dto.password = '';
    dto.name = '';
    dto.role = '';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some((error) => error.property === 'id')).toBe(true);
    expect(errors.some((error) => error.property === 'email')).toBe(true);
    expect(errors.some((error) => error.property === 'name')).toBe(true);
    expect(errors.some((error) => error.property === 'role')).toBe(true);
  });
});
