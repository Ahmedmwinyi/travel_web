import React, { useState } from "react";
import RequestTable from "../components/RequestTable";
import RequestModal from "../components/RequestModal";
import type { Request } from "../types";

const ApprovedRequests: React.FC = () => {
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock approved requests data
  const approvedRequests: Request[] = [
    {
      id: "6",
      lecturerName: "Dr. Ali Mayai",
      lecturerEmail: "ali.mayai@university.suza",
      department: "Accounts & Finance",
      school: "Science",
      reason:
        "International Mathematics Conference in London. Presenting paper on advanced calculus applications.",
      startDate: "2025-01-28",
      endDate: "2025-02-02",
      destination: "London, UK",
      isPrivate: false,
      status: "approved",
      currentLevel: "completed",
      hodApproval: {
        approvedBy: "Prof. Massoud Suma",
        approvedAt: "2025-01-15T09:30:00Z",
        comment: "Excellent conference for mathematics research",
        approved: true,
      },
      deanApproval: {
        approvedBy: "Prof. Isaac Newton",
        approvedAt: "2025-01-16T11:20:00Z",
        comment: "Good representation for our school",
        approved: true,
      },
      dvcApproval: {
        approvedBy: "Prof. Iddi Azan",
        approvedAt: "2025-01-17T14:15:00Z",
        comment: "Final approval granted",
        approved: true,
      },
      createdAt: "2025-01-12T10:00:00Z",
      updatedAt: "2025-01-17T14:15:00Z",
    },
    {
      id: "7",
      lecturerName: "Dr. Michael Jordan",
      lecturerEmail: "michael.jordan@university.edu",
      department: "Computer Science",
      school: "Engineering",
      reason:
        "Workshop on Machine Learning and AI at Stanford University. Networking with industry leaders.",
      startDate: "2025-02-10",
      endDate: "2025-02-14",
      destination: "Stanford, CA, USA",
      isPrivate: false,
      status: "approved",
      currentLevel: "completed",
      hodApproval: {
        approvedBy: "Dr. Sarah Ali",
        approvedAt: "2025-01-18T08:45:00Z",
        comment: "Important for AI research advancement",
        approved: true,
      },
      deanApproval: {
        approvedBy: "Prof. Adila Othman",
        approvedAt: "2025-01-19T13:30:00Z",
        comment: "Supports our AI initiative",
        approved: true,
      },
      dvcApproval: {
        approvedBy: "Prof. Moza Haji",
        approvedAt: "2025-01-20T10:00:00Z",
        comment: "Approved for professional development",
        approved: true,
      },
      createdAt: "2025-01-16T14:30:00Z",
      updatedAt: "2025-01-20T10:00:00Z",
    },
    {
      id: "8",
      lecturerName: "Prof. Aziz Ki",
      lecturerEmail: "aziz.ki@university.edu",
      department: "English Literature",
      school: "Humanities",
      reason:
        "Literary conference at Oxford University. Presenting research on Victorian literature and modern interpretations.",
      startDate: "2025-03-20",
      endDate: "2025-03-25",
      destination: "Oxford, UK",
      isPrivate: false,
      status: "approved",
      currentLevel: "completed",
      hodApproval: {
        approvedBy: "Prof. William Arsenal",
        approvedAt: "2025-01-19T15:20:00Z",
        comment: "Prestigious conference opportunity",
        approved: true,
      },
      deanApproval: {
        approvedBy: "Prof. Omar Njaidi",
        approvedAt: "2025-01-20T09:15:00Z",
        comment: "Excellent for department reputation",
        approved: true,
      },
      dvcApproval: {
        approvedBy: "Prof. Issa Brown",
        approvedAt: "2025-01-21T11:30:00Z",
        comment: "Final approval for academic excellence",
        approved: true,
      },
      createdAt: "2025-01-17T12:00:00Z",
      updatedAt: "2025-01-21T11:30:00Z",
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Approved Requests</h1>
        <p className="mt-1 text-sm text-gray-500">
          View all approved absence requests across the university
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Approved</p>
          <p className="text-2xl font-bold text-green-600">
            {approvedRequests.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">This Month</p>
          <p className="text-2xl font-bold text-gray-900">
            {
              approvedRequests.filter((r) => {
                const requestDate = new Date(r.updatedAt);
                const now = new Date();
                return (
                  requestDate.getMonth() === now.getMonth() &&
                  requestDate.getFullYear() === now.getFullYear()
                );
              }).length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">International</p>
          <p className="text-2xl font-bold text-blue-600">
            {
              approvedRequests.filter((r) => !r.destination.includes("USA"))
                .length
            }
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Avg. Duration</p>
          <p className="text-2xl font-bold text-purple-600">
            {Math.round(
              approvedRequests.reduce((acc, r) => {
                const days = Math.ceil(
                  (new Date(r.endDate).getTime() -
                    new Date(r.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                );
                return acc + days;
              }, 0) / approvedRequests.length
            )}{" "}
            days
          </p>
        </div>
      </div>

      {/* Requests Table */}
      <RequestTable
        requests={approvedRequests}
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

export default ApprovedRequests;
