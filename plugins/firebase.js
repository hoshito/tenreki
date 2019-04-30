import firebase from 'firebase'

if (!firebase.apps.length) {
  // これは公開しても大丈夫
  firebase.initializeApp({
    apiKey: "AIzaSyByvpW1EDxl3_ZonFiiCNYKsqqh5BjUajo",
    authDomain: "tenreki-d1e2f.firebaseapp.com",
    databaseURL: "https://tenreki-d1e2f.firebaseio.com",
    projectId: "tenreki-d1e2f",
    storageBucket: "tenreki-d1e2f.appspot.com",
    messagingSenderId: "521924913124"
  })
}

export default firebase
