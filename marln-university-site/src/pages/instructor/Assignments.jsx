import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { 
  BookOpen, 
  Users2, 
  ClipboardList, 
  Calendar, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Upload,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  BarChart2
} from 'lucide-react';

const courses = [
  { id: 1, code: 'CS101', name: 'Introduction to Computer Science' },
  { id: 2, code: 'ML305', name: 'Machine Learning' },
  { id: 3, code: 'DS220', name: 'Data Structures' },
];

const assignments = [
  {
    id: 1,
    title: 'Programming Assignment #1',
    course: 'CS101',
    dueDate: '2024-03-20',
    submissions: 45,
    totalStudents: 50,
    status: 'active',
    type: 'Programming',
    points: 100,
  },
  {
    id: 2,
    title: 'Machine Learning Project',
    course: 'ML305',
    dueDate: '2024-03-25',
    submissions: 30,
    totalStudents: 35,
    status: 'active',
    type: 'Project',
    points: 200,
  },
  {
    id: 3,
    title: 'Data Structures Quiz',
    course: 'DS220',
    dueDate: '2024-03-15',
    submissions: 40,
    totalStudents: 40,
    status: 'completed',
    type: 'Quiz',
    points: 50,
  },
];

export default function Assignments() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredAssignments = assignments.filter(assignment => {
    const matchesCourse = selectedCourse ? assignment.course === selectedCourse : true;
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' ? true : assignment.status === filterStatus;
    return matchesCourse && matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Assignment Management</h1>
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} />
              Create Assignment
            </button>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow mb-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search assignments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Courses</option>
                {courses.map(course => (
                  <option key={course.id} value={course.code}>{course.code} - {course.name}</option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="draft">Draft</option>
              </select>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                More Filters
              </button>
            </div>
          </div>

          {/* Assignments Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssignments.map(assignment => (
              <div key={assignment.id} className="bg-white rounded-xl shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                      <p className="text-sm text-gray-500">{assignment.course}</p>
                    </div>
                    <div className="relative">
                      <button
                        onClick={() => setShowActionMenu(showActionMenu === assignment.id ? null : assignment.id)}
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreVertical size={20} />
                      </button>
                      {showActionMenu === assignment.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Eye size={16} className="mr-2" />
                            View Details
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Edit size={16} className="mr-2" />
                            Edit
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                            <Download size={16} className="mr-2" />
                            Download Submissions
                          </button>
                          <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                            <Trash2 size={16} className="mr-2" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Due Date</span>
                      <span className="font-medium text-gray-700">{assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Submissions</span>
                      <span className="font-medium text-gray-700">{assignment.submissions}/{assignment.totalStudents}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Type</span>
                      <span className="font-medium text-gray-700">{assignment.type}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Points</span>
                      <span className="font-medium text-gray-700">{assignment.points}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between">
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        assignment.status === 'active' ? 'bg-green-100 text-green-800' :
                        assignment.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        View Submissions
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Create New Assignment</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <XCircle size={24} />
                </button>
              </div>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    {courses.map(course => (
                      <option key={course.id} value={course.code}>{course.code} - {course.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter assignment title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Enter assignment description"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                    <input
                      type="date"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Points</label>
                    <input
                      type="number"
                      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter points"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assignment Type</label>
                  <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="Programming">Programming</option>
                    <option value="Project">Project</option>
                    <option value="Quiz">Quiz</option>
                    <option value="Essay">Essay</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload Files</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload size={24} className="mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
                    <input type="file" className="hidden" />
                  </div>
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Create Assignment
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 