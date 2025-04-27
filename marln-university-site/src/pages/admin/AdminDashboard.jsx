import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="admin" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Total Students</h3>
              <p className="text-3xl font-bold text-blue-600">1,250</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Total Instructors</h3>
              <p className="text-3xl font-bold text-green-600">85</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Active Programs</h3>
              <p className="text-3xl font-bold text-yellow-600">24</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Departments</h3>
              <p className="text-3xl font-bold text-purple-600">12</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors">
                Add New Student
              </button>
              <button className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors">
                Add New Instructor
              </button>
              <button className="bg-yellow-600 text-white p-4 rounded-lg hover:bg-yellow-700 transition-colors">
                Create New Program
              </button>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Activities</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <p className="text-gray-600">New student registration completed</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
              <div className="p-4 border-b">
                <p className="text-gray-600">New instructor joined the department</p>
                <p className="text-sm text-gray-500">4 hours ago</p>
              </div>
              <div className="p-4 border-b">
                <p className="text-gray-600">New program created: Computer Science</p>
                <p className="text-sm text-gray-500">1 day ago</p>
              </div>
              <div className="p-4">
                <p className="text-gray-600">System maintenance completed</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">System Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Server Status</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-green-600">All systems operational</span>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Last Backup</h3>
                <p className="text-gray-600">Completed 2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
