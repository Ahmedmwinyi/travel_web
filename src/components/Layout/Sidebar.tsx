import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  Building2,
  BarChart3,
  X,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const getNavItems = () => {
    const commonItems = [
      { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      {
        path: "/approved-requests",
        icon: CheckCircle,
        label: "Approved Requests",
      },
      { path: "/rejected-requests", icon: XCircle, label: "Rejected Requests" },
    ];

    const roleSpecificItems = [];

    if (user?.role === "hod") {
      roleSpecificItems.push(
        { path: "/my-requests", icon: FileText, label: "My Requests" },
        { path: "/pending-requests", icon: Clock, label: "Pending Requests" }
      );
    }

    if (user?.role === "dean" || user?.role === "dvc") {
      roleSpecificItems.push({
        path: "/pending-requests",
        icon: Clock,
        label: "Pending Requests",
      });
    }

    if (user?.role === "admin") {
      roleSpecificItems.push(
        { path: "/manage-users", icon: Users, label: "Manage Users" },
        {
          path: "/manage-departments",
          icon: Building2,
          label: "Manage Departments",
        },
        { path: "/system-reports", icon: BarChart3, label: "System Reports" }
      );
    }

    return [
      ...commonItems.slice(0, 1),
      ...roleSpecificItems,
      ...commonItems.slice(1),
    ];
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-8 w-8 text-blue-600" />
            <div>
              <h2 className="text-lg font-bold text-gray-900">SUZA Travel Portal</h2>
              <p className="text-xs text-gray-500">Academic Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1">
          {getNavItems().map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => window.innerWidth < 1024 && onClose()}
              className={({ isActive }) =>
                `flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`
              }
            >
              <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-gray-600" />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {user?.department || user?.school || "Administration"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
