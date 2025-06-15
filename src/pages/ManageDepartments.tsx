import React, { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Search,
  Building2,
  GraduationCap,
} from "lucide-react";
import type { Department, School } from "../types";

const ManageDepartments: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"departments" | "schools">(
    "departments"
  );
  const [showAddModal, setShowAddModal] = useState(false);

  // Mock departments data
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Computer Science",
      school: "Engineering",
      hod: "Dr. Sarah Johnson",
    },
    {
      id: "2",
      name: "Physics",
      school: "Engineering",
      hod: "Dr. James Wilson",
    },
    {
      id: "3",
      name: "Chemistry",
      school: "Science",
      hod: "Prof. Maria Garcia",
    },
    {
      id: "4",
      name: "Biology",
      school: "Science",
      hod: "Dr. Robert Lee",
    },
    {
      id: "5",
      name: "Mathematics",
      school: "Science",
      hod: "Dr. Susan Chen",
    },
    {
      id: "6",
      name: "English Literature",
      school: "Humanities",
      hod: "Prof. Emily Watson",
    },
    {
      id: "7",
      name: "Business Administration",
      school: "Management",
      hod: "Dr. Bruce Wayne",
    },
  ]);

  // Mock schools data
  const [schools, setSchools] = useState<School[]>([
    {
      id: "1",
      name: "Engineering",
      dean: "Prof. Michael Chen",
    },
    {
      id: "2",
      name: "Science",
      dean: "Prof. Isaac Newton",
    },
    {
      id: "3",
      name: "Humanities",
      dean: "Prof. Jane Austen",
    },
    {
      id: "4",
      name: "Management",
      dean: "Prof. Lucius Fox",
    },
  ]);

  const filteredDepartments = departments.filter(
    (dept) =>
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.hod.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.dean.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteDepartment = (deptId: string) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      setDepartments(departments.filter((dept) => dept.id !== deptId));
    }
  };

  const handleDeleteSchool = (schoolId: string) => {
    if (window.confirm("Are you sure you want to delete this school?")) {
      setSchools(schools.filter((school) => school.id !== schoolId));
    }
  };

  const getDepartmentCount = (schoolName: string) => {
    return departments.filter((dept) => dept.school === schoolName).length;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manage Departments & Schools
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Organize and manage academic departments and schools
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>
              Add {activeTab === "departments" ? "Department" : "School"}
            </span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Schools</p>
          <p className="text-2xl font-bold text-purple-600">{schools.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Total Departments</p>
          <p className="text-2xl font-bold text-blue-600">
            {departments.length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">
            Avg. Dept. per School
          </p>
          <p className="text-2xl font-bold text-green-600">
            {Math.round(departments.length / schools.length)}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-medium text-gray-500">Largest School</p>
          <p className="text-lg font-bold text-indigo-600">
            {
              schools.reduce((largest, school) => {
                const count = getDepartmentCount(school.name);
                const largestCount = getDepartmentCount(largest.name);
                return count > largestCount ? school : largest;
              }, schools[0])?.name
            }
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab("departments")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "departments"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition-colors`}
            >
              <div className="flex items-center space-x-2">
                <Building2 className="h-4 w-4" />
                <span>Departments ({departments.length})</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("schools")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "schools"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition-colors`}
            >
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>Schools ({schools.length})</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Content */}
        {activeTab === "departments" ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Head of Department
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDepartments.map((department) => (
                  <tr
                    key={department.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Building2 className="h-5 w-5 text-blue-500 mr-3" />
                        <div className="text-sm font-medium text-gray-900">
                          {department.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {department.school}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {department.hod}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDepartment(department.id)}
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
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    School
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dean
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Departments
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchools.map((school) => (
                  <tr
                    key={school.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <GraduationCap className="h-5 w-5 text-purple-500 mr-3" />
                        <div className="text-sm font-medium text-gray-900">
                          {school.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {school.dean}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {getDepartmentCount(school.name)} departments
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors">
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSchool(school.id)}
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
        )}
      </div>

      {/* Add Modal (placeholder) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Add New {activeTab === "departments" ? "Department" : "School"}
            </h3>
            <p className="text-sm text-gray-500 mb-4">
              {activeTab === "departments"
                ? "Department creation form would be implemented here with fields for name, school, HoD, etc."
                : "School creation form would be implemented here with fields for name, dean, etc."}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                Add {activeTab === "departments" ? "Department" : "School"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDepartments;
