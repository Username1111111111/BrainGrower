import { validate } from 'class-validator';
import { UpdateUserDto } from './UpdateUser.dto';

describe('UpdateUserDto', () => {
  it('should validate email correctly', async () => {
    const dto = new UpdateUserDto();
    dto.email = 'invalid-email';
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isEmail).toBeDefined();

    dto.email = 'valid@example.com';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate password correctly', async () => {
    const dto = new UpdateUserDto();
    dto.password = 'short';
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.minLength).toBeDefined();

    dto.password = 'validPassword';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate name correctly', async () => {
    const dto = new UpdateUserDto();
    dto.name = '';
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isNotEmpty).toBeDefined();

    dto.name = 'John Doe';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate lastLogin as Date', async () => {
    const dto = new UpdateUserDto();
    dto.lastLogin = new Date('invalid-date');
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isDate).toBeDefined();

    dto.lastLogin = new Date();
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate role correctly', async () => {
    const dto = new UpdateUserDto();
    dto.role = '';
    let errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints.isNotEmpty).toBeDefined();

    dto.role = 'admin';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('should validate profileImage correctly', async () => {
    const dto = new UpdateUserDto();
    dto.profileImage = '';
    let errors = await validate(dto);
    expect(errors.length).toBe(0);

    dto.profileImage = 'http://example.com/image.png';
    errors = await validate(dto);
    expect(errors.length).toBe(0);
  });
});
