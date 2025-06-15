import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, UserPlus } from "lucide-react";
import type { User } from "../types";

const ManageUsers: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock users data
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@university.edu",
      role: "hod",
      department: "Computer Science",
      school: "Engineering",
      avatar:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: "2",
      name: "Prof. Michael Chen",
      email: "michael.chen@university.edu",
      role: "dean",
      school: "Engineering",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: "3",
      name: "Prof. Elizabeth Brown",
      email: "elizabeth.brown@university.edu",
      role: "dvc",
      avatar:
        "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: "4",
      name: "John Smith",
      email: "john.smith@university.edu",
      role: "admin",
      avatar:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
    },
    {
      id: "5",
      name: "Dr. James Wilson",
      email: "james.wilson@university.edu",
      role: "hod",
      department: "Physics",
      school: "Engineering",
    },
    {
      id: "6",
      name: "Prof. Maria Garcia",
      email: "maria.garcia@university.edu",
      role: "hod",
      department: "Chemistry",
      school: "Science",
    },
  ]);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.department &&
        user.department.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    const baseClasses =
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (role) {
      case "hod":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "dean":
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case "dvc":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "admin":
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
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

  const handleDeleteUser = (userId: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add, edit, and manage system users and their roles
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Users</p>
          <p className="text-2xl font-bold text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">
            Heads of Department
          </p>
          <p className="text-2xl font-bold text-blue-600">
            {users.filter((u) => u.role === "hod").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Deans</p>
          <p className="text-2xl font-bold text-purple-600">
            {users.filter((u) => u.role === "dean").length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Administrators</p>
          <p className="text-2xl font-bold text-red-600">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Roles</option>
            <option value="hod">Head of Department</option>
            <option value="dean">Dean</option>
            <option value="dvc">Deputy Vice Chancellor</option>
            <option value="admin">Administrator</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department/School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover mr-4"
                        />
                      ) : (
                        <div className="h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                          <UserPlus className="h-5 w-5 text-gray-600" />
                        </div>
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={getRoleBadge(user.role)}>
                      {getRoleTitle(user.role)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.department && `${user.department} Dept.`}
                    </div>
                    <div className="text-sm text-gray-500">
                      {user.school && `${user.school} School`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors">
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New User
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              User creation form would be implemented here with fields for name,
              email, role, department, etc.
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Add User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
