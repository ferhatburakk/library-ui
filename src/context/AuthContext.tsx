import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextProps {
  email: string | null;
  setEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [email, setEmail] = useState<string | null>(localStorage.getItem("email"));

    const handleSetEmail = (email: string | null) => {
      setEmail(email);
      if (email) {
        localStorage.setItem("email", email);
      } else {
        localStorage.removeItem("email");
      }
    };

  return (
    <AuthContext.Provider value={{ email, setEmail: handleSetEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};