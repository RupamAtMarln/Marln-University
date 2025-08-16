import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, BookOpen, Award, FileText, BarChart3, Calendar, Users, GraduationCap, TrendingUp, AlertCircle, Info } from 'lucide-react';
import Sidebar from '../../components/Sidebar';

const CheckMyVAE = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const course = location.state?.course;
  
  // Smart navigation logic
  const returnTo = location.state?.returnTo || (location.key ? -1 : '/student/courses');

  // Mock VAE data - in real app this would come from API
  const [vaeData, setVaeData] = useState({
    overallProgress: 78,
    academicStanding: 'Good Standing',
    creditHoursCompleted: 45,
    creditHoursRequired: 120,
    gpa: 3.45,
    coursesInProgress: 4,
    coursesCompleted: 12,
    lastUpdated: '2024-03-19T10:30:00',
    requirements: {
      coreCourses: { completed: 8, required: 10, status: 'In Progress' },
      electives: { completed: 15, required: 20, status: 'In Progress' },
      generalEducation: { completed: 22, required: 25, status: 'In Progress' }
    },
    courseSpecific: {
      'Cyber Security': {
        progress: 75,
        attendance: 92,
        assignments: 8,
        completedAssignments: 6,
        midtermGrade: 'A-',
        finalGrade: null,
        lastActivity: '2024-03-18T14:00:00',
        nextMilestone: 'Final Project Due',
        nextMilestoneDate: '2024-04-15T23:59:00',
        requirements: [
          { name: 'Weekly Quizzes', completed: 8, total: 12, status: 'In Progress' },
          { name: 'Lab Assignments', completed: 6, total: 8, status: 'In Progress' },
          { name: 'Midterm Exam', completed: 1, total: 1, status: 'Completed' },
          { name: 'Final Project', completed: 0, total: 1, status: 'Pending' }
        ]
      },
      'Advanced Python': {
        progress: 60,
        attendance: 88,
        assignments: 10,
        completedAssignments: 6,
        midtermGrade: 'B+',
        finalGrade: null,
        lastActivity: '2024-03-17T16:30:00',
        nextMilestone: 'Capstone Project',
        nextMilestoneDate: '2024-04-20T23:59:00',
        requirements: [
          { name: 'Programming Exercises', completed: 15, total: 20, status: 'In Progress' },
          { name: 'Code Reviews', completed: 4, total: 6, status: 'In Progress' },
          { name: 'Midterm Exam', completed: 1, total: 1, status: 'Completed' },
          { name: 'Capstone Project', completed: 0, total: 1, status: 'Pending' }
        ]
      },
      'Web Development': {
        progress: 85,
        attendance: 95,
        assignments: 12,
        completedAssignments: 10,
        midtermGrade: 'A',
        finalGrade: null,
        lastActivity: '2024-03-19T09:15:00',
        nextMilestone: 'Portfolio Submission',
        nextMilestoneDate: '2024-04-10T23:59:00',
        requirements: [
          { name: 'Website Projects', completed: 4, total: 5, status: 'In Progress' },
          { name: 'Code Documentation', completed: 8, total: 10, status: 'In Progress' },
          { name: 'Midterm Exam', completed: 1, total: 1, status: 'Completed' },
          { name: 'Portfolio', completed: 0, total: 1, status: 'Pending' }
        ]
      }
    }
  });

  const [selectedTab, setSelectedTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(false);

  // Calculate overall statistics
  const overallStats = {
    completionRate: Math.round((vaeData.creditHoursCompleted / vaeData.creditHoursRequired) * 100),
    remainingHours: vaeData.creditHoursRequired - vaeData.creditHoursCompleted,
    averageGrade: vaeData.gpa >= 3.5 ? 'A' : vaeData.gpa >= 3.0 ? 'B' : vaeData.gpa >= 2.0 ? 'C' : 'D'
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-400';
      case 'In Progress': return 'text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-400';
      case 'Pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-400';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-400';
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return 'text-green-600';
    if (progress >= 60) return 'text-blue-600';
    if (progress >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const handleBackNavigation = () => {
    if (typeof returnTo === 'number') {
      navigate(returnTo);
    } else {
      navigate(returnTo);
    }
  };

  const handleRefreshVAE = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    // In real app, this would fetch updated VAE data
  };

  if (!course) {
    return (
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Course Not Found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4">Please select a course to view VAE information.</p>
            <button
              onClick={handleBackNavigation}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  const courseVAE = vaeData.courseSpecific[course.title];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackNavigation}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Verification of Academic Experience (VAE)
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {course.title} • Last updated: {new Date(vaeData.lastUpdated).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={handleRefreshVAE}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Clock className="w-4 h-4" />
              )}
              <span>Refresh VAE</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="px-6">
            <nav className="flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: BarChart3 },
                { id: 'course', label: 'Course Details', icon: BookOpen },
                { id: 'requirements', label: 'Requirements', icon: CheckCircle },
                { id: 'progress', label: 'Progress Tracking', icon: TrendingUp }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Overall Academic Status */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-blue-600" />
                  Overall Academic Status
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">Credit Hours</p>
                        <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                          {vaeData.creditHoursCompleted}/{vaeData.creditHoursRequired}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-blue-600 dark:text-blue-400">{overallStats.completionRate}%</p>
                        <p className="text-xs text-blue-500 dark:text-blue-300">Complete</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">GPA</p>
                        <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                          {vaeData.gpa}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-green-600 dark:text-green-400">{overallStats.averageGrade}</p>
                        <p className="text-xs text-green-500 dark:text-green-300">Grade</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-600 dark:text-purple-400">Courses</p>
                        <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">
                          {vaeData.coursesCompleted}/{vaeData.coursesCompleted + vaeData.coursesInProgress}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-purple-600 dark:text-purple-400">Completed</p>
                        <p className="text-xs text-purple-500 dark:text-purple-300">Total</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Standing</p>
                        <p className="text-lg font-bold text-orange-900 dark:text-orange-100">
                          {vaeData.academicStanding}
                        </p>
                      </div>
                      <div className="text-right">
                        <CheckCircle className="w-6 h-6 text-orange-500 dark:text-orange-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Course Progress */}
              {courseVAE && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                    Current Course: {course.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-center w-20 h-20">
                        <svg className="w-20 h-20 transform -rotate-90">
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-gray-200 dark:text-gray-700"
                          />
                          <circle
                            cx="40"
                            cy="40"
                            r="36"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={`${2 * Math.PI * 36}`}
                            strokeDashoffset={`${2 * Math.PI * 36 * (1 - courseVAE.progress / 100)}`}
                            className={`${getProgressColor(courseVAE.progress)} transition-all duration-500`}
                          />
                        </svg>
                        <span className="absolute text-lg font-bold text-gray-900 dark:text-gray-100">
                          {courseVAE.progress}%
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mt-2">Course Progress</p>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Attendance</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{courseVAE.attendance}%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Assignments</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{courseVAE.completedAssignments}/{courseVAE.assignments}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Midterm Grade</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">{courseVAE.midtermGrade}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">Next Milestone</p>
                        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">{courseVAE.nextMilestone}</p>
                        <p className="text-xs text-blue-500 dark:text-blue-300">
                          Due: {new Date(courseVAE.nextMilestoneDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                  Degree Requirements Overview
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(vaeData.requirements).map(([key, requirement]) => (
                    <div key={key} className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(requirement.status)}`}>
                          {requirement.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {requirement.completed}/{requirement.required}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {Math.round((requirement.completed / requirement.required) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mt-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(requirement.completed / requirement.required) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'course' && courseVAE && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                  {course.title} - Detailed VAE
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Course Statistics */}
                  <div className="space-y-4">
                    <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">Course Statistics</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Course Progress</span>
                        <span className={`text-sm font-medium ${getProgressColor(courseVAE.progress)}`}>
                          {courseVAE.progress}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Attendance Rate</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {courseVAE.attendance}%
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Assignments Completed</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {courseVAE.completedAssignments}/{courseVAE.assignments}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Last Activity</span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {new Date(courseVAE.lastActivity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Grades and Milestones */}
                  <div className="space-y-4">
                    <h3 className="text-md font-semibold text-gray-700 dark:text-gray-300">Grades & Milestones</h3>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-green-700 dark:text-green-300">Midterm Grade</span>
                          <span className="text-lg font-bold text-green-800 dark:text-green-200">{courseVAE.midtermGrade}</span>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Next Milestone</span>
                            <span className="text-sm font-medium text-blue-800 dark:text-blue-200">{courseVAE.nextMilestone}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-blue-600 dark:text-blue-400">Due Date</span>
                            <span className="text-xs text-blue-700 dark:text-blue-300">
                              {new Date(courseVAE.nextMilestoneDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'requirements' && courseVAE && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-600" />
                  Course Requirements Breakdown
                </h2>
                
                <div className="space-y-4">
                  {courseVAE.requirements.map((requirement, index) => (
                    <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-md font-medium text-gray-900 dark:text-gray-100">
                          {requirement.name}
                        </h3>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(requirement.status)}`}>
                          {requirement.status}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Progress: {requirement.completed}/{requirement.total}
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {Math.round((requirement.completed / requirement.total) * 100)}%
                        </span>
                      </div>
                      
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${(requirement.completed / requirement.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'progress' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  Academic Progress Timeline
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Semester 1</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed 15 credit hours with 3.2 GPA</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Fall 2023</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Semester 2</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Completed 18 credit hours with 3.5 GPA</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Spring 2024</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Current Semester</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">In progress with 12 credit hours</p>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Fall 2024</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-400 dark:text-gray-500">Future Semesters</p>
                      <p className="text-sm text-gray-400 dark:text-gray-500">Remaining 45 credit hours to complete degree</p>
                    </div>
                    <span className="text-sm text-gray-400 dark:text-gray-500">2025-2026</span>
                  </div>
                </div>
              </div>

              {/* Progress Insights */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-md font-semibold text-gray-900 dark:text-gray-100 mb-4">Progress Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">On Track</span>
                    </div>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      You are currently on track to complete your degree within the expected timeframe.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-green-600 dark:text-green-400" />
                      <span className="text-sm font-medium text-green-700 dark:text-green-300">Improving</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Your GPA has improved from 3.2 to 3.45 over the last two semesters.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckMyVAE;
