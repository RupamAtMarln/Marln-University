import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { 
  ArrowLeft, 
  FileText, 
  BookOpen, 
  Edit3, 
  FileCheck,
  Upload,
  Info,
  AlertCircle
} from 'lucide-react';

const assignmentTypes = [
  {
    id: 'definitions',
    title: 'Definitions Submission Form',
    description: 'Submit definitions for legal terms and concepts',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600',
    route: '/student/assignment-submission/definitions'
  },
  {
    id: 'case-briefs',
    title: 'Case Briefs Submission Form',
    description: 'Submit case briefs and legal analysis',
    icon: FileText,
    color: 'from-green-500 to-green-600',
    route: '/student/assignment-submission/case-briefs'
  },
  {
    id: 'mini-thesis',
    title: 'Mini Thesis Papers Submission Form',
    description: 'Submit mini thesis papers and research',
    icon: Edit3,
    color: 'from-purple-500 to-purple-600',
    route: '/student/assignment-submission/mini-thesis'
  },
  {
    id: 'midterm-essays',
    title: 'Midterm Essay Exams Submission Form',
    description: 'Submit midterm essay examinations',
    icon: FileCheck,
    color: 'from-orange-500 to-orange-600',
    route: '/student/assignment-submission/midterm-essays'
  }
];

function AssignmentSubmission() {
  const navigate = useNavigate();
  const location = useLocation();
  const course = location.state?.course || { title: 'All Courses' };

  const handleFormClick = (route) => {
    // Determine where to return to based on where we came from
    const returnTo = location.state?.returnTo || (location.key ? -1 : '/student/courses');
    
    navigate(route, { 
      state: { 
        course: course,
        returnTo: returnTo
      } 
    });
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  // Smart back navigation - go to where we came from or default to courses
                  const returnTo = location.state?.returnTo || (location.key ? -1 : '/student/courses');
                  if (typeof returnTo === 'number') {
                    navigate(returnTo);
                  } else {
                    navigate(returnTo);
                  }
                }}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Assignment Submission</h1>
                <p className="text-gray-600 dark:text-gray-400">{course.title}</p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-3">
              <Info className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                  Assignment Submission Instructions
                </h2>
                <div className="text-blue-800 dark:text-blue-200 space-y-2">
                  <p>
                    There is an assignment submission page like this one for each course, but only one submission form needs to be submitted for each type of assignment. 
                    There are links to submission forms within each course on eJuris, to make them easy to find. 
                    But you only need to submit a form one time for each type of assignment.
                  </p>
                  <p>
                    Please select the form below for the type of assignment you are submitting. Then use the form to upload one document for each course you are taking which requires that assignment. 
                    For example, for definitions, select the <strong>Definitions Submission Form</strong> below, and then upload four documents on it: one for Intro to Law, one for Contracts, one for Criminal Law, and one for Torts.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Forms */}
          <div className="space-y-4">
            {assignmentTypes.map((assignmentType, index) => (
              <div
                key={assignmentType.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                onClick={() => handleFormClick(assignmentType.route)}
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${assignmentType.color}`}>
                      <assignmentType.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                        {assignmentType.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {assignmentType.description}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400 dark:text-gray-500">
                      <span className="text-sm">Click to access</span>
                      <Upload className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Information */}
          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-6 w-6 text-yellow-500 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                  Important Notes
                </h3>
                <ul className="text-yellow-800 dark:text-yellow-200 space-y-1 text-sm">
                  <li>• Each assignment type requires a separate submission form</li>
                  <li>• You can upload multiple course documents on a single form</li>
                  <li>• Make sure to include your name and course information on each document</li>
                  <li>• Submit assignments before the deadline to avoid late penalties</li>
                  <li>• Contact your instructor if you have questions about specific assignments</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssignmentSubmission;
