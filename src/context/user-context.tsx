import React, { createContext, useContext, useState } from "react";
import { User } from "../types/baseTypes";

export type UserContextType = {
  user?: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  handleFetchSession: () => void;
  handleLogout: () => void;
};

const UserContext = createContext<UserContextType | {}>({});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | {}>();

  function handleFetchSession() {
    try {
      fetch("http://localhost:3001/auth/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
        .then((res) => res.json())
        .then((data) => setUser(data.user));
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  }

  function handleLogout() {
    fetch("http://localhost:3001/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    });
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        handleFetchSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useTransport must be used within a UserContextProvider");
  }
  return context;
}
