import * as admin from 'firebase-admin';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FB_SERVICE } from './service';

@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
  private firebaseApp: admin.app.App;

  async onApplicationBootstrap() {
    if (admin.apps.length === 0) {
      this.firebaseApp = admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: FB_SERVICE.client_email,
          privateKey: FB_SERVICE.private_key,
          projectId: FB_SERVICE.project_id,
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
