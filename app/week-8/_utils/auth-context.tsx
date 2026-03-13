"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GithubAuthProvider,
  User,
} from "firebase/auth";
import { auth } from "./firebase";

type AuthContextType = {
  user: User | null;
  gitHubSignIn: () => Promise<unknown>;
  firebaseSignOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const gitHubSignIn = () => {
    const provider = new GithubAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const firebaseSignOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, gitHubSignIn, firebaseSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useUserAuth must be used inside AuthContextProvider");
  }

  return context;
}