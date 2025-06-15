import React from "react";
import {
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Calendar,
  Building2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  // Mock data - in real app, this would come from API
  const stats = {
    totalRequests: 156,
    pendingRequests: 23,
    approvedRequests: 98,
    rejectedRequests: 35,
    thisMonthRequests: 45,
    avgProcessingTime: 3.2,
  };

  const recentActivity = [
    {
      id: "1",
      type: "approved",
      lecturer: "Dr. Kamal Chwaka",
      department: "Accounts",
      date: "2025-01-10",
      action: "Request approved by Dean",
    },
    {
      id: "2",
      type: "submitted",
      lecturer: "Prof. Maryam Juma",
      department: "Information Technology",
      date: "2025-01-10",
      action: "New request submitted",
    },
    {
      id: "3",
      type: "rejected",
      lecturer: "Dr. Suma Lee",
      department: "Economics",
      date: "2025-01-09",
      action: "Request rejected by DVC",
    },
    {
      id: "4",
      type: "approved",
      lecturer: "Dr. Said Nyange",
      department: "Procurement & Supply",
      date: "2025-01-09",
      action: "Request approved by HoD",
    },
  ];

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case "hod":
        return `Welcome back, ${user.name}. Here's what's happening in ${user.department} department.`;
      case "dean":
        return `Welcome back, ${user.name}. Here's the overview for ${user.school} school.`;
      case "dvc":
        return `Welcome back, ${user.name}. Here's the university-wide summary.`;
      case "admin":
        return `Welcome back, ${user.name}. Here's the system overview.`;
      default:
        return `Welcome back, ${user?.name}.`;
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "submitted":
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-sm p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Good{" "}
          {new Date().getHours() < 12
            ? "Morning"
            : new Date().getHours() < 18
            ? "Afternoon"
            : "Evening"}
          !
        </h1>
        <p className="text-blue-100">{getWelcomeMessage()}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.totalRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.pendingRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.approvedRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.rejectedRequests}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Recent Activity
            </h2>
            <p className="text-sm text-gray-500">
              Latest updates and actions in the system
            </p>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.lecturer}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.action} • {activity.department}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(activity.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Stats & Actions */}
        <div className="space-y-6">
          {/* Monthly Overview */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                This Month
              </h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">New Requests</span>
                <span className="font-medium">{stats.thisMonthRequests}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Avg. Processing</span>
                <span className="font-medium">
                  {stats.avgProcessingTime} days
                </span>
              </div>
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center text-green-600">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-sm font-medium">12% increase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Role-specific Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              {user?.role === "hod" && (
                <>
                  <button className="w-full text-left p-3 rounded-md bg-blue-50 hover:bg-blue-100 transition-colors">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-blue-600 mr-3" />
                      <span className="text-sm font-medium text-blue-900">
                        View My Requests
                      </span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-md bg-yellow-50 hover:bg-yellow-100 transition-colors">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-yellow-600 mr-3" />
                      <span className="text-sm font-medium text-yellow-900">
                        Review Pending
                      </span>
                    </div>
                  </button>
                </>
              )}

              {(user?.role === "dean" || user?.role === "dvc") && (
                <button className="w-full text-left p-3 rounded-md bg-yellow-50 hover:bg-yellow-100 transition-colors">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-600 mr-3" />
                    <span className="text-sm font-medium text-yellow-900">
                      Review Pending
                    </span>
                  </div>
                </button>
              )}

              {user?.role === "admin" && (
                <>
                  <button className="w-full text-left p-3 rounded-md bg-purple-50 hover:bg-purple-100 transition-colors">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-purple-600 mr-3" />
                      <span className="text-sm font-medium text-purple-900">
                        Manage Users
                      </span>
                    </div>
                  </button>
                  <button className="w-full text-left p-3 rounded-md bg-green-50 hover:bg-green-100 transition-colors">
                    <div className="flex items-center">
                      <Building2 className="h-4 w-4 text-green-600 mr-3" />
                      <span className="text-sm font-medium text-green-900">
                        System Reports
                      </span>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
