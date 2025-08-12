import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { 
  FileText, 
  Download, 
  BookOpen, 
  Search,
  Filter,
  ChevronRight,
  File,
  FileType,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode
} from 'lucide-react';

const materials = [
  {
    id: 1,
    title: 'Introduction to Programming Concepts',
    course: 'Introduction to Computer Science',
    code: 'CS101',
    type: 'lecture-notes',
    format: 'pdf',
    size: '2.4 MB',
    uploadedAt: '2024-03-15T10:30:00',
    description: 'Comprehensive notes covering basic programming concepts, variables, and control structures.',
    downloads: 145,
    instructor: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    title: 'Data Structures Overview',
    course: 'Data Structures and Algorithms',
    code: 'CS201',
    type: 'lecture-notes',
    format: 'pdf',
    size: '3.1 MB',
    uploadedAt: '2024-03-14T14:20:00',
    description: 'Detailed overview of fundamental data structures including arrays, linked lists, and trees.',
    downloads: 98,
    instructor: 'Prof. Michael Chen'
  },
  {
    id: 3,
    title: 'Web Development Project Template',
    course: 'Web Development',
    code: 'CS301',
    type: 'project',
    format: 'zip',
    size: '5.7 MB',
    uploadedAt: '2024-03-13T09:15:00',
    description: 'Starter template for the final web development project with basic structure and dependencies.',
    downloads: 76,
    instructor: 'Dr. Emily Brown'
  },
  {
    id: 4,
    title: 'Database Design Patterns',
    course: 'Database Systems',
    code: 'CS401',
    type: 'lecture-notes',
    format: 'pdf',
    size: '1.8 MB',
    uploadedAt: '2024-03-12T16:45:00',
    description: 'Common database design patterns and best practices for efficient data modeling.',
    downloads: 112,
    instructor: 'Dr. James Wilson'
  },
  {
    id: 5,
    title: 'Programming Assignment Solutions',
    course: 'Introduction to Computer Science',
    code: 'CS101',
    type: 'assignment',
    format: 'zip',
    size: '4.2 MB',
    uploadedAt: '2024-03-11T11:20:00',
    description: 'Sample solutions and explanations for the programming assignments.',
    downloads: 89,
    instructor: 'Dr. Sarah Johnson'
  }
];

function Materials() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const filteredMaterials = materials.filter(material => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         material.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === 'all' ? true : material.code === selectedCourse;
    const matchesType = selectedType === 'all' ? true : material.type === selectedType;
    return matchesSearch && matchesCourse && matchesType;
  });

  const getFileIcon = (format) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-6 w-6 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="h-6 w-6 text-blue-500" />;
      case 'jpg':
      case 'png':
      case 'gif':
        return <FileImage className="h-6 w-6 text-green-500" />;
      case 'mp4':
      case 'avi':
        return <FileVideo className="h-6 w-6 text-purple-500" />;
      case 'mp3':
      case 'wav':
        return <FileAudio className="h-6 w-6 text-yellow-500" />;
      case 'zip':
      case 'rar':
        return <FileArchive className="h-6 w-6 text-gray-500" />;
      case 'js':
      case 'py':
      case 'java':
        return <FileCode className="h-6 w-6 text-orange-500" />;
      default:
        return <File className="h-6 w-6 text-gray-500" />;
    }
  };

  const getTypeLabel = (type) => {
    return type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Course Materials</h1>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow mb-6 p-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <input
                  type="text"
                  placeholder="Search materials..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              >
                <option value="all">All Courses</option>
                <option value="CS101">CS101 - Introduction to Computer Science</option>
                <option value="CS201">CS201 - Data Structures and Algorithms</option>
                <option value="CS301">CS301 - Web Development</option>
                <option value="CS401">CS401 - Database Systems</option>
              </select>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
              >
                <option value="all">All Types</option>
                <option value="lecture-notes">Lecture Notes</option>
                <option value="assignment">Assignments</option>
                <option value="project">Projects</option>
                <option value="resource">Resources</option>
              </select>
              <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
                <Filter size={20} />
                More Filters
              </button>
            </div>
          </div>

          {/* Materials Grid */}
          <div className="grid grid-cols-1 gap-6">
            {filteredMaterials.map(material => (
              <div
                key={material.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4">
                      {getFileIcon(material.format)}
                      <div>
                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">{material.title}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-300">{material.course} ({material.code})</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {getTypeLabel(material.type)}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 mb-4">{material.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileType className="h-4 w-4 mr-2" />
                      <span>{material.format.toUpperCase()}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="h-4 w-4 mr-2" />
                      <span>{material.size}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2" />
                      <span>{material.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Download className="h-4 w-4 mr-2" />
                      <span>{material.downloads} downloads</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Uploaded: {new Date(material.uploadedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => setSelectedMaterial(material)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      View Details
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Material Details Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-start gap-4 mb-6">
              {getFileIcon(selectedMaterial.format)}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{selectedMaterial.title}</h2>
                <p className="text-sm text-gray-500">{selectedMaterial.course} ({selectedMaterial.code})</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-sm text-gray-600">{selectedMaterial.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">File Information</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-600">
                      Format: {selectedMaterial.format.toUpperCase()}
                    </li>
                    <li className="text-sm text-gray-600">
                      Size: {selectedMaterial.size}
                    </li>
                    <li className="text-sm text-gray-600">
                      Downloads: {selectedMaterial.downloads}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Course Information</h3>
                  <ul className="space-y-2">
                    <li className="text-sm text-gray-600">
                      Instructor: {selectedMaterial.instructor}
                    </li>
                    <li className="text-sm text-gray-600">
                      Type: {getTypeLabel(selectedMaterial.type)}
                    </li>
                    <li className="text-sm text-gray-600">
                      Uploaded: {new Date(selectedMaterial.uploadedAt).toLocaleString()}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Materials; 