import React, { useState } from "react";
import { Plus } from "lucide-react";
import RequestTable from "../components/RequestTable";
import RequestModal from "../components/RequestModal";
import type { Request } from "../types";

const MyRequests: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - in real app, this would come from API
  const myRequests: Request[] = [
    {
      id: "1",
      lecturerName: "Dr. Sarah Ali",
      lecturerEmail: "sarah.ali@university.suza",
      department: "Computer Science",
      school: "Engineering",
      reason:
        'Attending IEEE International Conference on Machine Learning and Artificial Intelligence in Arusha, Tanzania. Will present research paper on "Advanced Neural Networks for Image Recognition".',
      startDate: "2025-02-15",
      endDate: "2025-02-20",
      destination: "Tokyo, Japan",
      isPrivate: false,
      status: "approved",
      currentLevel: "completed",
      hodApproval: {
        approvedBy: "Dr. Sarah Ali",
        approvedAt: "2025-01-15T10:30:00Z",
        comment: "Approved for conference attendance",
        approved: true,
      },
      deanApproval: {
        approvedBy: "Prof. Michael Chen",
        approvedAt: "2025-01-16T14:20:00Z",
        comment: "Good opportunity for research collaboration",
        approved: true,
      },
      dvcApproval: {
        approvedBy: "Prof. Elizabeth Brown",
        approvedAt: "2025-01-17T09:15:00Z",
        comment: "Final approval granted",
        approved: true,
      },
      createdAt: "2025-01-10T08:00:00Z",
      updatedAt: "2025-01-17T09:15:00Z",
    },
    {
      id: "2",
      lecturerName: "Dr. Sarah Johnson",
      lecturerEmail: "sarah.johnson@university.edu",
      department: "Computer Science",
      school: "Engineering",
      reason: "Family emergency requiring immediate attention.",
      startDate: "2025-01-25",
      endDate: "2025-01-27",
      destination: "Personal",
      isPrivate: true,
      status: "pending",
      currentLevel: "dean",
      hodApproval: {
        approvedBy: "Dr. Sarah Johnson",
        approvedAt: "2025-01-20T11:00:00Z",
        comment: "Approved with sympathy",
        approved: true,
      },
      createdAt: "2025-01-20T10:30:00Z",
      updatedAt: "2025-01-20T11:00:00Z",
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Requests</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage your absence requests
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Request</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900">
            {myRequests.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {myRequests.filter((r) => r.status === "pending").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {myRequests.filter((r) => r.status === "approved").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">
            {myRequests.filter((r) => r.status === "rejected").length}
          </p>
        </div>
      </div>

      {/* Requests Table */}
      <RequestTable
        requests={myRequests}
        onViewRequest={handleViewRequest}
        showActions={false}
      />

      {/* Request Modal */}
      <RequestModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default MyRequests;
