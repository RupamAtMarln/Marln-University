import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function InstructorDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="instructor" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Instructor Dashboard</h1>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">150</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Active Courses</h3>
              <p className="text-3xl font-bold text-green-600">8</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Pending Assignments</h3>
              <p className="text-3xl font-bold text-yellow-600">12</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Messages</h3>
              <p className="text-3xl font-bold text-purple-600">5</p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activity</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <p className="text-gray-600">New student registration in Math 101</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <div className="p-4 border-b">
                <p className="text-gray-600">Assignment submitted by John Doe</p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600">New course material uploaded</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}