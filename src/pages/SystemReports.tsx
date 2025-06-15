import React, { useState } from "react";
import {
  Download,
  TrendingUp,
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const SystemReports: React.FC = () => {
  const [dateRange, setDateRange] = useState("last30days");
  const [reportType, setReportType] = useState("overview");

  // Mock analytics data
  const analytics = {
    totalRequests: 156,
    approvedRequests: 98,
    rejectedRequests: 35,
    pendingRequests: 23,
    avgProcessingTime: 3.2,
    requestsByMonth: [
      { month: "Jan", requests: 45, approved: 32, rejected: 8, pending: 5 },
      { month: "Feb", requests: 38, approved: 28, rejected: 6, pending: 4 },
      { month: "Mar", requests: 52, approved: 38, rejected: 9, pending: 5 },
      { month: "Apr", requests: 21, approved: 0, rejected: 12, pending: 9 },
    ],
    requestsByDepartment: [
      {
        department: "Computer Science",
        total: 28,
        approved: 22,
        rejected: 4,
        pending: 2,
      },
      {
        department: "Physics",
        total: 24,
        approved: 18,
        rejected: 3,
        pending: 3,
      },
      {
        department: "Chemistry",
        total: 22,
        approved: 16,
        rejected: 4,
        pending: 2,
      },
      {
        department: "Mathematics",
        total: 19,
        approved: 14,
        rejected: 3,
        pending: 2,
      },
      {
        department: "Biology",
        total: 18,
        approved: 12,
        rejected: 4,
        pending: 2,
      },
    ],
    requestsByReason: [
      { reason: "Conference Attendance", count: 45, percentage: 28.8 },
      { reason: "Research Collaboration", count: 32, percentage: 20.5 },
      { reason: "Workshop/Training", count: 28, percentage: 17.9 },
      { reason: "Personal/Family", count: 24, percentage: 15.4 },
      { reason: "Field Research", count: 18, percentage: 11.5 },
      { reason: "Other", count: 9, percentage: 5.8 },
    ],
    processingTimes: [
      { level: "HoD Approval", avgDays: 1.2, maxDays: 3 },
      { level: "Dean Approval", avgDays: 1.8, maxDays: 4 },
      { level: "DVC Approval", avgDays: 2.1, maxDays: 5 },
    ],
  };

  const recentActivity = [
    {
      id: "1",
      timestamp: "2025-01-22T14:30:00Z",
      action: "Request Approved",
      user: "Prof. Michael Chen",
      details: "Approved request from Dr. James Wilson",
      type: "approval",
    },
    {
      id: "2",
      timestamp: "2025-01-22T13:15:00Z",
      action: "User Created",
      user: "John Smith",
      details: "Added new HoD: Dr. Alice Cooper",
      type: "user_management",
    },
    {
      id: "3",
      timestamp: "2025-01-22T11:45:00Z",
      action: "Request Submitted",
      user: "Dr. Maria Garcia",
      details: "New absence request for conference",
      type: "submission",
    },
    {
      id: "4",
      timestamp: "2025-01-22T10:20:00Z",
      action: "Request Rejected",
      user: "Prof. Elizabeth Brown",
      details: "Rejected request due to scheduling conflict",
      type: "rejection",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "approval":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejection":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "submission":
        return <FileText className="h-4 w-4 text-blue-500" />;
      case "user_management":
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const exportReport = () => {
    // Mock export functionality
    alert("Report export functionality would be implemented here");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            System Reports & Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor system usage, performance metrics, and generate reports
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="last90days">Last 90 Days</option>
            <option value="lastyear">Last Year</option>
          </select>
          <button
            onClick={exportReport}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Total Requests
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {analytics.totalRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600">
                {analytics.approvedRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Rejected</p>
              <p className="text-2xl font-bold text-red-600">
                {analytics.rejectedRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">
                {analytics.pendingRequests}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-500">
                Avg. Processing
              </p>
              <p className="text-2xl font-bold text-purple-600">
                {analytics.avgProcessingTime}d
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests by Department */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Requests by Department
          </h3>
          <div className="space-y-3">
            {analytics.requestsByDepartment.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {dept.department}
                    </span>
                    <span className="text-sm text-gray-500">
                      {dept.total} total
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${(dept.total / 30) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Request Reasons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Request Reasons
          </h3>
          <div className="space-y-3">
            {analytics.requestsByReason.map((reason, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {reason.reason}
                    </span>
                    <span className="text-sm text-gray-500">
                      {reason.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: `${reason.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Processing Times and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Times */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Average Processing Times
          </h3>
          <div className="space-y-4">
            {analytics.processingTimes.map((time, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {time.level}
                  </p>
                  <p className="text-xs text-gray-500">
                    Max: {time.maxDays} days
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">
                    {time.avgDays}
                  </p>
                  <p className="text-xs text-gray-500">days avg</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent System Activity
          </h3>
          <div className="space-y-3">
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
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.details} • by {activity.user}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Monthly Request Trends
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 text-sm font-medium text-gray-500">
                  Month
                </th>
                <th className="text-center py-2 text-sm font-medium text-gray-500">
                  Total
                </th>
                <th className="text-center py-2 text-sm font-medium text-gray-500">
                  Approved
                </th>
                <th className="text-center py-2 text-sm font-medium text-gray-500">
                  Rejected
                </th>
                <th className="text-center py-2 text-sm font-medium text-gray-500">
                  Pending
                </th>
                <th className="text-center py-2 text-sm font-medium text-gray-500">
                  Approval Rate
                </th>
              </tr>
            </thead>
            <tbody>
              {analytics.requestsByMonth.map((month, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 text-sm font-medium text-gray-900">
                    {month.month}
                  </td>
                  <td className="py-3 text-sm text-center text-gray-900">
                    {month.requests}
                  </td>
                  <td className="py-3 text-sm text-center text-green-600">
                    {month.approved}
                  </td>
                  <td className="py-3 text-sm text-center text-red-600">
                    {month.rejected}
                  </td>
                  <td className="py-3 text-sm text-center text-yellow-600">
                    {month.pending}
                  </td>
                  <td className="py-3 text-sm text-center text-gray-900">
                    {month.approved > 0
                      ? Math.round(
                          (month.approved / (month.approved + month.rejected)) *
                            100
                        )
                      : 0}
                    %
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemReports;
