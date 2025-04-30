import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { BookOpen, Users2, ClipboardList, Calendar, BarChart2, MessageCircle, FileText, CheckCircle, TrendingUp, Bell, Award, Library } from 'lucide-react';

const stats = [
  { label: 'Enrolled Courses', value: '5', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Pending Assignments', value: '3', icon: ClipboardList, color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { label: 'Average Grade', value: '85%', icon: Award, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Next Class', value: 'Math 101', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
];

const messages = [
  { name: 'Dr. Emily Carter', time: '10:15 AM', msg: 'Your assignment has been graded. Great work!', avatar: '', color: 'bg-blue-200' },
  { name: 'Study Group', time: 'Yesterday', msg: 'Meeting tomorrow at 2 PM in Library', avatar: '', color: 'bg-green-200' },
  { name: 'Academic Advisor', time: '2 days ago', msg: 'Course registration opens next week', avatar: '', color: 'bg-yellow-200' },
];

const activities = [
  { icon: CheckCircle, desc: 'Submitted Math Assignment #3', time: '2 hours ago', color: 'text-blue-600' },
  { icon: Award, desc: 'Received A+ in Physics Lab', time: '1 day ago', color: 'text-green-600' },
  { icon: FileText, desc: 'Downloaded Chemistry Notes', time: '2 days ago', color: 'text-yellow-600' },
  { icon: Users2, desc: 'Joined Study Group', time: '3 days ago', color: 'text-purple-600' },
];

const upcomingClasses = [
  { time: '9:00 AM', title: 'Mathematics 101', room: 'Room 302, Building A', instructor: 'Dr. Emily Carter' },
  { time: '1:00 PM', title: 'Physics 201', room: 'Room 105, Building B', instructor: 'Prof. David Kim' },
  { time: '3:30 PM', title: 'Chemistry Lab', room: 'Lab 203, Science Building', instructor: 'Dr. Sarah Lee' },
];

const courseProgress = [
  { name: 'Mathematics 101', progress: 75, color: 'bg-blue-500' },
  { name: 'Physics 201', progress: 60, color: 'bg-green-500' },
  { name: 'Chemistry 101', progress: 85, color: 'bg-yellow-500' },
  { name: 'Computer Science 101', progress: 90, color: 'bg-purple-500' },
];

export default function StudentDashboard() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar role="student" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className={`rounded-xl shadow p-6 flex items-center gap-4 ${stat.bg}`}>
                  <stat.icon size={36} className={stat.color} />
                  <div>
                    <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                    <div className="text-gray-500 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Academic Performance */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="font-semibold text-gray-700">Academic Performance</div>
                  <select className="border rounded px-2 py-1 text-sm">
                    <option>This Semester</option>
                    <option>Last Semester</option>
                  </select>
                </div>
                <div className="space-y-4">
                  {courseProgress.map((course) => (
                    <div key={course.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">{course.name}</span>
                        <span className="text-sm font-medium text-gray-700">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className={`${course.color} h-2 rounded-full`} style={{ width: `${course.progress}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Classes */}
              <div className="bg-white rounded-xl shadow p-6">
                <div className="font-semibold text-gray-700 mb-4">Today's Schedule</div>
                <div className="space-y-4">
                  {upcomingClasses.map((class_, index) => (
                    <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex-shrink-0 w-16 text-center">
                        <div className="text-sm font-medium text-gray-900">{class_.time}</div>
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{class_.title}</div>
                        <div className="text-sm text-gray-500">{class_.room}</div>
                        <div className="text-sm text-gray-500">Instructor: {class_.instructor}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Messages */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <div className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <MessageCircle size={18}/> Messages
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  {messages.map((msg, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${msg.color}`}>
                        <Users2 size={28} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">{msg.name}</div>
                        <div className="text-xs text-gray-500">{msg.msg}</div>
                      </div>
                      <div className="text-xs text-gray-400 whitespace-nowrap">{msg.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <div className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Bell size={18}/> Recent Activities
                </div>
                <div className="flex-1 flex flex-col gap-3">
                  {activities.map((activity, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <activity.icon size={22} className={activity.color} />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">{activity.desc}</div>
                      </div>
                      <div className="text-xs text-gray-400 whitespace-nowrap">{activity.time}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col">
                <div className="font-semibold text-gray-700 mb-4 flex items-center gap-2">
                  <Library size={18}/> Quick Links
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors">
                    <BookOpen size={20} className="mx-auto mb-1" />
                    <span className="text-sm">Course Materials</span>
                  </button>
                  <button className="p-3 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
                    <ClipboardList size={20} className="mx-auto mb-1" />
                    <span className="text-sm">Assignments</span>
                  </button>
                  <button className="p-3 rounded-lg bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors">
                    <Calendar size={20} className="mx-auto mb-1" />
                    <span className="text-sm">Schedule</span>
                  </button>
                  <button className="p-3 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors">
                    <Award size={20} className="mx-auto mb-1" />
                    <span className="text-sm">Grades</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
