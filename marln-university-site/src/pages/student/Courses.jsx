import React, { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { BookOpen, Clock, Users, Calendar, ChevronRight, Search, FileText, Video, ShieldCheck, CalendarDays } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Cyber Security',
    instructor: 'Dr. Sarah Johnson',
    schedule: 'Mon, Wed 10:00 AM - 11:30 AM',
    progress: 75,
    nextClass: '2024-03-20T10:00:00',
    enrolledStudents: 45,
    room: 'Room 101',
    description: 'A comprehensive course on cyber security principles, threats, and defense mechanisms.',
  },
  {
    id: 2,
    title: 'Data Structures and Algorithms',
    instructor: 'Prof. Michael Chen',
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
    progress: 60,
    nextClass: '2024-03-21T14:00:00',
    enrolledStudents: 38,
    room: 'Room 203',
    description: 'Study of fundamental data structures and algorithms used in computer science.',
  },
  {
    id: 3,
    title: 'Web Development',
    instructor: 'Dr. Emily Brown',
    schedule: 'Wed, Fri 1:00 PM - 2:30 PM',
    progress: 85,
    nextClass: '2024-03-22T13:00:00',
    enrolledStudents: 42,
    room: 'Room 305',
    description: 'Learn modern web development technologies and best practices.',
  },
];

const courseContents = {
  'Cyber Security': {
    syllabus: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-syllabus.pdf',
    weeks: [
      {
        week: 1,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk1-0001.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk1-vid0001.mp4',
      },
      {
        week: 2,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk2-0002.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk2-vid0002.mp4',
      },
      {
        week: 3,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk3-0003.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk3-vid0003.mp4',
      },
      {
        week: 4,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk4-0004.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course1/course1-wk4-vid0004.mp4',
      },
    ],
  },
};

function Courses() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const navigate = useNavigate();

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">My Courses</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Next Class: {new Date(course.nextClass).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-2 z-50">
            <div className="relative bg-white rounded-2xl shadow-lg max-w-2xl w-full p-0 overflow-y-auto max-h-[90vh] border border-blue-50">
              {/* Accent Bar & Floating Close Button */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 rounded-t-2xl" />
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-3 right-3 bg-white shadow border border-gray-100 text-gray-400 hover:text-red-400 p-1.5 rounded-full z-20 transition"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-5 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="text-blue-500 w-5 h-5" />
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">{selectedCourse.title}</h2>
                </div>
                <p className="text-gray-600 text-base mb-4">{selectedCourse.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <h3 className="flex items-center gap-1 text-blue-600 font-semibold text-base mb-1"><BookOpen className="w-4 h-4" /> Course Details</h3>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center text-sm text-gray-700"><Users className="h-4 w-4 mr-1 text-blue-300" />Instructor: <span className="ml-1 font-medium">{selectedCourse.instructor}</span></li>
                      <li className="flex items-center text-sm text-gray-700"><Clock className="h-4 w-4 mr-1 text-purple-300" />Schedule: <span className="ml-1 font-medium">{selectedCourse.schedule}</span></li>
                      <li className="flex items-center text-sm text-gray-700"><BookOpen className="h-4 w-4 mr-1 text-pink-300" />Room: <span className="ml-1 font-medium">{selectedCourse.room}</span></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="flex items-center gap-1 text-blue-600 font-semibold text-base mb-1"><CalendarDays className="w-4 h-4" /> Class Info</h3>
                    <ul className="mt-1 space-y-1">
                      <li className="text-sm text-gray-700">Enrolled: <span className="font-medium">{selectedCourse.enrolledStudents}</span></li>
                      <li className="text-sm text-gray-700">Next: <span className="font-medium">{new Date(selectedCourse.nextClass).toLocaleString()}</span></li>
                      <li className="text-sm text-gray-700">Progress: <span className="font-medium">{selectedCourse.progress}%</span></li>
                    </ul>
                  </div>
                </div>
                {/* In-depth content for Cyber Security */}
                {selectedCourse.title === 'Cyber Security' && courseContents['Cyber Security'] && (
                  <div className="mt-1">
                    <h3 className="flex items-center gap-1 text-base font-bold text-purple-600 mb-2"><FileText className="w-5 h-5" /> Course Syllabus</h3>
                    <button
                      onClick={() => navigate(`/student/courses/1/pdf/syllabus`, { state: { pdfUrl: courseContents['Cyber Security'].syllabus, title: 'Cyber Security Syllabus' } })}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-purple-600 font-medium text-sm mb-4 transition"
                    >
                      <FileText className="mr-2 w-4 h-4" /> View Syllabus (PDF)
                    </button>
                    <h3 className="flex items-center gap-1 text-base font-bold text-pink-600 mb-2"><Video className="w-5 h-5" /> Weekly Content</h3>
                    <div className="space-y-4">
                      {courseContents['Cyber Security'].weeks.map((week, idx) => (
                        <div key={week.week} className={`relative bg-gradient-to-br from-white via-blue-50 to-purple-50 rounded-xl shadow-sm p-4 flex flex-col md:flex-row gap-4 items-center border-l-2 ${idx % 2 === 0 ? 'border-blue-300' : 'border-purple-300'}`}>
                          <div className="flex flex-col items-center md:items-start w-24 shrink-0">
                            <div className="text-lg font-bold text-blue-600 mb-0.5">Week {week.week}</div>
                            <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 mb-1" />
                          </div>
                          <div className="flex-1 flex flex-col md:flex-row gap-2 items-center md:items-stretch">
                            <button
                              onClick={() => navigate(`/student/courses/1/pdf/${week.week}`, { state: { pdfUrl: week.pdf, title: `Cyber Security - Week ${week.week} PDF` } })}
                              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-md shadow-sm hover:from-green-600 hover:to-emerald-600 font-medium text-sm transition"
                            >
                              <FileText className="mr-2 w-4 h-4" /> View PDF
                            </button>
                            <button
                              onClick={() => navigate(`/student/courses/1/video/${week.week}`, { state: { videoUrl: week.video, title: `Cyber Security - Week ${week.week} Video` } })}
                              className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md shadow-sm hover:from-purple-600 hover:to-pink-600 font-medium text-sm transition"
                            >
                              <Video className="mr-2 w-4 h-4" /> View Video
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses; 