import { useState, useCallback, useEffect } from "react";
import {
  GoogleSignin,
  SignInSuccessResponse,
  User as GoogleUser,
} from "@react-native-google-signin/google-signin";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useAppDispatch } from "@/store/hooks";
import { setIsLoggedIn } from "@/store/auth";

interface UseGoogleSignInHook {
  isLoading: boolean;
  error: string | null;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  user: FirebaseAuthTypes.User | null;
}

export const useGoogleSignIn = (): UseGoogleSignInHook => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Configure Google Sign-In on component mount
  const configureGoogleSignIn = useCallback(async () => {
    try {
      await GoogleSignin.configure({
        // Replace with your web client ID from Firebase console
        webClientId:
          "418738800900-18lo1llggrlh1nhf9tgjgjahlqnm4hs0.apps.googleusercontent.com",
        scopes: ["profile", "email"], // specify required scopes
        offlineAccess: true,
      });
    } catch (configError) {
      console.error("Google Sign-In Configuration Error:", configError);
      setError(String(configError));
    }
  }, []);

  // Check initial auth state
  useEffect(() => {
    configureGoogleSignIn();

    // Check if user is already logged in
    const unsubscribe = auth().onAuthStateChanged((currentUser) => {
      dispatch(setIsLoggedIn(!!currentUser));
      setUser(currentUser);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [configureGoogleSignIn]);

  // Sign in with Google
  const signIn = useCallback(async () => {
    try {
      // Reset previous error and set loading state
      setError(null);
      setIsLoading(true);

      // Attempt Google Sign-In with type handling
      const result = await GoogleSignin.signIn();

      // Type guard to ensure it's a successful response
      if (result.type !== "success") {
        throw new Error("Google Sign-In was cancelled or failed");
      }

      // Now we can safely treat it as a successful response
      const successResult = result as SignInSuccessResponse;

      // Null check for idToken
      const idToken = successResult.data.idToken;
      if (!idToken) {
        throw new Error("ID Token is undefined");
      }

      // Create a Google credential
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase
      const googleUserCredential = await auth().signInWithCredential(
        googleCredential
      );

      // Update states
      setIsLoggedIn(true);
      setUser(googleUserCredential.user);

      // Optional: Log user details
      console.log("Signed in user:", googleUserCredential.user.displayName);
    } catch (err) {
      // Handle errors
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error("Google Sign-In Error:", errorMessage);

      // Reset login state
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      // Always reset loading state
      setIsLoading(false);
    }
  }, [configureGoogleSignIn]);

  // Sign out method
  const signOut = useCallback(async () => {
    try {
      // Sign out from Google
      await GoogleSignin.signOut();

      // Sign out from Firebase
      await auth().signOut();

      // Update states
      setIsLoggedIn(false);
      setUser(null);
      setError(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      setError(errorMessage);
      console.error("Sign Out Error:", errorMessage);
    }
  }, []);

  return {
    isLoading,
    error,
    signIn,
    signOut,
    user,
  };
};
