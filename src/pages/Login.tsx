import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { GraduationCap, Lock, Mail, Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/dashboard";

  const demoAccounts = [
    {
      email: "sarah.ali@university.suza",
      role: "Head of Department",
      name: "Dr. Sarah Ali",
    },
    {
      email: "hassan.bambi@university.suza",
      role: "Dean of School",
      name: "Prof. Hassan Bambi",
    },
    {
      email: "melo.brown@university.suza",
      role: "Deputy Vice Chancellor",
      name: "Prof. Melo Brown",
    },
    {
      email: "mohammed.ali@university.suza",
      role: "System Administrator",
      name: "Mohammed Ali",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            SUZA - Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Academic Absence Management System
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white py-8 px-6 shadow-lg rounded-lg border border-gray-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your university email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Demo Accounts */}
        <div className="bg-white py-6 px-6 shadow-lg rounded-lg border border-gray-100">
          <h3 className="text-sm font-medium text-gray-900 mb-4">
            Demo Accounts
          </h3>
          <div className="space-y-2">
            {demoAccounts.map((account, index) => (
              <button
                key={index}
                onClick={() => handleDemoLogin(account.email)}
                className="w-full text-left p-3 rounded-md border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <div className="text-sm font-medium text-gray-900">
                  {account.name}
                </div>
                <div className="text-xs text-gray-500">{account.role}</div>
                <div className="text-xs text-blue-600">{account.email}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-4">
            Password for all demo accounts:{" "}
            <code className="bg-gray-100 px-1 rounded">password</code>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500">
          <p>© 2025 State University Of Zanzibar Academic Administration</p>
          <p>Secure login portal for authorized personnel only</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
