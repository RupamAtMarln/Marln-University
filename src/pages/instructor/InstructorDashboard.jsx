import { useState } from 'react';
import Sidebar from '../../components/Sidebar';
import { BookOpen, Users2, ClipboardList, Calendar, BarChart2, MessageCircle, FileText, CheckCircle, TrendingUp, Bell, ArrowUpRight } from 'lucide-react';

const stats = [
  { label: 'My Courses', value: '6', icon: BookOpen, color: 'text-blue-600', bg: 'bg-blue-50' },
  { label: 'Students Taught', value: '180', icon: Users2, color: 'text-green-600', bg: 'bg-green-50' },
  { label: 'Assignments to Grade', value: '12', icon: ClipboardList, color: 'text-purple-600', bg: 'bg-purple-50' },
  { label: 'Upcoming Classes', value: '3', icon: Calendar, color: 'text-yellow-600', bg: 'bg-yellow-50' },
];

const messages = [
  { name: 'Sarah Lee', time: '10:15 AM', msg: 'Could you clarify the project requirements?', avatar: '', color: 'bg-blue-200' },
  { name: 'David Kim', time: 'Yesterday', msg: 'I will be absent next class.', avatar: '', color: 'bg-green-200' },
  { name: 'Eva Green', time: '2 days ago', msg: 'Thank you for the feedback!', avatar: '', color: 'bg-yellow-200' },
];

const activities = [
  { icon: CheckCircle, desc: 'Graded Assignment 2 for CS101.', time: '5 min ago', color: 'text-blue-600' },
  { icon: FileText, desc: 'Uploaded new lecture notes for ML305.', time: '30 min ago', color: 'text-green-600' },
  { icon: BarChart2, desc: 'Reviewed attendance for Data Structures.', time: '1 hr ago', color: 'text-yellow-600' },
  { icon: Users2, desc: 'Held office hours for students.', time: '3 hr ago', color: 'text-purple-600' },
];

const noticeBoard = [
  { title: 'Midterm Exam Schedule', desc: 'Midterms will be held next week. Check the calendar.', date: 'Oct 10, 2024', by: 'Academic Office', views: 210 },
  { title: 'Faculty Meeting', desc: 'Monthly faculty meeting this Friday at 2 PM.', date: 'Oct 8, 2024', by: 'Dean Office', views: 98 },
  { title: 'Course Material Update', desc: 'New resources added to the library.', date: 'Oct 5, 2024', by: 'Library', views: 120 },
];

const coursePerformance = [60, 75, 80, 90, 85, 88, 92];
const studentEngagement = [70, 80, 65, 90, 85, 78, 88];

const quickAccess = [
  { label: 'Gradebook', icon: BarChart2, color: 'bg-blue-100', href: '#' },
  { label: 'Materials', icon: FileText, color: 'bg-green-100', href: '#' },
  { label: 'Attendance', icon: ClipboardList, color: 'bg-yellow-100', href: '#' },
];

const events = [
  { time: '9:00 AM', title: 'CS101 Lecture', desc: 'Room 204, Main Building' },
  { time: '11:00 AM', title: 'Office Hours', desc: 'Faculty Office 12' },
  { time: '2:00 PM', title: 'ML305 Lab', desc: 'Lab 3, Science Block' },
];

export default function InstructorDashboard() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      <Sidebar role="instructor" />
      <div className="flex-1 overflow-auto p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className={`rounded-xl shadow p-6 flex items-center gap-4 ${stat.bg} dark:bg-gray-800`}>
                  <stat.icon size={36} className={stat.color} />
                  <div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div>
                    <div className="text-gray-500 dark:text-gray-300 text-sm">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Course Performance (Line Chart) */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-gray-700 dark:text-gray-100">Course Performance</div>
                  <select className="border rounded px-2 py-1 text-sm dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
                    <option>Last 7 Classes</option>
                    <option>Last Semester</option>
                  </select>
                </div>
                {/* Mock Line Chart */}
                <svg viewBox="0 0 320 100" className="w-full h-28">
                  <polyline
                    fill="none"
                    stroke="#2563eb"
                    strokeWidth="3"
                    points="0,90 50,80 100,70 150,60 200,50 250,40 300,30"
                  />
                  <circle cx="300" cy="30" r="6" fill="#2563eb" />
                  <text x="310" y="28" fontSize="12" fill="#2563eb">92%</text>
                </svg>
              </div>
              {/* Student Engagement (Bar Chart) */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-semibold text-gray-700 dark:text-gray-100">Student Engagement</div>
                  <select className="border rounded px-2 py-1 text-sm dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700">
                    <option>Last 7 Classes</option>
                    <option>Last Semester</option>
                  </select>
                </div>
                {/* Mock Bar Chart */}
                <svg viewBox="0 0 320 100" className="w-full h-28">
                  {studentEngagement.map((val, i) => (
                    <rect key={i} x={20 + i * 40} y={100 - val} width="24" height={val} fill="#22c55e" />
                  ))}
                </svg>
              </div>
            </div>

            {/* Middle Widgets */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Messages */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
                <div className="font-semibold text-gray-700 dark:text-gray-100 mb-2 flex items-center gap-2"><MessageCircle size={18}/> Student Messages</div>
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
              {/* Quick Access */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col gap-4 items-center justify-center">
                <div className="font-semibold text-gray-700 dark:text-gray-100 mb-2 flex items-center gap-2"><ArrowUpRight size={18}/> Quick Access</div>
                <div className="flex gap-4">
                  {quickAccess.map((q, i) => (
                    <a key={i} href={q.href} className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-sm ${q.color} hover:bg-opacity-80 transition`}>
                      <q.icon size={28} className="mb-1 text-blue-700" />
                      <span className="font-semibold text-gray-700 text-sm">{q.label}</span>
                    </a>
                  ))}
                </div>
              </div>
              {/* Upcoming Events */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col">
                <div className="font-semibold text-gray-700 dark:text-gray-100 mb-2 flex items-center gap-2"><Calendar size={18}/> Upcoming Events</div>
                <div className="flex flex-col gap-3">
                  {events.map((e, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Calendar size={22} className="text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 text-sm">{e.title}</div>
                        <div className="text-xs text-gray-500">{e.desc}</div>
                      </div>
                      <div className="text-xs text-gray-400 whitespace-nowrap">{e.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Notice Board */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="font-semibold text-gray-700 dark:text-gray-100 mb-2 flex items-center gap-2"><Bell size={18}/> Notice Board</div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-gray-500 dark:text-gray-300">
                      <th className="py-2 px-2 text-left">Title</th>
                      <th className="py-2 px-2 text-left">By</th>
                      <th className="py-2 px-2 text-left">Date</th>
                      <th className="py-2 px-2 text-right">Views</th>
                    </tr>
                  </thead>
                  <tbody>
                    {noticeBoard.map((n, i) => (
                      <tr key={i} className="border-t dark:border-gray-700">
                        <td className="py-2 px-2 font-semibold text-blue-700 dark:text-blue-400">{n.title}</td>
                        <td className="py-2 px-2">{n.by}</td>
                        <td className="py-2 px-2">{n.date}</td>
                        <td className="py-2 px-2 text-right">{n.views}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <div className="font-semibold text-gray-700 dark:text-gray-100 mb-2 flex items-center gap-2"><TrendingUp size={18}/> Recent Activity</div>
              <div className="flex flex-col gap-3">
                {activities.map((a, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <a.icon size={22} className={a.color} />
                    <div className="flex-1">
                      <div className="font-semibold text-gray-800 dark:text-gray-100 text-sm">{a.desc}</div>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-300 whitespace-nowrap">{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}