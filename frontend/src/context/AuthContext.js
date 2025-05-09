import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./Firebase";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function logOut() {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setCurrentUser(currentUser);
      if (currentUser) {
        try {
          const response = await fetch(
            `http://localhost:5000/loggedinuser?email=${encodeURIComponent(currentUser.email)}`
          );
          if (response.ok) {
            const userData = await response.json();
            setUser({
              name: userData.fullName,
              email: userData.email,
              uid: currentUser.uid,
            });
          } else {
            console.error("Failed to fetch user data:", response.statusText);
            // Fallback to Firebase user data if MongoDB fetch fails
            setUser({
              name: currentUser.displayName || "Unknown",
              email: currentUser.email,
              uid: currentUser.uid,
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          // Fallback to Firebase user data
          setUser({
            name: currentUser.displayName || "Unknown",
            email: currentUser.email,
            uid: currentUser.uid,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    user,
    setUser,
    signUp,
    logIn,
    logOut,
    loading,
    isAuthenticated: !!currentUser, // Add isAuthenticated
  };

  return (
    <userAuthContext.Provider value={value}>
      {!loading && children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}