import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import { 
  BookOpen, 
  Clock, 
  Users, 
  Calendar, 
  ArrowLeft, 
  CheckCircle, 
  Circle, 
  Target, 
  TrendingUp, 
  Award,
  FileText,
  Video,
  BookMarked,
  Lightbulb,
  Clock3,
  CalendarDays,
  ChevronRight
} from 'lucide-react';

// Dummy study plan data for different courses
const studyPlans = {
  'Cyber Security': {
    title: 'Cyber Security Study Plan',
    description: 'Comprehensive study plan covering cybersecurity fundamentals, threats, and defense mechanisms.',
    duration: '16 weeks',
    totalHours: '120 hours',
    difficulty: 'Intermediate',
    prerequisites: ['Basic Computer Science', 'Networking Fundamentals'],
    objectives: [
      'Understand cybersecurity principles and best practices',
      'Learn about common cyber threats and attack vectors',
      'Master security tools and defense mechanisms',
      'Develop incident response and recovery skills'
    ],
    weeklyPlan: [
      {
        week: 1,
        title: 'Introduction to Cybersecurity',
        topics: ['Cybersecurity fundamentals', 'Threat landscape overview', 'Security principles'],
        activities: ['Read Chapter 1-2', 'Complete Quiz 1', 'Join discussion forum'],
        estimatedHours: 8,
        deliverables: ['Quiz submission', 'Discussion participation'],
        status: 'completed'
      },
      {
        week: 2,
        title: 'Network Security Basics',
        topics: ['Network protocols', 'Firewall configuration', 'VPN setup'],
        activities: ['Lab exercises', 'Hands-on practice', 'Group project planning'],
        estimatedHours: 10,
        deliverables: ['Lab report', 'Project outline'],
        status: 'completed'
      },
      {
        week: 3,
        title: 'Cryptography Fundamentals',
        topics: ['Encryption algorithms', 'Hash functions', 'Digital signatures'],
        activities: ['Cryptography exercises', 'Code implementation', 'Security analysis'],
        estimatedHours: 12,
        deliverables: ['Code submission', 'Security report'],
        status: 'in-progress'
      },
      {
        week: 4,
        title: 'Web Application Security',
        topics: ['OWASP Top 10', 'SQL injection', 'XSS prevention'],
        activities: ['Vulnerability assessment', 'Penetration testing', 'Security audit'],
        estimatedHours: 10,
        deliverables: ['Vulnerability report', 'Security recommendations'],
        status: 'not-started'
      },
      {
        week: 5,
        title: 'Incident Response',
        topics: ['Incident detection', 'Response procedures', 'Recovery planning'],
        activities: ['Case studies', 'Simulation exercises', 'Documentation'],
        estimatedHours: 8,
        deliverables: ['Incident response plan', 'Case study analysis'],
        status: 'not-started'
      }
    ],
    resources: [
      { type: 'Textbook', name: 'Cybersecurity Essentials', author: 'Dr. Sarah Johnson', available: true },
      { type: 'Online Course', name: 'Cybersecurity Fundamentals', platform: 'Coursera', available: true },
      { type: 'Lab Environment', name: 'Virtual Security Lab', platform: 'VMware', available: true },
      { type: 'Tools', name: 'Wireshark, Metasploit, Nmap', platform: 'Open Source', available: true }
    ],
    milestones: [
      { week: 4, title: 'Midterm Assessment', type: 'Exam', weight: '30%' },
      { week: 8, title: 'Project Phase 1', type: 'Project', weight: '20%' },
      { week: 12, title: 'Security Audit', type: 'Practical', weight: '25%' },
      { week: 16, title: 'Final Project', type: 'Project', weight: '25%' }
    ]
  },
  'Advanced Python': {
    title: 'Advanced Python Study Plan',
    description: 'Master advanced Python concepts, best practices, and real-world applications.',
    duration: '12 weeks',
    totalHours: '96 hours',
    difficulty: 'Advanced',
    prerequisites: ['Python Basics', 'Object-Oriented Programming'],
    objectives: [
      'Master advanced Python features and syntax',
      'Learn design patterns and best practices',
      'Develop real-world applications',
      'Understand performance optimization'
    ],
    weeklyPlan: [
      {
        week: 1,
        title: 'Advanced Python Features',
        topics: ['Decorators', 'Generators', 'Context managers'],
        activities: ['Code examples', 'Practice exercises', 'Mini projects'],
        estimatedHours: 8,
        deliverables: ['Code submission', 'Feature demonstration'],
        status: 'completed'
      },
      {
        week: 2,
        title: 'Design Patterns',
        topics: ['Creational patterns', 'Structural patterns', 'Behavioral patterns'],
        activities: ['Pattern implementation', 'Case studies', 'Design exercises'],
        estimatedHours: 10,
        deliverables: ['Pattern examples', 'Design document'],
        status: 'completed'
      },
      {
        week: 3,
        title: 'Performance Optimization',
        topics: ['Profiling', 'Memory management', 'Algorithm optimization'],
        activities: ['Performance testing', 'Optimization exercises', 'Benchmarking'],
        estimatedHours: 12,
        deliverables: ['Performance report', 'Optimized code'],
        status: 'in-progress'
      },
      {
        week: 4,
        title: 'Testing and Debugging',
        topics: ['Unit testing', 'Integration testing', 'Debugging techniques'],
        activities: ['Test writing', 'Debugging practice', 'Test coverage'],
        estimatedHours: 10,
        deliverables: ['Test suite', 'Debugging report'],
        status: 'not-started'
      }
    ],
    resources: [
      { type: 'Textbook', name: 'Python Cookbook', author: 'Prof. Michael Chen', available: true },
      { type: 'Online Course', name: 'Advanced Python Programming', platform: 'edX', available: true },
      { type: 'Development Environment', name: 'PyCharm Professional', platform: 'JetBrains', available: true },
      { type: 'Libraries', name: 'NumPy, Pandas, Django', platform: 'Python Package Index', available: true }
    ],
    milestones: [
      { week: 3, title: 'Feature Assessment', type: 'Code Review', weight: '25%' },
      { week: 6, title: 'Design Pattern Project', type: 'Project', weight: '30%' },
      { week: 9, title: 'Performance Challenge', type: 'Practical', weight: '25%' },
      { week: 12, title: 'Final Application', type: 'Project', weight: '20%' }
    ]
  },
  'Web Development': {
    title: 'Web Development Study Plan',
    description: 'Learn modern web development technologies and best practices.',
    duration: '14 weeks',
    totalHours: '112 hours',
    difficulty: 'Intermediate',
    prerequisites: ['HTML/CSS Basics', 'JavaScript Fundamentals'],
    objectives: [
      'Master modern web technologies',
      'Learn responsive design principles',
      'Understand web security best practices',
      'Build full-stack web applications'
    ],
    weeklyPlan: [
      {
        week: 1,
        title: 'Modern HTML & CSS',
        topics: ['Semantic HTML', 'CSS Grid', 'Flexbox', 'CSS Variables'],
        activities: ['Layout exercises', 'Responsive design', 'CSS animations'],
        estimatedHours: 8,
        deliverables: ['Portfolio page', 'CSS showcase'],
        status: 'completed'
      },
      {
        week: 2,
        title: 'JavaScript ES6+',
        topics: ['Arrow functions', 'Destructuring', 'Modules', 'Async/await'],
        activities: ['Code challenges', 'Mini applications', 'ES6 features'],
        estimatedHours: 10,
        deliverables: ['JavaScript project', 'Feature demonstration'],
        status: 'completed'
      },
      {
        week: 3,
        title: 'Frontend Frameworks',
        topics: ['React basics', 'Component lifecycle', 'State management'],
        activities: ['React tutorials', 'Component building', 'State exercises'],
        estimatedHours: 12,
        deliverables: ['React app', 'Component library'],
        status: 'in-progress'
      },
      {
        week: 4,
        title: 'Backend Development',
        topics: ['Node.js', 'Express.js', 'API design', 'Database integration'],
        activities: ['Server setup', 'API development', 'Database queries'],
        estimatedHours: 10,
        deliverables: ['Backend API', 'Database schema'],
        status: 'not-started'
      }
    ],
    resources: [
      { type: 'Textbook', name: 'Web Development Guide', author: 'Dr. Emily Brown', available: true },
      { type: 'Online Course', name: 'Full Stack Web Development', platform: 'Udemy', available: true },
      { type: 'Development Tools', name: 'VS Code, Chrome DevTools', platform: 'Various', available: true },
      { type: 'Frameworks', name: 'React, Node.js, Express', platform: 'Open Source', available: true }
    ],
    milestones: [
      { week: 4, title: 'Frontend Assessment', type: 'Project', weight: '30%' },
      { week: 8, title: 'Backend Integration', type: 'Project', weight: '25%' },
      { week: 11, title: 'Full Stack App', type: 'Project', weight: '25%' },
      { week: 14, title: 'Final Portfolio', type: 'Project', weight: '20%' }
    ]
  }
};

function StudyPlan() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedWeek, setSelectedWeek] = useState(null);
  
  // Get course from location state or find by ID
  const course = location.state?.course || { title: 'Unknown Course' };
  const studyPlan = studyPlans[course.title] || studyPlans['Cyber Security'];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'in-progress':
        return <Circle className="h-5 w-5 text-yellow-500" />;
      case 'not-started':
        return <Circle className="h-5 w-5 text-gray-400" />;
      default:
        return <Circle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'not-started':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{studyPlan.title}</h1>
                <p className="text-gray-600 dark:text-gray-400">{course.title} • {studyPlan.duration}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Hours</div>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{studyPlan.totalHours}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Difficulty</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-gray-100">{studyPlan.difficulty}</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Course Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
                  Course Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{studyPlan.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Learning Objectives</h3>
                    <ul className="space-y-1">
                      {studyPlan.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                          <Target className="h-4 w-4 mr-2 mt-0.5 text-green-500 flex-shrink-0" />
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Prerequisites</h3>
                    <ul className="space-y-1">
                      {studyPlan.prerequisites.map((prereq, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                          {prereq}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Weekly Plan */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <CalendarDays className="h-5 w-5 mr-2 text-purple-500" />
                  Weekly Study Plan
                </h2>
                <div className="space-y-4">
                  {studyPlan.weeklyPlan.map((week) => (
                    <div
                      key={week.week}
                      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedWeek === week.week
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                      }`}
                      onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(week.status)}
                          <div>
                            <h3 className="font-medium text-gray-900 dark:text-gray-100">
                              Week {week.week}: {week.title}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center">
                                <Clock3 className="h-4 w-4 mr-1" />
                                {week.estimatedHours}h
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(week.status)}`}>
                                {week.status.replace('-', ' ')}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                          selectedWeek === week.week ? 'rotate-90' : ''
                        }`} />
                      </div>
                      
                      {selectedWeek === week.week && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Topics Covered</h4>
                            <div className="flex flex-wrap gap-2">
                              {week.topics.map((topic, index) => (
                                <span key={index} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                                  {topic}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Activities</h4>
                            <ul className="space-y-1">
                              {week.activities.map((activity, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                  <Lightbulb className="h-4 w-4 mr-2 mt-0.5 text-yellow-500 flex-shrink-0" />
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Deliverables</h4>
                            <ul className="space-y-1">
                              {week.deliverables.map((deliverable, index) => (
                                <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-300">
                                  <FileText className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                                  {deliverable}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress Summary */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                  Progress Summary
                </h3>
                <div className="space-y-4">
                  {studyPlan.weeklyPlan.map((week) => (
                    <div key={week.week} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 dark:text-gray-300">Week {week.week}</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(week.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(week.status)}`}>
                          {week.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <BookMarked className="h-5 w-5 mr-2 text-purple-500" />
                  Learning Resources
                </h3>
                <div className="space-y-3">
                  {studyPlan.resources.map((resource, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{resource.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{resource.type}</div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          resource.available 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        }`}>
                          {resource.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Milestones */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center">
                  <Award className="h-5 w-5 mr-2 text-yellow-500" />
                  Key Milestones
                </h3>
                <div className="space-y-3">
                  {studyPlan.milestones.map((milestone, index) => (
                    <div key={index} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">{milestone.title}</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Week {milestone.week}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{milestone.type}</span>
                        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">{milestone.weight}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyPlan;
