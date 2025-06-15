import React, { useState } from "react";
// import RequestTable from "../components/RequestTable";
import RequestModal from "../components/RequestModal";
import type { Request } from "../types";

const RejectedRequests: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock rejected requests data
  const rejectedRequests: Request[] = [
    {
      id: "9",
      lecturerName: "Dr. Tarzan Parker",
      lecturerEmail: "tarzan.parker@university.edu",
      department: "Procurement",
      school: "SOB",
      reason:
        "Personal vacation trip to Hawaii for relaxation and leisure activities.",
      startDate: "2025-02-15",
      endDate: "2025-02-25",
      destination: "Hawaii, USA",
      isPrivate: false,
      status: "rejected",
      currentLevel: "completed",
      hodApproval: {
        approvedBy: "Dr. Tony Kamal",
        approvedAt: "2025-01-10T10:30:00Z",
        comment: "Does not meet academic purpose criteria",
        approved: false,
      },
      createdAt: "2025-01-08T09:15:00Z",
      updatedAt: "2025-01-10T10:30:00Z",
    },
    {
      id: "10",
      lecturerName: "Dr. Bruce Lee",
      lecturerEmail: "bruce.lee@university.suza",
      department: "Business",
      school: "SOB",
      reason:
        "Business conference in Gotham City. Meeting with Wayne Enterprises board members.",
      startDate: "2025-01-30",
      endDate: "2025-02-05",
      destination: "Gotham City",
      isPrivate: false,
      status: "rejected",
      currentLevel: "completed",
      hodApproval: {
        approvedBy: "Prof. Jokha Jackson",
        approvedAt: "2025-01-12T14:20:00Z",
        comment: "Approved for business development",
        approved: true,
      },
      deanApproval: {
        approvedBy: "Prof. Khamis Fox",
        approvedAt: "2025-01-15T16:45:00Z",
        comment: "Conflict of interest with personal business",
        approved: false,
      },
      createdAt: "2025-01-10T11:00:00Z",
      updatedAt: "2025-01-15T16:45:00Z",
    },
    {
      id: "11",
      lecturerName: "Dr. Maryam Prince",
      lecturerEmail: "maryam.prince@university.edu",
      department: "History",
      school: "Humanities",
      reason:
        "Archaeological expedition to Themyscira island for ancient artifact research.",
      startDate: "2025-03-10",
      endDate: "2025-03-30",
      destination: "Themyscira Island",
      isPrivate: false,
      status: "rejected",
      currentLevel: "completed",
      hodApproval: {
        approvedBy: "Prof. Indiana Jones",
        approvedAt: "2025-01-14T09:30:00Z",
        comment: "Excellent archaeological opportunity",
        approved: true,
      },
      deanApproval: {
        approvedBy: "Prof. Lara Croft",
        approvedAt: "2025-01-16T13:15:00Z",
        comment: "Supports historical research goals",
        approved: true,
      },
      dvcApproval: {
        approvedBy: "Prof. Elizabeth Brown",
        approvedAt: "2025-01-18T10:45:00Z",
        comment: "Location accessibility and safety concerns",
        approved: false,
      },
      createdAt: "2025-01-12T15:20:00Z",
      updatedAt: "2025-01-18T10:45:00Z",
    },
  ];

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const getRejectionReason = (request: Request) => {
    if (request.dvcApproval && !request.dvcApproval.approved) {
      return request.dvcApproval.comment || "Rejected by DVC";
    }
    if (request.deanApproval && !request.deanApproval.approved) {
      return request.deanApproval.comment || "Rejected by Dean";
    }
    if (request.hodApproval && !request.hodApproval.approved) {
      return request.hodApproval.comment || "Rejected by HoD";
    }
    return "No reason provided";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Rejected Requests</h1>
        <p className="mt-1 text-sm text-gray-500">
          View all rejected absence requests and understand rejection reasons
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {rejectedRequests.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Rejected by HoD</p>
          <p className="text-2xl font-bold text-gray-900">
            {
              rejectedRequests.filter(
                (r) => r.hodApproval && !r.hodApproval.approved
              ).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Rejected by Dean</p>
          <p className="text-2xl font-bold text-gray-900">
            {
              rejectedRequests.filter(
                (r) => r.deanApproval && !r.deanApproval.approved
              ).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Rejected by DVC</p>
          <p className="text-2xl font-bold text-gray-900">
            {
              rejectedRequests.filter(
                (r) => r.dvcApproval && !r.dvcApproval.approved
              ).length
            }
          </p>
        </div>
      </div>

      {/* Enhanced Table with Rejection Reasons */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
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
                  Rejection Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rejected Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rejectedRequests.map((request) => (
                <tr
                  key={request.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {request.lecturerName}
                      </div>
                      <div className="text-sm text-gray-500">
                        {request.lecturerEmail}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {request.department}
                    </div>
                    <div className="text-sm text-gray-500">
                      {request.school}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(request.startDate).toLocaleDateString()} -{" "}
                      {new Date(request.endDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-red-600 max-w-xs">
                      {getRejectionReason(request)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(request.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => handleViewRequest(request)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Modal */}
      <RequestModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default RejectedRequests;
