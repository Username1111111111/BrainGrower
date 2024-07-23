import { AuthGuard } from './auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'test_secret' });
    authGuard = new AuthGuard(jwtService);
  });

  it('should return true if token is valid', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer valid_token',
      },
    };
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    jest.spyOn(jwtService, 'verifyAsync').mockResolvedValueOnce({ userId: 1 });

    const result = await authGuard.canActivate(mockExecutionContext);
    expect(result).toBe(true);
    expect(mockRequest['user']).toEqual({ userId: 1 });
  });

  it('should throw UnauthorizedException if token is missing', async () => {
    const mockRequest = {
      headers: {},
    };
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(UnauthorizedException);
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid_token',
      },
    };
    const mockExecutionContext = createMock<ExecutionContext>({
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    });

    jest.spyOn(jwtService, 'verifyAsync').mockRejectedValueOnce(new Error());

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(UnauthorizedException);
  });
});
