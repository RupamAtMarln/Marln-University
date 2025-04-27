import { useState } from 'react';
import Sidebar from '../../components/Sidebar';

export default function StudentDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar role="student" />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Student Dashboard</h1>
          
          {/* Dashboard Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Enrolled Courses</h3>
              <p className="text-3xl font-bold text-blue-600">5</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Pending Assignments</h3>
              <p className="text-3xl font-bold text-yellow-600">3</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Average Grade</h3>
              <p className="text-3xl font-bold text-green-600">85%</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-700">Next Class</h3>
              <p className="text-3xl font-bold text-purple-600">Math 101</p>
              <p className="text-sm text-gray-500">in 30 minutes</p>
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Today's Schedule</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Mathematics 101</p>
                    <p className="text-sm text-gray-600">Room 302, Building A</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-800">9:00 AM - 10:30 AM</p>
                    <p className="text-sm text-blue-600">Starting in 30 minutes</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Physics 201</p>
                    <p className="text-sm text-gray-600">Room 105, Building B</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-800">1:00 PM - 2:30 PM</p>
                    <p className="text-sm text-gray-600">Later today</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Assignments */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Assignments</h2>
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Math Assignment #3</p>
                    <p className="text-sm text-gray-600">Due: Tomorrow, 11:59 PM</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
                </div>
              </div>
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Physics Lab Report</p>
                    <p className="text-sm text-gray-600">Due: Friday, 11:59 PM</p>
                  </div>
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Pending</span>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">Chemistry Quiz</p>
                    <p className="text-sm text-gray-600">Submitted: Yesterday</p>
                  </div>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Submitted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Mathematics 101</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">75% Complete</p>
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">Physics 201</h3>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">60% Complete</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
