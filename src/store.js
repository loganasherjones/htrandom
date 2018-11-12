import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

import settingsReducer from './reducers/settingsReducer';
// Custom Reducers

// End Custom Reducers

const firebaseConfig = {
  apiKey: 'AIzaSyCivdsG3pEQRwZOBF5l9JTEvvS5vtTrHN0',
  authDomain: 'htrandom-d25f9.firebaseapp.com',
  databaseURL: 'https://htrandom-d25f9.firebaseio.com',
  projectId: 'htrandom-d25f9',
  storageBucket: 'htrandom-d25f9.appspot.com',
  messagingSenderId: '392767982567'
};

const rrfConfig = {
  userProfile: 'users',
  userFirestoreForProfile: true
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  settings: settingsReducer
});

// Setup user settings
if (localStorage.getItem('settings') == null) {
  const defaultSettings = {};

  localStorage.setItem('settings', JSON.stringify(defaultSettings));
}

const initialState = { settings: JSON.parse(localStorage.getItem('settings')) };

const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
