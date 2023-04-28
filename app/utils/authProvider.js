"use client";

import { createContext, useState, useContext, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { getCookie, deleteCookie } from "cookies-next";

let AuthContext = createContext(null);

async function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  ////////////////////////////////////////////////////////////////////////////////
  // Checks if client already has a valid token
  ////////////////////////////////////////////////////////////////////////////////

  const fetchUser = async () => {
    const token = getCookie("token");

    // Checks if a token exists as cookie
    if (token) {
      const { data: userDataInToken, exp } = jwtDecode(token);

      // Checks if token is not expired
      if (Date.now() <= exp * 1000) {
        //Gets user data sets user state
        try {
          const res = await fetch(`/api/pet/${userDataInToken?._id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          });

          const { pet } = await res.json();
          console.log(pet);

          setUser(pet);
        } catch (err) {
          console.error(err);
          toast(err.message);
        }
      } else {
        // Removes expired cookie
        deleteCookie("token");
      }
    }
  };

  useEffect(() => fetchUser(), []);

  let value = { user, fetchUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  return useContext(AuthContext);
}

function RequireAuth({ children }) {
  const router = useRouter();
  const token = getCookie("token");
  const { user } = useAuth();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return router.replace("/signin", { state: { from: router.pathname } });
  }

  if (user) return children;
}

export { AuthProvider, useAuth, RequireAuth };
