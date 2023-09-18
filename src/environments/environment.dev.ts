export const environment = {
  production: false,
  name: 'dev',
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
      url: 'http://localhost:5200/profile/new',
      handleCodeInApp: true
    }
  }
};
