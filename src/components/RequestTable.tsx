import React, { useState } from "react";
import {
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Search,
  Calendar,
} from "lucide-react";
import type { Request } from "../types";

interface RequestTableProps {
  requests: Request[];
  onViewRequest: (request: Request) => void;
  onApproveRequest?: (request: Request) => void;
  onRejectRequest?: (request: Request) => void;
  showActions?: boolean;
}

const RequestTable: React.FC<RequestTableProps> = ({
  requests,
  onViewRequest,
  onApproveRequest,
  onRejectRequest,
  showActions = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.lecturerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || request.status === statusFilter;

    const matchesDate =
      dateFilter === "all" ||
      (() => {
        const requestDate = new Date(request.createdAt);
        const now = new Date();
        const diffTime = now.getTime() - requestDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        switch (dateFilter) {
          case "today":
            return diffDays <= 1;
          case "week":
            return diffDays <= 7;
          case "month":
            return diffDays <= 30;
          default:
            return true;
        }
      })();

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case "approved":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "rejected":
        return `${baseClasses} bg-red-100 text-red-800`;
      case "pending":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Filters */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by lecturer, department, or reason..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="flex space-x-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lecturer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date Range
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.map((request) => (
              <tr
                key={request.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {request.lecturerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.lecturerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {request.department}
                  </div>
                  <div className="text-sm text-gray-500">{request.school}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {formatDate(request.startDate)} -{" "}
                    {formatDate(request.endDate)}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    {Math.ceil(
                      (new Date(request.endDate).getTime() -
                        new Date(request.startDate).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    days
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={getStatusBadge(request.status)}>
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {formatDate(request.createdAt)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => onViewRequest(request)}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                      title="View Details"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    {showActions && request.status === "pending" && (
                      <>
                        {onApproveRequest && (
                          <button
                            onClick={() => onApproveRequest(request)}
                            className="text-green-600 hover:text-green-900 p-1 rounded-md hover:bg-green-50 transition-colors"
                            title="Approve"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        {onRejectRequest && (
                          <button
                            onClick={() => onRejectRequest(request)}
                            className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                            title="Reject"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredRequests.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500">
              <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No requests found
              </h3>
              <p>No requests match your current filters.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestTable;
