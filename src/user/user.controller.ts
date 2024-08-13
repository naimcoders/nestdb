import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { Res } from 'src/interface/index.interface';
import {
  ICreateUser,
  IUser,
  UserCreateSchema,
} from 'src/interface/user.interface';
import { UserService } from './user.service';
// import { FirebaseAuthGuard } from 'src/firebase/firebase.guard';
import { ValidationService } from 'src/validation/validation.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Controller('api/users')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly validationService: ValidationService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Get()
  // @UseGuards(FirebaseAuthGuard)
  async findAll(): Promise<Res<IUser[]>> {
    try {
      const data = await this.userService.findAll();
      return {
        data,
        code: 200,
        errors: '',
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post('login')
  async login(@Body() r: ICreateUser): Promise<Res<string>> {
    try {
      const data = await this.userService.login({
        where: {
          email: r.email,
        },
      });

      const compare = await bcrypt.compare(r.password, data.password);
      if (!compare) {
        throw new BadRequestException('Email or password is wrong');
      }

      const token = await this.firebaseService
        .setup()
        .auth()
        .createCustomToken(String(data.id));

      return {
        data: token,
        code: 200,
        errors: '',
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  @Post()
  async create(@Body() r: ICreateUser): Promise<Res<IUser>> {
    try {
      const result = this.validationService.validate(UserCreateSchema, r);
      const newPassword = await bcrypt.hash(result.password, 10);

      const data = await this.userService.create({
        data: {
          email: result.email,
          password: newPassword,
        },
      });

      return {
        data,
        code: 200,
        errors: '',
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
