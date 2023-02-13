import { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready , setReady] = useState(false)
  useEffect(() => {
    if (!user) {
      axios.get("/profile").then(({ data }) => {
        setUser(data);
        setReady(true)
      });
    }
  }, []);

  const value = { user, setUser ,ready , setReady};
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
