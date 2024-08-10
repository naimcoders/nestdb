import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from './firebase.service';
import { Request } from 'express';

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(private firebaseAdmin: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];
    try {
      await this.firebaseAdmin.setup().auth().verifyIdToken(token);
      return true;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
