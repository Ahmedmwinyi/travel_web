import React, { useState } from "react";
import RequestTable from "../components/RequestTable";
import RequestModal from "../components/RequestModal";
import type { Request } from "../types";
import { useAuth } from "../context/AuthContext";

const PendingRequests: React.FC = () => {
  const { user } = useAuth();
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data - filtered based on user role
  const allPendingRequests: Request[] = [
    {
      id: "3",
      lecturerName: "Dr. James Wilson",
      lecturerEmail: "james.wilson@university.edu",
      department: "Physics",
      school: "Engineering",
      reason:
        "Research collaboration at CERN, Geneva. Working on particle physics experiments with international team.",
      startDate: "2025-03-01",
      endDate: "2025-03-15",
      destination: "Geneva, Switzerland",
      isPrivate: false,
      status: "pending",
      currentLevel: "hod",
      createdAt: "2025-01-22T09:15:00Z",
      updatedAt: "2025-01-22T09:15:00Z",
    },
    {
      id: "4",
      lecturerName: "Prof. Maria Garcia",
      lecturerEmail: "maria.garcia@university.edu",
      department: "Chemistry",
      school: "Science",
      reason:
        "Attending International Chemistry Symposium and presenting research on sustainable materials.",
      startDate: "2025-02-28",
      endDate: "2025-03-05",
      destination: "Barcelona, Spain",
      isPrivate: false,
      status: "pending",
      currentLevel: "dean",
      hodApproval: {
        approvedBy: "Dr. Robert Smith",
        approvedAt: "2025-01-23T14:30:00Z",
        comment: "Important research opportunity",
        approved: true,
      },
      createdAt: "2025-01-21T11:20:00Z",
      updatedAt: "2025-01-23T14:30:00Z",
    },
    {
      id: "5",
      lecturerName: "Dr. Robert Lee",
      lecturerEmail: "robert.lee@university.edu",
      department: "Biology",
      school: "Science",
      reason:
        "Field research in Amazon rainforest for biodiversity study. Collecting samples for ongoing research project.",
      startDate: "2025-04-10",
      endDate: "2025-04-25",
      destination: "Amazon, Brazil",
      isPrivate: false,
      status: "pending",
      currentLevel: "dvc",
      hodApproval: {
        approvedBy: "Dr. Susan White",
        approvedAt: "2025-01-20T10:15:00Z",
        comment: "Excellent research opportunity",
        approved: true,
      },
      deanApproval: {
        approvedBy: "Prof. David Brown",
        approvedAt: "2025-01-21T16:45:00Z",
        comment: "Supports department research goals",
        approved: true,
      },
      createdAt: "2025-01-19T15:30:00Z",
      updatedAt: "2025-01-21T16:45:00Z",
    },
  ];

  // Filter requests based on user role and current approval level
  const getPendingRequests = () => {
    return allPendingRequests.filter((request) => {
      switch (user?.role) {
        case "hod":
          return (
            request.currentLevel === "hod" &&
            request.department === user.department
          );
        case "dean":
          return (
            request.currentLevel === "dean" && request.school === user.school
          );
        case "dvc":
          return request.currentLevel === "dvc";
        case "admin":
          return true; // Admin can see all
        default:
          return false;
      }
    });
  };

  const pendingRequests = getPendingRequests();

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleApproveRequest = async (comment: string) => {
    if (!selectedRequest) return;

    // Mock API call - in real app, this would call your API
    console.log(
      "Approving request:",
      selectedRequest.id,
      "with comment:",
      comment
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, you would update the request status and move to next level
    alert(`Request ${selectedRequest.id} has been approved!`);
  };

  const handleRejectRequest = async (comment: string) => {
    if (!selectedRequest) return;

    // Mock API call - in real app, this would call your API
    console.log(
      "Rejecting request:",
      selectedRequest.id,
      "with comment:",
      comment
    );

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // In real app, you would update the request status
    alert(`Request ${selectedRequest.id} has been rejected.`);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const getPageTitle = () => {
    switch (user?.role) {
      case "hod":
        return "Department Requests";
      case "dean":
        return "School Requests";
      case "dvc":
        return "Final Review Requests";
      case "admin":
        return "All Pending Requests";
      default:
        return "Pending Requests";
    }
  };

  const getPageDescription = () => {
    switch (user?.role) {
      case "hod":
        return `Review and approve absence requests from lecturers in ${user?.department} department`;
      case "dean":
        return `Review requests approved by HoDs in ${user?.school} school`;
      case "dvc":
        return "Final review and approval of requests approved by Deans";
      case "admin":
        return "Monitor all pending requests across the university";
      default:
        return "Review pending absence requests";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{getPageTitle()}</h1>
        <p className="mt-1 text-sm text-gray-500">{getPageDescription()}</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Awaiting Review</p>
          <p className="text-2xl font-bold text-yellow-600">
            {pendingRequests.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">
            Avg. Processing Time
          </p>
          <p className="text-2xl font-bold text-gray-900">2.5 days</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">This Week</p>
          <p className="text-2xl font-bold text-blue-600">
            {
              pendingRequests.filter((r) => {
                const requestDate = new Date(r.createdAt);
                const now = new Date();
                const weekAgo = new Date(
                  now.getTime() - 7 * 24 * 60 * 60 * 1000
                );
                return requestDate >= weekAgo;
              }).length
            }
          </p>
        </div>
      </div>

      {/* Requests Table */}
      <RequestTable
        requests={pendingRequests}
        onViewRequest={handleViewRequest}
        onApproveRequest={() => {}} // Handled in modal
        onRejectRequest={() => {}} // Handled in modal
        showActions={true}
      />

      {/* Request Modal with Approval Actions */}
      <RequestModal
        request={selectedRequest}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onApprove={handleApproveRequest}
        onReject={handleRejectRequest}
        canApprove={user?.role !== "admin"} // Admin can view but not approve
      />
    </div>
  );
};

export default PendingRequests;
