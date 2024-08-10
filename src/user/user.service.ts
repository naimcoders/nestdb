import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { IUser } from 'src/interface/user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll(r?: Prisma.UserFindManyArgs): Promise<IUser[]> {
    try {
      return await this.prisma.user.findMany(r);
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  async create(r: Prisma.UserCreateArgs): Promise<IUser> {
    try {
      return await this.prisma.user.create(r);
    } catch (err) {
      const error = err as Error;
      throw new InternalServerErrorException(error.message);
    }
  }

  async login(r: Prisma.UserFindFirstArgs): Promise<IUser> {
    try {
      return await this.prisma.user.findFirst(r);
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
