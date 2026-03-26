"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Week8Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  async function handleLogin() {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Week 10 - Shopping List with Firestore</h1>

      {!user ? (
        <div className="space-y-4">
          <p>Please log in with GitHub to continue.</p>
          <button
            onClick={handleLogin}
            className="bg-black text-white px-4 py-2 rounded"
          >
            Login with GitHub
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p>
            Welcome, {user.displayName} ({user.email})
          </p>

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>

          <div>
            <Link
              href="/week-10/shopping-list"
              className="text-blue-500 underline"
            >
              Go to Shopping List
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}