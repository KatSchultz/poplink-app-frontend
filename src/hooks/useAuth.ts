import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { firebaseAuth } from "../libs/firebase";
import { getLoginUser } from "../services/auth.service";

//Custuom

export function useAuth() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    //setting up firebase listener
    const unsubscribe = firebaseAuth.onAuthStateChanged(
      async (firebaseUser) => {
        if (firebaseUser && !user) {
          const user = await getLoginUser(firebaseUser.uid);
          setUser(user);
        } else {
          if (!firebaseUser) {
            navigate("/login");
          }
        }
      }
    );

    return () => unsubscribe();
  }, [navigate, setUser, user]);

  return user;
}

// const user = useAuth() can be used anywhere in our code now.
