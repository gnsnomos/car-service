// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    name: 'default',
    firebase: {
        config: {
            apiKey: 'AIzaSyClIAgwv1cYHivvyr4t6dzGLRDR1hIp3oo',
            authDomain: 'car-service-cd3de.firebaseapp.com',
            databaseURL: 'https://car-service-cd3de.firebaseio.com',
            projectId: 'car-service-cd3de',
            storageBucket: 'car-service-cd3de.appspot.com',
            messagingSenderId: '712046935279',
            appId: '1:712046935279:web:ec7707f2217ffbdfc0ef1a'
        },
        actionCodeSettings: {
            url: 'http://localhost:5200/demo',
            handleCodeInApp: true
        }
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
