/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// auth/admin-auth.guard.ts
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const auth = req.headers['authorization'];

    // Simple static token for demo purposes
    if (auth === process.env.DEMO_ADMIN_CREDENTIAL) {
      return true;
    }

    throw new UnauthorizedException('Invalid admin token');
  }
}
