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
    title: 'Advanced Python',
    instructor: 'Prof. Michael Chen',
    schedule: 'Tue, Thu 2:00 PM - 3:30 PM',
    progress: 60,
    nextClass: '2024-03-21T14:00:00',
    enrolledStudents: 38,
    room: 'Room 203',
    description: 'Master advanced Python concepts, best practices, and real-world applications.',
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
  'Advanced Python': {
    syllabus: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-syllabus.pdf',
    weeks: [
      {
        week: 1,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk1-0001.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk1-vid0001.mp4',
      },
      {
        week: 2,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk2-0002.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk2-vid0002.mp4',
      },
      {
        week: 3,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk3-0003.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk3-vid0003.mp4',
      },
      {
        week: 4,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk4-0004.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course2/course2-wk4-vid0004.mp4',
      },
    ],
  },
  'Web Development': {
    syllabus: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-syllabus.pdf',
    weeks: [
      {
        week: 1,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk1-0001.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk1-vid0001.mp4',
      },
      {
        week: 2,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk2-0002.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk2-vid0002.mp4',
      },
      {
        week: 3,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk3-0003.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk3-vid0003.mp4',
      },
      {
        week: 4,
        pdf: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk4-0004.pdf',
        video: 'https://lms-frontend-resources.s3.ap-south-1.amazonaws.com/CourseDetails/course3/course3-wk4-vid0004.mp4',
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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">My Courses</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400 dark:text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{course.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{course.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Users className="h-4 w-4 mr-2" />
                      <span>Instructor: {course.instructor}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Clock className="h-4 w-4 mr-2" />
                      <span>{course.schedule}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Next Class: {new Date(course.nextClass).toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">Progress</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
            <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg max-w-2xl w-full p-0 overflow-y-auto max-h-[90vh] border border-blue-50 dark:border-blue-900">
              {/* Accent Bar & Floating Close Button */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-400 to-pink-400 rounded-t-2xl" />
              <button
                onClick={() => setSelectedCourse(null)}
                className="absolute top-3 right-3 bg-white dark:bg-gray-800 shadow border border-gray-100 dark:border-gray-700 text-gray-400 hover:text-red-400 p-1.5 rounded-full z-20 transition"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="p-5 pt-4 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <ShieldCheck className="text-blue-500 w-5 h-5" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">{selectedCourse.title}</h2>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-base mb-4">{selectedCourse.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                  <div>
                    <h3 className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold text-base mb-1"><BookOpen className="w-4 h-4" /> Course Details</h3>
                    <ul className="mt-1 space-y-1">
                      <li className="flex items-center text-sm text-gray-700 dark:text-gray-200"><Users className="h-4 w-4 mr-1 text-blue-300" />Instructor: <span className="ml-1 font-medium">{selectedCourse.instructor}</span></li>
                      <li className="flex items-center text-sm text-gray-700 dark:text-gray-200"><Clock className="h-4 w-4 mr-1 text-purple-300" />Schedule: <span className="ml-1 font-medium">{selectedCourse.schedule}</span></li>
                      <li className="flex items-center text-sm text-gray-700 dark:text-gray-200"><BookOpen className="h-4 w-4 mr-1 text-pink-300" />Room: <span className="ml-1 font-medium">{selectedCourse.room}</span></li>
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
                {/* In-depth content for courses */}
                {(selectedCourse.title === 'Cyber Security' || selectedCourse.title === 'Advanced Python' || selectedCourse.title === 'Web Development') && courseContents[selectedCourse.title] && (
                  <div className="mt-1">
                    <h3 className="flex items-center gap-1 text-base font-bold text-purple-600 mb-2">
                      <FileText className="w-5 h-5" /> Course Syllabus
                    </h3>
                    <button
                      onClick={() => navigate(`/student/courses/${selectedCourse.id}/pdf/syllabus`, {
                        state: {
                          pdfUrl: courseContents[selectedCourse.title].syllabus + '?v=' + Date.now(),
                          title: `${selectedCourse.title} Syllabus`
                        }
                      })}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-sm hover:from-blue-600 hover:to-purple-600 font-medium text-sm mb-4 transition"
                    >
                      <FileText className="mr-2 w-4 h-4" /> View Syllabus (PDF)
                    </button>
                    
                    <h3 className="flex items-center gap-1 text-base font-bold text-pink-600 mb-2">
                      <Video className="w-5 h-5" /> Weekly Content
                    </h3>
                    <div className="relative">
                      <div className={`space-y-4 ${selectedCourse.title === 'Web Development' ? 'blur-sm' : ''}`}>
                        {courseContents[selectedCourse.title].weeks.map((week) => (
                          <div key={week.week} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Week {week.week}</h4>
                            <div className="flex flex-wrap gap-2">
                              <button
                                onClick={() => navigate(`/student/courses/${selectedCourse.id}/pdf/${week.week}`, {
                                  state: {
                                    pdfUrl: week.pdf + '?v=' + Date.now(),
                                    title: `${selectedCourse.title} - Week ${week.week} Materials`
                                  }
                                })}
                                className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <FileText className="mr-1.5 w-4 h-4 text-blue-500" />
                                View PDF
                              </button>
                              <button
                                onClick={() => navigate(`/student/courses/${selectedCourse.id}/video/${week.week}`, {
                                  state: {
                                    videoUrl: week.video + '?v=' + Date.now(),
                                    title: `${selectedCourse.title} - Week ${week.week} Lecture`
                                  }
                                })}
                                className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
                              >
                                <Video className="mr-1.5 w-4 h-4 text-pink-500" />
                                Watch Video
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      {selectedCourse.title === 'Web Development' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/10 dark:bg-gray-900/10 rounded-lg">
                          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold text-lg flex items-center gap-2">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                            </svg>
                            Available on PRO Version
                          </div>
                        </div>
                      )}
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