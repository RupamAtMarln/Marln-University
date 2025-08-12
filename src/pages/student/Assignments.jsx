import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { 
  ClipboardList, 
  Calendar, 
  Clock, 
  FileText, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Search,
  Filter,
  ChevronRight
} from 'lucide-react';

const assignments = [
  {
    id: 1,
    title: 'Programming Assignment #1',
    course: 'Introduction to Computer Science',
    dueDate: '2024-03-20T23:59:59',
    status: 'pending',
    type: 'Programming',
    points: 100,
    description: 'Implement a basic calculator using Python with support for basic arithmetic operations.',
    submittedAt: null,
  },
  {
    id: 2,
    title: 'Machine Learning Project',
    course: 'Data Structures and Algorithms',
    dueDate: '2024-03-25T23:59:59',
    status: 'submitted',
    type: 'Project',
    points: 200,
    description: 'Develop a machine learning model to predict student performance based on historical data.',
    submittedAt: '2024-03-18T14:30:00',
  },
  {
    id: 3,
    title: 'Data Structures Quiz',
    course: 'Web Development',
    dueDate: '2024-03-15T23:59:59',
    status: 'overdue',
    type: 'Quiz',
    points: 50,
    description: 'Quiz covering basic data structures and their implementations.',
    submittedAt: null,
  },
];

function Assignments() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         assignment.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : assignment.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">My Assignments</h1>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow mb-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="submitted">Submitted</option>
                <option value="overdue">Overdue</option>
              </select>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <Filter size={20} />
                More Filters
              </button>
            </div>
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map(assignment => (
              <div
                key={assignment.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-gray-100">{assignment.title}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{assignment.course}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(assignment.status)} dark:bg-opacity-80`}> {/* Add dark mode bg if needed */}
                      {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Due: {new Date(assignment.dueDate).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Type: {assignment.type}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      <span>Points: {assignment.points}</span>
                    </div>
                    {assignment.submittedAt && (
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        <span>Submitted: {new Date(assignment.submittedAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedAssignment(assignment)}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {assignment.status === 'pending' ? 'Submit Assignment' : 'View Details'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Details Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-lg max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">{selectedAssignment.title}</h2>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">{selectedAssignment.description}</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Assignment Details</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>Type: {selectedAssignment.type}</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Due Date: {new Date(selectedAssignment.dueDate).toLocaleString()}</span>
                    </li>
                    <li className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <ClipboardList className="h-4 w-4 mr-2" />
                      <span>Points: {selectedAssignment.points}</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">Submission Status</h3>
                  <ul className="mt-2 space-y-2">
                    <li className="text-sm text-gray-600 dark:text-gray-300">
                      Status: {selectedAssignment.status.charAt(0).toUpperCase() + selectedAssignment.status.slice(1)}
                    </li>
                    {selectedAssignment.submittedAt && (
                      <li className="text-sm text-gray-600 dark:text-gray-300">
                        Submitted: {new Date(selectedAssignment.submittedAt).toLocaleString()}
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              {selectedAssignment.status === 'pending' && (
                <div className="mt-4">
                  <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Submit Assignment</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              {selectedAssignment.status === 'pending' && (
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Submit Assignment
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Assignments; 