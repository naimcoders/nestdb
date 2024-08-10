import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ValidationModule } from './validation/validation.module';
import { ConfigModule } from '@nestjs/config';
import { FirebaseService } from './firebase/firebase.service';
import { FirebaseModule } from './firebase/firebase.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    UserModule,
    PrismaModule,
    ValidationModule.forRoot(true),
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [FirebaseService],
})
export class AppModule {}
