import React, { useState } from "react";
import {
  X,
  Calendar,
  MapPin,
  FileText,
  Lock,
  CheckCircle,
  XCircle,
} from "lucide-react";
import type { Request } from "../types";

interface RequestModalProps {
  request: Request | null;
  isOpen: boolean;
  onClose: () => void;
  onApprove?: (comment: string) => void;
  onReject?: (comment: string) => void;
  canApprove?: boolean;
}

const RequestModal: React.FC<RequestModalProps> = ({
  request,
  isOpen,
  onClose,
  onApprove,
  onReject,
  canApprove = false,
}) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !request) return null;

  const handleApprove = async () => {
    if (!onApprove) return;
    setIsSubmitting(true);
    try {
      await onApprove(comment);
      setComment("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!onReject) return;
    setIsSubmitting(true);
    try {
      await onReject(comment);
      setComment("");
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium";
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Request Details
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Request ID: {request.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status */}
          <div className="flex items-center justify-between">
            <span className={getStatusBadge(request.status)}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </span>
            {request.isPrivate && (
              <div className="flex items-center text-orange-600">
                <Lock className="h-4 w-4 mr-1" />
                <span className="text-sm font-medium">Private Request</span>
              </div>
            )}
          </div>

          {/* Lecturer Information */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Lecturer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p className="text-sm text-gray-900">{request.lecturerName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm text-gray-900">{request.lecturerEmail}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="text-sm text-gray-900">{request.department}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">School</p>
                <p className="text-sm text-gray-900">{request.school}</p>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-900">
                  Date Range
                </h4>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                {formatDate(request.startDate)} - {formatDate(request.endDate)}
              </p>
              <p className="text-xs text-gray-500 ml-6 mt-1">
                Duration:{" "}
                {Math.ceil(
                  (new Date(request.endDate).getTime() -
                    new Date(request.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                days
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-900">
                  Destination
                </h4>
              </div>
              <p className="text-sm text-gray-600 ml-6">
                {request.destination}
              </p>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <FileText className="h-4 w-4 text-gray-400 mr-2" />
                <h4 className="text-sm font-medium text-gray-900">
                  Reason for Absence
                </h4>
              </div>
              <p className="text-sm text-gray-600 ml-6 whitespace-pre-wrap">
                {request.reason}
              </p>
            </div>
          </div>

          {/* Approval History */}
          {(request.hodApproval ||
            request.deanApproval ||
            request.dvcApproval) && (
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Approval History
              </h3>
              <div className="space-y-3">
                {request.hodApproval && (
                  <div className="flex items-start space-x-3">
                    {request.hodApproval.approved ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Head of Department -{" "}
                        {request.hodApproval.approved ? "Approved" : "Rejected"}
                      </p>
                      <p className="text-xs text-gray-500">
                        By {request.hodApproval.approvedBy} on{" "}
                        {formatDate(request.hodApproval.approvedAt)}
                      </p>
                      {request.hodApproval.comment && (
                        <p className="text-sm text-gray-600 mt-1">
                          {request.hodApproval.comment}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {request.deanApproval && (
                  <div className="flex items-start space-x-3">
                    {request.deanApproval.approved ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Dean of School -{" "}
                        {request.deanApproval.approved
                          ? "Approved"
                          : "Rejected"}
                      </p>
                      <p className="text-xs text-gray-500">
                        By {request.deanApproval.approvedBy} on{" "}
                        {formatDate(request.deanApproval.approvedAt)}
                      </p>
                      {request.deanApproval.comment && (
                        <p className="text-sm text-gray-600 mt-1">
                          {request.deanApproval.comment}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {request.dvcApproval && (
                  <div className="flex items-start space-x-3">
                    {request.dvcApproval.approved ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Deputy Vice Chancellor -{" "}
                        {request.dvcApproval.approved ? "Approved" : "Rejected"}
                      </p>
                      <p className="text-xs text-gray-500">
                        By {request.dvcApproval.approvedBy} on{" "}
                        {formatDate(request.dvcApproval.approvedAt)}
                      </p>
                      {request.dvcApproval.comment && (
                        <p className="text-sm text-gray-600 mt-1">
                          {request.dvcApproval.comment}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Action Section */}
          {canApprove && request.status === "pending" && (
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Review Request
              </h3>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="comment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Comments (Optional)
                  </label>
                  <textarea
                    id="comment"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add any comments about your decision..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleApprove}
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "Processing..." : "Approve Request"}
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={isSubmitting}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {isSubmitting ? "Processing..." : "Reject Request"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200 rounded-b-lg">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Submitted: {formatDate(request.createdAt)}</span>
            <span>Last Updated: {formatDate(request.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestModal;
