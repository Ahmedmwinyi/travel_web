import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. Sarah Ali",
    email: "sarah.ali@university.suza",
    role: "hod",
    department: "Computer Science",
    school: "Engineering",
    avatar:
      "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: "2",
    name: "Prof. Hassan Bambi",
    email: "hassan.bambi@university.suza",
    role: "dean",
    school: "Engineering",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: "3",
    name: "Prof. Melo Brown",
    email: "melo.brown@university.suza",
    role: "dvc",
    avatar:
      "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
  {
    id: "4",
    name: "Mohammed Ali",
    email: "mohammed.ali@university.suza",
    role: "admin",
    avatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
  },
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock authentication - in real app, this would call your API
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

    const foundUser = mockUsers.find((u) => u.email === email);
    if (foundUser && password === "password") {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
