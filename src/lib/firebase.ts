import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';
import { 
  getAuth, 
  Auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  User,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

let app: FirebaseApp;
let db: Firestore;
let auth: Auth;

try {
  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }

  db = getFirestore(app, firebaseConfig.firestoreDatabaseId || undefined);
  auth = getAuth(app);
  console.log('Firebase initialized successfully for UGCLage.com');
} catch (err) {
  console.error('Firebase initialization error:', err);
}

export { 
  app, 
  db, 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
};
export type { User };

/**
 * Local Storage Persistence Layer for offline or instant prototype mode
 */
export function getLocalStore<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(`ugclage_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    console.error('Error reading localStorage key', key, e);
    return defaultValue;
  }
}

export function setLocalStore<T>(key: string, value: T): void {
  try {
    localStorage.setItem(`ugclage_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error('Error writing localStorage key', key, e);
  }
}
