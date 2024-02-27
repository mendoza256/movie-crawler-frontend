import React, { createContext, useContext, useState } from "react";
import { User } from "../types/baseTypes";

type UserContextType = {
  user?: User | {};
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextType | {}>({});

export default function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | {}>();

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
