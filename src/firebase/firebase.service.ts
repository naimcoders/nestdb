import * as admin from 'firebase-admin';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { FB_SERVICE } from './service';

let app: admin.app.App;

@Injectable()
export class FirebaseService implements OnApplicationBootstrap {
  // private firebaseApp: admin.app.App;

  async onApplicationBootstrap() {
    if (!app) {
      app = admin.initializeApp({
        credential: admin.credential.cert({
          clientEmail: FB_SERVICE.client_email,
          privateKey: FB_SERVICE.private_key,
          projectId: FB_SERVICE.project_id,
        }),
      });
    }
  }

  setup() {
    return app;
  }

  // constructor() {
  //   if (admin.apps.length < 1) {
  //     console.log('tess');
  //     this.firebaseApp = admin.initializeApp({
  //       credential: admin.credential.cert({
  //         clientEmail: FB_SERVICE.client_email,
  //         privateKey: FB_SERVICE.private_key,
  //         projectId: FB_SERVICE.project_id,
  //       }),
  //     });
  //   } else {
  //     this.firebaseApp = admin.app();
  //   }
  // }
}
