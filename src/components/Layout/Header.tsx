import React from "react";
import { Menu, LogOut, User } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "hod":
        return "bg-blue-100 text-blue-800";
      case "dean":
        return "bg-purple-100 text-purple-800";
      case "dvc":
        return "bg-green-100 text-green-800";
      case "admin":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleTitle = (role: string) => {
    switch (role) {
      case "hod":
        return "Head of Department";
      case "dean":
        return "Dean of School";
      case "dvc":
        return "Deputy Vice Chancellor";
      case "admin":
        return "System Administrator";
      default:
        return role;
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-gray-900">
              Academic Absence Management
            </h1>
            <p className="text-sm text-gray-500">
              University Administration Portal
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-gray-600" />
              </div>
            )}
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeColor(
                  user?.role || ""
                )}`}
              >
                {getRoleTitle(user?.role || "")}
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
