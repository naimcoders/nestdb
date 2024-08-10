import * as admin from 'firebase-admin';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
  private firebaseApp: admin.app.App;

  constructor(private readonly configService: ConfigService) {}

  async onApplicationBootstrap() {
    if (admin.apps.length === 0) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: this.configService.get<string>('CLIENT_EMAIL'),
          privateKey: this.configService
            .get<string>('PRIVATE_KEY')
            .replace(/\\n/g, '\n'),
          projectId: this.configService.get<string>('PROJECT_ID'),
        }),
      });
    } else {
      this.firebaseApp = admin.app();
    }
  }

  setup(): admin.app.App {
    return this.firebaseApp;
  }
}
